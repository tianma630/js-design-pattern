//单例模式的定义是: 保证一个类仅有一个实例，并提供一个访问它的全局访问点。

var Singleton = function(name) {
    this.name = name;
    this.instance = null;
}

Singleton.prototype.getName = function() {
    console.log(this.name);
}

Singleton.getInstance = function(name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
}

var a = Singleton.getInstance( 'sven1' ); 
var b = Singleton.getInstance( 'sven2' );

a.getName();
b.getName();

// 用代理实现单例模式

var CreateDiv = function(html) {
    this.html = html;

    var div = document.createElement( 'div' ); 
    div.innerHTML = this.html; 
    document.body.appendChild( div );
}

var ProxySingletonCreateDiv = (() => {
    var instance;
    return function(html){
        if ( !instance ){
            instance = new CreateDiv( html );
        }
        return instance; 
    }
})()


// 动态创建单例方法
var getSingle = function(fn) {
    let result;

    return function() {
        if (!result) {
            result = fn.apply(this, arguments)
        }

        return result;
    }
}