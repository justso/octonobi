/// Helper.js

if (typeof console == "undefined")(console = {}).log = $.noop

var clog = function() {
    console.log.apply(console, arguments);
}

