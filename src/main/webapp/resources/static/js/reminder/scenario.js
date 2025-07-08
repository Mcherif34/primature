app.controller('scenarioController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.scenarioTable = null;
	$scope.scenarioStageTable = null;
	$scope.scenarioReminderPortofolioTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.scenarioRequiredError = false;
	$scope.scenarioTechnicalError = false;
	$scope.scenarioSuccess = false;
	$scope.scenarioStageRequiredError = false;
	$scope.scenarioStageTechnicalError = false;
	$scope.scenarioStageSuccess = false;
	$scope.scenarioReminderPortofolioRequiredError = false;
	$scope.scenarioReminderPortofolioTechnicalError = false;
	$scope.scenarioReminderPortofolioSuccess = false;
	
	$scope.baseUrl = "/reminder/scenario/rest/";
	$scope.scenarioStageBaseUrl = "/reminder/scenarioStage/rest/";
	$scope.scenarioReminderPortofolioBaseUrl = "/reminder/portofolio/rest/";
	$scope.zoneRecheche = false;
	$scope.buttonDisabled = false;

	$scope.init = function() {
		$('#scenarioReminderPortofolioTable').css("width", "100%");
		$scope.mode="read";
		$scope.addScenarioForm = false;
		$scope.editScenarioForm = false;
		CRUDService.init($scope);
		
		$scope.initListActions();
		$scope.initListActionTypes();
		$scope.initListLetterTemplates();
		$scope.initListReminderPortofolios();
		
		$scope.items = [{
			  id: 0,
			  name: 'Avant échéance'
			}, {
			  id: 1,
			  name: 'Après échéance'
			}, {
			  id: 2,
			  name: 'Journalière'
			}, {
			  id: 3,
			  name: 'Hebdomadaire'
			}, {
			  id: 4,
			  name: 'Mensuelle'
			}];
	};
	
	$scope.initListActions = function() {
		$http.get(context+"/administration/referentiel/action/rest/getAll").success(function(data, status) {   
			$scope.actions = data;
		});
	};
	
	$scope.initListActionTypes = function() {
		$http.get(context+"/administration/referentiel/actionType/rest/getAll").success(function(data, status) {   
			$scope.actionTypes = data;
		});
	};
	
	$scope.initListLetterTemplates = function() {
		$http.get(context+"/reminder/letterTemplate/rest/getAll").success(function(data, status) {   
			$scope.letterTemplates = data;
		});
	};
	
	$scope.initListReminderPortofolios = function() {
		$http.get(context+"/reminder/portofolio/rest/getAll").success(function(data, status) {   
			$scope.reminderPortofolios = data;
		});
	};
	
	$scope.addScenario = function() {
		CRUDService.add($scope);
		$scope.editScenarioForm = false;
		$scope.addScenarioForm = true;
		$scope.scenarioSuccess = false;
		$scope.scenarioTechnicalError = false;
		$scope.scenarioRequiredError = false;
		$('#scenarioModal').modal("show");
	};
	
	$scope.addScenarioStage = function() {
		$scope.dto.scenarioStage = {};
		$scope.editScenarioStageForm = false;
		$scope.addScenarioStageForm = true;
		$scope.scenarioStageSuccess = false;
		$scope.scenarioStageTechnicalError = false;
		$scope.scenarioStageRequiredError = false;
		$('#scenarioStageModal').modal("show");
	};
	
	$scope.addScenarioReminderPortofolio = function() {
		$scope.dto.scenarioReminderPortofolio = {};
		$scope.editScenarioReminderPortofolioForm = false;
		$scope.addScenarioReminderPortofolioForm = true;
		$scope.scenarioReminderPortofolioSuccess = false;
		$scope.scenarioReminderPortofolioTechnicalError = false;
		$scope.scenarioReminderPortofolioRequiredError = false;
		$('#scenarioReminderPortofolioModal').modal("show");
	};
	
	editScenario = function() {
		CRUDService.edit($scope);
		$scope.addScenarioForm = false;
		$scope.editScenarioForm = true;
		$scope.scenarioSuccess = false;
		$scope.scenarioTechnicalError = false;
		$scope.scenarioRequiredError = false;
		$('#scenarioModal').modal("show");
	};
	
	editScenarioStage = function(id) {
		$http.get(context+$scope.scenarioStageBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.scenarioStage = data;
			$scope.dto.scenarioStage = $scope.scenarioStage;
			CRUDService.edit($scope);
			$scope.addScenarioStageForm = false;
			$scope.editScenarioStageForm = true;
			$scope.scenarioStageSuccess = false;
			$scope.scenarioStageTechnicalError = false;
			$scope.scenarioStageRequiredError = false;
			$('#scenarioStageModal').modal("show");
		});
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadReminderPortofolio = function(id) {
		$http.get(context+$scope.scenarioReminderPortofolioBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto.reminderPortofolio = data;
		});
	}
	
	$scope.enableDaysNum = function(id) {
		if(id == 0 || id == 1)
			$scope.buttonDisabled = false;
		else {
			$scope.buttonDisabled = true;
			$scope.dto.scenarioStage.daysNum = null;
		}
	}
	
	$scope.saveScenario = function() {
		if($scope.scenarioForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.scenarioTechnicalError = false;
				$scope.scenarioRequiredError = false;
				$scope.scenarioSuccess = true;
				$('#scenarioModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.scenarioTechnicalError = true;
			});
		} else {
			$scope.scenarioRequiredError = true;
		}
	};
	
	$scope.saveScenarioStage = function() {
		if($scope.scenarioStageForm.$valid) {
			$scope.dto.scenarioStage.scenarioId = $scope.dto.id;
			$http.post( context+$scope.scenarioStageBaseUrl+"save", angular.toJson($scope.dto.scenarioStage)).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.scenarioStageTechnicalError = false;
				$scope.scenarioStageRequiredError = false;
				$scope.scenarioStageSuccess = true;
				$('#scenarioStageModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.scenarioStageTechnicalError = true;
			});
		} else {
			$scope.scenarioStageRequiredError = true;
		}
	};
	
	$scope.saveScenarioReminderPortofolio = function() {
		if($scope.scenarioReminderPortofolioForm.$valid) {
			$scope.dto.reminderPortofolio.scenarioId = $scope.dto.id;
			$http.post(context+$scope.scenarioReminderPortofolioBaseUrl+"save", angular.toJson($scope.dto.reminderPortofolio)).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.scenarioReminderPortofolioTechnicalError = false;
				$scope.scenarioReminderPortofolioRequiredError = false;
				$scope.scenarioReminderPortofolioSuccess = true;
				$('#scenarioReminderPortofolioModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.scenarioReminderPortofolioTechnicalError = true;
			});
		} else {
			$scope.scenarioReminderPortofolioRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.scenarioTable.ajax.reload();
		$scope.dto = {};
	};

	removeScenario = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteScenario(id);
		};
	};

	$scope.confirmDeleteScenario = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeScenarioStage = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteScenarioStage(id);
		};
	};

	$scope.confirmDeleteScenarioStage = function(id) {
		$http.post( context+$scope.scenarioStageBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeScenarioReminderPortofolio = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteScenarioReminderPortofolio(id);
		};
	};

	$scope.confirmDeleteScenarioReminderPortofolio = function(id) {
		$http.get(context+$scope.scenarioReminderPortofolioBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto.reminderPortofolio = data;
			$scope.dto.reminderPortofolio.scenarioId = null;
			$http.post(context+$scope.scenarioReminderPortofolioBaseUrl+"save", angular.toJson($scope.dto.reminderPortofolio)).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
			}).error(function(data, status, headers, config) {
			});
		});
	};
	
	check = function(name) {
		var inputs = document.getElementsByClassName(name);
		var checked = false;
		for(var i = 0, l = inputs.length; i < l; ++i) {
	    	if(inputs[i].checked == true)
	    		checked = true;
	    }
		if(checked)
		    $scope.checked = true;
	    else
	    	$scope.checked = false;
	}
	
	$scope.checkAll = function(name) {
	    var inputs = document.getElementsByClassName(name);
	    for(var i = 0, l = inputs.length; i < l; ++i) {
	    	inputs[i].checked = true;
	    }
	    $scope.checked = true;
	}

	$scope.uncheckAll = function(name) {
		var inputs = document.getElementsByClassName(name);
	    for(var i = 0, l = inputs.length; i < l; ++i) {
	    	inputs[i].checked = false;
	    }
	    $scope.checked = false;
	}
	
});

