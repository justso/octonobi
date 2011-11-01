// sanitize the github 404 ... uses jquery anyway

var Parallax = {
    cf: {
        w: 940,
        h: 375,
        blk: 0,         /// event skipper
        dbg: 0,         /// debug lvl
        evt: 0,         /// events accrued
        facX: 2,        /// multipliers x
        facY: 1,        /// multipliers y
        facZ: 5,        /// multiplier both
        radi: 4,        /// "pivot" point
        unit: 'px',
    },
    img: $(),
    pct: {},
    init: function() {
        var tmp, me = Parallax,
            cf = me.cf;

        _origins('parallax', '#Parallax');
        _origins('backgrnd', '#Backgr0', [7, 8]);
        _origins('bld._one', '#Build_1', [15, 4]);
        _origins('bld._two', '#Build_2', [25, 8]);
        _origins('car.shad', '#CarShad', [7, 0]);
        _origins('car.body', '#CarBody', [6, 0]);
        _origins('cat.shad', '#CatShad', [2, -1]);
        _origins('cat.body', '#CatBody', [1, -2]);
        _origins('err.mess', '#Err_msg', [4, -1]);

        tmp = me.parallax;
        tmp.addEventListener('mousedown', function(evt) {
            evt.preventDefault();
        }, false);
        $(tmp).bind('mousemove', me.move);

        function _origins(str, id, rng) {
            var tmp, cf = me.cf,
                img = me.img,
                obj = me[str] = $(id).get(0);

            if (rng) me.img = img.add(obj);
            cf.box = cf.box || _position(obj);

            try {
                tmp = _position(obj);
                obj.o = {
                    x: tmp.x - cf.box.x,
                    y: tmp.y - cf.box.y
                };
                obj.r = {
                    x: (rng[0] - cf.radi) * cf.facZ * cf.facX,
                    y: (cf.radi - rng[1]) * cf.facZ * cf.facY
                };
                if (me.cf.dbg > 1)
                    clog('pos',  [tmp.x, tmp.y],
                         'off',  [obj.o.x, obj.o.y],
                         'play', [obj.r.x, obj.r.y],obj);
            } catch(err) {
                clog('_origins', err);
            }
        }

        function _position(obj) {
            var tmp = {
                x: 0,
                y: 0
            };
            do tmp.x += obj.offsetLeft,
            tmp.y += obj.offsetTop;
            while (obj = obj.offsetParent);
            return tmp;
        }
    },
    move: function(evt) {   /// event handler ... this == element
        var me = Parallax;
        if (me.cf.blk) return me.cf.dbg > 2 ? clog('block') : null;
        else me.cf.blk = 1; /// start blocking
        setTimeout(function() {
            me.cf.blk = 0
        }, 15);
        me.calc(evt);       /// Place items along their range
        me.img.each(givePos);
        return true;

        function givePos(obj) {
            obj = this;
            obj.style.left = ((obj.o.x - obj.r.x / 2) + (obj.r.x * me.pct.x)) + me.cf.unit;
            obj.style.top = ((obj.o.y + obj.r.y / 2) - (obj.r.y * me.pct.y)) + me.cf.unit;
            return (me.cf.dbg > 1) ? clog(me.cf.evt += .125) : null;
        }
    },
    calc: function(evt) {
        var me = Parallax,
            x = evt.pageX - me.cf.box.x,
            y = evt.pageY - me.cf.box.y;
        me.pct.x = (x - me.parallax.o.x) / me.cf.w;
        me.pct.y = (y - me.parallax.o.y) / me.cf.h;
        return (me.cf.dbg) ? clog(me.cf.evt++, [x, y], [me.pct.x, me.pct.y]) : null;
    }
};

$(Parallax.init);
