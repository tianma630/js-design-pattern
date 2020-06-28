// 策略模式的定义是: 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

// 将可扩展的算法部分独立成一个个策略，定义一个容器类去调用这些策略。

// 清除了条件分支语句

var strategies = {
    "S": function(salary) {
        return salary * 4;
    }, 
    "A": function(salary) {
        return salary * 3;
    }, 
    "B": function(salary) {
        return salary * 2;
    }
};

function calculateBonus(strategy, salary) {
    return strategies[strategy](salary);
}