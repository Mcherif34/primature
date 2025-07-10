// External Help Controller
app.controller('ExternalHelpController', ['$scope', '$http', function($scope, $http) {
    $scope.support = { message: '' };

    $scope.sendSupport = function() {
        if (!$scope.support.message) {
            alert('Veuillez saisir un message.');
            return;
        }
        $http.post('/primature/api/external/support', $scope.support).then(function(response) {
            alert('Message envoyé au support !');
            $scope.support.message = '';
        }, function() {
            alert('Erreur lors de l\'envoi du message.');
        });
    };
}]); 