angular
    .module('GClientApp')
    .controller('LabelsCtrl', function($scope, $state, labelsSrvc) {
        $scope.loading = true;

        labelsSrvc
            .list()
            .then(function(labels) {
                console.log(labels);
                $scope.labels = labels;
                $scope.$apply();
            }, function(err) {
                $scope.error = true;
                $scope.$apply();
            })['finally'](function() {
                $scope.loading = false;
                $scope.$apply();
            });
    });