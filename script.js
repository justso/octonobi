// sanitize the github 404 ... uses jquery anyway

if (typeof console == "undefined") (console = {}).log = $.noop

var clog = function(){
    console.log.apply(console,arguments);
}

var Parallax = {
    err: {},
    cat: {},
    car: {},
    bld: {},
    pct: {},
    cf : {
        w   : 940,
        h   : 375,
        facX: 2,
        facY: 1,
        facZ: 5,
        radi: 4,
        unit:'px',
        para: 4
    },
    init: function () {
        var tmp
        ,   cf = this.cf;

        this.parallax = _gEid('Parallax');
        this.backgrnd = _gEid('Backgr0');
        this.bld._one = _gEid('Build_1');
        this.bld._two = _gEid('Build_2');

        this.car.shad = _gEid('CarShad');
        this.car.body = _gEid('CarBody');
        this.cat.shad = _gEid('CatShad');
        this.cat.body = _gEid('CatBody');

        this.err.mess = _gEid('Err_msg');

        tmp = this.parallax;
        tmp.addEventListener('mousedown', function(evt){
            evt.preventDefault();
        }, false);
        $(tmp).bind('mousemove', this.move);

        cf.off = tmp = _position(tmp);

        _origins(this.parallax, tmp, [7, 0]);
        _origins(this.backgrnd, tmp, [7, 8]);
        _origins(this.bld._one, tmp, [15,4]);
        _origins(this.bld._two, tmp, [25,8]);

        _origins(this.car.shad, tmp, [11, 0]);
        _origins(this.car.body, tmp, [9, -1]);
        _origins(this.cat.shad, tmp, [0, -1]);
        _origins(this.cat.body, tmp, [1, -2]);

        _origins(this.err.mess, tmp, [4, -1]);

        function _origins(obj, off, rng) {
            try {
                var tmp = _position(obj);
                obj.o = {
                    x : tmp.x - off.x,
                    y : tmp.y - off.y
                };
                obj.r = {
                    x : (rng[0] - cf.para) * cf.facZ * cf.facX,
                    y : (cf.para - rng[1]) * cf.facZ * cf.facY
                };
                clog('tmp',tmp.x,tmp.y,'off',off.x,off.y,'objo',obj.o.x,obj.o.y,'objr',obj.r.x,obj.r.y,obj)
            } catch (err){
                clog(err);
            }
        }
        function _position(obj) {
            var tmp = {
                x: 0,
                y: 0
            };
            do tmp.x += obj.offsetLeft, tmp.y += obj.offsetTop;
            while (obj = obj.offsetParent);
            return tmp;
        }
        function _gEid(e){
            return document.getElementById(e)
        }
    },
    move : function (evt) {  // event handler ... this == element
        var me = Parallax;
        me.calcPct(evt);     // Place items along their range
        givePos(me.backgrnd);
        givePos(me.bld._one);
        givePos(me.bld._two);
        givePos(me.car.shad);
        givePos(me.car.body);
        givePos(me.cat.shad);
        givePos(me.cat.body);
        givePos(me.err.mess);
        return true;

        function givePos(obj) {
            var tmp = me.cf.unit;
            obj.style.left = ((obj.o.x - obj.r.x/2) + (obj.r.x * me.pct.x)) + tmp;
            obj.style.top  = ((obj.o.y + obj.r.y/2) - (obj.r.y * me.pct.y)) + tmp;
        }
    },
    calcPct: function (evt){
        var tmp = this.parallax.o
        ,   x = evt.pageX - this.cf.off.x
        ,   y = evt.pageY - this.cf.off.y;
        this.pct.x = .01 * Math.round(((x - tmp.x) / this.cf.w) * 100);
        this.pct.y = .01 * Math.round(((y - tmp.y) / this.cf.h) * 100);
        clog([x,this.pct.x],[y,this.pct.y]);
    }
};

$(function(){
    Parallax.init();
});
