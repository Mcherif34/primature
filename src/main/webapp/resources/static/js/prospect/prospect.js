app.controller('prospectController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.prospectTable = null;
	$scope.contactTable = null;
	$scope.outstandingTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.availableOutstanding = false;
	$scope.prospectRequiredError = false;
	$scope.prospectTechnicalError = false;
	$scope.prospectSuccess = false;
	$scope.contactRequiredError = false;
	$scope.contactTechnicalError = false;
	$scope.contactSuccess = false;
	$scope.collaboratorRequiredError = false;
	$scope.collaboratorTechnicalError = false;
	$scope.collaboratorSuccess = false;
	
	$scope.baseUrl = "/client/prospect/rest/";
	$scope.contactBaseUrl = "/client/contact/rest/";
	$scope.outstandingBaseUrl = "/credit/outstanding/rest/";
	$scope.outstandingWarrantyBaseUrl = "/credit/outstandingWarranty/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addProspectForm = false;
		$scope.editProspectForm = false;
		CRUDService.init($scope);
		
		$scope.initListTypes();
		$scope.initListStatus();
		$scope.initListLegalForms();
		$scope.initListGovernances();
		$scope.initListCities();
		$scope.initListCountries();
		$scope.initListUsers();
		$scope.initListProspects();
		$scope.initListPaymentMethods();
		$scope.initListCurrencies();
	};
	
	$scope.initListTypes = function() {
		$http.get(context+"/administration/referentiel/type/rest/getAll").success(function(data, status) {   
			$scope.types = data;
		});
	};
	
	$scope.initListStatus = function() {
		$http.get(context+"/administration/referentiel/status/rest/getAll").success(function(data, status) {   
			$scope.statuts = data;
		});
	};
	
	$scope.initListLegalForms = function() {
		$http.get(context+"/administration/referentiel/legalForm/rest/getAll").success(function(data, status) {   
			$scope.legalForms = data;
		});
	};
	
	$scope.initListGovernances = function() {
		$http.get(context+"/administration/referentiel/governance/rest/getAll").success(function(data, status) {   
			$scope.governances = data;
		});
	};
	
	$scope.initListPaymentMethods = function() {
		$http.get(context+"/administration/referentiel/paymentMethod/rest/getAll").success(function(data, status) {   
			$scope.paymentMethods = data;
		});
	};
	
	$scope.initListCurrencies = function() {
		$http.get(context+"/administration/referentiel/currency/rest/getAll").success(function(data, status) {   
			$scope.currencies = data;
		});
	};
	
	$scope.initListCountries = function() {
		$http.get(context+"/administration/referentiel/region/country/rest/getAll").success(function(data, status) {   
			$scope.countries = data;
		});
	};
	
	$scope.initListCities = function() {
		$http.get(context+"/administration/referentiel/region/city/rest/getAll").success(function(data, status) {   
			$scope.cities = data;
		});
	};
	
	loadCities = function(id) {
		if(id != '') {
			var id = id.split(':');
			$http.get(context+"/administration/referentiel/region/city/rest/getByCountry/"+id[1]).success(function(data, status) { 
				$scope.cities = data;
			});
		}
	}
	
	$scope.initListUsers = function() {
		$http.get(context+"/administration/user/rest/getAll").success(function(data, status) {   
			$scope.users = data;
		});
	};
	
	$scope.initListProspects = function() {
		$http.get(context+"/client/prospect/rest/getAll").success(function(data, status) {   
			$scope.prospects = data;
		});
	};
	
	$scope.addProspect = function() {
		$('#legalForm').select2({placeholder: 'Choisir une option'}).select2('val', '');
		$('#country').select2({placeholder: 'Choisir une option'}).select2('val', '');
		$('#governance').select2({placeholder: 'Choisir une option'}).select2('val', '');
		$('#city').select2({placeholder: 'Choisir une option'}).select2('val', '');
		$('#type').select2({placeholder: 'Choisir une option'}).select2('val', '');
		$('#status').select2({placeholder: 'Choisir une option'}).select2('val', '');
		CRUDService.add($scope);
		$scope.editProspectForm = false;
		$scope.addProspectForm = true;
		$('#prospectModal').modal("show");
	};
	
	$scope.addContact = function() {
		$scope.dto.contact = {};
		$scope.editContactForm = false;
		$scope.addContactForm = true;
		$scope.contactSuccess = false;
		$scope.contactTechnicalError = false;
		$scope.contactRequiredError = false;
		$('#contactModal').modal("show");
	};
	
	$scope.addCollaborator = function() {
		$scope.dto.clientSecUtilisateur = {};
		$scope.collaboratorUserSuccess = false;
		$scope.collaboratorUserTechnicalError = false;
		$scope.collaboratorUserRequiredError = false;
		$('#collaborator').select2({placeholder: 'Choisir une option'}).select2('val', '');
		$('#collaboratorModal').modal("show");
	};
	
	$scope.addOutstanding = function() {
		$scope.dto.outstanding = {};
		$scope.editOutstandingForm = false;
		$scope.addOutstandingForm = true;
		$scope.outstandingSuccess = false;
		$scope.outstandingTechnicalError = false;
		$scope.outstandingRequiredError = false;
		$('#outstandingModal').modal("show");
	};
	
	editProspect = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto = data;
			$('#legalForm').select2().select2('val', 'number:'+$scope.dto.legalFormId);
			$('#country').select2().select2('val', 'number:'+$scope.dto.countryId);
			$('#governance').select2().select2('val', 'number:'+$scope.dto.governanceId);
			$('#city').select2().select2('val', 'number:'+$scope.dto.cityId);
			$('#type').select2().select2('val', 'number:'+$scope.dto.typeId);
			$('#status').select2().select2('val', 'number:'+$scope.dto.statusId);
			CRUDService.edit($scope);
			$scope.addProspectForm = false;
			$scope.editProspectForm = true;
			$scope.prospectSuccess = false;
			$scope.prospectTechnicalError = false;
			$scope.prospectRequiredError = false;
			$('#prospectModal').modal("show");
		});
	};
	
	editContact = function(id) {
		$http.get(context+$scope.contactBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.contact = data;
			$scope.dto.contact = $scope.contact;
			CRUDService.edit($scope);
			$scope.addContactForm = false;
			$scope.editContactForm = true;
			$scope.contactSuccess = false;
			$scope.contactTechnicalError = false;
			$scope.contactRequiredError = false;
			$('#contactModal').modal("show");
		});
	};
	
	editOutstanding = function(id) {
		$http.get(context+$scope.outstandingBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.outstanding = data;
			$scope.dto.outstanding = $scope.outstanding;
			CRUDService.edit($scope);
			$scope.addOutstandingForm = false;
			$scope.editOutstandingForm = true;
			$scope.outstandingSuccess = false;
			$scope.outstandingTechnicalError = false;
			$scope.outstandingRequiredError = false;
			$('#outstandingModal').modal("show");
		});
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			$http.get(context+$scope.outstandingBaseUrl+"getAvailableByClient/"+$scope.dto.id).success(function(data, status) {
				if(data.clientId != null) {
					$scope.availableOutstanding = true;
				} else {
					$scope.availableOutstanding = false;
				}
			});
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.searchProspect = function() {
		var searchKey = 'NAN';
		if(!angular.isUndefined($scope.dto.search.key) && $scope.dto.search.key != '') searchKey = $scope.dto.search.key;
		$scope.clientTable.ajax.url('/client/prospect/rest/search/'+searchKey).load();
	};
	
	$scope.loadOutstanding = function(id) {
		$http.get(context+$scope.outstandingBaseUrl+"load/"+id).success(function(data, status) {
			$scope.outstanding = data;
			$scope.dto.outstanding = $scope.outstanding;
		});
	}
	
	$scope.advancedSearchProspect = function() {
		var searchId = 0; var searchCode = 'NAN'; var searchLegalFormId = 0; var searchGovernanceId = 0; var searchTypeId = 0; var searchCityId = 0;
		if(!angular.isUndefined($scope.dto.search.id) && $scope.dto.search.id != null) searchId = $scope.dto.search.id;
		if(!angular.isUndefined($scope.dto.search.code) && $scope.dto.search.code != '') searchCode = $scope.dto.search.code;
		if(!angular.isUndefined($scope.dto.search.legalFormId) && $scope.dto.search.legalFormId != null) searchLegalFormId = $scope.dto.search.legalFormId;
		if(!angular.isUndefined($scope.dto.search.governanceId) && $scope.dto.search.governanceId != null) searchGovernanceId = $scope.dto.search.governanceId;
		if(!angular.isUndefined($scope.dto.search.typeId) && $scope.dto.search.typeId != null) searchTypeId = $scope.dto.search.typeId;
		if(!angular.isUndefined($scope.dto.search.cityId) && $scope.dto.search.cityId != null) searchCityId = $scope.dto.search.cityId;
		$scope.prospectTable.ajax.url('/client/prospect/rest/search/'+searchId+'/'+searchCode+'/'+searchLegalFormId+'/'+searchGovernanceId+'/'+searchTypeId+'/'+searchCityId).load();
	};
	
	$scope.saveProspect = function() {
		$scope.dto.legalFormId = ($("#legalForm").val().split(':'))[1];
		$scope.dto.countryId = ($("#country").val().split(':'))[1];
		$scope.dto.governanceId = ($("#governance").val().split(':'))[1];
		$scope.dto.cityId = ($("#city").val().split(':'))[1];
		$scope.dto.typeId = ($("#type").val().split(':'))[1];
		$scope.dto.statusId = ($("#status").val().split(':'))[1];
		if($scope.prospectForm.$valid) {
			var currentDate = new Date();
			if($scope.dto.codeProspect == null) {
				$http.get(context+"/client/prospect/rest/getAll").success(function(data, status) {   
					var seqNum = data.length + 1;
					$scope.dto.codeProspect = "PR" + currentDate.getFullYear() + (currentDate.getMonth()+1).toString().padStart(2, '0') + seqNum.toString().padStart(3, '0');
					$scope.dto.prospect = true;
					$scope.dto.createdAt = currentDate;
					CRUDService.save($scope,$scope.dto).success(function(data, status) {   
						CRUDService.setEntityLoaded($scope,data);
						$scope.refreshList();
						$scope.prospectTechnicalError = false;
						$scope.prospectRequiredError = false;
						$scope.prospectSuccess = true;
						$('#prospectModal').modal("hide");
					}).error(function(data, status, headers, config) {
						$scope.prospectTechnicalError = true;
					});
				});
			} else {
				$scope.dto.updatedAt = currentDate;
				CRUDService.save($scope,$scope.dto).success(function(data, status) {   
					CRUDService.setEntityLoaded($scope,data);
					$scope.refreshList();
					$scope.prospectTechnicalError = false;
					$scope.prospectRequiredError = false;
					$scope.prospectSuccess = true;
					$('#prospectModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.prospectTechnicalError = true;
				});
			}
		} else {
			$scope.prospectRequiredError = true;
		}
	};
	
	$scope.convertToClient = function() {
		if(confirm("Voulez-vous vraiment convertir ce prospect en client ?") == true) {
			var currentDate = new Date();
			$http.get(context+"/client/client/rest/getAll").success(function(data, status) {   
				var seqNum = data.length + 1;
				$scope.dto.codeClient = "CL" + currentDate.getFullYear() + (currentDate.getMonth()+1).toString().padStart(2, '0') + seqNum.toString().padStart(3, '0');
				$scope.dto.prospect = false;
				CRUDService.save($scope,$scope.dto).success(function(data, status) {   
					CRUDService.setEntityLoaded($scope,data);
					$scope.refreshList();
				}).error(function(data, status, headers, config) {
					console.log("error");
				});
			});
		};
	};
	
	$scope.saveContact = function() {
		if($scope.contactForm.$valid) {
			$scope.dto.contact.clientId = $scope.dto.id;
			$http.post( context+$scope.contactBaseUrl+"save", angular.toJson($scope.dto.contact)).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.contactTechnicalError = false;
				$scope.contactRequiredError = false;
				$scope.contactSuccess = true;
				$('#contactModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.contactTechnicalError = true;
			});
		} else {
			$scope.contactRequiredError = true;
		}
	};
	
	$scope.saveCollaborator = function() {
		$scope.dto.clientSecUtilisateur.secUtilisateurId = ($("#collaborator").val().split(':'))[1];
		$scope.dto.clientSecUtilisateur.clientId = $scope.dto.id;
		$scope.dto.clientSecUtilisateur.date = new Date();
		if($scope.collaboratorForm.$valid) {
			$http.post( context+$scope.baseUrl+"saveClientSecUtilisateur", angular.toJson($scope.dto.clientSecUtilisateur)).success(function(data, status) {
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.collaboratorTechnicalError = false;
				$scope.collaboratorRequiredError = false;
				$scope.collaboratorSuccess = true;
				$('#collaboratorModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.collaboratorTechnicalError = true;
			});
		} else {
			$scope.collaboratorRequiredError = true;
		}
	};
	
	$scope.saveOutstanding = function() {
		if($scope.outstandingForm.$valid) {
			$scope.dto.outstanding.creditStatusId = 1;
			$scope.dto.outstanding.clientId = $scope.dto.id;
			$scope.dto.outstanding.currencyId = $scope.dto.currencyId;
			$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.outstandingTechnicalError = false;
				$scope.outstandingRequiredError = false;
				$scope.outstandingSuccess = true;
				$('#outstandingModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.outstandingTechnicalError = true;
			});
		} else {
			$scope.outstandingRequiredError = true;
		}
	};
	
	valOutstanding = function(id) {
		$scope.hidden = false;
		$scope.creditInsuranceDisabled = true;
		$http.get(context+$scope.outstandingBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.outstanding = data;
			$scope.dto.outstanding = $scope.outstanding;
			if($scope.dto.outstanding.creditStatusId == 4)
				$scope.hidden = true;
			$http.get(context+$scope.outstandingWarrantyBaseUrl+"getByOutstanding/"+id).success(function(data, status) {
				$scope.dto.outstanding.outstandingWarrantiesDTO = data;
				$scope.creditInsurance = $scope.dto.outstanding.creditInsuranceDTO;
				$scope.dto.creditInsurance = $scope.creditInsurance;
				if($scope.dto.creditInsurance != null && $scope.dto.creditInsurance.eligibility == true) {
					$scope.creditInsuranceDisabled = false;
				}
				CRUDService.edit($scope);
				$scope.addOutstandingForm = false;
				$scope.editOutstandingForm = true;
				$scope.outstandingSuccess = false;
				$scope.outstandingTechnicalError = false;
				$scope.outstandingRequiredError = false;
				$('#valOutstandingModal').modal("show");
			});
		});
	};
	
	$scope.validateOutstanding = function() {
		if($scope.valOutstandingForm.$valid) {
			$scope.dto.creditInsurance.outstandingId = $scope.dto.outstanding.id;
			$http.post(context+$scope.creditInsuranceBaseUrl+"save", angular.toJson($scope.dto.creditInsurance)).success(function(data, status) {   
				if($scope.hidden)
					$scope.dto.outstanding.creditStatusId = 4;
				else {
					$scope.dto.outstanding.creditStatusId = 3;
					$scope.dto.outstanding.validatedDate = new Date();
				}
				$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {
					for(var outstandingWarranty of $scope.dto.outstanding.outstandingWarrantiesDTO){
						outstandingWarranty.outstandingId = $scope.dto.outstanding.id;
						$http.post(context+$scope.outstandingWarrantyBaseUrl+"save", angular.toJson(outstandingWarranty)).success(function(data, status) {});
					}
					$scope.dto = {};
					$scope.load($scope.selected.id);
					$scope.hidden = false;
					$scope.outstandingTechnicalError = false;
					$scope.outstandingRequiredError = false;
					$scope.outstandingSuccess = true;
					$('#valOutstandingModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.outstandingTechnicalError = true;
				});
			}).error(function(data, status, headers, config) {
				$scope.outstandingTechnicalError = true;
			});
		} else {
			$scope.outstandingRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.prospectTable.ajax.reload();
		$scope.dto = {};
	};

	removeProspect = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteProspect(id);
		};
	};

	$scope.confirmDeleteProspect = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeContact = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteContact(id);
		};
	};

	$scope.confirmDeleteContact = function(id) {
		$http.post( context+$scope.contactBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeOutstanding = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteOutstanding(id);
		};
	};

	$scope.confirmDeleteOutstanding = function(id) {
		$http.get(context+$scope.outstandingBaseUrl+"load/"+id).success(function(data, status) {
			if(data.creditInsuranceDTO != null) {
				$http.post( context+$scope.creditInsuranceBaseUrl+"delete/"+data.creditInsuranceDTO.id).success(function(data, status) { 
					$http.post( context+$scope.outstandingBaseUrl+"delete/"+id).success(function(data, status) { 
						$scope.dto = {};
						$scope.load($scope.selected.id);
					}).error(function(data, status, headers, config) {
						console.log("error");
					});
				}).error(function(data, status, headers, config) {
					console.log("error");
				});
			}
			else {
				$http.post( context+$scope.outstandingBaseUrl+"delete/"+id).success(function(data, status) { 
					$scope.dto = {};
					$scope.load($scope.selected.id);
				}).error(function(data, status, headers, config) {
					console.log("error");
				});
			}
		});
	};
});

