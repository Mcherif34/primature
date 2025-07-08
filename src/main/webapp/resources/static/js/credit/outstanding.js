app.controller('outstandingController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.dto.search = {};
	$scope.filtre = {};
	$scope.outstandingTable = null;
	$scope.outstandingStatusTable = null;
	$scope.reminderClientTable = null;
	$scope.litigationCurrentClientTable = null;
	$scope.outstandingStatusClientTable = null;
	$scope.outstandingClientTable = null;
	$scope.invoiceTotalTable = null;
	$scope.invoiceNotOverdueTable = null;
	$scope.invoiceOverdueTable = null;
	$scope.invoiceOverdue30Table = null;
	$scope.invoiceOverdue60Table = null;
	$scope.invoiceOverdue90Table = null;
	$scope.reminderInvoiceTable = null;
	$scope.litigationInvoiceTable = null;
	$scope.promiseInvoiceTable = null;
	$scope.contenceInvoiceTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.hidden = false;
	$scope.outstandingRequiredError = false;
	$scope.outstandingTechnicalError = false;
	$scope.outstandingSuccess = false;
	$scope.creditLimitRequiredError = false;
	$scope.creditLimitTechnicalError = false;
	$scope.creditLimitSuccess = false;
	$scope.creditInsuranceDisabled = true;
	$scope.outstandingValidated = false;
	$scope.notifications = null;
	$scope.notificationsCount = 0;
	
	$scope.baseUrl = "/credit/outstanding/rest/";
	$scope.clientBaseUrl = "/client/client/rest/";
	$scope.contactBaseUrl = "/client/contact/rest/";
	$scope.outstandingWarrantyBaseUrl = "/credit/outstandingWarranty/rest/";
	$scope.creditLimitBaseUrl = "/credit/creditLimit/rest/";
	$scope.creditInsuranceBaseUrl = "/credit/creditInsurance/rest/";
	$scope.invoiceBaseUrl = "/credit/invoice/rest/";
	$scope.reminderBaseUrl = "/reminder/reminder/rest/";
	$scope.litigationBaseUrl = "/reminder/litigation/rest/";
	$scope.promiseBaseUrl = "/reminder/promise/rest/";
	$scope.contenceBaseUrl = "/reminder/contence/rest/";
	$scope.invoiceActionStatusBaseUrl = "/reminder/invoiceActionStatus/rest/";
	$scope.reminderInvoiceBaseUrl = "/reminder/reminderInvoice/rest/";
	$scope.promiseInvoiceBaseUrl = "/reminder/promiseInvoice/rest/";
	$scope.notificationBaseUrl = "/notification/rest/";
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addOutstandingForm = false;
		$scope.editOutstandingForm = false;
		CRUDService.init($scope);
		$scope.initListInsurances();
		$scope.initListWarranties();
		$scope.initListUsers();
		$scope.initListLitigationStatus();
		$scope.initListContenceSteps();
		$scope.initListCommercialCourts();
		$scope.initListActions();
		$scope.initListNotifications();
		
		$scope.items = [{
			  id: false,
			  name: 'Non'
			}, {
			  id: true,
			  name: 'Oui'
		}];
	};
	
	$scope.searchOutstanding = function() {
		var searchKey = 'NAN';
		if(!angular.isUndefined($scope.dto.search.key) && $scope.dto.search.key != '') searchKey = $scope.dto.search.key;
		console.log(searchKey);
		$scope.outstandingTable.ajax.url('/credit/outstanding/rest/search/'+searchKey).load();
	};
	
	$scope.initListNotifications = function(){
		$http.get(context+$scope.notificationBaseUrl+"getNotificationsByUser").success(function(data, status) {
			$scope.notificationsInverse = data.slice(0,5);
			$scope.notifications = $scope.notificationsInverse.slice(0,5);
			if(data != null)
				$scope.notificationsCount = data.length;
		});
	};
	
	$scope.showAllNotification = function(){
		$http.get(context+$scope.notificationBaseUrl+"getNotificationsByUser").success(function(data, status) {
			$scope.notificationList = data
			$('#notificationListModal').modal("show");
		}).error(function(data, status, headers, config){
			console.log("erreur de la recupération!!!!");
		});
	}
	
	$scope.loadNotification = function(id){
		$http.get(context+$scope.notificationBaseUrl+"load/"+id).success(function(data, status) {
			$scope.notificationInvoice = data;
			document.getElementById("notifDescription").innerHTML = $scope.notificationInvoice.description;

		});
	}
	
	openNotificationModal = function(id){
		$scope.loadNotification(id);
		$('#notificationModal').modal("show");
	}
	
	$scope.openNotificationModal = function(id){
		$scope.loadNotification(id);
		$('#notificationModal').modal("show");
	}
	
	$scope.initListClients = function() {
		$http.get(context+"/client/client/rest/getNotOutstanding").success(function(data, status) {   
			$scope.clients = data;
		});
	};
	
	$scope.initListInsurances = function() {
		$http.get(context+"/administration/referentiel/insurance/rest/getAll").success(function(data, status) {   
			$scope.insurances = data;
		});
	};
	
	$scope.initListWarranties = function() {
		$http.get(context+"/administration/referentiel/warranty/rest/getAll").success(function(data, status) {   
			$scope.warranties = data;
		});
	};
	
	$scope.initListUsers = function() {
		$http.get(context+"/administration/user/rest/getAll").success(function(data, status) {   
			$scope.users = data;
		});
	};
	
	$scope.initListLitigationStatus = function() {
		$http.get(context+"/administration/referentiel/litigationStatus/rest/getAll").success(function(data, status) {   
			$scope.litigationStatus = data;
		});
	};
	
	$scope.initListContenceSteps = function() {
		$http.get(context+"/administration/referentiel/contenceStep/rest/getAll").success(function(data, status) {   
			$scope.contenceSteps = data;
		});
	};
	
	$scope.initListCommercialCourts = function() {
		$http.get(context+"/administration/referentiel/commercialCourt/rest/getAll").success(function(data, status) {   
			$scope.commercialCourts = data;
		});
	};
	
	$scope.initListActions = function() {
		$http.get(context+"/administration/referentiel/action/rest/getAll").success(function(data, status) {   
			$scope.actionsList = data;
		});
	};
	
	$scope.addOutstanding = function() {
		CRUDService.add($scope);
		$scope.editOutstandingForm = false;
		$scope.addOutstandingForm = true;
		$scope.outstandingRequiredError = false;
		$scope.outstandingTechnicalError = false;
		$scope.outstandingSuccess = false;
		$('#outstandingModal').modal("show");
	};
	
	$scope.addCreditLimit = function() {
		$scope.dto.creditLimit = {};
		$scope.editCreditLimitForm = false;
		$scope.addCreditLimitForm = true;
		$scope.creditLimitSuccess = false;
		$scope.creditLimitTechnicalError = false;
		$scope.creditLimitRequiredError = false;
		$('#creditLimitModal').modal("show");
	};
	
	showClientDetail = function(id) {
		$http.get(context+$scope.clientBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto.clientDetail = data;
			
			$scope.reminderClientTable.ajax.url($scope.reminderBaseUrl+'list/'+id).load();
			$scope.litigationCurrentClientTable.ajax.url($scope.litigationBaseUrl+'list/current/'+id).load();
			$scope.outstandingStatusClientTable.ajax.url($scope.baseUrl+'list/validated/'+id).load();
			$scope.outstandingClientTable.ajax.url($scope.baseUrl+'list/'+id).load();
			$scope.contactClientTable.ajax.url($scope.contactBaseUrl+'list/'+id).load();
			
			$scope.invoiceTotalTable.ajax.url('/credit/invoice/rest/list/unpaidByClient/'+id).load();
			$scope.invoiceNotOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidNotOverdueByClient/'+id).load();
			$scope.invoiceOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidOverdueByClient/'+id).load();
			$scope.invoiceOverdue30Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue30ByClient/'+id).load();
			$scope.invoiceOverdue60Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue60ByClient/'+id).load();
			$scope.invoiceOverdue90Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue90ByClient/'+id).load();
			
			$('#clientDetailModal').modal("show");
		});
	};
	
	$scope.addReminderClient = function(name) {
		$scope.dto.reminder = {};
		$scope.editReminderForm = false;
		$scope.addReminderForm = true;
		$scope.reminderSuccess = false;
		$scope.reminderTechnicalError = false;
		$scope.reminderRequiredError = false;
		
		$scope.dto.reminder.remainingAmount = 0;
		$scope.dto.reminder.invoices = "";
		$scope.dto.reminder.invoiceClassName = name;
		var inputs = document.getElementsByClassName(name);
		for(var i = 0, l = inputs.length; i < l; ++i) {
			if(inputs[i].checked) {
	    		$http.get(context+$scope.invoiceBaseUrl+"load/"+inputs[i].value).success(function(data, status) {
	    			$scope.dto.reminder.remainingAmount += data.remainingAmount;
	    			$scope.dto.reminder.invoices += '<a href="#" onclick="showInvoiceDetail('+data.id+');" class="amount-link">'+data.code+'</a>&nbsp;&nbsp;';
	    		});
	    	}
	    }
		$http.get(context+"/reminder/scenario/rest/getByClient/"+$scope.dto.id).success(function(data, status) {
			if(data != null) {
				$scope.dto.reminder.scenarioName = data.name;
				$http.get(context+"/reminder/scenarioStage/rest/getByScenario/"+data.id).success(function(data, status) {
					$scope.scenarioStages = data;
				});
				$scope.scenarioInvalid = false;
			}
			else {
				$scope.scenarioInvalid = true;
			}
		});
		
		$('#reminderClientModal').modal("show");
	};
	
	$scope.addPromise = function() {
		$scope.dto.promise = {};
		console.log($scope.dto.invoiceDetail);
		if(!angular.isUndefined($scope.dto.invoiceDetail)) {
			$scope.dto.promise.invoiceId = $scope.dto.invoiceDetail.id;
			$http.get(context+"/credit/invoice/rest/load/"+$scope.dto.invoiceDetail.id).success(function(data, status) {
				$scope.dto.promise.amount = data.remainingAmount;
				$scope.dto.promise.dueDate = data.dueDate;
				$scope.dto.promise.currencyId = data.currencyId;
				$scope.dto.promise.clientId = data.clientId;
				$scope.dto.promise.clientCompanyName = data.clientCompanyName;
				
				$scope.editPromiseForm = false;
				$scope.addPromiseForm = true;
				$scope.promiseSuccess = false;
				$scope.promiseTechnicalError = false;
				$scope.promiseRequiredError = false;
				$('#promiseModal').modal("show");
			});
		}
	};
	
	$scope.addPromiseClient = function(name) {
		$scope.dto.promise = {};
		$scope.dto.promise.invoices = "";
		$scope.dto.promise.currencyId = $scope.dto.currencyId;
		$scope.dto.promise.clientId = $scope.dto.clientId;
		$scope.dto.promise.clientCompanyName = $scope.dto.clientCompanyName;
		$scope.dto.promise.amount = 0;
		$scope.dto.promise.invoiceClassName = name;
		var inputs = document.getElementsByClassName(name);
		for(var i = 0, l = inputs.length; i < l; ++i) {
			if(inputs[i].checked) {
				$http.get(context+$scope.invoiceBaseUrl+"load/"+inputs[i].value).success(function(data, status) {
					$scope.dto.promise.amount += data.remainingAmount;
	    			$scope.dto.promise.invoices += '<a href="#" onclick="showInvoiceDetail('+data.id+');" class="amount-link">'+data.code+'</a>&nbsp;&nbsp;';
	    		});
	    	}
	    }
		$scope.editPromiseForm = false;
		$scope.addPromiseForm = true;
		$scope.promiseSuccess = false;
		$scope.promiseTechnicalError = false;
		$scope.promiseRequiredError = false;
		$('#promiseClientModal').modal("show");
	};
	
	$scope.loadByInvoice = function(id) {
		$http.get(context+"/credit/invoice/rest/load/"+id).success(function(data, status) {
			if(!angular.isUndefined($scope.dto) && $scope.dto != null) {
				$scope.dto.litigation.amount = data.remainingAmount;
				$scope.dto.litigation.dueDate = data.dueDate;
				$scope.dto.litigation.currencyId = data.currencyId;
				$scope.dto.litigation.clientId = data.clientId;
				$scope.dto.litigation.clientCompanyName = data.clientCompanyName;
			}
		});
	};
	
	$scope.addLitigation = function(invoiceId) {
		$scope.dto.litigation = {};
		if(!angular.isUndefined(invoiceId) && invoiceId != -1) {
			$scope.dto.litigation.invoiceId = $scope.dto.invoiceDetail.id;
			$http.get(context+"/credit/invoice/rest/load/"+$scope.dto.invoiceDetail.id).success(function(data, status) {
				$scope.dto.litigation.amount = data.remainingAmount;
				$scope.dto.litigation.dueDate = data.dueDate;
				$scope.dto.litigation.currencyId = data.currencyId;
				$scope.dto.litigation.clientId = data.clientId;
				$scope.dto.litigation.clientCompanyName = data.clientCompanyName;
				
				$scope.editLitigationForm = false;
				$scope.addLitigationForm = true;
				$scope.litigationSuccess = false;
				$scope.litigationTechnicalError = false;
				$scope.litigationRequiredError = false;
				$('#litigationModal').modal("show");
			});
		} else {
			$scope.dto.litigation = {};
			$scope.dto.litigation.litigationStatusId = 1;
			
			$scope.editLitigationForm = false;
			$scope.addLitigationForm = true;
			$scope.litigationSuccess = false;
			$scope.litigationTechnicalError = false;
			$scope.litigationRequiredError = false;
			$('#litigationModal').modal("show");
		}
	};
	
	$scope.addContence = function() {
		$scope.dto.contence = {};
		if(!angular.isUndefined($scope.dto.invoiceDetail)) {
			$scope.dto.contence.invoiceId = $scope.dto.invoiceDetail.id;
			$http.get(context+"/credit/invoice/rest/load/"+$scope.dto.invoiceDetail.id).success(function(data, status) {
				$scope.dto.contence.amount = data.remainingAmount;
				$scope.dto.contence.dueDate = data.dueDate;
				$scope.dto.contence.currencyId = data.currencyId;
				$scope.dto.contence.clientId = data.clientId;
				$scope.dto.contence.clientCompanyName = data.clientCompanyName;
				
				$scope.editContenceForm = false;
				$scope.addContenceForm = true;
				$scope.contenceSuccess = false;
				$scope.contenceTechnicalError = false;
				$scope.contenceRequiredError = false;
				$('#contenceModal').modal("show");
			});
		}
	};
	
	$scope.addOutstandingWarranty = function() {
		$scope.dto.outstandingWarrantiesDTO.push({});
	};
	
	showInvoice = function() {
		$('#invoiceTotalModal').modal("show");
	};
	
	showNotOverdueInvoice = function() {
		$('#invoiceNotOverdueModal').modal("show");
	};
	
	showOverdueInvoice = function() {
		$('#invoiceOverdueModal').modal("show");
	};
	
	showOverdueInvoice30 = function() {
		$('#invoiceOverdue30Modal').modal("show");
	};
	
	showOverdueInvoice60 = function() {
		$('#invoiceOverdue60Modal').modal("show");
	};
	
	showOverdueInvoice90 = function() {
		$('#invoiceOverdue90Modal').modal("show");
	};
	
	showInvoiceDetail = function(id) {
		$http.get(context+$scope.invoiceBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto.invoiceDetail = data;
			$scope.dto.invoiceDetail.amountTtc = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format($scope.dto.invoiceDetail.amountTtc);
			$scope.dto.invoiceDetail.remainingAmount = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format($scope.dto.invoiceDetail.remainingAmount);
			if($scope.dto.invoiceDetail.invoiceStatusId == 1) {
				var date = $scope.dto.invoiceDetail.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) > new Date()) {
					$scope.dto.invoiceDetail.invoiceStatusColor = 'info';
					$scope.dto.invoiceDetail.invoiceStatusText = 'Non échue en attente de règlement';
				}
				else {
					$scope.dto.invoiceDetail.invoiceStatusColor = 'danger';
					$scope.dto.invoiceDetail.invoiceStatusText = 'Echue en attente de règlement';
				}
			} else {
				$scope.dto.invoiceDetail.invoiceStatusColor = 'success';
				$scope.dto.invoiceDetail.invoiceStatusText = 'Payée';
			}
			$http.get(context+$scope.reminderBaseUrl+"getCountByInvoice/"+id).success(function(data, status) {
				$scope.invoiceReminderNum = data;
			});
			$http.get(context+$scope.litigationBaseUrl+"getCountByInvoice/"+id).success(function(data, status) {
				$scope.invoiceLitigationNum = data;
			});
			$http.get(context+$scope.promiseBaseUrl+"getCountByInvoice/"+id).success(function(data, status) {
				$scope.invoicePromiseNum = data;
			});
			$http.get(context+$scope.contenceBaseUrl+"getCountByInvoice/"+id).success(function(data, status) {
				$scope.invoiceContenceNum = data;
			});
			$http.get(context+"/credit/invoice/rest/getAllUnpaidByClient/"+$scope.dto.invoiceDetail.clientId).success(function(data, status) {   
				$scope.invoices = data;
			});
			$scope.reminderInvoiceTable.ajax.url('/reminder/reminder/rest/listByInvoice/'+id).load();
			$scope.litigationInvoiceTable.ajax.url('/reminder/litigation/rest/listByInvoice/'+id).load();
			$scope.promiseInvoiceTable.ajax.url('/reminder/promise/rest/listByInvoice/'+id).load();
			$scope.contenceInvoiceTable.ajax.url('/reminder/contence/rest/listByInvoice/'+id).load();
			$('#invoiceDetailModal').modal("show");
		});
	};
	
	editOutstanding = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.outstanding = data;
			$scope.dto = $scope.outstanding;
			$http.get(context+$scope.outstandingWarrantyBaseUrl+"getByOutstanding/"+id).success(function(data, status) {
				$scope.dto.outstandingWarrantiesDTO = data;
				$scope.creditInsurance = $scope.dto.creditInsuranceDTO;
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
				$('#outstandingModal').modal("show");
			});
		});
	};
	
