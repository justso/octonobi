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
    pct : {},
    cf  : {
        w   : 940,
        h   : 375,
        unit: 'px'
    },
    init: function () {
        var tmp;
        this.err.mess = _gEid('Err_msg');
        this.cat.main = _gEid('CatBody');
        this.cat.shad = _gEid('CatShad');
        this.car.main = _gEid('CarBody');
        this.car.shad = _gEid('CarShad');
        this.bld._one = _gEid('Build_1');
        this.bld._two = _gEid('Build_2');
        this.backgrnd = _gEid('Backgr0');
        this.parallax = _gEid('Parallax');

        tmp = this.parallax;
        tmp.addEventListener('mousedown', function(evt){
            evt.preventDefault();
        }, false);
        $(tmp).bind('mousemove', this.move);

        this.cf.off = tmp = _position(tmp);

        _origins(this.parallax, tmp, [ 0,  0]);
        _origins(this.err.mess, tmp, [20, 10]);
        _origins(this.cat.main, tmp, [10,  5]);
        _origins(this.cat.shad, tmp, [10,  5]);
        _origins(this.car.main, tmp, [30, 10]);
        _origins(this.car.shad, tmp, [30,  0]);
        _origins(this.bld._one, tmp, [50, 20]);
        _origins(this.bld._two, tmp, [75, 30]);
        _origins(this.backgrnd, tmp, [10, 40]);

        function _origins(obj, off, rng) {
            try {
                var tmp = _position(obj);
                obj.o = {
                    x : tmp.x - off.x,
                    y : tmp.y - off.y
                };
                obj.r = {
                    x : rng[0],
                    y : +rng[1]
                };
                clog(tmp.x,tmp.y,'',off.x,off.y,'',obj.o.x,obj.o.y,'',obj.r.x,obj.r.y,obj)
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
        givePos(me.err.mess);
        givePos(me.cat.main);
        givePos(me.cat.shad);
        givePos(me.car.main);
        givePos(me.car.shad);
        givePos(me.bld._one);
        givePos(me.bld._two);
        givePos(me.backgrnd);
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
