app.controller('invoiceTypeController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.invoiceTypeTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.invoiceTypeRequiredError = false;
	$scope.invoiceTypeTechnicalError = false;
	$scope.invoiceTypeSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/invoiceType/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addInvoiceTypeForm = false;
		$scope.editInvoiceTypeForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addInvoiceType = function() {
		CRUDService.add($scope);
		$scope.editInvoiceTypeForm = false;
		$scope.addInvoiceTypeForm = true;
		$scope.invoiceTypeSuccess = false;
		$scope.invoiceTypeTechnicalError = false;
		$scope.invoiceTypeRequiredError = false;
		$('#invoiceTypeModal').modal("show");
	};
	
	editInvoiceType = function() {
		CRUDService.edit($scope);
		$scope.addInvoiceTypeForm = false;
		$scope.editInvoiceTypeForm = true;
		$scope.invoiceTypeSuccess = false;
		$scope.invoiceTypeTechnicalError = false;
		$scope.invoiceTypeRequiredError = false;
		$('#invoiceTypeModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveInvoiceType = function() {
		if($scope.invoiceTypeForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.invoiceTypeTechnicalError = false;
				$scope.invoiceTypeRequiredError = false;
				$scope.invoiceTypeSuccess = true;
				$('#invoiceTypeModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.invoiceTypeTechnicalError = true;
			});
		} else {
			$scope.invoiceTypeRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.invoiceTypeTable.ajax.reload();
		$scope.dto = {};
	};

	removeInvoiceType = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteInvoiceType(id);
		};
	};

	$scope.confirmDeleteInvoiceType = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('invoiceTypeTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editInvoiceType();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeInvoiceType('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.invoiceTypeTable = TableManager.init("invoiceTypeTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.invoiceTypeTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.invoiceTypeTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});