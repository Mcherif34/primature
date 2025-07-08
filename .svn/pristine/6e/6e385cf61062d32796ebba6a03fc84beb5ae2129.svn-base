app.controller('moduleController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.moduleTable = null;
	$scope.screenTable = null;
	$scope.authorityTable = null;
	$scope.selected = null;
	$scope.screenSelected = null;
	$scope.mode = null;
	$scope.moduleRequiredError = false;
	$scope.moduleTechnicalError = false;
	$scope.moduleSuccess = false;
	$scope.screenRequiredError = false;
	$scope.screenTechnicalError = false;
	$scope.screenSuccess = false;
	$scope.authorityRequiredError = false;
	$scope.authorityTechnicalError = false;
	$scope.authoritySuccess = false;
	$scope.modules = [];
	
	$scope.baseUrl = "/administration/referentiel/module/rest/";
	$scope.screenBaseUrl = "/administration/screen/rest/";
	$scope.authorityBaseUrl = "/administration/authority/rest/";
	$scope.zoneRecheche = false;
	
	$scope.init = function() {
		$scope.mode="read";
		$scope.editModuleForm = false;
		CRUDService.init($scope);
		$scope.getListModules();
	};
	
	$scope.getListModules = function() {
		$http.get(context+$scope.baseUrl+"getAll").success(function(data, status) {
			$scope.modules = data;
		});
	}
	
	$scope.addModule = function() {
		CRUDService.add($scope);
		$scope.editModuleForm = false;
		$scope.addModuleForm = true;
		$scope.moduleSuccess = false;
		$scope.moduleTechnicalError = false;
		$scope.moduleRequiredError = false;
		$('#moduleModal').modal("show");
	};
	
	$scope.addScreen = function() {
		$scope.dto.screen = {};
		$scope.editScreenForm = false;
		$scope.addScreenForm = true;
		$scope.screenSuccess = false;
		$scope.screenTechnicalError = false;
		$scope.screenRequiredError = false;
		$('#screenModal').modal("show");
	};
	
	$scope.addAuthority = function() {
		$scope.dto.authority = {};
		$scope.editAuthorityForm = false;
		$scope.addAuthorityForm = true;
		$scope.authoritySuccess = false;
		$scope.authorityTechnicalError = false;
		$scope.authorityRequiredError = false;
		$('#authorityModal').modal("show");
	};
	
	$scope.editModule = function($id) {
		$http.get(context+$scope.baseUrl+"load/"+$id).success(function(data, status) { 
			$scope.module = data;
			$scope.dto = $scope.module;
			CRUDService.edit($scope);
			$scope.editModuleForm = true;
			$scope.moduleSuccess = false;
			$scope.moduleTechnicalError = false;
			$scope.moduleRequiredError = false;
			$('#moduleModal').modal("show");
		});
	};
	
	$scope.editContentModule = function($id) {
		$http.get(context+$scope.baseUrl+"load/"+$id).success(function(data, status) { 
			if(data.isEnable == true){
				$('#editContentModule').modal("show");
			} else {
				console.log(data);
				$('#activeModuleModal').modal("show");
			}
/*			$scope.module = data;
			$scope.dto = $scope.module;
			CRUDService.edit($scope);
			$scope.editModuleForm = true;
			$scope.moduleSuccess = false;
			$scope.moduleTechnicalError = false;
			$scope.moduleRequiredError = false;
			$('#moduleModal').modal("show");*/
		});
	}
	
	$scope.activeModule = function($id) {
		$http.get(context+$scope.baseUrl + "load/"+$id).success(function(data, status) {
			$scope.module = data;
			$scope.dto = $scope.module;
			$scope.dto.isEnable = true;
			console.log($scope.dto);
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				$scope.moduleTechnicalError = false;
				$scope.moduleRequiredError = false;
				$scope.moduleSuccess = true;
				$scope.getListModules();
				$('#activeModuleModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.moduleTechnicalError = true;
			});
		});
	}
	
	editScreen = function(id) {
		$http.get(context+$scope.screenBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.screen = data;
			$scope.dto.screen = $scope.screen;
			CRUDService.edit($scope);
			$scope.addScreenForm = false;
			$scope.editScreenForm = true;
			$scope.screenSuccess = false;
			$scope.screenTechnicalError = false;
			$scope.screenRequiredError = false;
			$('#screenModal').modal("show");
		});
	};
	
	editAuthority = function(id) {
		$http.get(context+$scope.authorityBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.authority = data;
			$scope.dto.authority = $scope.authority;
			CRUDService.edit($scope);
			$scope.addAuthorityForm = false;
			$scope.editAuthorityForm = true;
			$scope.authoritySuccess = false;
			$scope.authorityTechnicalError = false;
			$scope.authorityRequiredError = false;
			$('#authorityModal').modal("show");
		});
	};

	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {  
			$('.panel-collapse.in').collapse('hide'); 
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadScreen = function(id) {
		$http.get(context+$scope.screenBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.screen = data;
			$scope.dto.screen = $scope.screen;
		});
	}
	
	$scope.loadAuthority = function(id) {
		$http.get(context+$scope.authorityBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.authority = data;
			$scope.dto.authority = $scope.authority;
		});
	}
		
	$scope.saveModule = function() {	
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.moduleTechnicalError = false;
				$scope.moduleRequiredError = false;
				$scope.moduleSuccess = true;
				$scope.getListModules();
				$('#moduleModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.moduleTechnicalError = true;
			});
	};
	
	$scope.handleModuleStatus = function($id) {
		$http.get(context+$scope.baseUrl+"load/"+$id).success(function(data, status) { 
			$scope.module = data;
			$scope.dto = $scope.module;
			$scope.dto.isEnable = !$scope.dto.isEnable;
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.moduleTechnicalError = false;
				$scope.moduleRequiredError = false;
				$scope.moduleSuccess = true;
				$scope.getListModules();
				$('#moduleModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.moduleTechnicalError = true;
			});
		});
	}
	
	$scope.saveScreen = function() {
		if($scope.screenForm.$valid) {
			$scope.dto.screen.secModuleId = $scope.dto.id;
			$http.post(context+$scope.screenBaseUrl+"save", angular.toJson($scope.dto.screen)).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.screenTechnicalError = false;
				$scope.screenRequiredError = false;
				$scope.screenSuccess = true;
				$('#screenModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.screenTechnicalError = true;
			});
		} else {
			$scope.screenRequiredError = true;
		}
	};
	
	$scope.saveAuthority = function() {
		if($scope.authorityForm.$valid) {
			if(!angular.isUndefined($scope.dto.screen) && $scope.dto.screen != null)
				$scope.dto.authority.secEcranId = $scope.dto.screen.id;
			$http.post(context+$scope.authorityBaseUrl+"save", angular.toJson($scope.dto.authority)).success(function(data, status) {   
				$scope.dto.screen = {};
				$scope.loadScreen($scope.screenSelected.id);
				$scope.authorityTechnicalError = false;
				$scope.authorityRequiredError = false;
				$scope.authoritySuccess = true;
				$('#authorityModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.authorityTechnicalError = true;
			});
		} else {
			$scope.authorityRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.moduleTable.ajax.reload();
		$scope.dto = {};
	};
	
	removeModule = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteModule(id);
		};
	};

	$scope.confirmDeleteModule = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeScreen = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteScreen(id);
		};
	};

	$scope.confirmDeleteScreen = function(id) {
		$http.post(context+$scope.screenBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeAuthority = function(id) {
		$scope.dto.screen = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteAuthority(id);
		};
	};

	$scope.confirmDeleteAuthority = function(id) {
		$http.post(context+$scope.authorityBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.dto.screen = {};
			$scope.load($scope.screenSelected.id);
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
});

app.controller('moduleTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.screenTable.ajax.url($scope.$parent.screenBaseUrl+'listByModule/'+newValue).load();
		}
		else {
			$scope.$parent.screenTable.ajax.url($scope.$parent.screenBaseUrl+'listByModule/-1').load();
		}
	});
	
	$scope.init = function(){
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'module'},
			{mDataProp: 'libelle'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editModule();" class="btn btn-fw orange" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeModule('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.moduleTable = TableManager.init("moduleTable", $scope.$parent.baseUrl +"list", columns);
		
		$scope.$parent.moduleTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.moduleTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('screenTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.screen.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.authorityTable.ajax.url($scope.$parent.authorityBaseUrl+'listByScreen/'+newValue).load();
		}
		else {
			$scope.$parent.authorityTable.ajax.url($scope.$parent.authorityBaseUrl+'listByScreen/-1').load();
		}
	});
	
	$scope.init = function(){
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'ecran'},
			{mDataProp: 'libelle'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editScreen('+full.id+');" class="btn btn-fw orange" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeScreen('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.screenTable = TableManager.init("screenTable", $scope.$parent.screenBaseUrl +"list", columns);
		
		$scope.$parent.screenTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.screenTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.screenSelected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.loadScreen(id);
			}
		});
	};
});

app.controller('authorityTableController', function($scope,$http) {
	$scope.init = function(){
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'code'},
			{mDataProp: 'intitule'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editAuthority('+full.id+');" class="btn btn-fw orange" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeAuthority('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.authorityTable = TableManager.init("authorityTable", $scope.$parent.authorityBaseUrl +"list", columns);
	};
});
