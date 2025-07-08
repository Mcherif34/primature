app.controller('deadlineController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.deadlineTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.deadlineRequiredError = false;
	$scope.deadlineTechnicalError = false;
	$scope.deadlineSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/deadline/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addDeadlineForm = false;
		$scope.editDeadlineForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addDeadline = function() {
		CRUDService.add($scope);
		$scope.editDeadlineForm = false;
		$scope.addDeadlineForm = true;
		$scope.deadlineSuccess = false;
		$scope.deadlineTechnicalError = false;
		$scope.deadlineRequiredError = false;
		$('#deadlineModal').modal("show");
	};
	
	editDeadline = function() {
		CRUDService.edit($scope);
		$scope.addDeadlineForm = false;
		$scope.editDeadlineForm = true;
		$scope.deadlineSuccess = false;
		$scope.deadlineTechnicalError = false;
		$scope.deadlineRequiredError = false;
		$('#deadlineModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveDeadline = function() {
		if($scope.deadlineForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.deadlineTechnicalError = false;
				$scope.deadlineRequiredError = false;
				$scope.deadlineSuccess = true;
				$('#deadlineModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.deadlineTechnicalError = true;
			});
		} else {
			$scope.deadlineRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.deadlineTable.ajax.reload();
		$scope.dto = {};
	};

	removeDeadline = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteDeadline(id);
		};
	};

	$scope.confirmDeleteDeadline = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('deadlineTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'code'},
			{mDataProp: 'designation'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editDeadline();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeDeadline('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.deadlineTable = TableManager.init("deadlineTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.deadlineTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.deadlineTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});