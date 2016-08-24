/*! (C) Andrea Giammarchi - @WebReflection - MIT Style */

var objects = new WeakMap();

function overlaps(path, list) {
    var
        length = path.length,
        out = false
    ;
    list.forEach(
        function (v, i, arr) {
            i = v.length;
            out = i < length ?
                path.slice(0, i) == v :
                v.slice(0, length) == path;
            // if matched, get out of this forEach
            if (out) arr.length = 0;
        }
    );
    return out;
}

module.exports = {
    lock: function lock(path, object) {
        var
            self = arguments.length === 2 ? object : this,
            list = objects.get(self)
        ;
        if (!list) {
            list = new Set();
            objects.set(self, list);
        }
        return (list.has(path) || overlaps(path, list)) ?
            false : (list.add(path), true);
    },
    release: function release(path, object) {
        var list = objects.get(arguments.length === 2 ? object : this);
        return list && list.has(path) ?
            (list.delete(path), true) : false;
    }
};
