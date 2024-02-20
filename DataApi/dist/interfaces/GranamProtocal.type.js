export class GranhamProtocol {
    points;
    lpa;
    vpa;
    p_l;
    p_vp;
    roe;
    currentRatio;
    grossDebt;
    patrimony;
    gb_p;
    netLiquid;
    constructor() {
        this.points = 0;
        this.lpa = [];
        this.vpa = [];
        this.p_l = 0;
        this.p_vp = 0;
        this.roe = 0;
        this.currentRatio = 0;
        this.grossDebt = 0;
        this.patrimony = 0;
        this.gb_p = 0;
        this.netLiquid = [];
    }
}
