var _ = require('fn');
module.exports = claw;


var transform = (function() {
    var styles = document.createElement('a').style,
        props = ['WebkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'Transform'],
        i;
    for (i = 0; i < props.length; i++) {
        if (props[i] in styles) return props[i];
    }
})();

function formatTransform(v) {
    var str = '';
    _.each(v, function(val, prop) {
        str += (prop + '(' + val + ') '); // arrays should get normalized with commas
    });
    return str;
}

function claw(el, vals) {
    var t = this;
    el.__claw__ = el.__claw__ || {};
    el.__clawprev__ = el.__clawprev__ || '';

    _.extend(el.__claw__, vals);
    var str = formatTransform(el.__claw__);

    if (el.__clawprev__ !== str) {
        el.style[transform] = str;
        el.__clawprev__ = str

    }

    // return a curried function for further chaining
    return function(v) {
        return claw.call(t, el, v);
    }

}