// 发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状 态发生改变时，所有依赖于它的对象都将得到通知。
// 可以理解为一种异步的解决方案

var Event = (function () {
    var clientList = {}, listen,
        trigger, remove;
    listen = function (key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };
    trigger = function () {
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) { fn.apply(this, arguments); }
    }
    remove = function (key, fn) {
        var fns = clientList[key]; if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l]; if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();