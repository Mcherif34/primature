// External Profile Controller
app.controller('ExternalProfileController', ['$scope', '$http', function($scope, $http) {
    $scope.profile = {};

    // Charger les infos du profil
    $http.get('/primature/api/external/user-info').then(function(response) {
        $scope.profile = response.data;
    }, function() {
        $scope.profile = { nom: 'Utilisateur', prenom: 'Externe', email: '', telephone: '', organisation: '', fonction: '' };
    });

    $scope.updateProfile = function() {
        $http.post('/primature/api/external/update-profile', $scope.profile).then(function(response) {
            alert('Profil mis à jour avec succès !');
        }, function() {
            alert('Erreur lors de la mise à jour du profil.');
        });
    };
}]); 