var nativeForEach = [].forEach,
    slice = [].slice,
    has = {}.hasOwnProperty;

module.exports = claw;


function each(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === {}) return;
        }
    } else {
        for (var key in obj) {
            if (has.call(obj, key)) {
                if (iterator.call(context, obj[key], key, obj) === {}) return;
            }
        }
    }
}


var isArray = Array.isArray ||
        function(obj) {
            return toString.call(obj) == '[object Array]';
    };


function extend(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
        each(source, function(val, prop) {
            obj[prop] = val;
        });
    });
    return obj;
}


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
    each(v, function(val, prop) {
        str += (prop + '(' + val + ') '); // arrays should get normalized with commas
    });
    return str;
}

function claw(el, vals) {
    var t = this;
    el.__claw__ = el.__claw__ || {};
    el.__clawprev__ = el.__clawprev__ || '';

    extend(el.__claw__, vals);
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