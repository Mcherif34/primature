app.controller('contractController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.search = {};
	$scope.filtre = {};
	$scope.contractTable = null;
	$scope.reminderTable = null;
	$scope.litigationCurrentTable = null;
	$scope.outstandingStatusTable = null;
	$scope.outstandingTable = null;
	$scope.reminderInvoiceTable = null;
	$scope.litigationInvoiceTable = null;
	$scope.promiseInvoiceTable = null;
	$scope.contenceInvoiceTable = null;
	$scope.invoiceTotalTable = null;
	$scope.invoiceNotOverdueTable = null;
	$scope.invoiceOverdueTable = null;
	$scope.invoiceOverdue30Table = null;
	$scope.invoiceOverdue60Table = null;
	$scope.invoiceOverdue90Table = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.contractRequiredError = false;
	$scope.contractTechnicalError = false;
	$scope.contractSuccess = false;
	$scope.buttonDisabled = false;
	$scope.contractFileTypeError = false;
	$scope.contracts = [];
	$scope.notifications = null;
	$scope.notificationsCount = 0;
	
	$scope.baseUrl = "/client/contract/rest/";
	$scope.matriculationBaseUrl = "/client/matriculation/rest/";
	$scope.clientBaseUrl = "/client/client/rest/";
	$scope.contactBaseUrl = "/client/contact/rest/";
	$scope.invoiceBaseUrl = "/credit/invoice/rest/";
	$scope.reminderBaseUrl = "/reminder/reminder/rest/";
	$scope.litigationBaseUrl = "/reminder/litigation/rest/";
	$scope.outstandingBaseUrl = "/credit/outstanding/rest/";
	$scope.promiseBaseUrl = "/reminder/promise/rest/";
	$scope.contenceBaseUrl = "/reminder/contence/rest/";
	$scope.notificationBaseUrl = "/notification/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addContractForm = false;
		$scope.editContractForm = false;
		CRUDService.init($scope);
		
		$scope.initListUsers();
		$scope.initListContenceSteps();
		$scope.initListCommercialCourts();
		$scope.initListContractTypes();
		$scope.initListContractStatus();
		$scope.initListPaymentMethods();
		$scope.initListClients();
		$scope.initListContracts();
		$scope.initListNotifications();
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
	
	$scope.initListUsers = function() {
		$http.get(context+"/administration/user/rest/getAll").success(function(data, status) {   
			$scope.users = data;
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
	
	$scope.initListContractTypes = function() {
		$http.get(context+"/administration/referentiel/contractType/rest/getAll").success(function(data, status) {   
			$scope.contractTypes = data;
		});
	};
	
	$scope.initListContractStatus = function() {
		$http.get(context+"/administration/referentiel/contractStatus/rest/getAll").success(function(data, status) {   
			$scope.contractStatus = data;
		});
	};
	
	$scope.initListPaymentMethods = function() {
		$http.get(context+"/administration/referentiel/paymentMethod/rest/getAll").success(function(data, status) {   
			$scope.paymentMethods = data;
		});
	};
	
	$scope.initListClients = function() {
		$http.get(context+"/client/client/rest/getAll").success(function(data, status) {   
			$scope.clients = data;
		});
	};
	
	$scope.initListContracts = function() {
		$http.get(context+"/client/contract/rest/getAll").success(function(data, status) {   
			$scope.contractsList = data;
		});
	};
	
	$scope.advancedSearchContractForm = function() {
		if(!angular.isUndefined($scope.search.contractStatusId) && $scope.search.contractStatusId != null)
			$('#contractStatusId').select2().select2('val', 'number:'+$scope.search.contractStatusId);
		else
			$('#contractStatusId').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		if(!angular.isUndefined($scope.search.contractTypeId) && $scope.search.contractTypeId != null)
			$('#contractTypeId').select2().select2('val', 'number:'+$scope.search.contractTypeId);
		else
			$('#contractTypeId').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		if(!angular.isUndefined($scope.search.code) && $scope.search.code != null)
			$('#code').select2().select2('val', 'string:'+$scope.search.code);
		else
			$('#code').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		if(!angular.isUndefined($scope.search.clientId) && $scope.search.clientId != null)
			$('#clientId').select2().select2('val', 'number:'+$scope.search.clientId);
		else
			$('#clientId').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		$('#advancedSearchContractModal').modal("show");
	};
	
	$scope.addContract = function() {
		CRUDService.add($scope);
		$scope.editContractForm = false;
		$scope.addContractForm = true;
		$scope.contractSuccess = false;
		$scope.contractTechnicalError = false;
		$scope.contractRequiredError = false;
		$('#contractModal').modal("show");
	};
	
	$scope.importContracts = function() {
		$scope.contractFileTypeError = false;
		$scope.importing = false;
		document.getElementById('contractFileInput').value = '';
		$scope.vehicleSuccess = false;
		$scope.vehicleTechnicalError = false;
		$scope.vehicleRequiredError = false;
		$('#importContractsModal').modal("show");
	};
	
	checkfile = function(sender) {
	    var validExts = new Array(".xlsx", ".xls");
	    var fileExt = sender.substring(sender.lastIndexOf('.'));
	    if (validExts.indexOf(fileExt) < 0) {
	    	return false;
	    }
	    else {
	    	return true;
	    }  	
	}
	
	loadImportContracts = function() {
		var file = $('#contractFileInput')[0].files[0];
		var sFilename = file.name;
		if(!checkfile(sFilename))
			$scope.contractFileTypeError = true;
		else {
			var reader = new FileReader();
		    reader.onload = function(e) {
		        var data = e.target.result;
		        var cfb = XLSX.read(data, {type: 'binary'});
		        cfb.SheetNames.forEach(function(sheetName) {
		            //var sCSV = XLS.utils.make_csv(cfb.Sheets[sheetName]);
		            $scope.sheet = XLS.utils.sheet_to_json(cfb.Sheets[sheetName]);
		        });
		    };
		    reader.readAsBinaryString(file);
		    $scope.contractFileTypeError = false;
		}
	}
	
	editContract = function() {
		CRUDService.edit($scope);
		$scope.addContractForm = false;
		$scope.editContractForm = true;
		$scope.contractSuccess = false;
		$scope.contractTechnicalError = false;
		$scope.contractRequiredError = false;
		$('#contractModal').modal("show");
	};
	
	showContractDetail = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.contractDetail = data;
			$('#contractDetailModal').modal("show");
		});
	};
	
	showMatriculationDetail = function(id) {
		$http.get(context+$scope.matriculationBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.matriculationDetail = data;
			$('#matriculationDetailModal').modal("show");
		});
	};
	
	$scope.showMatriculationDetail = function(id) {
		$http.get(context+$scope.matriculationBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.matriculationDetail = data;
			$('#matriculationDetailModal').modal("show");
		});
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadInvoice = function(id) {
		$http.get(context+$scope.invoiceBaseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.invoice = data;
		});
	}
	
	$scope.advancedSearchContract = function() {
		var searchCode = 'NAN'; var searchKy = 'NAN'; var searchContractStatusId = 0; var searchContractTypeId = 0; var searchPaymentMethodId = 0; var searchClientId = 0; var searchStartDateStart = 'NAN'; var searchStartDateEnd = 'NAN'; var searchEndDateStart = 'NAN'; var searchEndDateEnd = 'NAN'; var searchAmountTtc = -1;
		var date = new Date();
		$scope.search.code = ($("#code").val().split(':'))[1];
		$scope.search.contractStatusId = ($("#contractStatusId").val().split(':'))[1];
		$scope.search.contractTypeId = ($("#contractTypeId").val().split(':'))[1];
		$scope.search.clientId = ($("#clientId").val().split(':'))[1];
		if(!angular.isUndefined($scope.search.code) && $scope.search.code != '') searchCode = $scope.search.code;
		if(!angular.isUndefined($scope.search.contractStatusId) && $scope.search.contractStatusId != null) searchContractStatusId = $scope.search.contractStatusId;
		if(!angular.isUndefined($scope.search.contractTypeId) && $scope.search.contractTypeId != null) searchContractTypeId = $scope.search.contractTypeId;
		if(!angular.isUndefined($scope.search.paymentMethodId) && $scope.search.paymentMethodId != null) searchPaymentMethodId = $scope.search.paymentMethodId;
		if(!angular.isUndefined($scope.search.clientId) && $scope.search.clientId != null) searchClientId = $scope.search.clientId;
		if(!angular.isUndefined($scope.search.amountTtc) && $scope.search.amountTtc != null) searchAmountTtc = $scope.search.amountTtc;
		if(!angular.isUndefined($scope.search.startDateStart) && $scope.search.startDateStart != '') {
			searchStartDateStart = moment($scope.search.startDateStart).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.search.startDateEnd) && $scope.search.startDateEnd != '') {
				searchStartDateStart = moment(date).format('YYYY-MM-DD');
			}
		}
		if(!angular.isUndefined($scope.search.startDateEnd) && $scope.search.startDateEnd != '') {
			searchStartDateEnd = moment($scope.search.startDateEnd).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.search.startDateStart) && $scope.search.startDateStart != '') {
				searchStartDateEnd = moment(date).format('YYYY-MM-DD');
			}
		}
		if(!angular.isUndefined($scope.search.endDateStart) && $scope.search.endDateStart != '') {
			searchEndDateStart = moment($scope.search.endDateStart).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.search.endDateEnd) && $scope.search.endDateEnd != '') {
				searchEndDateStart = moment(date).format('YYYY-MM-DD');
			}
		}
		if(!angular.isUndefined($scope.search.endDateEnd) && $scope.search.endDateEnd != '') {
			searchEndDateEnd = moment($scope.search.endDateEnd).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.search.endDateStart) && $scope.search.endDateStart != '') {
				searchEndDateEnd = moment(date).format('YYYY-MM-DD');
			}
		}
		$scope.contractTable.ajax.url($scope.baseUrl+'search/'+searchCode+'/'+searchKy+'/'+searchContractStatusId+'/'+searchContractTypeId+'/'+searchPaymentMethodId+'/'+searchClientId+'/'+searchAmountTtc+'/'+searchStartDateStart+'/'+searchStartDateEnd+'/'+searchEndDateStart+'/'+searchEndDateEnd).load();
		$('#advancedSearchContractModal').modal("hide");
	};
	
	showClientDetail = function(id) {
		$http.get(context+$scope.clientBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.clientDetail = data;
			
			$scope.reminderTable.ajax.url($scope.reminderBaseUrl+'list/'+id).load();
			$scope.litigationCurrentTable.ajax.url($scope.litigationBaseUrl+'list/current/'+id).load();
			$scope.outstandingStatusTable.ajax.url($scope.outstandingBaseUrl+'list/validated/'+id).load();
			$scope.outstandingTable.ajax.url($scope.outstandingBaseUrl+'list/'+id).load();
			$scope.contactTable.ajax.url($scope.contactBaseUrl+'list/'+id).load();
			
			$scope.invoiceTotalTable.ajax.url('/credit/invoice/rest/list/unpaidByClient/'+id).load();
			$scope.invoiceNotOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidNotOverdueByClient/'+id).load();
			$scope.invoiceOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidOverdueByClient/'+id).load();
			$scope.invoiceOverdue30Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue30ByClient/'+id).load();
			$scope.invoiceOverdue60Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue60ByClient/'+id).load();
			$scope.invoiceOverdue90Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue90ByClient/'+id).load();
			
			$('#clientDetailModal').modal("show");
		});
	};
	
	$scope.addPromise = function() {
		$scope.dto.promise = {};
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
	
	$scope.searchContract = function() {
		var searchKey = 'NAN';
		if(!angular.isUndefined($scope.search.key) && $scope.search.key != '') searchKey = $scope.search.key;
		$scope.contractTable.ajax.url('/client/contract/rest/search/'+searchKey).load();
	};
	
	$scope.saveContract = function() {
		if($scope.contractForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.contractTechnicalError = false;
				$scope.contractRequiredError = false;
				$scope.contractSuccess = true;
				$('#contractModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.contractTechnicalError = true;
			});
		} else {
			$scope.contractRequiredError = true;
		}
	};
	
	$scope.saveImportContracts = function() {
		$scope.buttonDisabled = true;
		$scope.importing = true;
		if(!angular.isUndefined($scope.sheet)) {
	    	for(i = 0; i < $scope.sheet.length; i++) {
	    		$scope.seq = i;
	    		$scope.dto = {};
	    		$scope.dto.code = $scope.sheet[i]['N° contrat'];
	    		$scope.dto.avenant = $scope.sheet[i]['Avt'];
	    		$scope.dto.model = $scope.sheet[i]['Modèle'];
	    		$scope.dto.matriculation = $scope.sheet[i]['Immat'];
	    		if($scope.sheet[i]['Déb'] != null && $scope.sheet[i]['Déb'] != '') {
	    			$scope.dto.startDate = ExcelDateToJSDate($scope.sheet[i]['Déb']);
	    		}
	    		if($scope.sheet[i]['Fin prév'] != null && $scope.sheet[i]['Fin prév'] != '') {
	    			$scope.dto.endDate = ExcelDateToJSDate($scope.sheet[i]['Fin prév']);
	    		}
	    		if($scope.sheet[i]['Fin réelle'] != null && $scope.sheet[i]['Fin réelle'] != '') {
	    			$scope.dto.effectiveEndDate = ExcelDateToJSDate($scope.sheet[i]['Fin réelle']);
	    		}
	    		$scope.dto.status = $scope.sheet[i]['Statut'];
	    		$scope.dto.type = $scope.sheet[i]['Type'];
	    		//$scope.dto.commercial = $scope.sheet[i]['Commercila '];
	    		$scope.dto.amountHt = $scope.sheet[i]['HT'];
	    		//$scope.dto.amountTva = $scope.sheet[i]['TVA '];
	    		$scope.dto.amountTtc = $scope.sheet[i]['TTC'];
	    		$scope.dto.ky = $scope.sheet[i]['Ky'];
	    		$scope.dto.deadlineCode = $scope.sheet[i]['Echéance'];
	    		$scope.dto.periodicity = $scope.sheet[i]['Perio'];
	    		$scope.dto.codeClient = $scope.sheet[i]['Code client'];
	    		$scope.dto.agencyCode = $scope.sheet[i]['Age'];
	    		$scope.dto.paymentMethodName = $scope.sheet[i]['Paiement'];
	    		$scope.dto.currencyId = 1;
	    		
	    		$scope.contracts.push($scope.dto);
	        }
	    	$http.post(context+$scope.baseUrl+"saveImport", angular.toJson($scope.contracts)).success(function(data, status) {   
	    		CRUDService.setEntityLoaded($scope,data);
	    		$scope.buttonDisabled = false;
				$scope.contractTechnicalError = false;
				$scope.contractRequiredError = false;
				$scope.contractSuccess = true;
				$scope.importing = false;
				$scope.refreshList();
				$('#importContractsModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.contractTechnicalError = true;
				$scope.importing = false;
			});
	    } else {
	    	$scope.buttonDisabled = false;
	    	$scope.contractTechnicalError = true;
	    	$scope.importing = false;
	    }
	}
	
	function ExcelDateToJSDate(serial) {
		var utc_days  = Math.floor(serial - 25569);
		var utc_value = utc_days * 86400;                                        
		var date_info = new Date(utc_value * 1000);

		var fractional_day = serial - Math.floor(serial) + 0.0000001;

		var total_seconds = Math.floor(86400 * fractional_day);

		var seconds = total_seconds % 60;

		total_seconds -= seconds;

		var hours = Math.floor(total_seconds / (60 * 60));
		var minutes = Math.floor(total_seconds / 60) % 60;

		return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
	}
	
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
	
	$scope.refreshList = function() {
		$scope.contractTable.ajax.reload();
		$scope.dto = {};
	};

	removeContract = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteContract(id);
		};
	};

	$scope.confirmDeleteContract = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('contractTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'code'},
			{mDataProp: 'startDate'},
			{mDataProp: 'endDate'},
			{mDataProp: 'contractStatusName'},
			{mDataProp: 'contractTypeName'},
			{mDataProp: 'matriculationCode', "mRender": function(data, type, full) {
				if(full.matriculationId == null)
					return null;
				return '<a href="#" onclick="showMatriculationDetail('+full.matriculationId+');" class="amount-link">'+full.matriculationCode+'</a>';
			}},
			{mDataProp: 'paymentMethodDescription'},
			{mDataProp: 'clientCompanyName', "mRender": function(data, type, full) {
				if(full.clientId == null)
					return null;
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCompanyName+'</a>';
			}},
			{mDataProp: 'agencyName'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="showContractDetail('+full.id+');" class="btn btn-fw orange" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-desktop"></i></a>';
				return result;
			}}
		];
		$scope.$parent.contractTable = TableManager.init("contractTable", $scope.$parent.baseUrl+"list", columns, 2, "DESC");
		
		$scope.$parent.contractTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.contractTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('reminderTableController', function($scope,$http) {
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
		$scope.$parent.reminderTable = TableManager.init("reminderTable", $scope.$parent.reminderBaseUrl+"list/-1", columns);
	};
});

