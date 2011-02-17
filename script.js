// sanitize the github 404 ... uses jquery anyway

if (typeof console == "undefined")
    console = {
        log: $.noop
    }

function gEid(e){
    return document.getElementById(e)
}

var Parallax = {
    errr: {},
    ocat: {},
    spdr: {},
    bldg: {},
    pct : {},
    cf  : {
        w   : 940,
        h   : 375,
        unit: 'px'
    },
    init: function () {
        var tmp;
        this.errr.mess = gEid('err_mess');
        this.ocat.main = gEid('ocatBody');
        this.ocat.shad = gEid('ocatShad');
        this.spdr.main = gEid('spdrBody');
        this.spdr.shad = gEid('spdrShad');
        this.bldg._one = gEid('bldg_one');
        this.bldg._two = gEid('bldg_two');
        this._parallax = gEid('backgrnd');
        this._illustra = gEid('prlx_ill');

        tmp = this._illustra;
        tmp.addEventListener('mousedown', function(evt){
            evt.preventDefault()
        }, false);

        tmp = findPos(tmp);
        getOrig(this.errr.mess, tmp, [20, 10]);
        getOrig(this.ocat.main, tmp, [10,  5]);
        getOrig(this.ocat.shad, tmp, [10, -5]);
        getOrig(this.spdr.main, tmp, [30, 10]);
        getOrig(this.spdr.shad, tmp, [30,  0]);
        getOrig(this.bldg._one, tmp, [50, 20]);
        getOrig(this.bldg._two, tmp, [75, 30]);
        getOrig(this._parallax, tmp, [10, 40]);
        getOrig(this._illustra, tmp, [ 0,  0]);

        $('body').bind('mousemove', this.move);

        function getOrig(obj, off, rng) {
            var tmp = findPos(obj);

            obj.o = {
                x : tmp.x - off.x,
                y : tmp.y - off.y
            };
            obj.r = {
                x : rng[0],
                y : rng[1]
            };
        }
        function findPos(obj) {
            var L = 0, T = 0;
            do {
                L += obj.offsetLeft;
                T += obj.offsetTop;
                console.log(obj);
            } while ((obj = obj.offsetParent));
            return {
                x:L,
                y:T
            };
        }
    },
    move : function (evt) {  // event handler ... this == element
        var me = Parallax;
        me.calcPct(evt);     // Place items along their range
        givePos(me.errr.mess);
        givePos(me.ocat.main);
        givePos(me.ocat.shad);
        givePos(me.spdr.main);
        givePos(me.spdr.shad);
        givePos(me.bldg._one);
        givePos(me.bldg._two);
        givePos(me._parallax);
        return true;

        function givePos(obj) {
            var tmp = me.cf.unit;
            obj.style.left = ((obj.o.x - obj.r.x) + (obj.r.x * me.pct.x)) + tmp;
            obj.style.top  = ((obj.o.y          ) - (obj.r.y * me.pct.y)) + tmp;
        }
    },
    calcPct: function (evt){
        var tmp = this._illustra.o;
        this.pct.x = .01 * Math.round(((evt.pageX - tmp.x) / this.cf.w) * 100);
        this.pct.y = .01 * Math.round(((evt.pageY - tmp.y) / this.cf.h) * 100);
    }
};

$(function(){
    Parallax.init();
});
