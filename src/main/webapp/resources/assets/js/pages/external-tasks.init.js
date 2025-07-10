app.controller('ExternalTasksController', ['$scope', '$http', function($scope, $http) {
    $scope.tasks = [];
    $scope.searchText = '';
    $scope.selectedStatus = '';
    $scope.selectedPriority = '';

    // Charger les tâches
    $http.get('/primature/api/external/tasks').then(function(response) {
        $scope.tasks = response.data;
    }, function() {
        // Données mock si l'API échoue
        $scope.tasks = [
            {
                id: 1,
                titre: 'Validation du rapport mensuel',
                description: 'Vérifier et valider le rapport d\'activité du mois dernier',
                priorite: 'normale',
                statut: 'en_attente',
                dateLimite: new Date('2025-01-20')
            },
            {
                id: 2,
                titre: 'Mise à jour des informations de contact',
                description: 'Actualiser les coordonnées dans le système',
                priorite: 'haute',
                statut: 'en_cours',
                dateLimite: new Date('2025-01-18')
            },
            {
                id: 3,
                titre: 'Formation sur les nouvelles fonctionnalités',
                description: 'Suivre la formation en ligne sur les nouvelles fonctionnalités',
                priorite: 'basse',
                statut: 'terminee',
                dateLimite: new Date('2025-01-25')
            }
        ];
    });

    $scope.startTask = function(taskId) {
        $http.post('/primature/api/external/tasks/' + taskId + '/start').then(function(response) {
            // Mettre à jour le statut localement
            var task = $scope.tasks.find(function(t) { return t.id === taskId; });
            if (task) {
                task.statut = 'en_cours';
            }
            alert('Tâche démarrée avec succès !');
        }, function() {
            alert('Erreur lors du démarrage de la tâche.');
        });
    };

    $scope.completeTask = function(taskId) {
        $http.post('/primature/api/external/tasks/' + taskId + '/complete').then(function(response) {
            // Mettre à jour le statut localement
            var task = $scope.tasks.find(function(t) { return t.id === taskId; });
            if (task) {
                task.statut = 'terminee';
            }
            alert('Tâche terminée avec succès !');
        }, function() {
            alert('Erreur lors de la finalisation de la tâche.');
        });
    };

    $scope.viewTask = function(taskId) {
        // Logique de visualisation des détails
        console.log('Visualisation de la tâche:', taskId);
        alert('Ouverture des détails de la tâche...');
    };
}]); 