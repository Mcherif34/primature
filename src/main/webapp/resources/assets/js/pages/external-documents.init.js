app.controller('ExternalDocumentsController', ['$scope', '$http', function($scope, $http) {
    $scope.documents = [];
    $scope.searchText = '';
    $scope.selectedCategory = '';

    // Charger les documents
    $http.get('/primature/api/external/documents').then(function(response) {
        $scope.documents = response.data;
    }, function() {
        // Données mock si l'API échoue
        $scope.documents = [
            {
                id: 1,
                nom: 'Guide utilisateur GED',
                type: 'pdf',
                categorie: 'administratif',
                dateCreation: new Date('2025-01-15'),
                taille: '2.5 MB'
            },
            {
                id: 2,
                nom: 'Procédure de sécurité',
                type: 'doc',
                categorie: 'technique',
                dateCreation: new Date('2025-01-10'),
                taille: '1.8 MB'
            },
            {
                id: 3,
                nom: 'Rapport financier Q4',
                type: 'xls',
                categorie: 'financier',
                dateCreation: new Date('2025-01-05'),
                taille: '3.2 MB'
            }
        ];
    });

    $scope.downloadDocument = function(docId) {
        // Logique de téléchargement
        console.log('Téléchargement du document:', docId);
        alert('Téléchargement en cours...');
    };

    $scope.viewDocument = function(docId) {
        // Logique de visualisation
        console.log('Visualisation du document:', docId);
        alert('Ouverture du document...');
    };
}]); 