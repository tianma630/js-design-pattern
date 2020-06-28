// 职责链模式的定义是:使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，
// 将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

// var order500 = function (orderType, pay, stock) {
//     if (orderType === 1 && pay) {
//         console.log('500元定金，获得100优惠券');
//     } else {
//         order200(orderType, pay, stock);
//     }
// }

// var order200 = function (orderType, pay, stock) {
//     if (orderType === 2 && pay) {
//         console.log('200元定金，获得50优惠券');
//     } else {
//         orderNormal(orderType, pay, stock);
//     }
// }

// var orderNormal = function (orderType, pay, stock) {
//     if (stock > 0) {
//         console.log('普通购买, 无优惠券');
//     } else {
//         console.log('手机库存不足');
//     }
// };

// order500( 1 , true, 500); 
// order500( 1, false, 500 ); 
// order500( 2, true, 500 ); 
// order500( 3, false, 500 ); 
// order500( 3, false, 0 );


// ------

var order500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay) {
        console.log('500元定金，获得100优惠券');
    } else {
        return 'nextSuccessor';
    }
}

var order200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay) {
        console.log('200元定金，获得50优惠券');
    } else {
        return 'nextSuccessor';
    }
}

var orderNormal = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买, 无优惠券');
    } else {
        console.log('手机库存不足');
    }
};

var Chain = function (fn) {
    this.fn = fn;
    this.successor = null;
}

Chain.prototype.setNextSuccessor = function (successor) {
    return this.successor = successor;
}

Chain.prototype.passRequest = function () {
    var ret = this.fn.apply(this, arguments);

    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }

    return ret;
}

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200).setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, true, 500);
chainOrder500.passRequest(1, false, 0);

// ------

Function.prototype.after = function (fn) {
    var self = this;
    return function () {
        var ret = self.apply(this, arguments);
        if (ret === 'nextSuccessor') {
            return fn.apply(this, arguments);
        }
        return ret;
    }
};
var order = order500.after(order200).after(orderNormal);
order(1, true, 500); 
order(2, true, 500); 
order(1, false, 500);