//	editOutstanding = function(id, clientId) {
//		$http.get(context+"/client/client/rest/getNotOutstanding/"+clientId).success(function(data, status) {   
//			$scope.clients = data;
//			$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) {
//				$scope.dto = data;
//				CRUDService.edit($scope);
//				$scope.addOutstandingForm = false;
//				$scope.editOutstandingForm = true;
//				$scope.outstandingSuccess = false;
//				$scope.outstandingTechnicalError = false;
//				$scope.outstandingRequiredError = false;
//				$('#outstandingModal').modal("show");
//			});
//		});
//	};
	
	editCreditLimit = function(id) {
		$http.get(context+$scope.creditLimitBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.creditLimit = data;
			$scope.dto.creditLimit = $scope.creditLimit;
			CRUDService.edit($scope);
			$scope.addCreditLimitForm = false;
			$scope.editCreditLimitForm = true;
			$scope.creditLimitSuccess = false;
			$scope.creditLimitTechnicalError = false;
			$scope.creditLimitRequiredError = false;
			$('#creditLimitModal').modal("show");
		});
	};
	
	valOutstanding = function(id) {
		$scope.hidden = false;
		$scope.creditInsuranceDisabled = true;
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto = data;
			if($scope.dto.creditStatusId == 4)
				$scope.hidden = true;			
			$http.get(context+$scope.outstandingWarrantyBaseUrl+"getByOutstanding/"+id).success(function(data, status) {
				$scope.dto.outstandingWarrantiesDTO = data;
				if($scope.dto.creditInsuranceDTO == null) {
					$scope.addOutstandingForm = false;
					$scope.editOutstandingForm = true;
					$scope.outstandingSuccess = false;
					$scope.outstandingTechnicalError = false;
					$scope.outstandingRequiredError = false;
					$('#valOutstandingModal').modal("show");
				} else {
					$http.get(context+$scope.creditInsuranceBaseUrl+"load/"+$scope.dto.creditInsuranceDTO.id).success(function(data, status) {
						$scope.dto.creditInsurance = data;
						if($scope.dto.creditInsurance.eligibility == true) {
							$scope.creditInsuranceDisabled = false;
						}
						$scope.addOutstandingForm = false;
						$scope.editOutstandingForm = true;
						$scope.outstandingSuccess = false;
						$scope.outstandingTechnicalError = false;
						$scope.outstandingRequiredError = false;
						$('#valOutstandingModal').modal("show");
					});
				}
			});
		});
	};
	
	valCreditLimit = function(id) {
		$http.get(context+$scope.creditLimitBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.creditLimit = data;
			$scope.dto.creditLimit = $scope.creditLimit;
			CRUDService.edit($scope);
			$scope.addCreditLimitForm = false;
			$scope.editCreditLimitForm = true;
			$scope.creditLimitSuccess = false;
			$scope.creditLimitTechnicalError = false;
			$scope.creditLimitRequiredError = false;
			$('#valCreditLimitModal').modal("show");
		});
	};
	
	$scope.calculateCoverRate = function(creditInsuranceAmount, amountId) {
		if($(amountId).val() != 0 && $(amountId).val() != "")
			$scope.dto.creditInsurance.coverRate = parseFloat(creditInsuranceAmount/$(amountId).val()*100).toFixed(2);
		else
			$scope.dto.creditInsurance.coverRate = 0;
	}
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadValidated = function(id) {
		CRUDService.get(id).success(function(data, status) {
			CRUDService.setEntityLoaded($scope,data);
			$scope.outstandingValidated = true;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
			$scope.outstandingValidated = false;
		});
	};
	
	$scope.loadInvoice = function(id) {
		$http.get(context+$scope.invoiceBaseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.invoice = data;
		});
	}
	
	$scope.loadByScenarioStage = function(id) {
		$http.get(context+"/reminder/scenarioStage/rest/load/"+id).success(function(data, status) {
			$scope.dto.reminder.actionId = data.actionId;
			$scope.dto.reminder.actionTypeId = data.actionTypeId;
		});
	};
	
	$scope.setEligibility = function() {
		if($('#eligibility').val() == 'boolean:true') {
			$scope.creditInsuranceDisabled = false;
		} else {
			$scope.dto.creditInsurance.insuranceId = '';
			$scope.dto.creditInsurance.coverRate = '';
			$scope.dto.creditInsurance.amount = '';
			$scope.creditInsuranceDisabled = true;
		}
	};
	
