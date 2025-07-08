app.controller('statusController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.statusTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.statusRequiredError = false;
	$scope.statusTechnicalError = false;
	$scope.statusSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/status/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addStatusForm = false;
		$scope.editStatusForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addStatus = function() {
		CRUDService.add($scope);
		$scope.editStatusForm = false;
		$scope.addStatusForm = true;
		$scope.statusSuccess = false;
		$scope.statusTechnicalError = false;
		$scope.statusRequiredError = false;
		$('#statusModal').modal("show");
	};
	
	editStatus = function() {
		CRUDService.edit($scope);
		$scope.addStatusForm = false;
		$scope.editStatusForm = true;
		$scope.statusSuccess = false;
		$scope.statusTechnicalError = false;
		$scope.statusRequiredError = false;
		$('#statusModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveStatus = function() {
		if($scope.statusForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.statusTechnicalError = false;
				$scope.statusRequiredError = false;
				$scope.statusSuccess = true;
				$('#statusModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.statusTechnicalError = true;
			});
		} else {
			$scope.statusRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.statusTable.ajax.reload();
		$scope.dto = {};
	};

	removeStatus = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteStatus(id);
		};
	};

	$scope.confirmDeleteStatus = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('statusTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editStatus();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeStatus('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.statusTable = TableManager.init("statusTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.statusTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.statusTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});