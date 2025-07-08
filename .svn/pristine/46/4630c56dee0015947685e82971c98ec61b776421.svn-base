app.controller('contenceStepController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.contenceStepTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.contenceStepRequiredError = false;
	$scope.contenceStepTechnicalError = false;
	$scope.contenceStepSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/contenceStep/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addContenceStepForm = false;
		$scope.editContenceStepForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addContenceStep = function() {
		CRUDService.add($scope);
		$scope.editContenceStepForm = false;
		$scope.addContenceStepForm = true;
		$scope.contenceStepSuccess = false;
		$scope.contenceStepTechnicalError = false;
		$scope.contenceStepRequiredError = false;
		$('#contenceStepModal').modal("show");
	};
	
	editContenceStep = function() {
		CRUDService.edit($scope);
		$scope.addContenceStepForm = false;
		$scope.editContenceStepForm = true;
		$scope.contenceStepSuccess = false;
		$scope.contenceStepTechnicalError = false;
		$scope.contenceStepRequiredError = false;
		$('#contenceStepModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveContenceStep = function() {
		if($scope.contenceStepForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.contenceStepTechnicalError = false;
				$scope.contenceStepRequiredError = false;
				$scope.contenceStepSuccess = true;
				$('#contenceStepModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.contenceStepTechnicalError = true;
			});
		} else {
			$scope.contenceStepRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.contenceStepTable.ajax.reload();
		$scope.dto = {};
	};

	removeContenceStep = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteContenceStep(id);
		};
	};

	$scope.confirmDeleteContenceStep = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('contenceStepTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editContenceStep();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeContenceStep('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.contenceStepTable = TableManager.init("contenceStepTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.contenceStepTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.contenceStepTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});