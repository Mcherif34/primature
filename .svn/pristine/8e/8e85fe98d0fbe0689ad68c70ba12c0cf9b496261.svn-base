app.controller('typeController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.typeTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.typeRequiredError = false;
	$scope.typeTechnicalError = false;
	$scope.typeSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/type/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addTypeForm = false;
		$scope.editTypeForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addType = function() {
		CRUDService.add($scope);
		$scope.editTypeForm = false;
		$scope.addTypeForm = true;
		$scope.typeSuccess = false;
		$scope.typeTechnicalError = false;
		$scope.typeRequiredError = false;
		$('#typeModal').modal("show");
	};
	
	editType = function() {
		CRUDService.edit($scope);
		$scope.addTypeForm = false;
		$scope.editTypeForm = true;
		$scope.typeSuccess = false;
		$scope.typeTechnicalError = false;
		$scope.typeRequiredError = false;
		$('#typeModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveType = function() {
		if($scope.typeForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.typeTechnicalError = false;
				$scope.typeRequiredError = false;
				$scope.typeSuccess = true;
				$('#typeModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.typeTechnicalError = true;
			});
		} else {
			$scope.typeRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.typeTable.ajax.reload();
		$scope.dto = {};
	};

	removeType = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteType(id);
		};
	};

	$scope.confirmDeleteType = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('typeTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editType();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeType('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.typeTable = TableManager.init("typeTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.typeTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.typeTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});