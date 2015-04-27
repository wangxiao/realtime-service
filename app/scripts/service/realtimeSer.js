/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

angular.module('RealtimeApp')
.factory('realtimeSer', 
['$window', function($window) {
    var appId = 'e6sqf4o51ml9578eub1j92amw4gzwowamwvn0m4tvt1kmrlc';
    var rt;
    var room;

    return {
        init: function(clientId, members, callback) {
            rt = $window.AV.realtime({
                appId: appId,
                clientId: clientId,
                encodeHTML: true
            }, function() {
                room = rt.room({
                    members: members,
                }, function() {
                    callback();
                });
            });
        },
        send: function(msg) {
            room.send({
                text: msg
            }, {
                type: 'text'
            }, function() {
                
            });
        }
    };
    // 结束 
}]);
