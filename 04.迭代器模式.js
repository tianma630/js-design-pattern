// 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，
// 而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，
// 在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。


// 内部迭代器
var each = function (ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        callback.call(ary[i], i, ary[i]);
    }
};

each([1, 2, 3], function (i, n) {
    console.log([i, n]);
});

// -------

// 外部迭代器
var Iterator = function (obj) {
    var current = 0;

    var next = function () {
        current++;
    }

    var isDone = function () {
        return current >= obj.length;
    }

    var getCurrItem = function () {
        return obj[current]
    }

    return {
        next,
        isDone,
        getCurrItem,
    }
};

var compare = function (iterator1, iterator2) {
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
            throw new Error('iterator1 和 iterator2 不相等');
        } iterator1.next(); iterator2.next();
    }
    console.log('iterator1 和 iterator2 相等');
}

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 2, 3, 1]);

compare(iterator1, iterator2);

// --------

var getActiveUploadObj = function () {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload");
    } catch (e) {
        return false;
    }
};

var getFlashUploadObj = function () {
    if (supportFlash()) { // supportFlash 函数未提供
        // IE 上传控件
    }
    var str = '<object type="application/x-shockwave-flash"></object>';
    return $(str).appendTo($('body'));
    return false;
};

var getFormUpladObj = function () {
    var str = '<input name="file" type="file" class="ui-file"/>';
    return $(str).appendTo($('body'));
}

var iteratorUploadObj = function () {
    for (var i = 0, fn; fn = arguments[i++];) {
        var uploadObj = fn();
        if (uploadObj !== false) {
            return uploadObj;
        }
    }
};

var uploadObj = iteratorUploadObj( getActiveUploadObj, getFlashUploadObj, getFormUpladObj );