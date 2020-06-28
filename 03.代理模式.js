// 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

// 1 保护代理  代理会过滤掉一些达不到要求的调用方
// 2 虚拟代理 把花销很大的操作延迟到真正需要的时候再去执行

var myImage = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return {
        setSrc(src) {
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function() {
    var img = new Image();
    img.onload = function() {
        myImage.setSrc(this.src);
    }

    return {
        setSrc(src) {
            myImage.setSrc( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
            img.src = src;
        }
    }
})()

proxyImage.setSrc( 'http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );

// --------------------

function multi() {
    let ret = 1;
    for (let i = 0; i < arguments.length; i++) {
        ret *= arguments[i];
    }
    return ret;
}

var proxyMulti = (function() {
    const cache = {};

    return function() {
        let key = Array.prototype.join.call(arguments, ',');
        if (cache[key]) {
            return cache[key];
        } else {
            let value = multi.apply(this, arguments);
            cache[key] = value;
            return value;
        }
    }
})()

console.log(proxyMulti(2,3,4))
console.log(proxyMulti(2,3,2))