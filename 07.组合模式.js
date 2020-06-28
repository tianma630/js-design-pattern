// 组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更 小的“孙对象”构成的。

var closeDoorCommand = {
    execute: function () {
        console.log('关门');
    }
};
var openPcCommand = {
    execute: function () {
        console.log('开电脑');
    }
};
var openQQCommand = {
    execute: function () {
        console.log('登录 QQ');
    }
};
var MacroCommand = function () {
    return {
        commandsList: [],
        add: function (command) {
            this.commandsList.push(command);
        },
        execute: function () {
            for (var i = 0, command; command = this.commandsList[i++];) {
                command.execute();
            }
        }
    }
};
var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand); 
macroCommand.add(openPcCommand); 
macroCommand.add(openQQCommand);
macroCommand.execute();