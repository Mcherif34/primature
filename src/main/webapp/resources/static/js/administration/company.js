app.controller('companyController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.companyTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.companyRequiredError = false;
	$scope.companyTechnicalError = false;
	$scope.companySuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/company/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addCompanyForm = false;
		$scope.editCompanyForm = false;
		CRUDService.init($scope);
		$scope.getCompany();
		$scope.initListUsers();
		$scope.initListCountries();
		$scope.initListCurrencies();
		$scope.initListTypes();
	};
	
	$scope.getCompany = function() {
		$http.get(context+$scope.baseUrl+"getAll").success(function(data, status) {
			$scope.dto = data[0];
			console.log(data);
		});
	};
	
	$scope.initListUsers = function() {
		$http.get(context+"/administration/user/rest/getAll").success(function(data, status) {   
			$scope.users = data;
		});
	};
	
	$scope.initListCountries = function() {
		$http.get(context+"/administration/referentiel/country/rest/getAll").success(function(data, status) { 
			$scope.countries = data;
		});
	};
	
	$scope.initListCurrencies = function() {
		$http.get(context+"/administration/referentiel/currency/rest/getAll").success(function(data, status) {   
			$scope.currencies = data;
		});
	};
	
	$scope.initListTypes = function() {
		$http.get(context+"/administration/referentiel/type/rest/getAll").success(function(data, status) {   
			$scope.types = data;
		});
	};
	
	$scope.addCompany = function() {
		CRUDService.add($scope);
		$scope.editCompanyForm = false;
		$scope.addCompanyForm = true;
		$scope.companySuccess = false;
		$scope.companyTechnicalError = false;
		$scope.companyRequiredError = false;
		$('#companyModal').modal("show");
	};
	
	editCompany = function() {
		CRUDService.edit($scope);
		$scope.addCompanyForm = false;
		$scope.editCompanyForm = true;
		$scope.companySuccess = false;
		$scope.companyTechnicalError = false;
		$scope.companyRequiredError = false;
		$('#companyModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveCompany = function() {
		if($scope.companyForm.$valid) {
			
			if($scope.dto.tax == "true") {
				$scope.dto.tax = true;
			} 
			if($scope.dto.tax == "false") {
				$scope.dto.tax = false;
			}
			$http.post(context+$scope.baseUrl+"save", $scope.dto).success(function(data, status) {
				CRUDService.setEntityLoaded($scope,data);
				$scope.companyTechnicalError = false;
				$scope.companyRequiredError = false;
				$scope.companySuccess = true;
				$('#successSave').modal("show")
			}).error(function(data, status, headers, config) {
				$scope.companyTechnicalError = true;
			});
			
		} else {
			$scope.companyRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.companyTable.ajax.reload();
		$scope.dto = {};
	};

	removeCompany = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteCompany(id);
		};
	};

	$scope.confirmDeleteCompany = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('companyTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'code'},
			{mDataProp: 'symbol'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editCompany();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeCompany('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.companyTable = TableManager.init("companyTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.companyTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.companyTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});