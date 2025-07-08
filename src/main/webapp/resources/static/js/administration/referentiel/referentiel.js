app.controller('referentielController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.dto.insurance={};
	$scope.dto.legalForm={};
	$scope.dto.attachment={};
	$scope.dto.country={};
	$scope.dto.city={};
	$scope.filtre = {};
	$scope.referentielTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.insuranceRequiredError = false;
	$scope.insuranceTechnicalError = false;
	$scope.insuranceSuccess = false;
	$scope.legalFormRequiredError = false;
	$scope.legalFormTechnicalError = false;
	$scope.legalFormSuccess = false;
	
	$scope.insuranceBaseUrl = "/administration/referentiel/insurance/rest/";
	$scope.legalFormBaseUrl = "/administration/referentiel/legalForm/rest/";
	$scope.attachmentBaseUrl = "/administration/referentiel/attachment/rest/";
	$scope.cityBaseUrl = "/administration/referentiel/region/city/rest/";
	$scope.countryBaseUrl = "/administration/referentiel/region/country/rest/";
	$scope.statusBaseUrl = "/administration/referentiel/status/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addInsuranceForm = false;
		$scope.editInsuranceForm = false;
		CRUDService.init($scope);
	};
	
	
//	INSURANCE MODULE
	
	$scope.addInsurance = function() {
		CRUDService.add($scope);
		$scope.editInsuranceForm = false;
		$scope.addInsuranceForm = true;
		$scope.insuranceSuccess = false;
		$scope.insuranceTechnicalError = false;
		$scope.insuranceRequiredError = false;
		$('#insuranceModal').modal("show");
	};
	
	editInsurance = function(id) {
		$http.get(context+$scope.insuranceBaseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.insurance = data;
			$scope.addInsuranceForm = false;
			$scope.editInsuranceForm = true;
			$scope.insuranceSuccess = false;
			$scope.insuranceTechnicalError = false;
			$scope.insuranceRequiredError = false;
			$('#insuranceModal').modal("show");
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadInsurance = function(id) {
		$http.get(context+$scope.insuranceBaseUrl+"load/"+id).success(function(data, status) {   
			$scope.dto.insurance = data;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveInsurance = function() {
		if($scope.insuranceForm.$valid) {
			$http.post(context+$scope.insuranceBaseUrl+"save",$scope.dto.insurance).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.insuranceTable.ajax.reload();
				$scope.dto.insurance = {};
				$scope.insuranceTechnicalError = false;
				$scope.insuranceRequiredError = false;
				$scope.insuranceSuccess = true;
				$('#insuranceModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.insuranceTechnicalError = true;
			});
		} else {
			$scope.insuranceRequiredError = true;
		}
	};
	
	removeInsurance = function(id) {
		$scope.dto.insurance = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteInsurance(id);
		};
	};
	
	$scope.confirmDeleteInsurance = function(id) {
		$http.post(context+$scope.insuranceBaseUrl+"delete/"+id).success(function(data, status) {   
			$scope.insuranceTable.ajax.reload();
			$scope.dto.insurance = {};
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
//	LEGAL FORM MODULE
	
	$scope.addLegalForm = function() {
		CRUDService.add($scope);
		$scope.editLegalFormForm = false;
		$scope.addLegalFormForm = true;
		$scope.legalFormSuccess = false;
		$scope.legalFormTechnicalError = false;
		$scope.legalFormRequiredError = false;
		$('#legalFormModal').modal("show");
	};
	
	editLegalForm = function(id) {
		$http.get(context+$scope.legalFormBaseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.legalForm = data;
			$scope.addLegalFormForm = false;
			$scope.editLegalFormForm = true;
			$scope.legalFormSuccess = false;
			$scope.legalFormTechnicalError = false;
			$scope.legalFormRequiredError = false;
			$('#legalFormModal').modal("show");
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadLegalForm = function(id) {
		$http.get(context+$scope.legalFormBaseUrl+"load/"+id).success(function(data, status) {   
			$scope.dto.legalForm = data;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	
	$scope.saveLegalForm = function() {
		if($scope.legalFormForm.$valid) {
			$http.post(context+$scope.legalFormBaseUrl+"save",$scope.dto.legalForm).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.legalFormTable.ajax.reload();
				$scope.dto.legalForm = {};
				$scope.legalFormTechnicalError = false;
				$scope.legalFormRequiredError = false;
				$scope.legalFormSuccess = true;
				$('#legalFormModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.insuranceTechnicalError = true;
			});
		} else {
			$scope.insuranceRequiredError = true;
		}
	};
	
	removeLegalForm = function(id) {
		$scope.dto.legalForm = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteLegalForm(id);
		};
	};
	
	$scope.confirmDeleteLegalForm = function(id) {
		$http.post(context+$scope.legalFormBaseUrl+"delete/"+id).success(function(data, status) {   
			$scope.legalFormTable.ajax.reload();
			$scope.dto.insurance = {};
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
//	ATTACHMENT MODULE
	
	$scope.addAttachment = function() {
		CRUDService.add($scope);
		$scope.editAttachmentForm = false;
		$scope.addAttachmentForm = true;
		$scope.attachmentSuccess = false;
		$scope.attachmentTechnicalError = false;
		$scope.attachmentRequiredError = false;
		$('#attachmentModal').modal("show");
	};
	
	editAttachment = function(id) {
		$http.get(context+$scope.attachmentBaseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.attachment = data;
			$scope.addAttachmentForm = false;
			$scope.editAttachmentForm = true;
			$scope.attachmentSuccess = false;
			$scope.attachmentTechnicalError = false;
			$scope.attachmentRequiredError = false;
			$('#attachmentModal').modal("show");
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadAttachment = function(id) {
		$http.get(context+$scope.attachmentBaseUrl+"load/"+id).success(function(data, status) {   
			$scope.dto.attachment = data;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveAttachment = function() {
		if($scope.attachmentForm.$valid) {
			$http.post(context+$scope.attachmentBaseUrl+"save",$scope.dto.attachment).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.attachmentTable.ajax.reload();
				$scope.dto.attachment = {};
				$scope.attachmentTechnicalError = false;
				$scope.attachmentRequiredError = false;
				$scope.attachmentSuccess = true;
				$('#attachmentModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.attachmentTechnicalError = true;
			});
		} else {
			$scope.attachmentRequiredError = true;
		}
	};
	
	removeAttachment = function(id) {
		$scope.dto.attachment = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteAttachment(id);
		};
	};
	
	$scope.confirmDeleteAttachment = function(id) {
		$http.post(context+$scope.attachmentBaseUrl+"delete/"+id).success(function(data, status) {   
			$scope.attachmentTable.ajax.reload();
			$scope.dto.attachment = {};
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
//	REGION MODULE
	
	$scope.addCountry = function() {
		$scope.dto.country = {};
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
	
	editCountry = function(id) {
		$http.get(context+$scope.countryBaseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.country = data;
			$scope.addCountryForm = false;
			$scope.editCountryForm = true;
			$scope.countrySuccess = false;
			$scope.countryTechnicalError = false;
			$scope.countryRequiredError = false;
			$('#countryModal').modal("show");
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	editCity = function(id) {
		$http.get(context+$scope.cityBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto.city = data;
			$scope.addCityForm = false;
			$scope.editCityForm = true;
			$scope.citySuccess = false;
			$scope.cityTechnicalError = false;
			$scope.cityRequiredError = false;
			$('#cityModal').modal("show");
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadCountry = function(id) {
		$http.get(context+$scope.countryBaseUrl+"load/"+id).success(function(data, status) {   
			$scope.dto.country = data;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadCity = function(id) {
		$http.get(context+$scope.cityBaseUrl+"load/"+id).success(function(data, status) {   
			$scope.dto.city = data;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveCountry = function() {
		if($scope.countryForm.$valid) {
			$http.post(context+$scope.countryBaseUrl+"save",$scope.dto.country).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.countryTable.ajax.reload();
				$scope.dto.country = {};
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
			$scope.dto.city.countryId = $scope.dto.country.id;
			$http.post( context+$scope.cityBaseUrl+"save", angular.toJson($scope.dto.city)).success(function(data, status) {   
				$scope.dto.city = {};
				$scope.cityTable.ajax.reload();
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
	
	removeCountry = function(id) {
		$scope.dto.country = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteCountry(id);
		};
	};
	
	$scope.confirmDeleteCountry = function(id) {
		$http.post(context+$scope.countryBaseUrl+"delete/"+id).success(function(data, status) {   
			$scope.countryTable.ajax.reload();
			$scope.dto.country = {};
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeCity = function(id) {
		$scope.dto.city = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteCity(id);
		};
	};
	
	$scope.confirmDeleteCity = function(id) {
		$http.post(context+$scope.cityBaseUrl+"delete/"+id).success(function(data, status) {   
			$scope.cityTable.ajax.reload();
			$scope.dto.city = {};
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
//	STATUS MODULE
	
	$scope.addStatus = function() {
		CRUDService.add($scope);
		$scope.editStatusForm = false;
		$scope.addStatusForm = true;
		$scope.statusSuccess = false;
		$scope.statusTechnicalError = false;
		$scope.statusRequiredError = false;
		$('#statusModal').modal("show");
	};
	
	editStatus = function(id) {
		$http.get(context+$scope.statusBaseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.status = data;
			$scope.addStatusForm = false;
			$scope.editStatusForm = true;
			$scope.statusSuccess = false;
			$scope.statusTechnicalError = false;
			$scope.statusRequiredError = false;
			$('#statusModal').modal("show");
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadStatus = function(id) {
		$http.get(context+$scope.statusBaseUrl+"load/"+id).success(function(data, status) {   
			$scope.dto.status = data;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveStatus = function() {
		if($scope.statusForm.$valid) {
			$http.post(context+$scope.statusBaseUrl+"save",$scope.dto.status).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.statusTable.ajax.reload();
				$scope.dto.status = {};
				$scope.statusTechnicalError = false;
				$scope.statusRequiredError = false;
				$scope.statusSuccess = true;
				$('#statusModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.statusTechnicalError = true;
			});
		} else {
			$scope.statusRequiredError = true;
		}
	};
	
	removeStatus = function(id) {
		$scope.dto.status = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteStatus(id);
		};
	};
	
	$scope.confirmDeleteStatus = function(id) {
		$http.post(context+$scope.statusBaseUrl+"delete/"+id).success(function(data, status) {   
			$scope.statusTable.ajax.reload();
			$scope.dto.status = {};
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$scope.addReferentiel = function() {
		CRUDService.add($scope);
		$scope.editReferentielForm = false;
		$scope.addReferentielForm = true;
		$scope.referentielSuccess = false;
		$scope.referentielTechnicalError = false;
		$scope.referentielRequiredError = false;
		$('#referentielModal').modal("show");
	};
	
	editReferentiel = function() {
		CRUDService.edit($scope);
		$scope.addReferentielForm = false;
		$scope.editReferentielForm = true;
		$scope.referentielSuccess = false;
		$scope.referentielTechnicalError = false;
		$scope.referentielRequiredError = false;
		$('#referentielModal').modal("show");
	};
	
	
	$scope.saveReferentiel = function() {
		if($scope.referentielForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.referentielTechnicalError = false;
				$scope.referentielRequiredError = false;
				$scope.referentielSuccess = true;
				$('#referentielModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.referentielTechnicalError = true;
			});
		} else {
			$scope.referentielRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.referentielTable.ajax.reload();
		$scope.dto = {};
	};

});



app.controller('insuranceTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editInsurance('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a>&nbsp;<a href="#" onclick="removeInsurance('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.insuranceTable = TableManager.init("insuranceTable", $scope.$parent.insuranceBaseUrl+"list", columns);
		
		$scope.$parent.insuranceTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.insuranceTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('legalFormTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editLegalForm('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a>&nbsp;<a href="#" onclick="removeLegalForm('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.legalFormTable = TableManager.init("legalFormTable", $scope.$parent.legalFormBaseUrl+"list", columns);
		
		$scope.$parent.legalFormTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.legalFormTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.loadLegalForm(id);
			}
		});
	};
});

app.controller('attachmentTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editAttachment('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a>&nbsp;<a href="#" onclick="removeAttachment('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.attachmentTable = TableManager.init("attachmentTable", $scope.$parent.attachmentBaseUrl+"list", columns);
		
		$scope.$parent.attachmentTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.attachmentTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.loadAttachment(id);
			}
		});
	};
});

app.controller('countryTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.country.id', function(newValue, oldValue) {
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
			{mDataProp: 'nameEn'},
			{mDataProp: 'nameFr'},
			{mDataProp: 'phonecode'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editCountry('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a>&nbsp;<a href="#" onclick="removeCountry('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.countryTable = TableManager.init("countryTable", $scope.$parent.countryBaseUrl+"list", columns);
		
		$scope.$parent.countryTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.countryTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.loadCountry(id);
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
				result = '<a href="#" onclick="editCity('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a>&nbsp;<a href="#" onclick="removeCity('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.cityTable = TableManager.init("cityTable", $scope.$parent.cityBaseUrl+"list/-1", columns);
	};
});

app.controller('statusTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editStatus('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a>&nbsp;<a href="#" onclick="removeStatus('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.statusTable = TableManager.init("statusTable", $scope.$parent.statusBaseUrl+"list", columns);
		
		$scope.$parent.statusTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.statusTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.loadStatus(id);
			}
		});
	};
});