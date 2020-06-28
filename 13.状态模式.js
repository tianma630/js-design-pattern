// 状态模式可以使每 一种状态和它对应的行为之间的关系局部化，这些行为被分散和封装在各自对应的状态类之中， 便于阅读和管理代码。

var OffLightState = function (light) {
    this.light = light;
};
OffLightState.prototype.buttonWasPressed = function () {
    console.log('弱光'); // offLightState 对应的行为 this.light.setState( this.light.weakLightState );
};

var WeakLightState = function (light) {
    this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function () {
    console.log('强光'); // weakLightState 对应的行为 this.light.setState( this.light.strongLightState );
};

var StrongLightState = function (light) {
    this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function () {
    console.log('关灯'); // strongLightState 对应的行为
    this.light.setState(this.light.offLightState); // 切换状态到 offLightState
};

var Light = function () {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
};

Light.prototype.init = function () {
    var button = document.createElement('button'),
        self = this;
    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';
    this.currState = this.offLightState;

    this.button.onclick = function () {
        self.currState.buttonWasPressed();
    }
}

Light.prototype.setState = function( newState ){
    this.currState = newState;
}

var light = new Light(); 
light.init();

/*

策略模式和状态模式的相同点是，它们都有一个上下文、一些策略或者状态类，上下文把请求委托给这些类来执行。

它们之间的区别是策略模式中的各个策略类之间是平等又平行的，它们之间没有任何联系， 
所以客户必须熟知这些策略类的作用，以便客户可以随时主动切换算法;而在状态模式中，状态 
和状态对应的行为是早已被封装好的，状态之间的切换也早被规定完成，“改变行为”这件事情 
发生在状态模式内部。对客户来说，并不需要了解这些细节。这正是状态模式的作用所在。

*/