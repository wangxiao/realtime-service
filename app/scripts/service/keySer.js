/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

angular.module('RealtimeApp')
.factory('keySer', 
['$window', function($window) {
    var funList = {};
    $window.addEventListener('keypress', function(event) {
        var c = 'keyCode' + event.keyCode;
        if (funList[c]) {
            for (var i = 0, l = funList[c].length; i < l; i ++) {
                funList[c][i]();
            }
        }
    });
    return {
        on: function(keyCode, fun) {
            keyCode = 'keyCode' + keyCode;
            if (!funList[keyCode]) {
                funList[keyCode] = [];
            }
            funList[keyCode].push(fun);
        },
        off: function(keyCode, fun) {
            keyCode = 'keyCode' + keyCode;
            if (funList[keyCode]) {
                for (var i = 0, l = funList[keyCode].length; i < l; i ++) {
                    if (funList[keyCode][i] === fun) {
                        funList[keyCode].splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
    // 结束 
}]);
