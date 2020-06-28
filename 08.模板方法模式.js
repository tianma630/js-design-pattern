// 模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。
// 通常 在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。
// 子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

var Beverage = function () { };
Beverage.prototype.boilWater = function () {
    console.log('把水煮沸');
};
Beverage.prototype.brew = function () { };
Beverage.prototype.pourInCup = function () { };
Beverage.prototype.addCondiments = function () { };
// 定义了模板
Beverage.prototype.init = function () {
    this.boilWater();
    this.brew();
    this.pourInCup(); 
    this.addCondiments();
};


var Coffee = function () { };
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function () {
    console.log('用沸水冲泡咖啡');
};
Coffee.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子');
}
Coffee.prototype.addCondiments = function () {
    console.log('加糖和牛奶');
};
var Coffee = new Coffee();
Coffee.init();


var Tea = function () { };
Tea.prototype = new Beverage();
Tea.prototype.brew = function () {
    console.log('用沸水浸泡茶叶');
};
Tea.prototype.pourInCup = function () {
    console.log('把茶叶倒进杯子');
}
Tea.prototype.addCondiments = function () {
    console.log('加柠檬');
};
var tea = new Tea(); 
tea.init();