//	$scope.saveOutstanding = function() {
//		if($scope.outstandingForm.$valid && $('#select2-client-container').text() != '' && $('#select2-client-container').text() != 'Choisir une option') {
//			$http.get(context+"/client/client/rest/loadByName/"+$('#select2-client-container').text()).success(function(data, status) {
//				$scope.dto.clientId = data.id;
//				$scope.dto.currencyId = data.currencyId;
//				if(angular.isUndefined($scope.dto.creditStatusId) || $scope.dto.creditStatusId == null)
//					$scope.dto.creditStatusId = 1;
//				CRUDService.save($scope,$scope.dto).success(function(data, status) {
//					CRUDService.setEntityLoaded($scope,data);
//					$scope.refreshList();
//					$scope.outstandingTechnicalError = false;
//					$scope.outstandingRequiredError = false;
//					$scope.outstandingSuccess = true;
//					$('#outstandingModal').modal("hide");
//				}).error(function(data, status, headers, config) {
//					$scope.outstandingTechnicalError = true;
//				});
//			});
//		} else {
//			$scope.outstandingRequiredError = true;
//		}
//	};
	
	$scope.saveOutstanding = function() {
		if($scope.outstandingForm.$valid) {
			if(angular.isUndefined($scope.dto.creditStatusId) || $scope.dto.creditStatusId == null)
				$scope.dto.creditStatusId = 1;
			$http.post(context+$scope.baseUrl+"save", angular.toJson($scope.dto)).success(function(data, status) {
				if(!angular.isUndefined($scope.dto.outstandingWarrantiesDTO) && $scope.dto.outstandingWarrantiesDTO != null) {
					for(var outstandingWarranty of $scope.dto.outstandingWarrantiesDTO){
						outstandingWarranty.outstandingId = $scope.dto.id;
						$http.post(context+$scope.outstandingWarrantyBaseUrl+"save", angular.toJson(outstandingWarranty)).success(function(data, status) {});
					}
				}
				$scope.dto.creditInsurance.outstandingId = data.id;
				$http.post(context+$scope.creditInsuranceBaseUrl+"save", angular.toJson($scope.dto.creditInsurance)).success(function(data, status) {
				}).error(function(data, status, headers, config) {
					$scope.outstandingTechnicalError = true;
				});
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.hidden = false;
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
	
	$scope.saveCreditLimit = function() {
		if($scope.creditLimitForm.$valid) {
			$scope.dto.creditLimit.creditStatusId = 1;
			$scope.dto.creditLimit.outstandingId = $scope.dto.id;
			$http.post(context+$scope.creditLimitBaseUrl+"save", angular.toJson($scope.dto.creditLimit)).success(function(data, status) {
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.creditLimitTechnicalError = false;
				$scope.creditLimitRequiredError = false;
				$scope.creditLimitSuccess = true;
				$('#creditLimitModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.creditLimitTechnicalError = true;
			});
		} else {
			$scope.creditLimitRequiredError = true;
		}
	};
	
	$scope.saveReminderClient = function() {
		if($scope.reminderClientForm.$valid) {
			$scope.dto.reminder.clientId = $scope.dto.clientId;
			$scope.dto.reminder.reminderStatusId = 1;
			$scope.dto.reminder.currencyId = 1;
			$http.post(context+$scope.reminderBaseUrl+"save", angular.toJson($scope.dto.reminder)).success(function(data, status) {
				$scope.reminderId = data.id;
				var inputs = document.getElementsByClassName($scope.dto.reminder.invoiceClassName);
			    for(var i = 0, l = inputs.length; i < l; ++i) {
					if(inputs[i].checked) {
			    		$http.get(context+$scope.invoiceBaseUrl+"load/"+inputs[i].value).success(function(data, status) {
			    			$scope.dto.reminderInvoice = {};
							$scope.dto.reminderInvoice.reminderId = $scope.reminderId;
			    			$scope.dto.reminderInvoice.invoiceId = data.id;
			    			$scope.dto.reminderInvoice.amount = data.remainingAmount;
			    			$http.post(context+$scope.reminderInvoiceBaseUrl+"save", angular.toJson($scope.dto.reminderInvoice)).success(function(data, status) {
			    				
			    			}).error(function(data, status, headers, config) {
			    				$scope.reminderTechnicalError = true;
			    			});
			    		});
			    	}
			    }
			    $scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.reminderTechnicalError = false;
				$scope.reminderRequiredError = false;
				$scope.reminderSuccess = true;
				$('#reminderClientModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.reminderTechnicalError = true;
			});
		} else {
			$scope.reminderRequiredError = true;
		}
	};
	
	$scope.savePromise = function() {
		if($scope.promiseForm.$valid) {
			$scope.dto.promise.promiseStatusId = 1;
			if($scope.dto.promise.code == null) {
				var currentDate = new Date();
				$http.get(context+"/reminder/promise/rest/getAll").success(function(data, status) {   
					var seqNum = data.length + 1;
					$scope.dto.promise.code = "PR" + currentDate.getFullYear() + (currentDate.getMonth()+1).toString().padStart(2, '0') + seqNum.toString().padStart(3, '0');
					
					$http.post(context+$scope.promiseBaseUrl+"save", angular.toJson($scope.dto.promise)).success(function(data, status) {
						$scope.promiseInvoiceTable.ajax.url('/reminder/promise/rest/listByInvoice/'+data.invoiceId).load();
						$http.get(context+$scope.promiseBaseUrl+"getCountByInvoice/"+data.invoiceId).success(function(data, status) {
							$scope.invoicePromiseNum = data;
						});
						$scope.dto.promise = {};
						$scope.promiseTechnicalError = false;
						$scope.promiseRequiredError = false;
						$scope.promiseSuccess = true;
						$('#promiseModal').modal("hide");
					}).error(function(data, status, headers, config) {
						$scope.promiseTechnicalError = true;
					});
				});
			}
			else {
				$http.post(context+$scope.promiseBaseUrl+"save", angular.toJson($scope.dto.promise)).success(function(data, status) {
					$scope.promiseInvoiceTable.ajax.url('/reminder/promise/rest/listByInvoice/'+data.invoiceId).load();
					$http.get(context+$scope.promiseBaseUrl+"getCountByInvoice/"+data.invoiceId).success(function(data, status) {
						$scope.invoicePromiseNum = data;
					});
					$scope.dto.promise = {};
					$scope.promiseTechnicalError = false;
					$scope.promiseRequiredError = false;
					$scope.promiseSuccess = true;
					$('#promiseModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.promiseTechnicalError = true;
				});
			}
		} else {
			$scope.promiseRequiredError = true;
		}
	};
	
	$scope.savePromiseClient = function() {
		if($scope.promiseClientForm.$valid) {
			$scope.dto.promise.promiseStatusId = 1;
			if($scope.dto.promise.code == null) {
				var currentDate = new Date();
				$http.get(context+"/reminder/promise/rest/getAll").success(function(data, status) {   
					var seqNum = data.length + 1;
					$scope.dto.promise.code = "PR" + currentDate.getFullYear() + (currentDate.getMonth()+1).toString().padStart(2, '0') + seqNum.toString().padStart(3, '0');
					$http.post(context+$scope.promiseBaseUrl+"save", angular.toJson($scope.dto.promise)).success(function(data, status) {
						$scope.promiseId = data.id;
						var inputs = document.getElementsByClassName($scope.dto.promise.invoiceClassName);
					    for(var i = 0, l = inputs.length; i < l; ++i) {
							if(inputs[i].checked) {
					    		$http.get(context+$scope.invoiceBaseUrl+"load/"+inputs[i].value).success(function(data, status) {
					    			$scope.dto.promiseInvoice = {};
									$scope.dto.promiseInvoice.promiseId = $scope.promiseId;
					    			$scope.dto.promiseInvoice.invoiceId = data.id;
					    			$scope.dto.promiseInvoice.amount = data.remainingAmount;
					    			$http.post(context+$scope.promiseInvoiceBaseUrl+"save", angular.toJson($scope.dto.promiseInvoice)).success(function(data, status) {
					    				
					    			}).error(function(data, status, headers, config) {
					    				$scope.reminderTechnicalError = true;
					    			});
					    		});
					    	}
					    }
						$scope.dto.promise = {};
						$scope.promiseTechnicalError = false;
						$scope.promiseRequiredError = false;
						$scope.promiseSuccess = true;
						$('#promiseClientModal').modal("hide");
					}).error(function(data, status, headers, config) {
						$scope.promiseTechnicalError = true;
					});
				});
			}
			else {
				$http.post(context+$scope.promiseBaseUrl+"save", angular.toJson($scope.dto.promise)).success(function(data, status) {
					$scope.promiseInvoiceTable.ajax.url('/reminder/promise/rest/listByInvoice/'+data.invoiceId).load();
					$http.get(context+$scope.promiseBaseUrl+"getCountByInvoice/"+data.invoiceId).success(function(data, status) {
						$scope.invoicePromiseNum = data;
					});
					$scope.dto.promise = {};
					$scope.promiseTechnicalError = false;
					$scope.promiseRequiredError = false;
					$scope.promiseSuccess = true;
					$('#promiseModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.promiseTechnicalError = true;
				});
			}
		} else {
			$scope.promiseRequiredError = true;
		}
	};
	
	$scope.saveLitigation = function() {
		if($scope.litigationForm.$valid) {
			$scope.dto.litigation.clientId = $scope.dto.id;
			if($scope.dto.litigation.code == null) {
				var currentDate = new Date();
				$http.get(context+"/reminder/litigation/rest/getAll").success(function(data, status) {   
					var seqNum = data.length + 1;
					$scope.dto.litigation.code = "LT" + currentDate.getFullYear() + (currentDate.getMonth()+1).toString().padStart(2, '0') + seqNum.toString().padStart(3, '0');
					$http.post(context+$scope.litigationBaseUrl+"save", angular.toJson($scope.dto.litigation)).success(function(data, status) {
						$scope.litigationInvoiceTable.ajax.url('/reminder/litigation/rest/listByInvoice/'+data.invoiceId).load();
						$http.get(context+$scope.litigationBaseUrl+"getCountByInvoice/"+data.invoiceId).success(function(data, status) {
							$scope.invoiceLitigationNum = data;
						});
						$scope.dto.litigation = {};
						$scope.litigationTechnicalError = false;
						$scope.litigationRequiredError = false;
						$scope.litigationSuccess = true;
						$('#litigationModal').modal("hide");
					}).error(function(data, status, headers, config) {
						$scope.litigationTechnicalError = true;
					});
				});
			}
			else {
				$http.post(context+$scope.litigationBaseUrl+"save", angular.toJson($scope.dto.litigation)).success(function(data, status) {
					$scope.litigationInvoiceTable.ajax.url('/reminder/litigation/rest/listByInvoice/'+data.invoiceId).load();
					$http.get(context+$scope.litigationBaseUrl+"getCountByInvoice/"+data.invoiceId).success(function(data, status) {
						$scope.invoiceLitigationNum = data;
					});
					$scope.dto.litigation = {};
					$scope.litigationTechnicalError = false;
					$scope.litigationRequiredError = false;
					$scope.litigationSuccess = true;
					$('#litigationModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.litigationTechnicalError = true;
				});
			}
		} else {
			$scope.litigationRequiredError = true;
		}
	};
	
	$scope.saveContence = function() {
		if($scope.contenceForm.$valid) {
			$scope.dto.contence.contenceStatusId = 1;
			$scope.dto.contence.clientId = $scope.dto.id;
			if($scope.dto.contence.code == null) {
				var currentDate = new Date();
				$http.get(context+"/reminder/contence/rest/getAll").success(function(data, status) {   
					var seqNum = data.length + 1;
					$scope.dto.contence.code = "CT" + currentDate.getFullYear() + (currentDate.getMonth()+1).toString().padStart(2, '0') + seqNum.toString().padStart(3, '0');
					$http.post(context+$scope.contenceBaseUrl+"save", angular.toJson($scope.dto.contence)).success(function(data, status) {
						$scope.contenceInvoiceTable.ajax.url('/reminder/contence/rest/listByInvoice/'+data.invoiceId).load();
						$http.get(context+$scope.contenceBaseUrl+"getCountByInvoice/"+data.invoiceId).success(function(data, status) {
							$scope.invoiceContenceNum = data;
						});
						$scope.dto.contence = {};
						$scope.contenceTechnicalError = false;
						$scope.contenceRequiredError = false;
						$scope.contenceSuccess = true;
						$('#contenceModal').modal("hide");
					}).error(function(data, status, headers, config) {
						$scope.contenceTechnicalError = true;
					});
				});
			}
			else {
				$http.post(context+$scope.contenceBaseUrl+"save", angular.toJson($scope.dto.contence)).success(function(data, status) {
					$scope.contenceInvoiceTable.ajax.url('/reminder/contence/rest/listByInvoice/'+data.invoiceId).load();
					$http.get(context+$scope.contenceBaseUrl+"getCountByInvoice/"+data.invoiceId).success(function(data, status) {
						$scope.invoiceContenceNum = data;
					});
					$scope.dto.contence = {};
					$scope.contenceTechnicalError = false;
					$scope.contenceRequiredError = false;
					$scope.contenceSuccess = true;
					$('#contenceModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.contenceTechnicalError = true;
				});
			}
		} else {
			$scope.contenceRequiredError = true;
		}
	};
	
	$scope.validateOutstanding = function() {
		if($scope.valOutstandingForm.$valid) {
			$scope.dto.creditInsurance.outstandingId = $scope.dto.id;
			$http.post(context+$scope.creditInsuranceBaseUrl+"save", angular.toJson($scope.dto.creditInsurance)).success(function(data, status) {   
				if($scope.hidden)
					$scope.dto.creditStatusId = 4;
				else {
					$scope.dto.creditStatusId = 3;
					$scope.dto.validatedDate = new Date();
				}
				
				CRUDService.save($scope,$scope.dto).success(function(data, status) {
					for(var outstandingWarranty of $scope.dto.outstandingWarrantiesDTO) {
						outstandingWarranty.outstandingId = $scope.dto.id;
						$http.post(context+$scope.outstandingWarrantyBaseUrl+"save", angular.toJson(outstandingWarranty)).success(function(data, status) {});
					}
					CRUDService.setEntityLoaded($scope,data);
					$scope.refreshList();
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
	
	$scope.validateCreditLimit = function() {
		if($scope.valCreditLimitForm.$valid) {
			$scope.dto.creditLimit.creditStatusId = 3;
			$http.post(context+$scope.creditLimitBaseUrl+"save", angular.toJson($scope.dto.creditLimit)).success(function(data, status) {
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.creditLimitTechnicalError = false;
				$scope.creditLimitRequiredError = false;
				$scope.creditLimitSuccess = true;
				$('#valCreditLimitModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.creditLimitTechnicalError = true;
			});
		} else {
			$scope.creditLimitRequiredError = true;
		}
	};
	
	$scope.rejectOutstanding = function() {
		if($scope.valOutstandingForm.$valid) {
			$scope.dto.creditStatusId = 2;
			CRUDService.save($scope,$scope.dto).success(function(data, status) {
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
	
	$scope.rejectCreditLimit = function() {
		$scope.dto.creditLimit.creditStatusId = 2;
		$http.post(context+$scope.creditLimitBaseUrl+"save", angular.toJson($scope.dto.creditLimit)).success(function(data, status) {   
			$scope.dto = {};
			$scope.load($scope.selected.id);
			$scope.creditLimitTechnicalError = false;
			$scope.creditLimitRequiredError = false;
			$scope.creditLimitSuccess = true;
			$('#valCreditLimitModal').modal("hide");
		}).error(function(data, status, headers, config) {
			$scope.creditLimitTechnicalError = true;
		});
	};
	
	$scope.refreshList = function() {
		$scope.outstandingTable.ajax.reload();
		$scope.outstandingStatusTable.ajax.reload();
		$scope.dto = {};
	};
	
	removeOutstanding = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteOutstanding(id);
		};
	};

	$scope.confirmDeleteOutstanding = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) {
			if(data.creditInsuranceDTO != null) {
				$http.post(context+$scope.creditInsuranceBaseUrl+"delete/"+data.creditInsuranceDTO.id).success(function(data, status) { 
					$http.post(context+$scope.baseUrl+"delete/"+id).success(function(data, status) { 
						$scope.refreshList();
					}).error(function(data, status, headers, config) {
						console.log("error");
					});
				}).error(function(data, status, headers, config) {
					console.log("error");
				});
			}
			else {
				$http.post(context+$scope.baseUrl+"delete/"+id).success(function(data, status) { 
					$scope.refreshList();
				}).error(function(data, status, headers, config) {
					console.log("error");
				});
			}
		});
	};
	
	removeCreditLimit = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteCreditLimit(id);
		};
	};

	$scope.confirmDeleteCreditLimit = function(id) {
		$http.post( context+$scope.creditLimitBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	check = function(name) {
		var inputs = document.getElementsByClassName(name);
		var checked = false;
		for(var i = 0, l = inputs.length; i < l; ++i) {
	    	if(inputs[i].checked == true)
	    		checked = true;
	    }
		if(checked > 0)
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
	
	addDays = function(daysNum, date) {
		date.setDate(date.getDate() + daysNum);
		return date;
	}
	
	dateToEpoch2 = function(date) {
		date.setHours(0,0,0,0);
		return date;
	}
	
});

app.controller('outstandingStatusTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.creditLimitTable.ajax.url('/credit/creditLimit/rest/list/'+newValue).load();
		}
		else {
			$scope.$parent.creditLimitTable.ajax.url('/credit/creditLimit/rest/list/-1').load();
		}
	});
	$scope.$watch('$parent.dto.clientId', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.invoiceTotalTable.ajax.url('/credit/invoice/rest/list/unpaidByClient/'+newValue).load();
			$scope.$parent.invoiceNotOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidNotOverdueByClient/'+newValue).load();
			$scope.$parent.invoiceOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidOverdueByClient/'+newValue).load();
			$scope.$parent.invoiceOverdue30Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue30ByClient/'+newValue).load();
			$scope.$parent.invoiceOverdue60Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue60ByClient/'+newValue).load();
			$scope.$parent.invoiceOverdue90Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue90ByClient/'+newValue).load();
		}
		else {
			$scope.$parent.invoiceTotalTable.ajax.url('/credit/invoice/rest/list/unpaidByClient/-1').load();
			$scope.$parent.invoiceNotOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidNotOverdueByClient/-1').load();
			$scope.$parent.invoiceOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidOverdueByClient/-1').load();
			$scope.$parent.invoiceOverdue30Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue30ByClient/-1').load();
			$scope.$parent.invoiceOverdue60Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue60ByClient/-1').load();
			$scope.$parent.invoiceOverdue90Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue90ByClient/-1').load();
		}
	});
	
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'status', "mRender": function(data, type, full) {
				var result = '';
				if(full.validatedAmountTotal != null) {
					if(full.realAmount/full.validatedAmountTotal*100 > 100) {
						result = '<span class="badge text-bg-danger">'+Math.round(full.realAmount/full.validatedAmountTotal*100)+'%</span>';
					}
					else if(full.realAmount/full.validatedAmountTotal*100 > 50 && full.realAmount/full.validatedAmountTotal*100 <= 100) {
						result = '<span class="badge text-bg-warning">'+Math.round(full.realAmount/full.validatedAmountTotal*100)+'%</span>';
					}
					else {
						result = '<span class="badge text-bg-success">'+Math.round(full.realAmount/full.validatedAmountTotal*100)+'%</span>';
					}
				} else {
					result = '<span class="badge text-bg-dark">N/A</span>';
				}
				return result;
			}},
			{mDataProp: 'clientCompanyName', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCompanyName+'</a>';
			}},
			{mDataProp: 'validatedAmount', "mRender": function(data, type, full) {
				if(full.validatedAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.validatedAmount);
				return 0;
			}},
			{mDataProp: 'realAmount', "mRender": function(data, type, full) {
				if(full.realAmount != null)
					return '<a href="#" onclick="showInvoice()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.realAmount)+'</a>';
				return 0;
			}},
			{mDataProp: 'amountNotOverdueInvoices', "mRender": function(data, type, full) {
				if(full.amountNotOverdueInvoices != 0 && full.amountNotOverdueInvoices != null)
					return '<a href="#" onclick="showNotOverdueInvoice()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountNotOverdueInvoices)+'</a>';
				return 0;
			}},
			{mDataProp: 'validatedAmount', "mRender": function(data, type, full) {
				if(full.realAmount >= full.validatedAmount)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format((full.realAmount - full.validatedAmount));
				return 0;
			}},
			{mDataProp: 'amountOverdueInvoices', "mRender": function(data, type, full) {
				if(full.amountOverdueInvoices != 0 && full.amountOverdueInvoices != null)
					return '<a href="#" onclick="showOverdueInvoice()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountOverdueInvoices)+'</a>';
				return 0;
			}},
			{mDataProp: 'amountOverdueInvoicesDays30', "mRender": function(data, type, full) {
				if(full.amountOverdueInvoicesDays30 != 0 && full.amountOverdueInvoicesDays30 != null)
					return '<a href="#" onclick="showOverdueInvoice30()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountOverdueInvoicesDays30)+'</a>';
				return 0;
			}},
			{mDataProp: 'amountOverdueInvoicesDays60', "mRender": function(data, type, full) {
				if(full.amountOverdueInvoicesDays60 != 0 && full.amountOverdueInvoicesDays60 != null)
					return '<a href="#" onclick="showOverdueInvoice60()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountOverdueInvoicesDays60)+'</a>';
				return 0;
			}},
			{mDataProp: 'amountOverdueInvoicesDays90', "mRender": function(data, type, full) {
				if(full.amountOverdueInvoicesDays90 != 0 && full.amountOverdueInvoicesDays90 != null)
					return '<a href="#" onclick="showOverdueInvoice90()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountOverdueInvoicesDays90)+'</a>';
				return 0;
			}}
		];
		$scope.$parent.outstandingStatusTable = TableManager.init("outstandingStatusTable", $scope.$parent.baseUrl+"list/validated", columns);
		
		$scope.$parent.outstandingStatusTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.outstandingStatusTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.loadValidated(id);
			}
		});
	};
});

app.controller('outstandingTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.creditLimitTable.ajax.url('/credit/creditLimit/rest/list/'+newValue).load();
		}
		else {
			$scope.$parent.creditLimitTable.ajax.url('/credit/creditLimit/rest/list/-1').load();
		}
	});
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'creditStatusName', "mRender": function(data, type, full) {
				var result = '';
				if(full.creditStatusId == 1) {
					result = '<span class="badge text-bg-info">'+full.creditStatusName+'</span>';
				}
				else if(full.creditStatusId == 2) {
					result = '<span class="badge text-bg-danger">'+full.creditStatusName+'</span>';
				}
				else if(full.creditStatusId == 3) {
					result = '<span class="badge text-bg-success">'+full.creditStatusName+'</span>';
				}
				else if(full.creditStatusId == 4) {
					result = '<span class="badge text-bg-warning">'+full.creditStatusName+'</span>';
				}
				else {
					result = '<span class="badge text-bg-dark">N/A</span>';
				}
				return result;
			}},
			{mDataProp: 'clientCompanyName', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCompanyName+'</a>';
			}},
			{mDataProp: 'requestedAmount', "mRender": function(data, type, full) {
				if(full.requestedAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.requestedAmount);
				return 0;
			}},
			{mDataProp: 'validatedAmount', "mRender": function(data, type, full) {
				if(full.validatedAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.validatedAmount);
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
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.creditInsuranceDTO.amount);
				else
					return "";
			}},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result='<a href="#" onclick="valOutstanding('+full.id+');" class="edit-item-btn" style="font-size: 17px"><i class="ri-checkbox-circle-fill align-bottom me-2 text-success"></i></a>&nbsp;<a href="#" onclick="editOutstanding('+full.id+');" class="edit-item-btn" style="font-size: 17px"><i class="ri-pencil-fill align-bottom me-2"></i></a>&nbsp;<a href="#" data-bs-toggle="modal" data-bs-target="#deleteOutstandingModal" class="remove-item-btn" style="font-size: 17px"><i class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.outstandingTable = TableManager.init("outstandingTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.outstandingTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.outstandingTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.loadValidated(id);
			}
		});
	};
});

