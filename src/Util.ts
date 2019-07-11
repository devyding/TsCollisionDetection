class FastAngle {
    private static AngleCosValue: Array<number>;
    private static AngleSinValue: Array<number>;
    public static init(): void {
        let LEN_CUT: number = 4;
        FastAngle.AngleCosValue = new Array<number>();
        FastAngle.AngleSinValue = new Array<number>();
        for (var i = 0; i < 360; i++) {
            FastAngle.AngleSinValue[i] = Math.sin(i * Math.PI / 180);
            FastAngle.AngleCosValue[i] = Math.cos(i * Math.PI / 180);
        }
    }

    public static Sin(d: number): number {
        if (!FastAngle.AngleSinValue)
            FastAngle.init();
        d = Math.round(d);
        if (d >= 360 || d <= -360)
            d %= 360;
        let idx = d > 0 ? d : -d;
        let v;
        if (d > 0)
            return FastAngle.AngleSinValue[idx];
        else
            return -FastAngle.AngleSinValue[idx];
    }

    public static Cos(d: number): number {
        if (!FastAngle.AngleCosValue)
            FastAngle.init();
        d = Math.round(d);
        if (d >= 360 || d <= -360)
            d = d % 360;
        let idx = d > 0 ? d : -d;
        return FastAngle.AngleCosValue[idx];
    }

    public static RadSin(r: number): number {
        return FastAngle.Sin(r * 180 / Math.PI);
    }

    public static RadCos(r: number): number {
        return FastAngle.Cos(r * 180 / Math.PI);
    }
}
