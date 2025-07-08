app.controller('paymentMethodController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.paymentMethodTable = null;
	$scope.companyTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.paymentMethodRequiredError = false;
	$scope.paymentMethodTechnicalError = false;
	$scope.paymentMethodSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/paymentMethod/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addPaymentMethodForm = false;
		$scope.editPaymentMethodForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addPaymentMethod = function() {
		CRUDService.add($scope);
		$scope.editPaymentMethodForm = false;
		$scope.addPaymentMethodForm = true;
		$('#paymentMethodModal').modal("show");
	};

	editPaymentMethod = function() {
		CRUDService.edit($scope);
		$scope.addPaymentMethodForm = false;
		$scope.editPaymentMethodForm = true;
		$scope.paymentMethodSuccess = false;
		$scope.paymentMethodTechnicalError = false;
		$scope.paymentMethodRequiredError = false;
		$('#paymentMethodModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) { 
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.savePaymentMethod = function() {
		if($scope.paymentMethodForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.paymentMethodTechnicalError = false;
				$scope.paymentMethodRequiredError = false;
				$scope.paymentMethodSuccess = true;
				$('#paymentMethodModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.paymentMethodTechnicalError = true;
			});
		} else {
			$scope.paymentMethodRequiredError = true;
		}
	};
	
	
	$scope.refreshList = function() {
		$scope.paymentMethodTable.ajax.reload();
		$scope.dto = {};
	};

	removePaymentMethod = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeletePaymentMethod(id);
		};
	};

	$scope.confirmDeletePaymentMethod = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	

});

app.controller('paymentMethodTableController', function($scope,$http) {	
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'code'},
			{mDataProp: 'enabled', "mRender" : function(data, type, full){
				result = data === true ? '<span class="px-3 rounded primary">Oui</span>' : '<span class="px-3 rounded danger">Non</span>'; 
				return result;
			}},
			{mDataProp: 'deadline'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editPaymentMethod();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removePaymentMethod('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.paymentMethodTable = TableManager.init("paymentMethodTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.paymentMethodTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.paymentMethodTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
		
	};
});