app.controller('creditLimitTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'creditStatusName', "mRender": function(data, type, full) {
				var result = '';
				if(full.creditStatusId == 1) {
					result = '<span class="badge text-bg-info">'+full.creditStatusName+'</span>';
				}
				else if(full.creditStatusId == 2) {
					result = '<span class="badge text-bg-danger">'+full.creditStatusName+'</span>';
				}
				else if(full.creditStatusId == 3) {
					if(moment(full.dueDate, "DD/MM/YYYY").toDate() > addDays(7, dateToEpoch2(new Date()))) {
						result = '<span class="badge text-bg-success">'+full.creditStatusName+'</span>';
					} else {
						if(moment(full.dueDate, "DD/MM/YYYY").toDate() < dateToEpoch2(new Date()))
							result = '<span class="badge text-bg-danger">Expiré</span>';
						else
							result = '<span class="badge text-bg-warning">Expire bientôt</span>';
					}	
				}
				else {
					result = '<span class="badge text-bg-dark">'+full.creditStatusName+'</span>';
				}
				return result;
			}},
			{mDataProp: 'dueDate'},
			{mDataProp: 'requestedAmount', "mRender": function(data, type, full) {
				if(full.requestedAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.requestedAmount);
				return 0;
			}},
			{mDataProp: 'validatedAmount', "mRender": function(data, type, full) {
				if(full.validatedAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.validatedAmount);
				return 0;
			}},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result='<a href="#" onclick="valCreditLimit('+full.id+');" class="edit-item-btn" style="font-size: 17px"><i class="ri-checkbox-circle-fill align-bottom me-2 text-success"></i></a>&nbsp;<a href="#" onclick="editCreditLimit('+full.id+');" class="edit-item-btn" style="font-size: 17px"><i class="ri-pencil-fill align-bottom me-2"></i></a>&nbsp;<a href="#" onclick="removeCreditLimit('+full.id+');" class="remove-item-btn" style="font-size: 17px"><i class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.creditLimitTable = TableManager.init("creditLimitTable", $scope.$parent.creditLimitBaseUrl+"list/-1", columns);
	};
});

