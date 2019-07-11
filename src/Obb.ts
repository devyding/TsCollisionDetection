/**
 * OBB包围盒检测碰撞
    use separating theorem
    // 1. find axes ax/ay, bx/by which are parallel to each edge.
    // 2. project each vertex to axes.
    // 3. if these projections don't overlap, they don't intersect.* 
 */

class ObbVector{
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
    public static dot(a: ObbVector, b: ObbVector){
        return (a.x *b.x)+(a.y *b.y);
    }    
}
class OBB{
    pivot: ObbVector;
    size: ObbVector;
    rotation: number;

    constructor(x: number, y: number, w: number, h: number, r: number){
        this.pivot = new ObbVector(x, y);
        this.size = new ObbVector(w, h);
        this.rotation = r;
    }

    local2World() {
        var verts = new Array(4);
        verts[0] = new ObbVector(-this.size.x * 0.5, -this.size.y * 0.5);
        verts[1] = new ObbVector(this.size.x * 0.5, -this.size.y * 0.5);
        verts[2] = new ObbVector(this.size.x * 0.5, this.size.y * 0.5);
        verts[3] = new ObbVector(-this.size.x * 0.5,  this.size.y * 0.5);
    
        var vx, vy;
        for (var i = 0; i < verts.length; ++i)
        {
            vx = verts[i].x;
            vy = verts[i].y;
            verts[i].x = vx * FastAngle.Cos(this.rotation) - vy * FastAngle.Sin(this.rotation) + this.pivot.x;
            verts[i].y = vx * FastAngle.Sin(this.rotation) + vy * FastAngle.Cos(this.rotation) + this.pivot.y;
        }
    
        return verts;
    }

    public static IsOverlap (o1, o2){
        // find axes
        var axes = new Array(4);
        axes[0] = new ObbVector( FastAngle.Cos(o1.rotation), FastAngle.Sin(o1.rotation));
        axes[1] = new ObbVector(-FastAngle.Sin(o1.rotation), FastAngle.Cos(o1.rotation));
        axes[2] = new ObbVector( FastAngle.Cos(o2.rotation), FastAngle.Sin(o2.rotation));
        axes[3] = new ObbVector(-FastAngle.Sin(o2.rotation), FastAngle.Cos(o2.rotation));

        // vertices(unrotated)
        var verts1 = o1.local2World();
        var verts2 = o2.local2World();

        // project vertices to each axis
        for (var i = 0; i < axes.length; ++i)
        {
            // find max and min from o1
            var min1 = Number.MAX_VALUE, max1 = -Number.MAX_VALUE, ret1;
            for (var j = 0; j < verts1.length; ++j)
            {
                ret1 = ObbVector.dot(verts1[j], axes[i]);
                min1 = min1 > ret1 ? ret1 : min1;
                max1 = max1 < ret1 ? ret1 : max1;
            }

            // find max and min from o2
            var min2 = Number.MAX_VALUE, max2 = -Number.MAX_VALUE, ret2;
            for (var j = 0; j < verts2.length; ++j)
            {
                ret2 = ObbVector.dot(verts2[j],axes[i]);
                min2 = min2 > ret2 ? ret2 : min2;
                max2 = max2 < ret2 ? ret2 : max2;
            }

            // overlap check
            var r1 = max1 - min1;
            var r2 = max2 - min2;
            var r = (max1 > max2 ? max1 : max2) - (min1 < min2 ? min1 : min2);
            if (r1 + r2 <= r)
            {
                return false;
            }
        }

        return true;
    }   
}