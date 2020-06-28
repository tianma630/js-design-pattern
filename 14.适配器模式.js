// 适配器模式的作用是解决两个软件实体间的接口不兼容的问题。

var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};

var baiduMap = {
    display: function () {
        console.log('开始渲染百度地图');
    }
};

var renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show();
    }
};

var baiduMapAdapter = {
    show: function () {
        return baiduMap.display();

    }
};
renderMap(googleMap); renderMap(baiduMapAdapter);