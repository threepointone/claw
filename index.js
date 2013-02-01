var each = require('each');

module.exports = claw;

var isArray = Array.isArray ||
function(obj) {
    return toString.call(obj) == '[object Array]';
};


function extend(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
        for(var prop in source) {
            obj[prop] = source[prop];
        }
    });
    return obj;
}


var transform = (function() {
    var styles = document.createElement('a').style,
        props = ['webkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'Transform'],
        i;
    for(i = 0; i < props.length; i++) {
        if(props[i] in styles) return props[i];
    }
})();

function formatTransform(v) {
    var str = '';
    each(v, function(val, prop) {
        str += (prop + '(' + val + ') '); // arrays should get normalized with commas
    });
    return str;
}

function claw(el, vals) {
    var t = this;
    el.__claw__ = el.__claw__ || {};
    extend(el.__claw__, vals);

    el.style[transform] = formatTransform(el.__claw__);

    // return a curried function for further chaining
    return function(v) {
        return claw.call(t, el, v);
    }

}