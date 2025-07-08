app.controller('invoiceController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.search = {};
	$scope.filtre = {};
	$scope.reminderClientTable = null;
	$scope.invoicePaymentDetailTable = null;
	$scope.litigationCurrentClientTable = null;
	$scope.outstandingStatusClientTable = null;
	$scope.outstandingClientTable = null;
	$scope.invoiceTotalTable = null;
	$scope.invoiceNotOverdueTable = null;
	$scope.invoiceOverdueTable = null;
	$scope.invoiceOverdue30Table = null;
	$scope.invoiceOverdue60Table = null;
	$scope.invoiceOverdue90Table = null;
	$scope.invoiceTable = null;
	$scope.reminderInvoiceTable = null;
	$scope.litigationInvoiceTable = null;
	$scope.promiseInvoiceTable = null;
	$scope.contenceInvoiceTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.hidden = false;
	$scope.invoiceRequiredError = false;
	$scope.invoiceTechnicalError = false;
	$scope.invoiceSuccess = false;
	$scope.paymentRequiredError = false;
	$scope.paymentTechnicalError = false;
	$scope.paymentSuccess = false;
	$scope.invoicePaymentModal = false;
	$scope.paymentInvoiceModal = false;
	$scope.invoiceAmount = 0;
	$scope.buttonDisabled = false;
	$scope.invoiceFileTypeError = false;
	$scope.importing = false;
	$scope.invoicesImport = [];
	$scope.paymentsImport = [];
	$scope.notifications = null;
	$scope.notificationsCount = 0;
	
	$scope.baseUrl = "/credit/invoice/rest/";
	$scope.clientBaseUrl = "/client/client/rest/";
	$scope.contactBaseUrl = "/client/contact/rest/";
	$scope.paymentBaseUrl = "/credit/payment/rest/";
	$scope.invoicePaymentBaseUrl = "/credit/invoicePayment/rest/";
	$scope.outstandingBaseUrl = "/credit/outstanding/rest/";
	$scope.invoiceCommentBaseUrl = "/credit/invoiceComment/rest/";
	$scope.reminderBaseUrl = "/reminder/reminder/rest/";
	$scope.litigationBaseUrl = "/reminder/litigation/rest/";
	$scope.promiseBaseUrl = "/reminder/promise/rest/";
	$scope.contenceBaseUrl = "/reminder/contence/rest/";
	$scope.notificationBaseUrl = "/notification/rest/";
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addInvoiceForm = false;
		$scope.editInvoiceForm = false;
		CRUDService.init($scope);
		
		$scope.initListCompanies();
		$scope.initListAgencies();
		$scope.initListClients();
		$scope.initListContracts();
		$scope.initListInvoiceStatus();
		$scope.initListInvoiceStates();
		$scope.initListInvoiceTypes();
		$scope.initListPaymentMethods();
		$scope.initListCurrencies();
		$scope.initListInvoiceSteps();
		$scope.initListUsers();
		$scope.initListContenceSteps();
		$scope.initListCommercialCourts();
		// $scope.initAllPayments();
		$scope.initListNotifications();
		// $('#searchCode').select2({placeholder: 'Choisir une
		// option'}).select2('val', '');
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
	
	$scope.initListCompanies = function() {
		$http.get(context+"/administration/referentiel/company/rest/getAll").success(function(data, status) {   
			$scope.companies = data;
		});
	};
	
	$scope.initListAgencies = function() {
		$http.get(context+"/administration/referentiel/agency/rest/getAll").success(function(data, status) {   
			$scope.agencies = data;
		});
	};
	
	$scope.initListClients = function() {
		$http.get(context+"/client/client/rest/getByOutstanding").success(function(data, status) {   
			$scope.clients = data;
		});
	};
	
	$scope.initListContracts = function() {
		$http.get(context+"/client/contract/rest/getAll").success(function(data, status) {   
			$scope.contracts = data;
		});
	};
	
	$scope.initListInvoiceStatus = function() {
		$http.get(context+"/administration/referentiel/invoiceStatus/rest/getAll").success(function(data, status) {   
			$scope.invoiceStatus = data;
		});
	};
	
	$scope.initListInvoiceStates = function() {
		$scope.invoiceStates = [{
			  id: 1,
			  name: 'Non échue'
			}, {
			  id: 2,
			  name: 'Echue'
		}];
	};
	
	$scope.initListInvoiceSteps = function() {
		$scope.invoiceSteps = [{
			  id: 1,
			  name: 'Promesses de règlement'
			}, {
			  id: 2,
			  name: 'Litige'
			}, {
			  id: 3,
			  name: 'Contentieux'
		}];
	};
	
	$scope.initListInvoiceTypes = function() {
		$http.get(context+"/administration/referentiel/invoiceType/rest/getAll").success(function(data, status) {   
			$scope.invoiceTypes = data;
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
	
	$scope.initListInvoices = function(id) {
		$http.get(context+"/credit/invoice/rest/getAllUnpaidByClient/"+id).success(function(data, status) {   
			$scope.invoices = data;
		});
	};
	
	$scope.initAllPayments = function(id) {
		$http.get(context+"/credit/payment/rest/getAll").success(function(data, status) {   
			$scope.paymentsList = data;
		});
	};
	
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
	
	$scope.advancedSearchInvoiceForm = function() {
		if(!angular.isUndefined($scope.search.code) && $scope.search.code != null)
			$('#code').select2({
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
			}).select2('val', $scope.search.code);
		else
			$('#code').select2({
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
		
		if(!angular.isUndefined($scope.search.clientCode) && $scope.search.clientCode != null)
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
			}).select2('val', $scope.search.clientCode);
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
		
		if(!angular.isUndefined($scope.search.clientCompanyName) && $scope.search.clientCompanyName != null)
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
			}).select2('val', $scope.search.clientCompanyName);
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
		
		if(!angular.isUndefined($scope.search.companyId) && $scope.search.companyId != null)
			$('#companyId').select2().select2('val', 'number:'+$scope.search.companyId);
		else
			$('#companyId').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		if(!angular.isUndefined($scope.search.agencyId) && $scope.search.agencyId != null)
			$('#agencyId').select2().select2('val', 'number:'+$scope.search.agencyId);
		else
			$('#agencyId').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		$('#advancedSearchInvoiceModal').modal("show");
	};
	
	$scope.advancedSearchPaymentForm = function() {
		if(!angular.isUndefined($scope.search.paymentCode) && $scope.search.paymentCode != null)
			$('#paymentCode').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/payment/rest/getAllCodes/"+params.term;
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
			}).select2('val', $scope.search.paymentCode);
		else
			$('#paymentCode').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/payment/rest/getAllCodes/"+params.term;
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
		
		if(!angular.isUndefined($scope.search.paymentName) && $scope.search.paymentName != null)
			$('#paymentName').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/payment/rest/getAllNames/"+params.term;
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
			}).select2('val', $scope.search.paymentName);
		else
			$('#paymentName').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/payment/rest/getAllNames/"+params.term;
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
		
		if(!angular.isUndefined($scope.search.paymentMvt) && $scope.search.paymentMvt != null)
			$('#paymentMvt').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/payment/rest/getAllMvts/"+params.term;
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
			}).select2('val', $scope.search.paymentMvt);
		else
			$('#paymentMvt').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/payment/rest/getAllMvts/"+params.term;
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
		
		if(!angular.isUndefined($scope.search.paymentClientCode) && $scope.search.paymentClientCode != null)
			$('#paymentClientCode').select2({
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
			}).select2('val', $scope.search.paymentClientCode);
		else
			$('#paymentClientCode').select2({
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
		
		if(!angular.isUndefined($scope.search.paymentClientCompanyName) && $scope.search.paymentClientCompanyName != null)
			$('#paymentClientCompanyName').select2({
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
			}).select2('val', $scope.search.paymentClientCompanyName);
		else
			$('#paymentClientCompanyName').select2({
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
		
		if(!angular.isUndefined($scope.search.paymentCompanyId) && $scope.search.paymentCompanyId != null)
			$('#paymentCompanyId').select2().select2('val', 'number:'+$scope.search.paymentCompanyId);
		else
			$('#paymentCompanyId').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		if(!angular.isUndefined($scope.search.paymentAgencyId) && $scope.search.paymentAgencyId != null)
			$('#paymentAgencyId').select2().select2('val', 'number:'+$scope.search.paymentAgencyId);
		else
			$('#paymentAgencyId').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		$('#advancedSearchPaymentModal').modal("show");
	};
	
	$scope.addInvoice = function() {
		CRUDService.add($scope);
		$scope.editInvoiceForm = false;
		$scope.addInvoiceForm = true;
		$scope.invoiceSuccess = false;
		$scope.invoiceTechnicalError = false;
		$scope.invoiceRequiredError = false;
		$('#invoiceModal').modal("show");
	};
	
	$scope.importInvoices = function() {
		$scope.invoiceFileTypeError = false;
		$scope.importing = false;
		document.getElementById('invoiceFileInput').value = '';
		CRUDService.add($scope);
		$scope.invoiceSuccess = false;
		$scope.invoiceTechnicalError = false;
		$scope.invoiceRequiredError = false;
		$('#importInvoicesModal').modal("show");
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
	
	loadImportInvoices = function() {
		var file = $('#invoiceFileInput')[0].files[0];
		var sFilename = file.name;
		if(!checkfile(sFilename))
			$scope.invoiceFileTypeError = true;
		else {
			var reader = new FileReader();
		    reader.onload = function(e) {
		        var data = e.target.result;
		        var cfb = XLSX.read(data, {type: 'binary'});
		        cfb.SheetNames.forEach(function(sheetName) {
		            // var sCSV = XLS.utils.make_csv(cfb.Sheets[sheetName]);
		            $scope.sheet = XLS.utils.sheet_to_json(cfb.Sheets[sheetName]);
		        });
		    };
		    reader.readAsBinaryString(file);
		    $scope.invoiceFileTypeError = false;
		}
	}
	
	$scope.importPayments = function() {
		document.getElementById('paymentFileInput').value = '';
		CRUDService.add($scope);
		$scope.paymentSuccess = false;
		$scope.paymentTechnicalError = false;
		$scope.paymentRequiredError = false;
		$('#importPaymentsModal').modal("show");
	};
	
	loadImportPayments = function() {
		var file = $('#paymentFileInput')[0].files[0];
		var sFilename = file.name;
	    var reader = new FileReader();
	    reader.onload = function(e) {
	        var data = e.target.result;
	        var cfb = XLSX.read(data, {type: 'binary'});
	        cfb.SheetNames.forEach(function(sheetName) {
	            // var sCSV = XLS.utils.make_csv(cfb.Sheets[sheetName]);
	            $scope.sheet = XLS.utils.sheet_to_json(cfb.Sheets[sheetName]);
	        });
	    };
	    reader.readAsBinaryString(file);
	}
	
	$scope.addPayment = function() {
		$scope.dto.payment = {};
		//$scope.dto.payment.invoicePaymentsDTO = [];
		$scope.editPaymentForm = false;
		$scope.addPaymentForm = true;
		$scope.paymentSuccess = false;
		$scope.paymentTechnicalError = false;
		$scope.paymentRequiredError = false;
		$('#paymentModal').modal("show");
	};
	
	addInvoicePayment = function(id) {
		$scope.remainingIndication = false;
		$http.get(context+"/credit/invoice/rest/getByClient/"+id).success(function(data, status) {
			$scope.invoices = data;
			$scope.dto.invoicePayment = {};
			$scope.invoicePaymentSuccess = false;
			$scope.invoicePaymentTechnicalError = false;
			$scope.invoicePaymentRequiredError = false;
			$('#invoicePaymentModal').modal("show");
		});
	};
	
	showClientDetail = function(id) {
		$http.get(context+$scope.clientBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.clientDetail = data;
			
			$scope.reminderClientTable.ajax.url($scope.reminderBaseUrl+'list/'+id).load();
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
	
	showInvoicePayment = function() {
		$('#invoicePaymentListModal').modal("show");
	};
	
	showPaymentInvoice = function() {
		$('#paymentInvoiceListModal').modal("show");
	};
	
	editInvoice = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto = data;
			CRUDService.edit($scope);
			$scope.addInvoiceForm = false;
			$scope.editInvoiceForm = true;
			$scope.invoiceSuccess = false;
			$scope.invoiceTechnicalError = false;
			$scope.invoiceRequiredError = false;
			$('#invoiceModal').modal("show");
		});
	};
	
	editPayment = function(id) {
		$http.get(context+$scope.paymentBaseUrl+"load/"+id).success(function(data, status) {
			$scope.payment = data;
			$scope.dto.payment = $scope.payment;
			//$('#clientPayment').select2().select2('val', 'number:'+$scope.dto.payment.clientId);
			CRUDService.edit($scope);
			$scope.addPaymentForm = false;
			$scope.editPaymentForm = true;
			$scope.paymentSuccess = false;
			$scope.paymentTechnicalError = false;
			$scope.paymentRequiredError = false;
			$('#paymentModal').modal("show");
		});
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			$scope.invoiceAmount = $scope.dto.amountTtc;
			$scope.paymentInvoiceModal = true;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadPayment = function(id) {
		$http.get(context+$scope.paymentBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.payment = data;
			$scope.dto.payment = $scope.payment;
			$scope.invoicePaymentModal = true;
		});
	}
	
	$scope.loadInvoice = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.invoice = data;
		});
	}
	
	$scope.changeInvoiceFields = function() {
		if(!angular.isUndefined($scope.dto) && $scope.dto.clientId != null) {
			$http.get(context+$scope.clientBaseUrl+"load/"+$scope.dto.clientId).success(function(data, status) {
				$scope.dto.paymentMethodId = data.paymentMethodId;
				$scope.dto.currencyId = data.currencyId;
			});
		}
	}
	
	$scope.changePaymentFields = function() {
//		if($('#select2-clientPayment-container').text() != '' && $('#select2-clientPayment-container').text() != 'Choisir une option') {
//			$http.get(context+$scope.clientBaseUrl+"loadByName/"+$('#select2-clientPayment-container').text()).success(function(data, status) {
//				$scope.initListInvoices(data.id);
//				$scope.dto.payment.paymentMethodId = data.paymentMethodId;
//				$scope.dto.payment.currencyId = data.currencyId;
//				$scope.dto.payment.invoicePaymentsDTO = [];
//				if($scope.dto.payment != null)
//					$scope.dto.payment.amount = 0;
//			});
//		}
		
		if(!angular.isUndefined($scope.dto.payment) && $scope.dto.payment.clientId != null) {
			$http.get(context+$scope.clientBaseUrl+"load/"+$scope.dto.payment.clientId).success(function(data, status) {
				$scope.dto.payment.paymentMethodId = data.paymentMethodId;
				$scope.dto.payment.currencyId = data.currencyId;
			});
		}
	}
	
	$scope.calculateDueDate = function(invoiceDate) {
		var dueDate = new Date(invoiceDate);
		if($('#select2-client-container').text() != '' && $('#select2-client-container').text() != 'Choisir une option') {
			$http.get(context+$scope.clientBaseUrl+"loadByName/"+$('#select2-client-container').text()).success(function(data, status) {
				dueDate.setDate(dueDate.getDate() + data.paymentDue);
				$scope.dto.dueDate = String(dueDate.getDate()).padStart(2, '0') + '/' + String(dueDate.getMonth() + 1).padStart(2, '0') + '/' + dueDate.getFullYear();
			});
		}
	}
	
	$scope.calculateAmountTtc = function() {
		$scope.dto.amountTtc = Math.round(parseFloat($scope.dto.amountHt) * 1.2 * 100) / 100;
		$scope.dto.remainingAmount = $scope.dto.amountTtc;
	}
	
	showRemainingAmount = function() {
		$scope.remainingIndication = false;
		$http.get(context+$scope.baseUrl+"load/"+($("#invoice").val().split(':'))[1]).success(function(data, status) { 
			$scope.dto.invoice = data;
			$scope.remainingAmount = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format($scope.dto.invoice.remainingAmount);
			$http.get(context+$scope.outstandingBaseUrl+"getValidatedByClient/"+$scope.dto.invoice.clientId).success(function(data, status) {
				if(data != null) {
					$scope.dto.outstanding = data;
				}
				$scope.remainingIndication = true;
			});
		});
	}
	
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
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
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
				$scope.invoiceDetail.invoiceStatusColor = 'green';
				$scope.invoiceDetail.invoiceStatusText = 'Payée';
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
			$http.get(context+"/credit/invoice/rest/getAllUnpaidByClient/"+$scope.invoiceDetail.clientId).success(function(data, status) {   
				$scope.invoices = data;
			});
			$scope.reminderInvoiceTable.ajax.url('/reminder/reminder/rest/listByInvoice/'+id).load();
			$scope.litigationInvoiceTable.ajax.url('/reminder/litigation/rest/listByInvoice/'+id).load();
			$scope.promiseInvoiceTable.ajax.url('/reminder/promise/rest/listByInvoice/'+id).load();
			$scope.contenceInvoiceTable.ajax.url('/reminder/contence/rest/listByInvoice/'+id).load();
			$scope.contenceInvoiceTable.ajax.url('/reminder/contence/rest/listByInvoice/'+id).load();
			$('#invoiceDetailModal').modal("show");
		});
	};
	
	showPaymentDetail = function(id) {
		$http.get(context+$scope.paymentBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.paymentDetail = data;
			$scope.paymentDetail.amount = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format($scope.paymentDetail.amount);
			$scope.invoicePaymentDetailTable.ajax.url('/credit/invoicePayment/rest/listByPayment/'+id).load();
			$('#paymentDetailModal').modal("show");
		});
	};
	
	$scope.addInvoicePay = function() {
		$scope.dto.payment.invoicePaymentsDTO.push({});
	};
	
	$scope.removeInvoicePay = function(id) {
		$scope.dto.payment.invoicePaymentsDTO.splice(id, 1);
		
		var paymentAmount = 0;
		for(var invoicePayment of $scope.dto.payment.invoicePaymentsDTO) {
			paymentAmount += parseFloat(invoicePayment.amount);
		}
		$scope.dto.payment.amount = paymentAmount;
	};
	
	$scope.setInvoiceFields = function(id) {
		if($('#invoiceId'+id+' option:selected').val() != null && $('#invoiceId'+id+' option:selected').val() != '?') {
			$http.get(context+$scope.baseUrl+"load/"+($('#invoiceId'+id+' option:selected').val().split(':'))[1]).success(function(data, status) {
				$scope.dto.payment.invoicePaymentsDTO[id].amount = data.remainingAmount;
				$scope.dto.payment.invoicePaymentsDTO[id].invoiceDate = data.invoiceDate;
				$scope.dto.payment.invoicePaymentsDTO[id].dueDate = data.dueDate;
				$scope.dto.payment.invoicePaymentsDTO[id].remainingAmount = data.remainingAmount;
				
				var paymentAmount = 0;
				for(var invoicePayment of $scope.dto.payment.invoicePaymentsDTO) {
					paymentAmount += parseFloat(invoicePayment.amount);
				}
				$scope.dto.payment.amount = paymentAmount;
			});
		}
	};
	
	$scope.setInvoiceAmount = function(id) {
		if($('#invoiceId'+id+' option:selected').val() != null && $('#invoiceId'+id+' option:selected').val() != '?') {
			$http.get(context+$scope.baseUrl+"load/"+($('#invoiceId'+id+' option:selected').val().split(':'))[1]).success(function(data, status) {
				if($scope.dto.payment.invoicePaymentsDTO[id].amount >= data.remainingAmount)
					$scope.dto.payment.invoicePaymentsDTO[id].amount = data.remainingAmount;
				
				var paymentAmount = 0;
				for(var invoicePayment of $scope.dto.payment.invoicePaymentsDTO) {
					paymentAmount += parseFloat(invoicePayment.amount);
				}
				$scope.dto.payment.amount = paymentAmount;
			});
		}
	};
	
	$scope.calculateDueDateEnd = function() {
		if(!angular.isUndefined($scope.search.dueDateStart) && $scope.search.dueDateStart != '') {
			$scope.search.dueDateStart = String($scope.search.dueDateStart.getDate()).padStart(2, '0') + '/' + String($scope.search.dueDateStart.getMonth() + 1).padStart(2, '0') + '/' + $scope.search.dueDateStart.getFullYear();
			$scope.search.dueDateEnd = $scope.search.dueDateStart;
		}
	};
	
	$scope.calculateDueDateEndFormat = function() {
		if(!angular.isUndefined($scope.search.dueDateEnd) && $scope.search.dueDateEnd != '') {
			$scope.search.dueDateEnd = String($scope.search.dueDateEnd.getDate()).padStart(2, '0') + '/' + String($scope.search.dueDateEnd.getMonth() + 1).padStart(2, '0') + '/' + $scope.search.dueDateEnd.getFullYear();
		}
	};
	
	$scope.calculateInvoiceDateEnd = function() {
		$scope.search.invoiceDateEnd = String($scope.search.invoiceDateStart.getDate()).padStart(2, '0') + '/' + String($scope.search.invoiceDateStart.getMonth() + 1).padStart(2, '0') + '/' + $scope.search.invoiceDateStart.getFullYear();
	};
	
	$scope.calculateAmountTtcEnd = function() {
		if(!angular.isUndefined($scope.search.amountTtcStart) && $scope.search.amountTtcStart != '') {
			$scope.search.amountTtcEnd = $scope.search.amountTtcStart;
		}
	};
	
	$scope.calculateRemainingAmountTtcEnd = function() {
		if(!angular.isUndefined($scope.search.remainingAmountTtcStart) && $scope.search.remainingAmountTtcStart != '') {
			$scope.search.remainingAmountTtcEnd = $scope.search.remainingAmountTtcStart;
		}
	};
	
	$scope.searchInvoice = function() {
		var searchKey = 'NAN';
		if(!angular.isUndefined($scope.search.key) && $scope.search.key != '') searchKey = $scope.search.key;
		$scope.invoiceTable.ajax.url($scope.baseUrl+'search/'+searchKey).load();
	};
	
	$scope.advancedSearchInvoice = function() {
		var searchCode = 'NAN'; var searchCompanyId = 0; var searchAgencyId = 0; var searchInvoiceStatusId = 0; var searchClientCode = 'NAN'; var searchClientCompanyName = 'NAN'; var searchInvoiceStateId = 0; var searchPaymentMethodId = 0; var searchDueDateStart = 'NAN'; var searchDueDateEnd = 'NAN'; var searchInvoiceDateStart = 'NAN'; var searchInvoiceDateEnd = 'NAN'; var searchAmountTtcStart = -1; var searchAmountTtcEnd = -1; var searchRemainingAmountTtcStart = -1; var searchRemainingAmountTtcEnd = -1;
		var date = new Date();
		$scope.search.code = $("#code").val();
		$scope.search.clientCode = $("#clientCode").val();
		$scope.search.clientCompanyName = $("#clientCompanyName").val();
		$scope.search.companyId = ($("#companyId").val().split(':'))[1];
		$scope.search.agencyId = ($("#agencyId").val().split(':'))[1];
		if(!angular.isUndefined($scope.search.code) && $scope.search.code != '') searchCode = $scope.search.code;
		if(!angular.isUndefined($scope.search.companyId) && $scope.search.companyId != null) searchCompanyId = $scope.search.companyId;
		if(!angular.isUndefined($scope.search.agencyId) && $scope.search.agencyId != null) searchAgencyId = $scope.search.agencyId;
		if(!angular.isUndefined($scope.search.invoiceStatusId) && $scope.search.invoiceStatusId != null) searchInvoiceStatusId = $scope.search.invoiceStatusId;
		if(!angular.isUndefined($scope.search.invoiceStateId) && $scope.search.invoiceStateId != null) searchInvoiceStateId = $scope.search.invoiceStateId;
		if(!angular.isUndefined($scope.search.clientCode) && $scope.search.clientCode != '') searchClientCode = $scope.search.clientCode;
		if(!angular.isUndefined($scope.search.paymentMethodId) && $scope.search.paymentMethodId != null) searchPaymentMethodId = $scope.search.paymentMethodId;
		if(!angular.isUndefined($scope.search.clientCompanyName) && $scope.search.clientCompanyName != '') searchClientCompanyName = $scope.search.clientCompanyName;
// if(!angular.isUndefined($scope.search.amountTtcStart) &&
// $scope.search.amountTtcStart != null) searchAmountTtcStart =
// $scope.search.amountTtcStart;
// if(!angular.isUndefined($scope.search.amountTtcEnd) &&
// $scope.search.amountTtcEnd != null) searchAmountTtcEnd =
// $scope.search.amountTtcEnd;
// if(!angular.isUndefined($scope.search.remainingAmountTtcStart) &&
// $scope.search.remainingAmountTtcStart != null) searchRemainingAmountTtcStart
// = $scope.search.remainingAmountTtcStart;
// if(!angular.isUndefined($scope.search.remainingAmountTtcEnd) &&
// $scope.search.remainingAmountTtcEnd != null) searchRemainingAmountTtcEnd =
// $scope.search.remainingAmountTtcEnd;
		if(!angular.isUndefined($scope.search.dueDateStart) && $scope.search.dueDateStart != '') {
			searchDueDateStart = $scope.search.dueDateStart.split('/');
			searchDueDateStart = searchDueDateStart[2]+'-'+searchDueDateStart[1]+'-'+searchDueDateStart[0];
		} else {
			if(!angular.isUndefined($scope.search.dueDateEnd) && $scope.search.dueDateEnd != '') {
				searchDueDateStart = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			}
		}
		if(!angular.isUndefined($scope.search.dueDateEnd) && $scope.search.dueDateEnd != '') {
			searchDueDateEnd = $scope.search.dueDateEnd.split('/');
			searchDueDateEnd = searchDueDateEnd[2]+'-'+searchDueDateEnd[1]+'-'+searchDueDateEnd[0];
		} else {
			if(!angular.isUndefined($scope.search.dueDateStart) && $scope.search.dueDateStart != '') {
				searchDueDateEnd = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			}
		}
		if(!angular.isUndefined($scope.search.invoiceDateStart) && $scope.search.invoiceDateStart != '') {
			searchInvoiceDateStart = $scope.search.invoiceDateStart.split('/');
			searchInvoiceDateStart = searchInvoiceDateStart[2]+'-'+searchInvoiceDateStart[1]+'-'+searchInvoiceDateStart[0];
		} else {
			if(!angular.isUndefined($scope.search.invoiceDateEnd) && $scope.search.invoiceDateEnd != '') {
				searchInvoiceDateStart = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			}
		}
		if(!angular.isUndefined($scope.search.invoiceDateEnd) && $scope.search.invoiceDateEnd != '') {
			searchInvoiceDateEnd = $scope.search.invoiceDateEnd.split('/');
			searchInvoiceDateEnd = searchInvoiceDateEnd[2]+'-'+searchInvoiceDateEnd[1]+'-'+searchInvoiceDateEnd[0];
		} else {
			if(!angular.isUndefined($scope.search.invoiceDateStart) && $scope.search.invoiceDateStart != '') {
				searchInvoiceDateEnd = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			}
		}
		// $scope.invoiceTable.ajax.url($scope.baseUrl+'search/'+searchCode+'/'+searchInvoiceTypeId+'/'+searchInvoiceStatusId+'/'+searchInvoiceStateId+'/'+searchContractId+'/'+searchCompanyId+'/'+searchAgencyId+'/'+searchPaymentMethodId+'/'+searchCurrencyId+'/'+searchClientId+'/'+searchDueDateStart+'/'+searchDueDateEnd+'/'+searchInvoiceDateStart+'/'+searchInvoiceDateEnd+'/'+searchAmountTtcStart+'/'+searchAmountTtcEnd+'/'+searchRemainingAmountTtcStart+'/'+searchRemainingAmountTtcEnd).load();
		$scope.invoiceTable.ajax.url($scope.baseUrl+'search/'+searchCode+'/'+searchInvoiceStatusId+'/'+searchInvoiceStateId+'/'+searchClientCode+'/'+searchCompanyId+'/'+searchAgencyId+'/'+searchPaymentMethodId+'/'+searchClientCompanyName+'/'+searchDueDateStart+'/'+searchDueDateEnd+'/'+searchInvoiceDateStart+'/'+searchInvoiceDateEnd).load();
		$('#advancedSearchInvoiceModal').modal("hide");
	};
	
	$scope.advancedSearchPayment = function() {
		var searchCode = 'NAN'; var searchKy = 'NAN'; var searchName = 'NAN'; var searchChrono = 'NAN'; var searchMvt = 'NAN'; var searchJournal = 0; var searchCompanyId = 0; var searchAgencyId = 0; var searchClientCode = 'NAN'; var searchClientCompanyName = 'NAN'; var searchPaymentDateStart = 'NAN'; var searchPaymentDateEnd = 'NAN';
		var date = new Date();
		$scope.search.paymentCode = $("#paymentCode").val();
		// $scope.search.paymentKy = ($("#paymentKy").val().split(':'))[1];
		$scope.search.paymentName = $("#paymentName").val();
		$scope.search.paymentMvt = $("#paymentMvt").val();
		$scope.search.paymentClientCode = $("#paymentClientCode").val();
		$scope.search.paymentClientCompanyName = $("#paymentClientCompanyName").val();
		$scope.search.paymentCompanyId = ($("#paymentCompanyId").val().split(':'))[1];
		$scope.search.paymentAgencyId = ($("#paymentAgencyId").val().split(':'))[1];
		if(!angular.isUndefined($scope.search.paymentCode) && $scope.search.paymentCode != '') searchCode = $scope.search.paymentCode;
		// if(!angular.isUndefined($scope.search.paymentKy) &&
		// $scope.search.paymentKy != '') searchKy = $scope.search.paymentKy;
		if(!angular.isUndefined($scope.search.paymentName) && $scope.search.paymentName != '') searchName = $scope.search.paymentName;
		if(!angular.isUndefined($scope.search.paymentChrono) && $scope.search.paymentChrono != '') searchChrono = $scope.search.paymentChrono;
		if(!angular.isUndefined($scope.search.paymentMvt) && $scope.search.paymentMvt != '') searchMvt = $scope.search.paymentMvt;
		if(!angular.isUndefined($scope.search.paymentJournal) && $scope.search.paymentJournal != null) searchJournal = $scope.search.paymentJournal;
		if(!angular.isUndefined($scope.search.paymentCompanyId) && $scope.search.paymentCompanyId != null) searchCompanyId = $scope.search.paymentCompanyId;
		if(!angular.isUndefined($scope.search.paymentAgencyId) && $scope.search.paymentAgencyId != null) searchAgencyId = $scope.search.paymentAgencyId;
		if(!angular.isUndefined($scope.search.paymentClientCode) && $scope.search.paymentClientCode != '') searchClientCode = $scope.search.paymentClientCode;
		if(!angular.isUndefined($scope.search.paymentClientCompanyName) && $scope.search.paymentClientCompanyName != '') searchClientCompanyName = $scope.search.paymentClientCompanyName;
		if(!angular.isUndefined($scope.search.paymentDateStart) && $scope.search.paymentDateStart != '') {
			searchPaymentDateStart = $scope.search.paymentDateStart.split('/');
			searchPaymentDateStart = searchPaymentDateStart[2]+'-'+searchPaymentDateStart[1]+'-'+searchPaymentDateStart[0];
		} else {
			if(!angular.isUndefined($scope.search.paymentDateEnd) && $scope.search.paymentDateEnd != '') {
				searchPaymentDateStart = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			}
		}
		if(!angular.isUndefined($scope.search.paymentDateEnd) && $scope.search.paymentDateEnd != '') {
			searchPaymentDateEnd = $scope.search.paymentDateEnd.split('/');
			searchPaymentDateEnd = searchPaymentDateEnd[2]+'-'+searchPaymentDateEnd[1]+'-'+searchPaymentDateEnd[0];
		} else {
			if(!angular.isUndefined($scope.search.paymentDateStart) && $scope.search.paymentDateStart != '') {
				searchPaymentDateEnd = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			}
		}
		$scope.paymentTable.ajax.url($scope.paymentBaseUrl+'search/'+searchCode+'/'+searchKy+'/'+searchName+'/'+searchChrono+'/'+searchMvt+'/'+searchJournal+'/'+searchCompanyId+'/'+searchAgencyId+'/'+searchClientCode+'/'+searchClientCompanyName+'/'+searchPaymentDateStart+'/'+searchPaymentDateEnd).load();
		$('#advancedSearchPaymentModal').modal("hide");
	};
	
	$scope.saveInvoice = function() {
		if($scope.invoiceForm.$valid && $('#select2-client-container').text() != '' && $('#select2-client-container').text() != 'Choisir une option') {
			$http.get(context+$scope.clientBaseUrl+"loadByName/"+$('#select2-client-container').text()).success(function(data, status) {
				$scope.dto.clientId = data.id;
				$http.get(context+$scope.outstandingBaseUrl+"getValidatedByClient/"+$scope.dto.clientId).success(function(data, status) {
					if(data != null) {
						$scope.dto.outstanding = data;
						CRUDService.save($scope,$scope.dto).success(function(data, status) {
							$scope.dto.outstanding.realAmount = $scope.dto.outstanding.realAmount + $scope.dto.amountTtc;
							$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {
								CRUDService.setEntityLoaded($scope,data);
								$scope.refreshList();
								$scope.invoiceTechnicalError = false;
								$scope.invoiceRequiredError = false;
								$scope.invoiceSuccess = true;
								$scope.paymentInvoiceModal = false;
								$('#invoiceModal').modal("hide");
							});
						}).error(function(data, status, headers, config) {
							$scope.invoiceTechnicalError = true;
						});
					} else {
						$scope.invoiceTechnicalError = true;
					}
				});
			});
		} else {
			$scope.invoiceRequiredError = true;
		}
	};
	
