/// Params.js
function uread() {
    var tmp = location.search.substr(1)
    ,   obj = {};
    tmp = tmp.split('&');
    for (var i=0; i<tmp.length; i++){
        obj[tmp[i].split('=')[0]] = tmp[i].split('=')[1];
    }
    return obj;
}

function uwrite(obj) {
    var arr = [];
    for (var i in obj) {
        arr.push(i + '=' + obj[i]);
    }
    location.search = '?' + arr.join('&');
}

function pokedata(){
    var all = $('input.control')
    ,   obj = {};
    all.each(
        function(i,e){
            obj[e.id] = e.value;
        }
    )
    return obj;
}
function peekdata(){
    var all = $('input.control')
    ,   obj = {};
    all.each(
        function(i,e){
            obj[e.id] = e.value;
        }
    )
    return obj;
}

function control(type, id) {
    var tmp;
    switch (type) {
    case 'number':
        tmp = $('<input type="text">');
        tmp.attr({
            'id': id,
            'value': id,
            'class': 'control'
        }).appendTo('form')
        .wrap($('<label>').text(id).addClass('number'))
        ;
        break;
    case 'submit':
        $('<input type="submit">').appendTo('form');
        break;
    case 'form':
        $('<form">').prependTo('body')
        .attr({
            'action':'.'
        });
        break;
    case 'slider': break;
    default: return;
    }
}

control('form');
control('submit');
control('number','para');
control('number','fact');

