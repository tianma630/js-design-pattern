// 命令模式最常见的应用场景是:有时候需要向某些对象发送请求，
// 但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。
// 此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。

// 设计模式的主题总是把不变的事物和变化的事物分离开来

var setCommand = function(button, command) {
    button.onclick = function() {
        command.execute();
    }
}

var MenuBar = {
    refresh: function() {
        console.log('刷新菜单目录')
    }
}

var SubMenu = {
    add: function() {
        console.log('增加子菜单')
    },
    del: function() {
        console.log('删除子菜单')
    }
}

var RefreshMenuBarComman = function(receiver) {
    this.receiver = receiver;
}

RefreshMenuBarComman.prototype.execute = function() {
    this.receiver.refresh();
}

var AddSubMenuCommand = function(receiver) {
    this.receiver = receiver;
}

AddSubMenuCommand.prototype.execute = function() {
    this.receiver.add();
}

var DelSubMenuCommand = function(receiver) {
    this.receiver = receiver;
}

DelSubMenuCommand.prototype.execute = function() {
    this.receiver.del();
}

var refreshMenuBarCommand = new RefreshMenuBarComman(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(button1, refreshMenuBarCommand);
setCommand(button2, addSubMenuCommand);
setCommand(button3, delSubMenuCommand);