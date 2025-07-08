app.controller('currencyController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.currencyTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.currencyRequiredError = false;
	$scope.currencyTechnicalError = false;
	$scope.currencySuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/currency/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addCurrencyForm = false;
		$scope.editCurrencyForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addCurrency = function() {
		CRUDService.add($scope);
		$scope.editCurrencyForm = false;
		$scope.addCurrencyForm = true;
		$scope.currencySuccess = false;
		$scope.currencyTechnicalError = false;
		$scope.currencyRequiredError = false;
		$('#currencyModal').modal("show");
	};
	
	editCurrency = function() {
		CRUDService.edit($scope);
		$scope.addCurrencyForm = false;
		$scope.editCurrencyForm = true;
		$scope.currencySuccess = false;
		$scope.currencyTechnicalError = false;
		$scope.currencyRequiredError = false;
		$('#currencyModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveCurrency = function() {
		if($scope.currencyForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.currencyTechnicalError = false;
				$scope.currencyRequiredError = false;
				$scope.currencySuccess = true;
				$('#currencyModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.currencyTechnicalError = true;
			});
		} else {
			$scope.currencyRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.currencyTable.ajax.reload();
		$scope.dto = {};
	};

	removeCurrency = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteCurrency(id);
		};
	};

	$scope.confirmDeleteCurrency = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('currencyTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'code'},
			{mDataProp: 'symbol'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editCurrency();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeCurrency('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.currencyTable = TableManager.init("currencyTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.currencyTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.currencyTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});