app.controller('externalRegistrationController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.externalRegistrationTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.externalRegistrationRequiredError = false;
	$scope.externalRegistrationTechnicalError = false;
	$scope.externalRegistrationSuccess = false;
	
	$scope.baseUrl = "/administration/external-registrations/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode = "read";
		$scope.addExternalRegistrationForm = false;
		$scope.editExternalRegistrationForm = false;
		CRUDService.init($scope);
		$scope.getExternalRegistrations();
	};
	
	$scope.getExternalRegistrations = function() {
		$http.get(context + $scope.baseUrl + "getAll").success(function(data, status) {
			$scope.externalRegistrations = data;
			console.log(data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.getStatistics = function() {
		$http.get(context + $scope.baseUrl + "statistics").success(function(data, status) {
			$scope.statistics = data;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.load = function(id) {
		$http.get(context + $scope.baseUrl + "get/" + id).success(function(data, status) {   
			$scope.dto = data;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.approveRegistration = function(id) {
		$ngBootbox.confirm("Êtes-vous sûr de vouloir approuver cette demande d'inscription ?")
			.then(function() {
				$http.post(context + $scope.baseUrl + "approve/" + id, {}).success(function(data, status) {
					$scope.externalRegistrationSuccess = true;
					$scope.externalRegistrationTechnicalError = false;
					$scope.externalRegistrationRequiredError = false;
					$scope.refreshList();
					$scope.getStatistics();
					$('#successSave').modal("show");
				}).error(function(data, status, headers, config) {
					$scope.externalRegistrationTechnicalError = true;
					NotificationService.showTechnicalError();
				});
			});
	};
	
	$scope.rejectRegistration = function(id) {
		$ngBootbox.prompt("Veuillez indiquer la raison du rejet :")
			.then(function(reason) {
				if (reason) {
					$http.post(context + $scope.baseUrl + "reject/" + id, { reason: reason }).success(function(data, status) {
						$scope.externalRegistrationSuccess = true;
						$scope.externalRegistrationTechnicalError = false;
						$scope.externalRegistrationRequiredError = false;
						$scope.refreshList();
						$scope.getStatistics();
						$('#successSave').modal("show");
					}).error(function(data, status, headers, config) {
						$scope.externalRegistrationTechnicalError = true;
						NotificationService.showTechnicalError();
					});
				}
			});
	};
	
	$scope.refreshList = function() {
		$scope.externalRegistrationTable.ajax.reload();
		$scope.dto = {};
	};
	
	$scope.viewDetails = function(id) {
		$scope.load(id);
		$('#detailsModal').modal("show");
	};
});

app.controller('externalRegistrationTableController', function($scope, $http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'prenom'},
			{mDataProp: 'nom'},
			{mDataProp: 'email'},
			{mDataProp: 'institution'},
			{mDataProp: 'statut', "mRender": function(data, type, full) {
				switch(data) {
					case 'EN_ATTENTE': return '<span class="badge bg-warning">En attente</span>';
					case 'ACCEPTEE': return '<span class="badge bg-success">Acceptée</span>';
					case 'REJETEE': return '<span class="badge bg-danger">Rejetée</span>';
					default: return data;
				}
			}},
			{mDataProp: 'dateDemande', "mRender": function(data, type, full) {
				return moment(data).format('DD/MM/YYYY HH:mm');
			}},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				var buttons = '<a href="#" onclick="angular.element(this).scope().viewDetails(' + full.id + ');" class="btn btn-fw blue" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-eye"></i></a> ';
				
				if (full.statut === 'EN_ATTENTE') {
					buttons += '<a href="#" onclick="angular.element(this).scope().approveRegistration(' + full.id + ');" class="btn btn-fw green" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-check"></i></a> ';
					buttons += '<a href="#" onclick="angular.element(this).scope().rejectRegistration(' + full.id + ');" class="btn btn-fw red" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-times"></i></a>';
				}
				
				return buttons;
			}}
		];
		$scope.$parent.externalRegistrationTable = TableManager.init("externalRegistrationTable", $scope.$parent.baseUrl + "list", columns);
		
		$scope.$parent.externalRegistrationTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.externalRegistrationTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
}); 