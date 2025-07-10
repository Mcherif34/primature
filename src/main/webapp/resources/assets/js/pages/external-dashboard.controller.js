angular.module('primature').controller('externalDashboardController', ['$scope', function($scope) {
  $scope.dashboard = {
    today: new Date(),
    tasks: [
      {
        time: '9am - 10am',
        title: 'Weekly Team Meeting',
        avatars: ['/resources/images/users/avatar-1.jpg', '/resources/images/users/avatar-2.jpg', '/resources/images/users/avatar-3.jpg'],
        more: 8
      },
      {
        time: '9am - 10am',
        title: 'Creative Session',
        with: 'Angela Williams',
        avatars: ['/resources/images/users/avatar-4.jpg'],
        more: null
      },
      {
        time: '9am - 10am',
        title: 'UX Research Call',
        avatars: ['/resources/images/users/avatar-5.jpg', '/resources/images/users/avatar-6.jpg'],
        more: null
      }
    ],
    roadmap: [
      { title: 'Onboarding', color: '#B6F5B6', done: true },
      { title: 'Newsletter Distribution', color: '#E0E0E0', done: false },
      { title: 'UX Research', color: '#C6C6F5', done: false }
    ],
    chartData: [20, 30, 40, 60, 50, 70, 40],
    chartLabels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%']
  };
  $scope.scheduleEvent = function() {
    alert('Schedule event clicked!');
  };
  $scope.editTasks = function() {
    alert('Edit tasks clicked!');
  };
  $scope.init = function() {
    setTimeout(function() {
      if (window.initDashboardChart) window.initDashboardChart($scope.dashboard.chartData, $scope.dashboard.chartLabels);
    }, 100);
  };
}]); 