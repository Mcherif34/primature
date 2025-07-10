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