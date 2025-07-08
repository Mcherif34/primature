app.controller('reminderController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.dto.search = {};
	$scope.filtre = {};
	$scope.reminderCurrentTable = null;
	$scope.reminderCloseTable = null;
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
	$scope.reminderRequiredError = false;
	$scope.reminderTechnicalError = false;
	$scope.reminderSuccess = false;
	$scope.reminderDateRequiredError = false;
	$scope.reminderDateTechnicalError = false;
	$scope.reminderDateSuccess = false;
	$scope.reminderActionRequiredError = false;
	$scope.reminderActionTechnicalError = false;
	$scope.reminderActionSuccess = false;
	$scope.notifications = null;
	$scope.notificationsCount = 0;
	
	$scope.baseUrl = "/reminder/reminder/rest/";
	$scope.promiseBaseUrl = "/reminder/promise/rest/";
	$scope.litigationBaseUrl = "/reminder/litigation/rest/";
	$scope.contenceBaseUrl = "/reminder/contence/rest/";
	$scope.invoiceBaseUrl = "/credit/invoice/rest/";
	$scope.outstandingBaseUrl = "/credit/outstanding/rest/";
	$scope.clientBaseUrl = "/client/client/rest/";
	$scope.contactBaseUrl = "/client/contact/rest/";
	$scope.notificationBaseUrl = "/notification/rest/";
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addReminderForm = false;
		$scope.editReminderForm = false;
		CRUDService.init($scope);
		
		$scope.initListInvoices();
		$scope.initListActions();
		$scope.initListLitigationStatus();
		$scope.initListContenceSteps();
		$scope.initListCommercialCourts();
		$scope.initListUsers();
		$scope.initListReminderStatus();
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
	
	$scope.initListInvoices = function() {
		$http.get(context+"/credit/invoice/rest/getAllUnpaid").success(function(data, status) {   
			$scope.invoices = data;
		});
	};
	
	$scope.initListActions = function() {
		$http.get(context+"/administration/referentiel/action/rest/getAll").success(function(data, status) {   
			$scope.actionsList = data;
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
	
	$scope.initListUsers = function() {
		$http.get(context+"/administration/user/rest/getAll").success(function(data, status) {   
			$scope.users = data;
		});
	};
	
	$scope.initListReminderStatus = function() {
		$http.get(context+"/administration/referentiel/reminderStatus/rest/getAll").success(function(data, status) {   
			$scope.reminderStatus = data;
		});
	};
	
	loadByInvoice = function() {
		if($("#invoiceId").val() != null) {
			$http.get(context+"/credit/invoice/rest/load/"+($("#invoiceId").val().split(':'))[1]).success(function(data, status) {
				$scope.dto.remainingAmount = data.remainingAmount;
				$scope.dto.dueDate = data.dueDate;
				$scope.dto.clientId = data.clientId;
				$scope.dto.clientCompanyName = data.clientCompanyName;
				$http.get(context+"/reminder/scenario/rest/getByClient/"+$scope.dto.clientId).success(function(data, status) {
					if(data != null) {
						$scope.dto.scenarioName = data.name;
						$http.get(context+"/reminder/scenarioStage/rest/getByScenario/"+data.id).success(function(data, status) {
							$scope.scenarioStages = data;
						});
					}
				});
			});
		}
	};
	
	$scope.loadByInvoice = function(id) {
		$http.get(context+"/credit/invoice/rest/load/"+id).success(function(data, status) {
			$scope.dto.remainingAmount = data.remainingAmount;
			$scope.dto.dueDate = data.dueDate;
			$scope.dto.clientId = data.clientId;
			$scope.dto.clientCompanyName = data.clientCompanyName;
			$http.get(context+"/reminder/scenario/rest/getByClient/"+$scope.dto.clientId).success(function(data, status) {
				if(data != null) {
					$scope.dto.scenarioName = data.name;
					$http.get(context+"/reminder/scenarioStage/rest/getByScenario/"+data.id).success(function(data, status) {
						$scope.scenarioStages = data;
					});
				}
			});
		});
	};
	
	$scope.loadByScenarioStage = function(id) {
		$http.get(context+"/reminder/scenarioStage/rest/load/"+id).success(function(data, status) {
			$scope.dto.actionId = data.actionId;
			$scope.dto.actionTypeId = data.actionTypeId;
		});
	};
	
	$scope.addReminder = function() {
		CRUDService.add($scope);
		$scope.editReminderForm = false;
		$scope.addReminderForm = true;
		$scope.reminderSuccess = false;
		$scope.reminderTechnicalError = false;
		$scope.reminderRequiredError = false;
		$('#reminderModal').modal("show");
	};
	
	$scope.addPromise = function() {
		$scope.dto.promise = {};
		if(!angular.isUndefined($scope.invoiceDetail)) {
			$scope.dto.promise.invoiceId = $scope.invoiceDetail.id;
			$http.get(context+"/credit/invoice/rest/load/"+$scope.invoiceDetail.id).success(function(data, status) {
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
	
	$scope.addLitigation = function() {
		$scope.dto.litigation = {};
		if(!angular.isUndefined($scope.invoiceDetail)) {
			$scope.dto.litigation.invoiceId = $scope.invoiceDetail.id;
			$http.get(context+"/credit/invoice/rest/load/"+$scope.invoiceDetail.id).success(function(data, status) {
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
		}
	};
	
	$scope.addContence = function() {
		$scope.dto.contence = {};
		if(!angular.isUndefined($scope.invoiceDetail)) {
			$scope.dto.contence.invoiceId = $scope.invoiceDetail.id;
			$http.get(context+"/credit/invoice/rest/load/"+$scope.invoiceDetail.id).success(function(data, status) {
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
	
	editReminder = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto = data;
			CRUDService.edit($scope);
			
			$http.get(context+"/credit/invoice/rest/load/"+$scope.dto.invoiceId).success(function(data, status) {
				$('#invoiceId').select2().select2('val', 'number:'+data.id);
				$scope.dto.dueDate = data.dueDate;
				$http.get(context+"/reminder/scenario/rest/getByClient/"+$scope.dto.clientId).success(function(data, status) {
					if(data != null) {
						$scope.dto.scenarioName = data.name;
						$http.get(context+"/reminder/scenarioStage/rest/getByScenario/"+data.id).success(function(data, status) {
							$scope.scenarioStages = data;
						});
					}
					$scope.addReminderForm = false;
					$scope.editReminderForm = true;
					$scope.reminderSuccess = false;
					$scope.reminderTechnicalError = false;
					$scope.reminderRequiredError = false;
					$('#reminderModal').modal("show");
				});
			});
		});
	};
	
	$scope.editReminderDate = function() {
		CRUDService.edit($scope);
		$scope.reminderDateSuccess = false;
		$scope.reminderDateTechnicalError = false;
		$scope.reminderDateRequiredError = false;
		$('#reminderDateModal').modal("show");
	};
	
	$scope.editReminderAction = function() {
		CRUDService.edit($scope);
		$http.get(context+"/client/client/rest/load/"+$scope.dto.clientId).success(function(data, status) {   
			$scope.client = data;
			if($scope.dto.actionId == 3) {
				$http.get(context+"/client/contact/rest/getByClient/"+data.id).success(function(data, status) {   
					$scope.contacts = data;
					$http.get(context+"/reminder/scenarioStage/rest/load/"+$scope.dto.scenarioStageId).success(function(data, status) {   
						$scope.scenarioStage = data;
						$http.get(context+"/reminder/letterTemplate/rest/load/"+data.letterTemplateId).success(function(data, status) {   
							$scope.dto.mailSubject = $scope.scenarioStage.name;
							var dueDate = $scope.dto.dueDate.split("/");
							var letter = data.letter;
							letter = letter.replace(new RegExp('#LIEU', 'g'), 'CASABLANCA').replace(new RegExp('#DATEACTION', 'g'), $scope.dto.actionDate);
							letter = letter.replace(new RegExp('#NOMDESTINATAIRE', 'g'), $scope.client.companyName).replace(new RegExp('#ADRESSE', 'g'), $scope.client.address);
							letter = letter.replace(new RegExp('#OBJET', 'g'), $scope.scenarioStage.name);
							letter = letter.replace(new RegExp('#VILLE', 'g'), $scope.client.cityName);
							letter = letter.replace(new RegExp('#MOIS', 'g'), dueDate[1]).replace(new RegExp('#ANNEE', 'g'), dueDate[2]);
							letter = letter.replace(new RegExp('#MONTANTDU', 'g'), $scope.dto.remainingAmount).replace(new RegExp('#CURRENCY', 'g'), $scope.dto.currencySymbol);
							
							$("#summernote").code(letter);
							$scope.dto.mailFrom = 'contact@chaabilld.ma';
							
							$scope.reminderActionSuccess = false;
							$scope.reminderActionTechnicalError = false;
							$scope.reminderActionRequiredError = false;
							$('#reminderActionModal').modal("show");
						});
					});
				});
			}
			if($scope.dto.actionId == 1) {
				$scope.reminderActionSuccess = false;
				$scope.reminderActionTechnicalError = false;
				$scope.reminderActionRequiredError = false;
				$('#reminderPhoneActionModal').modal("show");
			}
		});
		
	};
	
	$scope.advancedSearchReminderForm = function() {
		if(!angular.isUndefined($scope.dto.search.invoiceReminderCode) && $scope.dto.search.invoiceReminderCode != null)
			$('#invoiceReminderCode').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/invoice/rest/getAllCodes/"+params.term;
					},
			        data: function (term) {
			            return {
			                term: term
			            };
			        },
			        processResults: function (data) {
			        	return {
			                results: $.map(JSON.parse(data), function (item) {
			                	return {
			                        text: item,
			                        id: item
			                    }
			                })
			            };
			        },
			    }
			}).select2('val', $scope.dto.search.invoiceReminderCode);
		else
			$('#invoiceReminderCode').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/invoice/rest/getAllCodes/"+params.term;
					},
			        data: function (term) {
			            return {
			                term: term
			            };
			        },
			        processResults: function (data) {
			        	return {
			                results: $.map(JSON.parse(data), function (item) {
			                	return {
			                        text: item,
			                        id: item
			                    }
			                })
			            };
			        },
			    }
			}).select2('val', '');
		
		if(!angular.isUndefined($scope.dto.search.clientCode) && $scope.dto.search.clientCode != null)
			$('#clientCode').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/client/client/rest/getCodeByOutstanding/"+params.term;
					},
			        data: function (term) {
			            return {
			                term: term
			            };
			        },
			        processResults: function (data) {
			        	return {
			                results: $.map(JSON.parse(data), function (item) {
			                	return {
			                        text: item,
			                        id: item
			                    }
			                })
			            };
			        },
			    }
			}).select2('val', $scope.dto.search.clientCode);
		else
			$('#clientCode').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/client/client/rest/getCodeByOutstanding/"+params.term;
					},
			        data: function (term) {
			            return {
			                term: term
			            };
			        },
			        processResults: function (data) {
			        	return {
			                results: $.map(JSON.parse(data), function (item) {
			                	return {
			                        text: item,
			                        id: item
			                    }
			                })
			            };
			        },
			    }
			}).select2('val', '');
		
		if(!angular.isUndefined($scope.dto.search.clientCompanyName) && $scope.dto.search.clientCompanyName != null)
			$('#clientCompanyName').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/client/client/rest/getNameByOutstanding/"+params.term;
					},
			        data: function (term) {
			            return {
			                term: term
			            };
			        },
			        processResults: function (data) {
			        	return {
			                results: $.map(JSON.parse(data), function (item) {
			                	return {
			                        text: item,
			                        id: item
			                    }
			                })
			            };
			        },
			    }
			}).select2('val', $scope.dto.search.clientCompanyName);
		else
			$('#clientCompanyName').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/client/client/rest/getNameByOutstanding/"+params.term;
					},
			        data: function (term) {
			            return {
			                term: term
			            };
			        },
			        processResults: function (data) {
			        	return {
			                results: $.map(JSON.parse(data), function (item) {
			                	return {
			                        text: item,
			                        id: item
			                    }
			                })
			            };
			        },
			    }
			}).select2('val', '');
		
		$('#advancedSearchReminderModal').modal("show");
		
	};
	
	$scope.advancedSearchReminderCurrent = function() {
		$scope.dto.search.clientCode = $("#clientCode").val();
		$scope.dto.search.clientCompanyName = $("#clientCompanyName").val();
		var searchInvoiceReminderCode = 'NAN'; var searchDateStart = 'NAN'; var searchDateEnd = 'NAN'; var searchClientCode = 'NAN'; var searchClientCompanyName = 'NAN'; var searchActionId = 0; var searchActionTypeId = 0; var searchReminderStatusId = 0;
		var date = new Date();
		$scope.dto.search.invoiceReminderCode = $("#invoiceReminderCode").val();
		if(!angular.isUndefined($scope.dto.search.invoiceReminderCode) && $scope.dto.search.invoiceReminderCode != '') searchInvoiceReminderCode = $scope.dto.search.invoiceReminderCode;
		if(!angular.isUndefined($scope.dto.search.clientCode) && $scope.dto.search.clientCode != '') searchClientCode = $scope.dto.search.clientCode;
		if(!angular.isUndefined($scope.dto.search.clientCompanyName) && $scope.dto.search.clientCompanyName != '') searchClientCompanyName = $scope.dto.search.clientCompanyName;
		if(!angular.isUndefined($scope.dto.search.actionId) && $scope.dto.search.actionId != null) searchActionId = $scope.dto.search.actionId;
		if(!angular.isUndefined($scope.dto.search.actionTypeId) && $scope.dto.search.actionTypeId != null) searchActionTypeId = $scope.dto.search.actionTypeId;
		if(!angular.isUndefined($scope.dto.search.reminderStatusId) && $scope.dto.search.reminderStatusId != null) searchReminderStatusId = $scope.dto.search.reminderStatusId;
		if(!angular.isUndefined($scope.dto.search.dateStart) && $scope.dto.search.dateStart != '') {
			searchDateStart = moment($scope.dto.search.dateStart).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.dto.search.dateEnd) && $scope.dto.search.dateEnd != '') {
				searchDateStart = moment(date).format('YYYY-MM-DD');
			}
		}
		if(!angular.isUndefined($scope.dto.search.dateEnd) && $scope.dto.search.dateEnd != '') {
			searchDateEnd = moment($scope.dto.search.dateEnd).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.dto.search.dateStart) && $scope.dto.search.dateStart != '') {
				searchDateEnd = moment(date).format('YYYY-MM-DD');
			}
		}
		$scope.reminderCurrentTable.ajax.url($scope.baseUrl+'search/'+searchInvoiceReminderCode+'/'+searchActionId+'/'+searchActionTypeId+'/'+searchReminderStatusId+'/'+searchClientCode+'/'+searchClientCompanyName+'/'+searchDateStart+'/'+searchDateEnd).load();
		$('#advancedSearchReminderModal').modal("hide");
	};
	
	$scope.advancedSearchReminderClose = function() {
		$scope.dto.search.clientCode = $("#clientCode").val();
		$scope.dto.search.clientCompanyName = $("#clientCompanyName").val();
		var searchInvoiceReminderCode = 'NAN'; var searchDateStart = 'NAN'; var searchDateEnd = 'NAN'; var searchClientCode = 'NAN'; var searchClientCompanyName = 'NAN'; var searchActionId = 0; var searchActionTypeId = 0; var searchReminderStatusId = 0;
		var date = new Date();
		$scope.dto.search.invoiceReminderCode = $("#invoiceReminderCode").val();
		if(!angular.isUndefined($scope.dto.search.invoiceReminderCode) && $scope.dto.search.invoiceReminderCode != '') searchInvoiceReminderCode = $scope.dto.search.invoiceReminderCode;
		if(!angular.isUndefined($scope.dto.search.clientCode) && $scope.dto.search.clientCode != '') searchClientCode = $scope.dto.search.clientCode;
		if(!angular.isUndefined($scope.dto.search.clientCompanyName) && $scope.dto.search.clientCompanyName != '') searchClientCompanyName = $scope.dto.search.clientCompanyName;
		if(!angular.isUndefined($scope.dto.search.actionId) && $scope.dto.search.actionId != null) searchActionId = $scope.dto.search.actionId;
		if(!angular.isUndefined($scope.dto.search.actionTypeId) && $scope.dto.search.actionTypeId != null) searchActionTypeId = $scope.dto.search.actionTypeId;
		if(!angular.isUndefined($scope.dto.search.reminderStatusId) && $scope.dto.search.reminderStatusId != null) searchReminderStatusId = $scope.dto.search.reminderStatusId;
		if(!angular.isUndefined($scope.dto.search.dateStart) && $scope.dto.search.dateStart != '') {
			searchDateStart = moment($scope.dto.search.dateStart).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.dto.search.dateEnd) && $scope.dto.search.dateEnd != '') {
				searchDateStart = moment(date).format('YYYY-MM-DD');
			}
		}
		if(!angular.isUndefined($scope.dto.search.dateEnd) && $scope.dto.search.dateEnd != '') {
			searchDateEnd = moment($scope.dto.search.dateEnd).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.dto.search.dateStart) && $scope.dto.search.dateStart != '') {
				searchDateEnd = moment(date).format('YYYY-MM-DD');
			}
		}
		$scope.reminderCloseTable.ajax.url($scope.baseUrl+'search/'+searchInvoiceReminderCode+'/'+searchActionId+'/'+searchActionTypeId+'/'+searchReminderStatusId+'/'+searchClientCode+'/'+searchClientCompanyName+'/'+searchDateStart+'/'+searchDateEnd).load();
		$('#advancedSearchReminderModal').modal("hide");
	};
	
	showClientDetail = function(id) {
		$http.get(context+$scope.clientBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.clientDetail = data;
			
			$scope.reminderClientTable.ajax.url($scope.baseUrl+'list/'+id).load();
			$scope.litigationCurrentClientTable.ajax.url($scope.litigationBaseUrl+'list/current/'+id).load();
			$scope.outstandingStatusClientTable.ajax.url($scope.outstandingBaseUrl+'list/validated/'+id).load();
			$scope.outstandingClientTable.ajax.url($scope.outstandingBaseUrl+'list/'+id).load();
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
			$scope.invoiceDetail = data;
			$scope.invoiceDetail.amountTtc = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format($scope.invoiceDetail.amountTtc);
			$scope.invoiceDetail.remainingAmount = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format($scope.invoiceDetail.remainingAmount);
			if($scope.invoiceDetail.invoiceStatusId == 1) {
				var date = $scope.invoiceDetail.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) > new Date()) {
					$scope.invoiceDetail.invoiceStatusColor = 'info';
					$scope.invoiceDetail.invoiceStatusText = 'Non échue en attente de règlement';
				}
				else {
					$scope.invoiceDetail.invoiceStatusColor = 'danger';
					$scope.invoiceDetail.invoiceStatusText = 'Echue en attente de règlement';
				}
			} else {
				$scope.invoiceDetail.invoiceStatusColor = 'success';
				$scope.invoiceDetail.invoiceStatusText = 'Payée';
			}
			$http.get(context+$scope.baseUrl+"getCountByInvoice/"+id).success(function(data, status) {
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
			$scope.reminderInvoiceTable.ajax.url('/reminder/reminder/rest/listByInvoice/'+id).load();
			$scope.litigationInvoiceTable.ajax.url('/reminder/litigation/rest/listByInvoice/'+id).load();
			$scope.contenceInvoiceTable.ajax.url('/reminder/contence/rest/listByInvoice/'+id).load();
			$scope.promiseInvoiceTable.ajax.url('/reminder/promise/rest/listByInvoice/'+id).load();
			$('#invoiceDetailModal').modal("show");
		});
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {
			CRUDService.setEntityLoaded($scope,data);
			if($scope.dto.actionId == 6 || $scope.dto.actionId == 7)
				$scope.litigationContence = true;
			else
				$scope.litigationContence = false;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadInvoice = function(id) {
		$http.get(context+$scope.invoiceBaseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.invoice = data;
		});
	}
	
	$scope.saveReminder = function() {
		if($scope.reminderForm.$valid && $("#invoiceId").val() != null) {
			$scope.dto.invoiceId = ($("#invoiceId").val().split(':'))[1];
			$scope.dto.reminderStatusId = 1;
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.reminderTechnicalError = false;
				$scope.reminderRequiredError = false;
				$scope.reminderSuccess = true;
				$('#reminderModal').modal("hide");
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
	
	$scope.saveLitigation = function() {
		if($scope.litigationForm.$valid) {
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
	
	$scope.saveReminderDate = function() {
		if($scope.reminderDateForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.reminderDateTechnicalError = false;
				$scope.reminderDateRequiredError = false;
				$scope.reminderDateSuccess = true;
				$('#reminderDateModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.reminderDateTechnicalError = true;
			});
		} else {
			$scope.reminderDateRequiredError = true;
		}
	};
	
	$scope.saveReminderAction = function() {
		if($scope.reminderActionForm.$valid) {
			$scope.dto.letter = $("#summernote").code();
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.reminderActionTechnicalError = false;
				$scope.reminderActionRequiredError = false;
				$scope.reminderActionSuccess = true;
				$('#reminderActionModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.reminderActionTechnicalError = true;
			});
		} else {
			$scope.reminderActionRequiredError = true;
		}
	};
	
	$scope.saveAndFinishReminderAction = function() {
		if($scope.reminderActionForm.$valid) {
			$scope.dto.letter = $("#summernote").code();
			$scope.dto.reminderStatusId = 2;
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.reminderActionTechnicalError = false;
				$scope.reminderActionRequiredError = false;
				$scope.reminderActionSuccess = true;
				$('#reminderActionModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.reminderActionTechnicalError = true;
			});
		} else {
			$scope.reminderActionRequiredError = true;
		}
	};
	
	$scope.finishReminderAction = function() {
		if($scope.dto.actionId == 5) {
			if($scope.reminderActionForm.$valid) {
				$scope.dto.letter = $("#summernote").code();
				$scope.dto.reminderStatusId = 2;
				CRUDService.save($scope,$scope.dto).success(function(data, status) {   
					CRUDService.setEntityLoaded($scope,data);
					$scope.refreshList();
					$scope.reminderActionTechnicalError = false;
					$scope.reminderActionRequiredError = false;
					$scope.reminderActionSuccess = true;
					$('#reminderActionModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.reminderActionTechnicalError = true;
				});
			} else {
				$scope.reminderActionRequiredError = true;
			}
		}
		if($scope.dto.actionId == 1) {
			if($scope.reminderPhoneActionForm.$valid) {
				$scope.dto.reminderStatusId = 2;
				CRUDService.save($scope,$scope.dto).success(function(data, status) {   
					CRUDService.setEntityLoaded($scope,data);
					$scope.refreshList();
					$scope.reminderActionTechnicalError = false;
					$scope.reminderActionRequiredError = false;
					$scope.reminderActionSuccess = true;
					$('#reminderPhoneActionModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.reminderActionTechnicalError = true;
				});
			} else {
				$scope.reminderActionRequiredError = true;
			}
		}
	};
	
	$scope.refreshList = function() {
		$scope.reminderCurrentTable.ajax.reload();
		$scope.reminderCloseTable.ajax.reload();
		$scope.dto = {};
	};

	removeReminder = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteReminder(id);
		};
	};

	$scope.confirmDeleteReminder = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
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
});

