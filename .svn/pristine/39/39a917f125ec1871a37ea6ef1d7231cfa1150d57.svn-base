app.controller('regionController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.countryTable = null;
	$scope.cityTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.countryRequiredError = false;
	$scope.countryTechnicalError = false;
	$scope.countrySuccess = false;
	$scope.cityRequiredError = false;
	$scope.cityTechnicalError = false;
	$scope.citySuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/region/country/rest/";
	$scope.cityBaseUrl = "/administration/referentiel/region/city/rest/";
	$scope.countryBaseUrl = "/administration/referentiel/region/country/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addCountryForm = false;
		$scope.editCountryForm = false;
		$scope.initListCountries();
		CRUDService.init($scope);
	};
	
	$scope.initListCountries = function() {
		$http.get(context+$scope.countryBaseUrl+"getAll").success(function(data, status){
			$scope.countries = data;
		});
	}
	
	$scope.addCountry = function() {
		CRUDService.add($scope);
		$scope.editCountryForm = false;
		$scope.addCountryForm = true;
		$('#countryModal').modal("show");
	};
	
	$scope.addCity = function() {
		$scope.dto.city = {};
		$scope.editCityForm = false;
		$scope.addCityForm = true;
		$('#cityModal').modal("show");
	};

	editCountry = function() {
		CRUDService.edit($scope);
		$scope.addCountryForm = false;
		$scope.editCountryForm = true;
		$('#countryModal').modal("show");
	};
	
	editCity = function(id) {
		$http.get(context+$scope.cityBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.city = data;
			$scope.dto.city = $scope.city;
			CRUDService.edit($scope);
			$scope.addCityForm = false;
			$scope.editCityForm = true;
			$('#cityModal').modal("show");
		});
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveCountry = function() {
		if($scope.countryForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.countryTechnicalError = false;
				$scope.countryRequiredError = false;
				$scope.countrySuccess = true;
				$('#countryModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.countryTechnicalError = true;
			});
		} else {
			$scope.countryRequiredError = true;
		}
	};
	
	$scope.saveCity = function() {
		if($scope.cityForm.$valid) {
			$scope.dto.city.countryId = $scope.dto.id;
			$http.post( context+$scope.cityBaseUrl+"save", angular.toJson($scope.dto.city)).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.countryTechnicalError = false;
				$scope.countryRequiredError = false;
				$scope.countrySuccess = true;
				$('#cityModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.countryTechnicalError = true;
			});
		} else {
			$scope.countryRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.countryTable.ajax.reload();
		$scope.dto = {};
	};

	removeCountry = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteCountry(id);
		};
	};

	$scope.confirmDeleteCountry = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeCity = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteCity(id);
		};
	};

	$scope.confirmDeleteCity = function(id) {
		$http.post( context+$scope.cityBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('countryTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.cityTable.ajax.url('/administration/referentiel/region/city/rest/list/'+newValue).load();
		}
		else {
			$scope.$parent.cityTable.ajax.url('/administration/referentiel/region/city/rest/list/-1').load();
		}
	});
	
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'iso'},
			{mDataProp: 'name'},
			{mDataProp: 'phonecode'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editCountry();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeCountry('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.countryTable = TableManager.init("countryTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.countryTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.countryTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('cityTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'code'},
			{mDataProp: 'name'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editCity('+full.id+');" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeCity('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.cityTable = TableManager.init("cityTable", $scope.$parent.cityBaseUrl+"list/-1", columns);
	};
});


