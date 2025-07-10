var app = angular.module('ExternalApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/external/dashboard', {
            templateUrl: '/primature/WEB-INF/views/external/dashboard.html',
            controller: 'ExternalDashboardController'
        })
        .when('/external/documents', {
            templateUrl: '/primature/WEB-INF/views/external/documents.html',
            controller: 'ExternalDocumentsController'
        })
        .when('/external/tasks', {
            templateUrl: '/primature/WEB-INF/views/external/tasks.html',
            controller: 'ExternalTasksController'
        })
        .when('/external/profile', {
            templateUrl: '/primature/WEB-INF/views/external/profile.html',
            controller: 'ExternalProfileController'
        })
        .when('/external/change-password', {
            templateUrl: '/primature/WEB-INF/views/external/change-password.html',
            controller: 'ExternalChangePasswordController'
        })
        .when('/external/help', {
            templateUrl: '/primature/WEB-INF/views/external/help.html',
            controller: 'ExternalHelpController'
        })
        .otherwise({
            redirectTo: '/external/dashboard'
        });
}]);

app.controller('ExternalLayoutController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.pageTitle = '';
    $scope.user = {};

    $scope.isActive = function(path) {
        return $location.path() === path;
    };

    // Charger les infos utilisateur externe (API REST ou mock)
    $http.get('/primature/api/external/user-info').then(function(response) {
        $scope.user = response.data;
    }, function() {
        $scope.user = { nom: 'Utilisateur', prenom: 'Externe' };
    });

    $scope.$on('$routeChangeSuccess', function(event, current) {
        if (current && current.$$route && current.$$route.originalPath) {
            switch(current.$$route.originalPath) {
                case '/external/dashboard':
                    $scope.pageTitle = 'Tableau de bord'; break;
                case '/external/documents':
                    $scope.pageTitle = 'Documents'; break;
                case '/external/tasks':
                    $scope.pageTitle = 'Tâches'; break;
                case '/external/profile':
                    $scope.pageTitle = 'Profil'; break;
                case '/external/change-password':
                    $scope.pageTitle = 'Mot de passe'; break;
                case '/external/help':
                    $scope.pageTitle = 'Aide & Support'; break;
                default:
                    $scope.pageTitle = 'Espace Externe';
            }
        }
    });
}]); 