app.controller('prospectTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.contactTable.ajax.url('/client/contact/rest/list/'+newValue).load();
		}
		else {
			$scope.$parent.contactTable.ajax.url('/client/contact/rest/list/-1').load();
		}
	});
	
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'codeProspect'},
			{mDataProp: 'iceNum'},
			{mDataProp: 'companyName'},
			{mDataProp: 'phone1'},
			{mDataProp: 'mail'},
			{mDataProp: 'countryName'},
			{mDataProp: 'cityName'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editProspect('+full.id+');" class="btn btn-fw info" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeProspect('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.prospectTable = TableManager.init("prospectTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.prospectTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.prospectTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('prospectUserTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.contactTable.ajax.url('/client/contact/rest/list/'+newValue).load();
			$scope.$parent.outstandingTable.ajax.url('/credit/outstanding/rest/list/'+newValue).load();
		}
		else {
			$scope.$parent.contactTable.ajax.url('/client/contact/rest/list/-1').load();
			$scope.$parent.outstandingTable.ajax.url('/credit/outstanding/rest/list/-1').load();
		}
	});
	
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'codeProspect'},
			{mDataProp: 'iceNum'},
			{mDataProp: 'companyName'},
			{mDataProp: 'phone1'},
			{mDataProp: 'mail'},
			{mDataProp: 'countryName'},
			{mDataProp: 'cityName'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editProspect('+full.id+');" class="btn btn-fw info" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeProspect('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.prospectUserTable = TableManager.init("prospectUserTable", $scope.$parent.baseUrl+"list/user", columns);
		
		$scope.$parent.prospectUserTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.prospectUserTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('contactTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'lastname'},
			{mDataProp: 'firstname'},
			{mDataProp: 'title'},
			{mDataProp: 'phone'},
			{mDataProp: 'mail'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editContact('+full.id+');" class="btn btn-fw info" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeContact('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.contactTable = TableManager.init("contactTable", $scope.$parent.contactBaseUrl+"list/-1", columns);
	};
});

