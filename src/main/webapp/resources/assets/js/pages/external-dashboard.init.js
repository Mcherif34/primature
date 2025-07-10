// External Dashboard Controller
app.controller('ExternalDashboardController', ['$scope', '$http', function($scope, $http) {
    $scope.dashboard = {
        tasksCount: 0,
        documentsCount: 0,
        notificationsCount: 0,
        recentRequests: [],
        recentNotifications: []
    };

    // Charger les statistiques et données du dashboard
    $http.get('/primature/api/external/dashboard').then(function(response) {
        $scope.dashboard = response.data;
    }, function() {
        // Données mock si l'API échoue
        $scope.dashboard = {
            tasksCount: 2,
            documentsCount: 5,
            notificationsCount: 1,
            recentRequests: [
                { type: 'Demande d\'accès', date: new Date(), status: 'En attente' }
            ],
            recentNotifications: [
                { message: 'Votre demande a été reçue.', date: new Date() }
            ]
        };
    });
}]);

window.initDashboardChart = function(data, labels) {
  var ctx = document.getElementById('dashboardChart');
  if (!ctx) return;
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Progression',
        data: data,
        borderColor: '#B6F5B6',
        backgroundColor: 'rgba(182,245,182,0.1)',
        pointBackgroundColor: '#B6F5B6',
        pointBorderColor: '#fff',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}; 