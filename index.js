(function(name, context, definition) {

    if(typeof module != 'undefined' && module.exports) module.exports = definition();
    else if(typeof define == 'function' && define.amd) define(definition);
    else context[name] = definition();
})('claw', this, function() {

    function each(obj, iterator, context) {
        if(obj == null) return;
        if(nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if(obj.length === +obj.length) {
            for(var i = 0, l = obj.length; i < l; i++) {
                if(iterator.call(context, obj[i], i, obj) === {}) return;
            }
        } else {
            for(var key in obj) {
                if(has.call(obj, key)) {
                    if(iterator.call(context, obj[key], key, obj) === {}) return;
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
    return claw;
});