app.controller('scenarioTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.scenarioStageTable.ajax.url('/reminder/scenarioStage/rest/list/'+newValue).load();
			$scope.$parent.scenarioReminderPortofolioTable.ajax.url('/reminder/portofolio/rest/list/'+newValue).load();
		}
		else {
			$scope.$parent.scenarioStageTable.ajax.url('/reminder/scenarioStage/rest/list/-1').load();
			$scope.$parent.scenarioReminderPortofolioTable.ajax.url('/reminder/portofolio/rest/list/-1').load();
		}
	});
	
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="form-check"><input class="form-check-input scenarioId" type="checkbox" value="'+full.id+'" onclick="check(\'scenarioId\')" /></div>';
			}},
			{mDataProp: 'enabled', "mRender": function(data, type, full) {
				var result = '';
				if(full.enabled) {
					result = '<span class="badge text-bg-success">Actif</span>';
				}
				else {
					result = '<span class="badge text-bg-danger">Inactif</span>';
				}
				return result;
			}},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'stageNum'},
			{mDataProp: 'def', "mRender": function(data, type, full) {
				var result = '';
				if(full.def) {
					result = '<span class="badge text-bg-success">Oui</span>';
				}
				else {
					result = '<span class="badge text-bg-danger">Non</span>';
				}
				return result;
			}},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editScenario();" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a> <a href="#" onclick="removeScenario('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.scenarioTable = TableManager.init("scenarioTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.scenarioTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.scenarioTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('scenarioStageTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="form-check"><input class="form-check-input scenarioStageId" type="checkbox" value="'+full.id+'" onclick="check(\'scenarioStageId\')" /></div>';
			}},
			{mDataProp: 'name'},
			{mDataProp: 'daysNum', "mRender": function(data, type, full) {
				var result = '';
				if(full.daysNum != null) {
					var due = '-';
					if(full.deadline) due = '+';
					if(full.daysNum == 0) return full.daysNum;
					return due+full.daysNum;
				}
				return result;
			}},
			{mDataProp: 'actionName'},
			{mDataProp: 'letterTemplateName'},
			{mDataProp: 'actionTypeName'},
			{mDataProp: 'accountStatement', "mRender": function(data, type, full) {
				var result = '';
				if(full.accountStatement) {
					result = '<span class="badge text-bg-success">Oui</span>';
				}
				else {
					result = '<span class="badge text-bg-danger">Non</span>';
				}
				return result;
			}},
			{mDataProp: 'latePenaltyStatement', "mRender": function(data, type, full) {
				var result = '';
				if(full.latePenaltyStatement) {
					result = '<span class="badge text-bg-success">Oui</span>';
				}
				else {
					result = '<span class="badge text-bg-danger">Non</span>';
				}
				return result;
			}},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editScenarioStage('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a> <a href="#" onclick="removeScenarioStage('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.scenarioStageTable = TableManager.init("scenarioStageTable", $scope.$parent.scenarioStageBaseUrl+"list/-1", columns);
	};
});

app.controller('scenarioReminderPortofolioTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="form-check"><input class="form-check-input scenarioReminderPortofolioId" type="checkbox" value="'+full.id+'" onclick="check(\'scenarioReminderPortofolioId\')" /></div>';
			}},
			{mDataProp: 'name'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="removeScenarioReminderPortofolio('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.scenarioReminderPortofolioTable = TableManager.init("scenarioReminderPortofolioTable", $scope.$parent.scenarioReminderPortofolioBaseUrl+"list/-1", columns);
	};
});