// $scope.saveImportInvoices = function() {
// $scope.buttonDisabled = true;
// $scope.importing = true;
// if(!angular.isUndefined($scope.sheet)) {
// for(i = 0; i < $scope.sheet.length; i++) {
// if($scope.sheet[i]['HT'] != null && $scope.sheet[i]['HT'] != '') {
// $scope.dto = {};
// $scope.dto.site = $scope.sheet[i]['Site'];
// $scope.dto.code = $scope.sheet[i]['Num Facture'];
// $scope.dto.invoiceDate = ExcelDateToJSDate($scope.sheet[i]['Date']);
// $scope.dto.dueDate = ExcelDateToJSDate($scope.sheet[i]['date echeance']);
// if(parseFloat($scope.sheet[i]['HT']) > 0)
// $scope.dto.invoiceStatusId = 1;
// else
// $scope.dto.invoiceStatusId = 2;
// $scope.dto.invoiceTypeId = 2;
// $scope.dto.amountHt = $scope.sheet[i]['HT'];
// $scope.dto.amountTtc = $scope.sheet[i]['TTC'];
// $scope.dto.remainingAmount = $scope.sheet[i]['TTC'];
// $scope.dto.paymentMethodCode = $scope.sheet[i]['Mode Reglement'];
// $scope.dto.currencyId = 1;
// $scope.dto.clientCode = $scope.sheet[i]['Code Client'];
// $scope.dto.deadlineCode = $scope.sheet[i]['delai de reglement '];
//		    		
// $scope.invoicesImport.push($scope.dto);
// }
// }
// $http.post(context+$scope.baseUrl+"saveImport",
// angular.toJson($scope.invoicesImport)).success(function(data, status) {
// CRUDService.setEntityLoaded($scope,data);
// $scope.buttonDisabled = false;
// $scope.invoiceTechnicalError = false;
// $scope.invoiceRequiredError = false;
// $scope.invoiceSuccess = true;
// $scope.importing = false;
// $scope.refreshList();
// $('#importInvoicesModal').modal("hide");
// }).error(function(data, status, headers, config) {
// $scope.invoiceTechnicalError = true;
// $scope.importing = false;
// });
// } else {
// $scope.buttonDisabled = false;
// $scope.invoiceTechnicalError = true;
// $scope.importing = false;
// }
// }
	
	$scope.saveImportInvoices = function() {
		$scope.buttonDisabled = true;
		$scope.importing = true;
		if(!angular.isUndefined($scope.sheet)) {
	    	for(i = 0; i < $scope.sheet.length; i++) {
	    		if($scope.sheet[i]['HT'] != null && $scope.sheet[i]['HT'] != '' && $scope.sheet[i]['HT'] != '0') {
	    			$scope.dto = {};
	    			$scope.dto.site = $scope.sheet[i]['Site'];
	    			$scope.dto.code = $scope.sheet[i]['Num Fac - Con'];
		    		$scope.dto.invoiceDate = ExcelDateToJSDate($scope.sheet[i]['Date']);
		    		$scope.dto.dueDate = ExcelDateToJSDate($scope.sheet[i]['date echance']);
		    		if(parseFloat($scope.sheet[i]['HT']) > 0)
		    			$scope.dto.invoiceStatusId = 1;
		    		else
		    			$scope.dto.invoiceStatusId = 2;
		    		$scope.dto.invoiceTypeId = 2;
		    		$scope.dto.amountHt = $scope.sheet[i]['HT'];
		    		$scope.dto.amountTtc = $scope.sheet[i]['TTC'];
		    		$scope.dto.remainingAmount = $scope.sheet[i]['TTC'];
		    		$scope.dto.paymentMethodCode = $scope.sheet[i]['Mode Reglement'];
		    		$scope.dto.currencyId = 1;
		    		$scope.dto.clientCode = $scope.sheet[i]['Code Client'];
		    		$scope.dto.deadlineCode = $scope.sheet[i]['delai de reglement'];
		    		
		    		$scope.invoicesImport.push($scope.dto);
	    		}
	        }
	    	$http.post(context+$scope.baseUrl+"saveImport", angular.toJson($scope.invoicesImport)).success(function(data, status) {
	    		CRUDService.setEntityLoaded($scope,data);
				$scope.buttonDisabled = false;
			    $scope.invoiceTechnicalError = false;
				$scope.invoiceRequiredError = false;
				$scope.invoiceSuccess = true;
				$scope.importing = false;
				$scope.refreshList();
				$('#importInvoicesModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.invoiceTechnicalError = true;
				$scope.importing = false;
			});
	    } else {
	    	$scope.buttonDisabled = false;
	    	$scope.invoiceTechnicalError = true;
	    	$scope.importing = false;
	    }
	}
	
	$scope.saveImportPayments = function() {
		$scope.buttonDisabled = true;
		if(!angular.isUndefined($scope.sheet)) {
	    	for(i = 0; i < $scope.sheet.length; i++) {
	    		if($scope.sheet[i]['Valeur'] != null && parseFloat($scope.sheet[i]['Valeur']) != 0) {
	    			$scope.dto.payment = {};
		    		$scope.dto.payment.code = $scope.sheet[i]['Num Facture'];
		    		$scope.dto.payment.name = $scope.sheet[i]['Numero Reglement'];
		    		$scope.dto.payment.paymentDate = ExcelDateToJSDate($scope.sheet[i]['Date saisie']);
		    		$scope.dto.payment.dueDate = ExcelDateToJSDate($scope.sheet[i]['Date Echeance']);
		    		$scope.dto.payment.paymentMethodCode = $scope.sheet[i]['Nature'];
		    		$scope.dto.payment.amount = $scope.sheet[i]['Valeur'];
		    		if($scope.sheet[i]['Valeur'] > 0) {
		    			$scope.dto.payment.type = "Règlement";
		    		}
		    		if($scope.sheet[i]['Crédit'] < 0) {
		    			$scope.dto.payment.type = "Impayé";
		    		}
		    		$scope.dto.payment.currencyId = 1;
		    		$scope.dto.payment.clientCode = $scope.sheet[i]['Code client'];
		    		$scope.dto.payment.site = $scope.sheet[i]['Site Facturation'];
		    		$scope.dto.payment.checkNumber = $scope.sheet[i]['Num Chq'];
		    		
		    		$scope.paymentsImport.push($scope.dto.payment);
	    		}
	        }
	    	$http.post(context+$scope.paymentBaseUrl+"saveImport", angular.toJson($scope.paymentsImport)).success(function(data, status) {
	    		CRUDService.setEntityLoaded($scope,data);
				$scope.buttonDisabled = false;
			    $scope.paymentTechnicalError = false;
				$scope.paymentRequiredError = false;
				$scope.paymentSuccess = true;
				$scope.refreshPaymentList();
				$('#importPaymentsModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.paymentTechnicalError = true;
			});
	    } else {
	    	$scope.buttonDisabled = false;
	    	$scope.paymentTechnicalError = true;
	    }
	}
	
// $scope.saveImportPayments = function() {
// $scope.buttonDisabled = true;
// if(!angular.isUndefined($scope.sheet)) {
// for(i = 0; i < $scope.sheet.length; i++) {
// if($scope.sheet[i]['Compte gernal'] == "3421000000000" &&
// ($scope.sheet[i]['credit'] != null && $scope.sheet[i]['credit'] != '' &&
// parseFloat($scope.sheet[i]['credit']) != 0)) {
// $scope.dto.payment = {};
// $scope.dto.payment.code = $scope.sheet[i]['facture'];
// $scope.dto.payment.name = $scope.sheet[i]['libelle'];
// $scope.dto.payment.paymentDate = ExcelDateToJSDate($scope.sheet[i]['dat ']);
//		    		
// if($scope.sheet[i]['mode regelement '] == 'CHE') {
// $scope.dto.payment.paymentMethodId = 1;
// }
// if($scope.sheet[i]['mode regelement '] == 'ESP') {
// $scope.dto.payment.paymentMethodId = 2;
// }
// if($scope.sheet[i]['mode regelement '] == 'VIR') {
// $scope.dto.payment.paymentMethodId = 3;
// }
// if($scope.sheet[i]['mode regelement '] == 'PRE') {
// $scope.dto.payment.paymentMethodId = 4;
// }
// if($scope.sheet[i]['credit'] > 0) {
// $scope.dto.payment.amount = $scope.sheet[i]['credit'];
// $scope.dto.payment.type = "Règlement";
// }
// if($scope.sheet[i]['credit'] < 0) {
// $scope.dto.payment.amount = $scope.sheet[i]['credit'];
// $scope.dto.payment.type = "Impayé";
// }
// if($scope.sheet[i]['debit'] < 0) {
// $scope.dto.payment.amount = -parseFloat($scope.sheet[i]['debit']);
// $scope.dto.payment.type = "Avoir";
// }
// $scope.dto.payment.currencyId = 1;
// $scope.dto.payment.clientCode = $scope.sheet[i]['tiers'];
// $scope.dto.payment.mvt = $scope.sheet[i]['MVT'];
// $scope.dto.payment.journal = $scope.sheet[i]['jrl'];
// $scope.dto.payment.chrono = $scope.sheet[i]['CHRONO'];
// $scope.dto.payment.ky = $scope.sheet[i]['KY'];
// $scope.dto.payment.agencyTemp = $scope.sheet[i]['AGT'];
// $scope.dto.payment.companyTemp = $scope.sheet[i]['SOC'];
//		    		
// $scope.paymentsImport.push($scope.dto.payment);
// }
// }
// $http.post(context+$scope.paymentBaseUrl+"saveImport",
// angular.toJson($scope.paymentsImport)).success(function(data, status) {
// CRUDService.setEntityLoaded($scope,data);
// $scope.buttonDisabled = false;
// $scope.paymentTechnicalError = false;
// $scope.paymentRequiredError = false;
// $scope.paymentSuccess = true;
// $scope.refreshPaymentList();
// $('#importPaymentsModal').modal("hide");
// }).error(function(data, status, headers, config) {
// $scope.paymentTechnicalError = true;
// });
// } else {
// $scope.buttonDisabled = false;
// $scope.paymentTechnicalError = true;
// }
// }
	
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
	
	$scope.savePayment = function() {
		if($scope.paymentForm.$valid && $('#select2-clientPayment-container').text() != '' && $('#select2-clientPayment-container').text() != 'Choisir une option') {
			$http.get(context+$scope.clientBaseUrl+"loadByName/"+$('#select2-clientPayment-container').text()).success(function(data, status) {
				$scope.dto.payment.clientId = data.id;
				$http.post(context+$scope.paymentBaseUrl+"save", angular.toJson($scope.dto.payment)).success(function(data, status) {
					if($scope.dto.payment.invoicePaymentsDTO.length != 0) {
						for(var invoicePayment of $scope.dto.payment.invoicePaymentsDTO) {
							invoicePayment.paymentId = data.id;
							invoicePayment.paymentDate = data.paymentDate;
							$http.post(context+$scope.baseUrl+"updateRemainingAmount/"+invoicePayment.invoiceId+"/"+invoicePayment.amount).success(function(data, status) {});
							$http.post(context+$scope.invoicePaymentBaseUrl+"save", angular.toJson(invoicePayment)).success(function(data, status) {});
						}
						$http.post(context+$scope.outstandingBaseUrl+"updateRealAmount/"+$scope.dto.payment.clientId+"/"+$scope.dto.payment.amount).success(function(data, status) {});
						$http.post(context+$scope.clientBaseUrl+"updateClientCategory/"+$scope.dto.payment.clientId).success(function(data, status) {});
					}
					$scope.refreshPaymentList();
					$scope.paymentTechnicalError = false;
					$scope.paymentRequiredError = false;
					$scope.paymentSuccess = true;
					$('#paymentModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.paymentTechnicalError = true;
				});
			});
		} else {
			$scope.paymentRequiredError = true;
		}
	};
	
	$scope.saveInvoicePayment = function() {
		if($scope.invoicePaymentForm.$valid) {
			$scope.dto.invoicePayment.invoiceId = ($("#invoice").val().split(':'))[1];
			if($scope.dto.invoicePayment.amount <= $scope.dto.invoice.remainingAmount) {
				$scope.dto.invoicePayment.paymentId = $scope.dto.payment.id;
				$scope.dto.invoicePayment.invoiceDate = $scope.dto.invoice.invoiceDate;
				$scope.dto.invoicePayment.dueDate = $scope.dto.invoice.dueDate;
				$scope.dto.invoicePayment.paymentDate = $scope.dto.payment.paymentDate;
				$http.post(context+$scope.invoicePaymentBaseUrl+"save", angular.toJson($scope.dto.invoicePayment)).success(function(data, status) {   
					$scope.dto.payment.amount = parseFloat($scope.dto.payment.amount) + parseFloat($scope.dto.invoicePayment.amount);
					$http.post(context+$scope.paymentBaseUrl+"save", angular.toJson($scope.dto.payment)).success(function(data, status) {
						$scope.dto.invoice.remainingAmount = parseFloat($scope.dto.invoice.remainingAmount) - parseFloat($scope.dto.invoicePayment.amount);
						if($scope.dto.invoice.remainingAmount <= 0) $scope.dto.invoice.invoiceStatusId = 2;
						$http.post(context+$scope.baseUrl+"save", angular.toJson($scope.dto.invoice)).success(function(data, status) {
							$scope.dto.outstanding.realAmount = parseFloat($scope.dto.outstanding.realAmount) - parseFloat($scope.dto.invoicePayment.amount);
							$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {
								$scope.refreshPaymentList();
								$scope.refreshList();
								$scope.invoicePaymentTechnicalError = false;
								$scope.invoicePaymentRequiredError = false;
								$scope.invoicePaymentSuccess = true;
								$('#invoicePaymentModal').modal("hide");
							});
						});
					});
				}).error(function(data, status, headers, config) {
					$scope.invoicePaymentTechnicalError = true;
				});
			}
			else {
				$scope.invoicePaymentTechnicalError = true;
			}
		} else {
			$scope.invoicePaymentRequiredError = true;
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
		$scope.invoiceTable.ajax.reload();
		$scope.dto = {};
	};
	
	$scope.refreshPaymentList = function() {
		$scope.paymentTable.ajax.reload();
		$scope.dto = {};
		$scope.invoicePaymentModal = false;
	};
	
	removeInvoice = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteInvoice(id);
		};
	};

	$scope.confirmDeleteInvoice = function(id) {
		$http.post( context+$scope.baseUrl+"delete/"+id).success(function(data, status) { 
			$scope.refreshList();
			$scope.paymentInvoiceModal = false;
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removePayment = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeletePayment(id);
		};
	};

	$scope.confirmDeletePayment = function(id) {
		$http.post( context+$scope.paymentBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.refreshPaymentList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeInvoicePayment = function(id) {
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteInvoicePayment(id);
		};
	};

	$scope.confirmDeleteInvoicePayment = function(id) {
		$http.get(context+$scope.invoicePaymentBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto.invoicePayment = data;
			$http.post(context+$scope.invoicePaymentBaseUrl+"delete/"+id).success(function(data, status) { 
				$scope.dto.payment.amount = parseFloat($scope.dto.payment.amount) - parseFloat($scope.dto.invoicePayment.amount);
				$http.post(context+$scope.paymentBaseUrl+"save", angular.toJson($scope.dto.payment)).success(function(data, status) {
					$http.get(context+$scope.baseUrl+"load/"+$scope.dto.invoicePayment.invoiceId).success(function(data, status) {
						$scope.dto.invoice = data;
						$scope.dto.invoice.remainingAmount = parseFloat($scope.dto.invoice.remainingAmount) + parseFloat($scope.dto.invoicePayment.amount);
						$http.post(context+$scope.baseUrl+"save", angular.toJson($scope.dto.invoice)).success(function(data, status) {
							$http.get(context+$scope.outstandingBaseUrl+"getValidatedByClient/"+$scope.dto.invoice.clientId).success(function(data, status) {
								if(data != null) {
									$scope.dto.outstanding = data;
									$scope.dto.outstanding.realAmount = parseFloat($scope.dto.outstanding.realAmount) + parseFloat($scope.dto.invoicePayment.amount);
									$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {
										$scope.refreshPaymentList();
										$scope.refreshList();
									});
								}
							});
						});
					});
				});
			}).error(function(data, status, headers, config) {
				console.log("error");
			});
		});
	};
	
	$scope.suspendInvoices = function(name) {
		if(confirm("Voulez-vous vraiment suspendre ces factures ?") == true) {
			$scope.confirmSuspendInvoices(name);
		};
	};

	$scope.confirmSuspendInvoices = function(name) {
		var inputs = document.getElementsByClassName(name);
		for(var i = 0, l = inputs.length; i < l; ++i) {
			if(inputs[i].checked) {
				$http.get(context+$scope.baseUrl+"load/"+inputs[i].value).success(function(data, status) {
					$scope.dto.invoice = data;
					$scope.dto.invoice.suspend = 1;
					$http.post(context+$scope.baseUrl+"save", angular.toJson($scope.dto.invoice)).success(function(data, status) {
						
					});
	    		});
	    	}
			if(i == inputs.length - 1)
				$scope.refreshList();
	    }
	};
	
	$scope.resumeInvoices = function(name) {
		if(confirm("Voulez-vous vraiment reprendre ces factures ?") == true) {
			$scope.confirmResumeInvoices(name);
		};
	};

	$scope.confirmResumeInvoices = function(name) {
		var inputs = document.getElementsByClassName(name);
		for(var i = 0, l = inputs.length; i < l; ++i) {
			if(inputs[i].checked) {
				$http.get(context+$scope.baseUrl+"load/"+inputs[i].value).success(function(data, status) {
					$scope.dto.invoice = data;
					$scope.dto.invoice.suspend = 0;
					$http.post(context+$scope.baseUrl+"save", angular.toJson($scope.dto.invoice)).success(function(data, status) {
						
					});
	    		});
	    	}
			if(i == inputs.length - 1)
				$scope.refreshList();
	    }
	};
});