app.controller('invoiceTotalTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<div class="checkbox"><label class="ui-check"><input class="invoiceId" type="checkbox" value="'+full.id+'" onclick="check(\'invoiceId\')"><i class="dark-white"></i></label></div>';
				return result;
			}},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				else {
					result = '<span class="label">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				return result;
			}},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+');" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'}
		];
		$scope.$parent.invoiceTotalTable = TableManager.init("invoiceTotalTable", $scope.$parent.invoiceBaseUrl+"list/unpaidByClient/-1", columns);
		
		$scope.$parent.invoiceTotalTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.invoiceTotalTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.loadInvoice(id);
			}
		});
	};
});

app.controller('invoiceNotOverdueTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				else {
					result = '<span class="label">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				return result;
			}},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+');" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'}
		];
		$scope.$parent.invoiceNotOverdueTable = TableManager.init("invoiceNotOverdueTable", $scope.$parent.invoiceBaseUrl+"list/unpaidNotOverdueByClient/-1", columns);
		
		$scope.$parent.invoiceNotOverdueTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.invoiceNotOverdueTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.loadInvoice(id);
			}
		});
	};
});

app.controller('invoiceOverdueTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				else {
					result = '<span class="label">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				return result;
			}},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+');" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'}
		];
		$scope.$parent.invoiceOverdueTable = TableManager.init("invoiceOverdueTable", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdueByClient/-1", columns);
		
		$scope.$parent.invoiceOverdueTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.invoiceOverdueTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.loadInvoice(id);
			}
		});
	};
});

