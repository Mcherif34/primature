app.controller('insuranceController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.insuranceTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.insuranceRequiredError = false;
	$scope.insuranceTechnicalError = false;
	$scope.insuranceSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/insurance/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addInsuranceForm = false;
		$scope.editInsuranceForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addInsurance = function() {
		CRUDService.add($scope);
		$scope.editInsuranceForm = false;
		$scope.addInsuranceForm = true;
		$scope.insuranceSuccess = false;
		$scope.insuranceTechnicalError = false;
		$scope.insuranceRequiredError = false;
		$('#insuranceModal').modal("show");
	};
	
	editInsurance = function() {
		CRUDService.edit($scope);
		$scope.addInsuranceForm = false;
		$scope.editInsuranceForm = true;
		$scope.insuranceSuccess = false;
		$scope.insuranceTechnicalError = false;
		$scope.insuranceRequiredError = false;
		$('#insuranceModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveInsurance = function() {
		if($scope.insuranceForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.insuranceTechnicalError = false;
				$scope.insuranceRequiredError = false;
				$scope.insuranceSuccess = true;
				$('#insuranceModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.insuranceTechnicalError = true;
			});
		} else {
			$scope.insuranceRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.insuranceTable.ajax.reload();
		$scope.dto = {};
	};

	removeInsurance = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteInsurance(id);
		};
	};

	$scope.confirmDeleteInsurance = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('insuranceTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="contactList()" class="edit-item-btn"><i style="font-size: 17px" class="ri-group-2-fill align-bottom me-2 text-success"></i></a> <a href="#" onclick="editInsurance('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a> <a href="#" data-bs-toggle="modal" data-bs-target="#deleteInsuranceModal" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.insuranceTable = TableManager.init("insuranceTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.insuranceTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.insuranceTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});