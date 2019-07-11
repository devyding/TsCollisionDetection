class CircleRect{
    /**
     * 检查圆是否与旋转举行相交
     * @param circleX 圆心x坐标
     * @param circleY 圆心y坐标
     * @param circleR 圆半径
     * @param rectCenterX 旋转矩形的中心点x坐标
     * @param rectCenterY 旋转举行的中心点y坐标
     * @param rectW 矩形宽
     * @param rectH 矩形高
     * @param rectRotation 旋转角度，顺时针为正，逆时针为负。同laya的旋转方向
     */
    public static IsOverLap(circleX: number, circleY: number, circleR: number, rectCenterX: number, rectCenterY: number, rectW: number, rectH: number, rectRotation: number): boolean{
        var rectX = rectCenterX - rectW / 2;
        var rectY = rectCenterY - rectH / 2;

        var rectReferenceX = rectX;
        var rectReferenceY = rectY;

        rectRotation = -rectRotation;
        
        // Rotate circle's center point back
        var unrotatedCircleX = FastAngle.Cos( rectRotation ) * ( circleX - rectCenterX ) - FastAngle.Sin( rectRotation ) * ( circleY - rectCenterY ) + rectCenterX;
        var unrotatedCircleY = FastAngle.Sin( rectRotation ) * ( circleX - rectCenterX ) + FastAngle.Cos( rectRotation ) * ( circleY - rectCenterY ) + rectCenterY;

        // Closest point in the rectangle to the center of circle rotated backwards(unrotated)
        var closestX, closestY;

        // Find the unrotated closest x point from center of unrotated circle
        if ( unrotatedCircleX < rectReferenceX ) {
            closestX = rectReferenceX;
        } else if ( unrotatedCircleX > rectReferenceX + rectW ) {
            closestX = rectReferenceX + rectW;
        } else {
            closestX = unrotatedCircleX;
        }
    
        // Find the unrotated closest y point from center of unrotated circle
        if ( unrotatedCircleY < rectReferenceY ) {
            closestY = rectReferenceY;
        } else if ( unrotatedCircleY > rectReferenceY + rectH ) {
            closestY = rectReferenceY + rectH;
        } else {
            closestY = unrotatedCircleY;
        }
    
        // Determine collision
        var collision = false;
        var distance = CircleRect.getDistance( unrotatedCircleX, unrotatedCircleY, closestX, closestY );
        
        if ( distance < circleR*circleR ) {
            collision = true;
        }
        else {
            collision = false;
        }

        return collision;        
    }

    public static getDistance( fromX, fromY, toX, toY ) {
        var dX = Math.abs( fromX - toX );
        var dY = Math.abs( fromY - toY );

        return ( dX * dX ) + ( dY * dY ) ;
    }
}