app.controller('invoiceOverdue30TableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				else {
					result = '<span class="label">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				return result;
			}},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+');" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'}
		];
		$scope.$parent.invoiceOverdue30Table = TableManager.init("invoiceOverdue30Table", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdue30ByClient/-1", columns);
		
		$scope.$parent.invoiceOverdue30Table.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.invoiceOverdue30Table.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.loadInvoice(id);
			}
		});
	};
});

app.controller('invoiceOverdue60TableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				else {
					result = '<span class="label">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				return result;
			}},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+');" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'}
		];
		$scope.$parent.invoiceOverdue60Table = TableManager.init("invoiceOverdue60Table", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdue60ByClient/-1", columns);
		
		$scope.$parent.invoiceOverdue60Table.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.invoiceOverdue60Table.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.loadInvoice(id);
			}
		});
	};
});

app.controller('invoiceOverdue90TableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				else {
					result = '<span class="label">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				return result;
			}},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+');" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'}
		];
		$scope.$parent.invoiceOverdue90Table = TableManager.init("invoiceOverdue90Table", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdue90ByClient/-1", columns);
		
		$scope.$parent.invoiceOverdue90Table.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.invoiceOverdue90Table.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.loadInvoice(id);
			}
		});
	};
});

app.controller('reminderInvoiceTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'actionDate'},
			{mDataProp: 'actionName', "mRender": function(data, type, full) {
				result = '<span class="label" style="background-color: '+full.actionColor+'"><i class="'+full.actionIcon+'"></i> '+full.actionName+'</span>';
				return result;
			}},
			{mDataProp: 'actionTypeName'},
			{mDataProp: 'scenarioStageName'}
		];
		$scope.$parent.reminderInvoiceTable = TableManager.init("reminderInvoiceTable", $scope.$parent.reminderBaseUrl+"listByInvoice/-1", columns);
	};
});