app.controller('reminderCurrentTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="form-check"><input class="form-check-input reminderCurrentId" type="checkbox" value="'+full.id+'" onclick="check(\'reminderCurrentId\')" /></div>';
			}},
			{mDataProp: 'actionDate'},
			{mDataProp: 'actionName', "mRender": function(data, type, full) {
				result = '<span class="badge text-bg-success" style="background-color: '+full.actionColor+'"><i class="'+full.actionIcon+'" style="position: relative; top: 2px;"></i> '+full.actionName+'</span>';
				return result;
			}},
			{mDataProp: 'actionTypeName'},
			{mDataProp: 'scenarioStageName'},
			{mDataProp: 'invoiceCode', "mRender": function(data, type, full) {
				if(full.invoiceId != null)
					return '<a href="#" onclick="showInvoiceDetail('+full.invoiceId+');" class="amount-link">'+full.invoiceCode+'</a>';
				else
					return full.invoices;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
			}},
			{mDataProp: 'clientCode', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCode+'</a>';
			}},
			{mDataProp: 'clientCompanyName', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCompanyName+'</a>';
			}},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="removeReminder('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.reminderCurrentTable = TableManager.init("reminderCurrentTable", $scope.$parent.baseUrl+"list/current", columns);
		
		$scope.$parent.reminderCurrentTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.reminderCurrentTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('reminderCloseTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'actionDate'},
			{mDataProp: 'actionName', "mRender": function(data, type, full) {
				result = '<span class="badge text-bg-success" style="background-color: '+full.actionColor+'"><i class="'+full.actionIcon+'" style="position: relative; top: 2px;"></i> '+full.actionName+'</span>';
				return result;
			}},
			{mDataProp: 'actionTypeName'},
			{mDataProp: 'scenarioStageName'},
			{mDataProp: 'invoiceCode', "mRender": function(data, type, full) {
				if(full.invoiceId != null)
					return '<a href="#" onclick="showInvoiceDetail('+full.invoiceId+');" class="amount-link">'+full.invoiceCode+'</a>';
				else
					return full.invoices;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
			}},
			{mDataProp: 'clientCode', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCode+'</a>';
			}},
			{mDataProp: 'clientCompanyName', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCompanyName+'</a>';
			}}
		];
		$scope.$parent.reminderCloseTable = TableManager.init("reminderCloseTable", $scope.$parent.baseUrl+"list/close", columns);
		
		$scope.$parent.reminderCloseTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.reminderCloseTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
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

