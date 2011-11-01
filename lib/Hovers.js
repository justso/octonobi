/// Hovers.js


$.fn.drt = function(){
    var me = this;
    if (!me.data('drt')) me.data('drt',{});
    return me.data('drt');
}

function addHover(ele){
    var me = $(ele);
    // clog('addHover',me);
    me.bind('mouseleave',hideNote);
    me.bind('mouseenter',soonShow);
}
function hideNote(){
    var me = $(this);
    // clog('hideNote',me);
    clearTimeout(me.drt().time);
    me.drt().note.hide()
}
function soonShow(evt){
    var me = $(this);
    // clog('soonShow',evt,me);
    me.drt().time = window.setTimeout(showNote,1111,me,evt.pageX,evt.pageY);
}
function showNote(me,x,y){
    // clog('showNote',x,y,me);
    if (!me.drt().note) {
        me.drt().note = $('<span>');
        me.drt().note
        .addClass('note')
        .text(me.attr('alt'))
        .appendTo('body');
    }
    me.drt().note.css({left:x+11,top:y+11});
    me.drt().note.show();
}
addHover('img');


// make any hover-tip trigger reactivate a timer that...
/// inversely affects hover-tip trigger time
/// this way the next hover-tip is quickly shown

/*
tests
me.bind(
    'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error',
    function(evt){clog(evt.type)}
);
*/