app.controller('litigationInvoiceTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'litigationStatusId', "mRender": function(data, type, full) {
				if(full.litigationStatusId == 1)
					result = '<span class="label orange">'+full.litigationStatusName+'</span>';
				if(full.litigationStatusId == 2)
					result = '<span class="label">'+full.litigationStatusName+'</span>';
				return result;
			}},
			{mDataProp: 'date'},
			{mDataProp: 'code'},
			{mDataProp: 'comment'}
		];
		$scope.$parent.litigationInvoiceTable = TableManager.init("litigationInvoiceTable", $scope.$parent.litigationBaseUrl+"listByInvoice/-1", columns);
	};
});

app.controller('promiseInvoiceTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'promiseStatusId', "mRender": function(data, type, full) {
				if(full.promiseStatusId == 1)
					result = '<span class="label orange">'+full.promiseStatusName+'</span>';
				if(full.promiseStatusId == 2)
					result = '<span class="label">'+full.promiseStatusName+'</span>';
				return result;
			}},
			{mDataProp: 'date'},
			{mDataProp: 'predictedDate'},
			{mDataProp: 'code'},
			{mDataProp: 'comment'}
		];
		$scope.$parent.promiseInvoiceTable = TableManager.init("promiseInvoiceTable", $scope.$parent.promiseBaseUrl+"listByInvoice/-1", columns);
	};
});