app.controller('invoiceTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.paymentInvoiceTable.ajax.url('/credit/invoicePayment/rest/listByInvoice/'+newValue).load();
		}
		else {
			$scope.$parent.paymentInvoiceTable.ajax.url('/credit/invoicePayment/rest/listByInvoice/-1').load();
		}
	});
	
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<div class="checkbox"><label class="ui-check"><input class="invoiceId" type="checkbox" value="'+full.id+'" onclick="check(\'invoiceId\')"><i class="dark-white"></i></label></div>';
				return result;
			}},
			{mDataProp: 'clientCode', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCode+'</a>';
			}},
			{mDataProp: 'clientCompanyName', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCompanyName+'</a>';
			}},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				return '<strong>'+full.dueDate+'</strong>';
			}},
			{mDataProp: 'dueDate', "mRender": function(data, type, full) {
				var result = '';
				var date = full.dueDate.split('/');
				if(new Date(date[2]+'-'+date[1]+'-'+date[0]) < new Date()) {
					result = '<span class="badge text-bg-danger">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				else {
					result = '<span class="badge text-bg-info">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' j</span>';
				}
				return result;
			}},
			{mDataProp: 'code', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.id+');" class="amount-link">'+full.code+'</a>';
			}},
			{mDataProp: 'amountTtc', "mRender": function(data, type, full) {
				if(full.amountTtc != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc);
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return '<strong>'+new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount)+'</strong>';
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="showPaymentInvoice();" class="edit-item-btn"><i style="font-size: 17px" class="ri-bank-card-2-line align-bottom me-2 text-success"></i></a> <a href="#" onclick="showInvoiceDetail('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-eye-fill align-bottom me-2 text-info"></i></a> <a href="#" onclick="editInvoice('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a> <a href="#" onclick="removeInvoice('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.invoiceTable = TableManager.init("invoiceTable", $scope.$parent.baseUrl+"list/unpaid", columns, 5, "ASC");
		
		$scope.$parent.invoiceTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.invoiceTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('paymentTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.payment.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.invoicePaymentTable.ajax.url('/credit/invoicePayment/rest/listByPayment/'+newValue).load();
		}
		else {
			$scope.$parent.invoicePaymentTable.ajax.url('/credit/invoicePayment/rest/listByPayment/-1').load();
		}
	});
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<div class="checkbox"><label class="ui-check"><input class="paymentId" type="checkbox" value="'+full.id+'" onclick="check(\'paymentId\')"><i class="dark-white"></i></label></div>';
				return result;
			}},
			{mDataProp: 'clientCode', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCode+'</a>';
			}},
			{mDataProp: 'clientCompanyName', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showClientDetail('+full.clientId+');" class="amount-link">'+full.clientCompanyName+'</a>';
			}},
			{mDataProp: 'paymentDate'},
			{mDataProp: 'code'},
			{mDataProp: 'name'},
			{mDataProp: 'amount', "mRender": function(data, type, full) {
				if(full.amount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amount);
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="showInvoicePayment();" class="edit-item-btn"><i style="font-size: 17px" class="ri-bank-card-2-line align-bottom me-2 text-success"></i></a> <a href="#" onclick="showPaymentDetail('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-eye-fill align-bottom me-2 text-info"></i></a> <a href="#" onclick="editPayment('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a> <a href="#" onclick="removePayment('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.paymentTable = TableManager.init("paymentTable", $scope.$parent.paymentBaseUrl+"list", columns, 4, "DESC");
		
		$scope.$parent.paymentTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.paymentTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.loadPayment(id);
			}
		});
	};
});

