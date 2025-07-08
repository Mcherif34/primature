app.controller('moralityTypeController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.moralityTypeTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.moralityTypeRequiredError = false;
	$scope.moralityTypeTechnicalError = false;
	$scope.moralityTypeSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/moralityType/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addMoralityTypeForm = false;
		$scope.editMoralityTypeForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addMoralityType = function() {
		CRUDService.add($scope);
		$scope.editMoralityTypeForm = false;
		$scope.addMoralityTypeForm = true;
		$scope.moralityTypeSuccess = false;
		$scope.moralityTypeTechnicalError = false;
		$scope.moralityTypeRequiredError = false;
		$('#moralityTypeModal').modal("show");
	};
	
	editMoralityType = function() {
		CRUDService.edit($scope);
		$scope.addMoralityTypeForm = false;
		$scope.editMoralityTypeForm = true;
		$scope.moralityTypeSuccess = false;
		$scope.moralityTypeTechnicalError = false;
		$scope.moralityTypeRequiredError = false;
		$('#moralityTypeModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveMoralityType = function() {
		if($scope.moralityTypeForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.moralityTypeTechnicalError = false;
				$scope.moralityTypeRequiredError = false;
				$scope.moralityTypeSuccess = true;
				$('#moralityTypeModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.moralityTypeTechnicalError = true;
			});
		} else {
			$scope.moralityTypeRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.moralityTypeTable.ajax.reload();
		$scope.dto = {};
	};

	removeMoralityType = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteMoralityType(id);
		};
	};

	$scope.confirmDeleteMoralityType = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('moralityTypeTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editMoralityType();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeMoralityType('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.moralityTypeTable = TableManager.init("moralityTypeTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.moralityTypeTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.moralityTypeTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});