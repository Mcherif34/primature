app.controller('creditStatusController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.creditStatusTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.creditStatusRequiredError = false;
	$scope.creditStatusTechnicalError = false;
	$scope.creditStatusSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/creditStatus/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addCreditStatusForm = false;
		$scope.editCreditStatusForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addCreditStatus = function() {
		CRUDService.add($scope);
		$scope.editCreditStatusForm = false;
		$scope.addCreditStatusForm = true;
		$scope.creditStatusSuccess = false;
		$scope.creditStatusTechnicalError = false;
		$scope.creditStatusRequiredError = false;
		$('#creditStatusModal').modal("show");
	};
	
	editCreditStatus = function() {
		CRUDService.edit($scope);
		$scope.addCreditStatusForm = false;
		$scope.editCreditStatusForm = true;
		$scope.creditStatusSuccess = false;
		$scope.creditStatusTechnicalError = false;
		$scope.creditStatusRequiredError = false;
		$('#creditStatusModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveCreditStatus = function() {
		if($scope.creditStatusForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.creditStatusTechnicalError = false;
				$scope.creditStatusRequiredError = false;
				$scope.creditStatusSuccess = true;
				$('#creditStatusModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.creditStatusTechnicalError = true;
			});
		} else {
			$scope.creditStatusRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.creditStatusTable.ajax.reload();
		$scope.dto = {};
	};

	removeCreditStatus = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteCreditStatus(id);
		};
	};

	$scope.confirmDeleteCreditStatus = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('creditStatusTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editCreditStatus();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeCreditStatus('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.creditStatusTable = TableManager.init("creditStatusTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.creditStatusTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.creditStatusTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});