app.controller('litigationCurrentTableController', function($scope,$http) {
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
		$scope.$parent.litigationCurrentTable = TableManager.init("litigationCurrentTable", $scope.$parent.litigationBaseUrl+"list/current/-1", columns);
	};
});

app.controller('outstandingStatusTableController', function($scope,$http) {
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
		$scope.$parent.outstandingStatusTable = TableManager.init("outstandingStatusTable", $scope.$parent.outstandingBaseUrl+"list/validated/-1", columns);
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
		$scope.$parent.outstandingTable = TableManager.init("outstandingTable", $scope.$parent.outstandingBaseUrl+"list/-1", columns);
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
			{mDataProp: 'mail'}
		];
		$scope.$parent.contactTable = TableManager.init("contactTable", $scope.$parent.contactBaseUrl+"list/-1", columns);
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
					result = '<span class="label blue">'+full.litigationStatusName+'</span>';
				if(full.litigationStatusId == 2)
					result = '<span class="label green">'+full.litigationStatusName+'</span>';
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
					result = '<span class="label blue">'+full.promiseStatusName+'</span>';
				if(full.promiseStatusId == 2)
					result = '<span class="label green">'+full.promiseStatusName+'</span>';
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
				result = '<span class="label blue">'+full.contenceStepName+'</span>';
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

app.controller('invoiceTotalTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">Echue</span>';
				}
				else {
					result = '<span class="label blue">Non échue</span>';
				}
				return result;
			}},
			{mDataProp: 'dueDate'},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+')" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'amountTtc', "mRender": function(data, type, full) {
				if(full.amountTtc != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}}
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
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">Echue</span>';
				}
				else {
					result = '<span class="label blue">Non échue</span>';
				}
				return result;
			}},
			{mDataProp: 'dueDate'},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+')" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'amountTtc', "mRender": function(data, type, full) {
				if(full.amountTtc != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}}
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
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">Echue</span>';
				}
				else {
					result = '<span class="label blue">Non échue</span>';
				}
				return result;
			}},
			{mDataProp: 'dueDate'},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+')" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'amountTtc', "mRender": function(data, type, full) {
				if(full.amountTtc != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}}
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
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">Echue</span>';
				}
				else {
					result = '<span class="label blue">Non échue</span>';
				}
				return result;
			}},
			{mDataProp: 'dueDate'},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+')" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'amountTtc', "mRender": function(data, type, full) {
				if(full.amountTtc != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}}
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
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">Echue</span>';
				}
				else {
					result = '<span class="label blue">Non échue</span>';
				}
				return result;
			}},
			{mDataProp: 'dueDate'},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+')" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'amountTtc', "mRender": function(data, type, full) {
				if(full.amountTtc != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}}
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
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="label red">Echue</span>';
				}
				else {
					result = '<span class="label blue">Non échue</span>';
				}
				return result;
			}},
			{mDataProp: 'dueDate'},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+')" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'amountTtc', "mRender": function(data, type, full) {
				if(full.amountTtc != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc)+' '+full.currencySymbol;
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+' '+full.currencySymbol;
				return 0;
			}}
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