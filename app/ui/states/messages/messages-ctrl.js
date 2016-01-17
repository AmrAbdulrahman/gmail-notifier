angular
    .module('GClientApp')
    .controller('MessagesCtrl', function($scope, $state, $q, messagesSrvc) {
        $scope.loading = true;

        messagesSrvc
            .list()
            .then(function(messages) {
                var messagePromises = [];

                _.each(messages, function(message, i) {
                    var promise = messagesSrvc
                        .get(message.id)
                        .then(function(message) {
                            messages[i] = message;
                        }, function(err) {
                            console.log(err);
                        });

                    messagePromises.push(promise);
                });

                $q
                    .all(messagePromises)
                    .then(function() {
                        $scope.loading = false;
                        $scope.messages = messages;

                        try {
                            $scope.$apply();
                        } catch (e) {}
                    });
            }, function() {
                $scope.error = true;
                $scope.$apply();
            });
    });