app.controller('contenceInvoiceTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'contenceStepId', "mRender": function(data, type, full) {
				result = '<span class="label orange">'+full.contenceStepName+'</span>';
				return result;
			}},
			{mDataProp: 'date'},
			{mDataProp: 'code'},
			{mDataProp: 'lawyerId', "mRender": function(data, type, full) {
				return full.lawyerFirstname+' '+full.lawyerLastname;
			}},
			{mDataProp: 'commercialCourtName'}
		];
		$scope.$parent.contenceInvoiceTable = TableManager.init("contenceInvoiceTable", $scope.$parent.contenceBaseUrl+"listByInvoice/-1", columns);
	};
});

app.controller('reminderClientTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'actionDate'},
			{mDataProp: 'actionName', "mRender": function(data, type, full) {
				result = '<span class="label" style="background-color: '+full.actionColor+'"><i class="'+full.actionIcon+'"></i> '+full.actionName+'</span>';
				return result;
			}},
			{mDataProp: 'actionTypeName'},
			{mDataProp: 'scenarioStageName'},
			{mDataProp: 'invoiceCode', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.invoiceId+');" class="amount-link">'+full.invoiceCode+'</a>';
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
			}}
		];
		$scope.$parent.reminderClientTable = TableManager.init("reminderClientTable", $scope.$parent.reminderBaseUrl+"list/-1", columns);
	};
});

app.controller('litigationCurrentClientTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'date'},
			{mDataProp: 'code'},
			{mDataProp: 'invoiceCode', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.invoiceId+');" class="amount-link">'+full.invoiceCode+'</a>';
			}},
			{mDataProp: 'amount', "mRender": function(data, type, full) {
				if(full.amount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amount)+' '+full.currencySymbol;
				return 0;
			}}
		];
		$scope.$parent.litigationCurrentClientTable = TableManager.init("litigationCurrentClientTable", $scope.$parent.litigationBaseUrl+"list/current/-1", columns);
	};
});

app.controller('outstandingStatusClientTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'status', "mRender": function(data, type, full) {
				var result = '';
				if(full.realAmount/full.validatedAmount*100 > 100) {
					result = '<span class="label red">En dépassement</span>';
				}
				else if(full.realAmount/full.validatedAmount*100 > 50 && full.realAmount/full.validatedAmount*100 <= 100) {
					result = '<span class="label orange">'+Math.round(full.realAmount/full.validatedAmount*100)+'%</span>';
				}
				else {
					result = '<span class="label green">'+Math.round(full.realAmount/full.validatedAmount*100)+'%</span>';
				}
				return result;
			}},
			{mDataProp: 'validatedAmount', "mRender": function(data, type, full) {
				if(full.validatedAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.validatedAmount)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'realAmount', "mRender": function(data, type, full) {
				if(full.realAmount != null)
					return '<a href="#" onclick="showInvoice()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.realAmount)+' '+full.currencySymbol+'</a>';
				return 0;
			}},
			{mDataProp: 'amountNotOverdueInvoices', "mRender": function(data, type, full) {
				if(full.amountNotOverdueInvoices != 0 && full.amountNotOverdueInvoices != null)
					return '<a href="#" onclick="showNotOverdueInvoice()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountNotOverdueInvoices)+' '+full.currencySymbol+'</a>';
				return 0;
			}},
			{mDataProp: 'validatedAmount', "mRender": function(data, type, full) {
				if(full.realAmount >= full.validatedAmount)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format((full.realAmount - full.validatedAmount))+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'amountOverdueInvoices', "mRender": function(data, type, full) {
				if(full.amountOverdueInvoices != 0 && full.amountOverdueInvoices != null)
					return '<a href="#" onclick="showOverdueInvoice()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountOverdueInvoices)+' '+full.currencySymbol+'</a>';
				return 0;
			}},
			{mDataProp: 'amountOverdueInvoicesDays30', "mRender": function(data, type, full) {
				if(full.amountOverdueInvoicesDays30 != 0 && full.amountOverdueInvoicesDays30 != null)
					return '<a href="#" onclick="showOverdueInvoice30()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountOverdueInvoicesDays30)+' '+full.currencySymbol+'</a>';
				return 0;
			}},
			{mDataProp: 'amountOverdueInvoicesDays60', "mRender": function(data, type, full) {
				if(full.amountOverdueInvoicesDays60 != 0 && full.amountOverdueInvoicesDays60 != null)
					return '<a href="#" onclick="showOverdueInvoice60()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountOverdueInvoicesDays60)+' '+full.currencySymbol+'</a>';
				return 0;
			}},
			{mDataProp: 'amountOverdueInvoicesDays90', "mRender": function(data, type, full) {
				if(full.amountOverdueInvoicesDays90 != 0 && full.amountOverdueInvoicesDays90 != null)
					return '<a href="#" onclick="showOverdueInvoice90()" class="amount-link">'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountOverdueInvoicesDays90)+' '+full.currencySymbol+'</a>';
				return 0;
			}}
		];
		$scope.$parent.outstandingStatusClientTable = TableManager.init("outstandingStatusClientTable", $scope.$parent.baseUrl+"list/validated/-1", columns);
	};
});

app.controller('outstandingClientTableController', function($scope,$http) {
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
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.requestedAmount)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'validatedAmount', "mRender": function(data, type, full) {
				if(full.validatedAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.validatedAmount)+' '+full.currencySymbol;
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
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.creditInsuranceDTO.amount)+' '+full.currencySymbol;
				else
					return "";
			}}
		];
		$scope.$parent.outstandingClientTable = TableManager.init("outstandingClientTable", $scope.$parent.baseUrl+"list/-1", columns);
	};
});

app.controller('contactClientTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'lastname'},
			{mDataProp: 'firstname'},
			{mDataProp: 'title'},
			{mDataProp: 'phone'},
			{mDataProp: 'mail'}
		];
		$scope.$parent.contactClientTable = TableManager.init("contactClientTable", $scope.$parent.contactBaseUrl+"list/-1", columns);
	};
});

app.controller('notificationTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'designation'},
			{mDataProp: 'date'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="openNotificationModal('+full.id+');" class="btn btn-fw orange" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-desktop"></i></a>';
				return result;
			}}
		];
		$scope.$parent.clientTable = TableManager.init("notificationListTable", $scope.$parent.notificationBaseUrl+"list", columns);
	};
});