app.controller('outstandingTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'creditStatusName', "mRender": function(data, type, full) {
				var result = '';
				if(full.creditStatusId == 1) {
					result = '<span class="label blue">'+full.creditStatusName+'</span>';
				}
				else if(full.creditStatusId == 2) {
					result = '<span class="label red">'+full.creditStatusName+'</span>';
				}
				else if(full.creditStatusId == 3) {
					result = '<span class="label green">'+full.creditStatusName+'</span>';
				}
				else if(full.creditStatusId == 4) {
					result = '<span class="label orange">'+full.creditStatusName+'</span>';
				}
				else {
					result = '<span class="label">'+full.creditStatusName+'</span>';
				}
				return result;
			}},
			{mDataProp: 'requestedAmount', "mRender": function(data, type, full) {
				if(full.requestedAmount != null)
					return new Intl.NumberFormat().format(full.requestedAmount)+' '+$scope.dto.currencySymbol;
				return 0;
			}},
			{mDataProp: 'validatedAmount', "mRender": function(data, type, full) {
				if(full.validatedAmount != null)
					return new Intl.NumberFormat().format(full.validatedAmount)+' '+$scope.dto.currencySymbol;
				return 0;
			}},
			{mDataProp: 'creditInsuranceDTO', "mRender": function(data, type, full) {
				if(full.creditInsuranceDTO != null)
					if(full.creditInsuranceDTO.eligibility == true)
						return "Oui";
					else
						return "Non";
				else
					return "";
			}},
			{mDataProp: 'creditInsuranceDTO', "mRender": function(data, type, full) {
				if(full.creditInsuranceDTO != null)
					return full.creditInsuranceDTO.insuranceName;
				else
					return "";
			}},
			{mDataProp: 'creditInsuranceDTO', "mRender": function(data, type, full) {
				if(full.creditInsuranceDTO != null)
					return new Intl.NumberFormat().format(full.creditInsuranceDTO.amount)+' '+$scope.dto.currencySymbol;
				else
					return "";
			}},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="valOutstanding('+full.id+');" class="btn btn-fw success" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-check"></i></a> <a href="#" onclick="editOutstanding('+full.id+');" class="btn btn-fw info" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeOutstanding('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.outstandingTable = TableManager.init("outstandingTable", $scope.$parent.outstandingBaseUrl+"list/-1", columns);
		
		$scope.$parent.outstandingTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.outstandingTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.loadOutstanding(id);
			}
		});
	};
});