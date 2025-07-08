app.controller('commercialCourtController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.commercialCourtTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.commercialCourtRequiredError = false;
	$scope.commercialCourtTechnicalError = false;
	$scope.commercialCourtSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/commercialCourt/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addCommercialCourtForm = false;
		$scope.editCommercialCourtForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addCommercialCourt = function() {
		CRUDService.add($scope);
		$scope.editCommercialCourtForm = false;
		$scope.addCommercialCourtForm = true;
		$scope.commercialCourtSuccess = false;
		$scope.commercialCourtTechnicalError = false;
		$scope.commercialCourtRequiredError = false;
		$('#commercialCourtModal').modal("show");
	};
	
	editCommercialCourt = function() {
		CRUDService.edit($scope);
		$scope.addCommercialCourtForm = false;
		$scope.editCommercialCourtForm = true;
		$scope.commercialCourtSuccess = false;
		$scope.commercialCourtTechnicalError = false;
		$scope.commercialCourtRequiredError = false;
		$('#commercialCourtModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveCommercialCourt = function() {
		if($scope.commercialCourtForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.commercialCourtTechnicalError = false;
				$scope.commercialCourtRequiredError = false;
				$scope.commercialCourtSuccess = true;
				$('#commercialCourtModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.commercialCourtTechnicalError = true;
			});
		} else {
			$scope.commercialCourtRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.commercialCourtTable.ajax.reload();
		$scope.dto = {};
	};

	removeCommercialCourt = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteCommercialCourt(id);
		};
	};

	$scope.confirmDeleteCommercialCourt = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('commercialCourtTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editCommercialCourt();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeCommercialCourt('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.commercialCourtTable = TableManager.init("commercialCourtTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.commercialCourtTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.commercialCourtTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});