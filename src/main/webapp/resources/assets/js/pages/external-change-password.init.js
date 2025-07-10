// External Change Password Controller
app.controller('ExternalChangePasswordController', ['$scope', '$http', function($scope, $http) {
    $scope.passwords = { current: '', new: '', confirm: '' };

    $scope.changePassword = function() {
        if ($scope.passwords.new !== $scope.passwords.confirm) {
            alert('Les nouveaux mots de passe ne correspondent pas.');
            return;
        }
        $http.post('/primature/api/external/change-password', $scope.passwords).then(function(response) {
            alert('Mot de passe changé avec succès !');
            $scope.passwords = { current: '', new: '', confirm: '' };
        }, function() {
            alert('Erreur lors du changement de mot de passe.');
        });
    };
}]); 