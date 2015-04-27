/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

angular.module('RealtimeApp')
.controller('serviceCtrl', 
['$scope', 'storageSer', 'keySer', 'realtimeSer', '$window',
function ($scope, storageSer, keySer, realtimeSer, $window) {
    $scope.ui = {
        isLogin: false
    };

    $scope.user = {
        name: storageSer.item('name'),
        phone: storageSer.item('phone'),
        questionItem: storageSer.item('questionItem'),
        msgList: [
            {
                self: true,
                msg: '感谢使用 LeanCloud，请问有什么问题可以帮你？'
            }
        ]
    };

    $scope.login = function() {
        if ($scope.user.name.trim() && $scope.user.phone.trim()) {
            keySer.off(13, loginKeyDown);
            storageSer.item('name', $scope.user.name);
            storageSer.item('phone', $scope.user.phone);
            $scope.ui.isLogin = true;
            openRealtime();
            bindBeforeUnload();
        }
    };

    keySer.on(13, loginKeyDown);

    $scope.sendMsg = function() {
        $scope.user.msgList.push({
            other: true,
            msg: $scope.user.inputMsg
        });
        realtimeSer.send($scope.user.inputMsg);
        $scope.user.inputMsg = '';
    };

    function loginKeyDown() {
        $scope.login();
        $scope.$apply();
    }

    function sendMsgKeyDown() {
        $scope.sendMsg();
        $scope.$apply();
    }

    function openRealtime() {
        realtimeSer.init($scope.user.phone, 
        [$scope.user.phone, $scope.user.questionItem], 
        function() {
            keySer.on(13, sendMsgKeyDown);
        });
    }

    function bindBeforeUnload() {
        $window.addEventListener('beforeunload', function(event) {
            event.returnValue = '确定要退出吗？';
        });
    }
}]);