app.controller('reminderInvoiceTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'reminderStatusName', "mRender": function(data, type, full) {
				var result = '';
				if(full.reminderStatusId == 1) {
					result = '<span class="label orange">'+full.reminderStatusName+'</span>';
				} else {
					result = '<span class="label">'+full.reminderStatusName+'</span>';
				}
				return result;
			}},
			{mDataProp: 'actionDate'},
			{mDataProp: 'actionName', "mRender": function(data, type, full) {
				result = '<span class="label" style="background-color: '+full.actionColor+'"><i class="'+full.actionIcon+'"></i> '+full.actionName+'</span>';
				return result;
			}},
			{mDataProp: 'actionTypeName'},
			{mDataProp: 'scenarioStageName'}
		];
		$scope.$parent.reminderInvoiceTable = TableManager.init("reminderInvoiceTable", $scope.$parent.baseUrl+"listByInvoice/-1", columns);
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
		$scope.$parent.reminderClientTable = TableManager.init("reminderClientTable", $scope.$parent.baseUrl+"list/-1", columns);
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
		$scope.$parent.outstandingStatusClientTable = TableManager.init("outstandingStatusClientTable", $scope.$parent.outstandingBaseUrl+"list/validated/-1", columns);
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
		$scope.$parent.outstandingClientTable = TableManager.init("outstandingClientTable", $scope.$parent.outstandingBaseUrl+"list/-1", columns);
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