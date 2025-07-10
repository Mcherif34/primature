app.controller('externalDashboardController', function($scope, $http, NotificationService) {
  $scope.dashboard = {
    tasks: [],
    documents: [],
    notifications: [],
    stats: {},
    loading: true,
    error: null
  };

  $scope.init = function() {
    $scope.dashboard.loading = true;
    $scope.dashboard.error = null;
    $scope.loadStats();
    $scope.loadTasks();
    $scope.loadDocuments();
    $scope.loadNotifications();
  };

  $scope.loadStats = function() {
    $http.get('/api/external/dashboard/stats').then(function(response) {
      $scope.dashboard.stats = response.data;
    }, function() {
      $scope.dashboard.error = "Erreur lors du chargement des statistiques.";
      NotificationService && NotificationService.showTechnicalError && NotificationService.showTechnicalError();
    });
  };

  $scope.loadTasks = function() {
    $http.get('/api/external/dashboard/tasks').then(function(response) {
      $scope.dashboard.tasks = response.data;
    }, function() {
      $scope.dashboard.error = "Erreur lors du chargement des tâches.";
      NotificationService && NotificationService.showTechnicalError && NotificationService.showTechnicalError();
    });
  };

  $scope.loadDocuments = function() {
    $http.get('/api/external/dashboard/documents').then(function(response) {
      $scope.dashboard.documents = response.data;
    }, function() {
      $scope.dashboard.error = "Erreur lors du chargement des documents.";
      NotificationService && NotificationService.showTechnicalError && NotificationService.showTechnicalError();
    });
  };

  $scope.loadNotifications = function() {
    $http.get('/api/external/dashboard/notifications').then(function(response) {
      $scope.dashboard.notifications = response.data;
      $scope.dashboard.loading = false;
    }, function() {
      $scope.dashboard.error = "Erreur lors du chargement des notifications.";
      $scope.dashboard.loading = false;
      NotificationService && NotificationService.showTechnicalError && NotificationService.showTechnicalError();
    });
  };

  // Actions utilisateur
  $scope.viewTask = function(taskId) {
    // Ouvrir un modal ou naviguer vers la tâche
  };

  $scope.viewDocument = function(docId) {
    // Ouvrir un modal ou naviguer vers le document
  };

  $scope.viewNotification = function(notifId) {
    // Marquer comme lu, afficher le détail, etc.
  };

  // Initialisation automatique
  $scope.init();
}); 