app.controller('legalFormController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.legalFormTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.legalFormRequiredError = false;
	$scope.legalFormTechnicalError = false;
	$scope.legalFormSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/legalForm/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addLegalFormForm = false;
		$scope.editLegalFormForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addLegalForm = function() {
		CRUDService.add($scope);
		$scope.editLegalFormForm = false;
		$scope.addLegalFormForm = true;
		$scope.legalFormSuccess = false;
		$scope.legalFormTechnicalError = false;
		$scope.legalFormRequiredError = false;
		$('#legalFormModal').modal("show");
	};
	
	editLegalForm = function() {
		CRUDService.edit($scope);
		$scope.addLegalFormForm = false;
		$scope.editLegalFormForm = true;
		$scope.legalFormSuccess = false;
		$scope.legalFormTechnicalError = false;
		$scope.legalFormRequiredError = false;
		$('#legalFormModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveLegalForm = function() {
		if($scope.legalFormForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.legalFormTechnicalError = false;
				$scope.legalFormRequiredError = false;
				$scope.legalFormSuccess = true;
				$('#legalFormModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.legalFormTechnicalError = true;
			});
		} else {
			$scope.legalFormRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.legalFormTable.ajax.reload();
		$scope.dto = {};
	};

	removeLegalForm = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteLegalForm(id);
		};
	};

	$scope.confirmDeleteLegalForm = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('legalFormTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editLegalForm();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeLegalForm('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.legalFormTable = TableManager.init("legalFormTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.legalFormTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.legalFormTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});