app.controller('invoicePaymentTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'invoiceCode', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.invoiceId+');" class="amount-link">'+full.invoiceCode+'</a>';
			}},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'amount', "mRender": function(data, type, full) {
				if(full.amount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amount);
				return 0;
			}}
		];
		$scope.$parent.invoicePaymentTable = TableManager.init("invoicePaymentTable", $scope.$parent.invoicePaymentBaseUrl+"listByPayment/-1", columns);
	};
});

app.controller('invoicePaymentDetailTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'invoiceCode', "mRender": function(data, type, full) {
				return '<a href="#" onclick="showInvoiceDetail('+full.invoiceId+');" class="amount-link">'+full.invoiceCode+'</a>';
			}},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
			{mDataProp: 'amount', "mRender": function(data, type, full) {
				if(full.amount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amount);
				return 0;
			}},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="showInvoiceDetail('+full.invoiceId+');" class="btn btn-fw orange" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-desktop"></i></a>';
				return result;
			}}
		];
		$scope.$parent.invoicePaymentDetailTable = TableManager.init("invoicePaymentDetailTable", $scope.$parent.invoicePaymentBaseUrl+"listByPayment/-1", columns);
	};
});

app.controller('paymentInvoiceTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'paymentCode'},
			{mDataProp: 'paymentDate'},
			{mDataProp: 'amount', "mRender": function(data, type, full) {
				if(full.amount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amount);
				return 0;
			}}
		];
		$scope.$parent.paymentInvoiceTable = TableManager.init("paymentInvoiceTable", $scope.$parent.invoicePaymentBaseUrl+"listByInvoice/-1", columns);
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
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc);
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}}
		];
		$scope.$parent.invoiceTotalTable = TableManager.init("invoiceTotalTable", $scope.$parent.baseUrl+"list/unpaidByClient/-1", columns);
		
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
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc);
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}}
		];
		$scope.$parent.invoiceNotOverdueTable = TableManager.init("invoiceNotOverdueTable", $scope.$parent.baseUrl+"list/unpaidNotOverdueByClient/-1", columns);
		
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
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc);
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}}
		];
		$scope.$parent.invoiceOverdueTable = TableManager.init("invoiceOverdueTable", $scope.$parent.baseUrl+"list/unpaidOverdueByClient/-1", columns);
		
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
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc);
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}}
		];
		$scope.$parent.invoiceOverdue30Table = TableManager.init("invoiceOverdue30Table", $scope.$parent.baseUrl+"list/unpaidOverdue30ByClient/-1", columns);
		
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
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc);
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}}
		];
		$scope.$parent.invoiceOverdue60Table = TableManager.init("invoiceOverdue60Table", $scope.$parent.baseUrl+"list/unpaidOverdue60ByClient/-1", columns);
		
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
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc);
				return 0;
			}},
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}}
		];
		$scope.$parent.invoiceOverdue90Table = TableManager.init("invoiceOverdue90Table", $scope.$parent.baseUrl+"list/unpaidOverdue90ByClient/-1", columns);
		
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

app.controller('reminderClientTableController', function($scope,$http) {
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
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amount);
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