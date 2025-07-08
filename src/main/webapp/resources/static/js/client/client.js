app.controller('clientController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.dto.search = {};
	$scope.filtre = {};
	$scope.clientTable = null;
	//$scope.clientUserTable = null;
	$scope.contactTable = null;
	$scope.contractTable = null;
	$scope.outstandingTable = null;
	$scope.outstandingStatusTable = null;
	$scope.invoiceTable = null;
	$scope.invoiceTotalTable = null;
	$scope.invoiceNotOverdueTable = null;
	$scope.invoiceOverdueTable = null;
	$scope.invoiceOverdue30Table = null;
	$scope.invoiceOverdue60Table = null;
	$scope.invoiceOverdue90Table = null;
	$scope.paymentTable = null;
	$scope.reminderTable = null;
	$scope.reminderInvoiceTable = null;
	$scope.litigationInvoiceTable = null;
	$scope.promiseInvoiceTable = null;
	$scope.litigationStageTable = null;
	$scope.litigationCurrentTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.hidden = false;
	$scope.clientRequiredError = false;
	$scope.clientTechnicalError = false;
	$scope.clientSuccess = false;
	$scope.contactRequiredError = false;
	$scope.contactTechnicalError = false;
	$scope.contactSuccess = false;
	$scope.contractRequiredError = false;
	$scope.contractTechnicalError = false;
	$scope.contractSuccess = false;
	$scope.outstandingRequiredError = false;
	$scope.outstandingTechnicalError = false;
	$scope.outstandingSuccess = false;
	$scope.creditLimitRequiredError = false;
	$scope.creditLimitTechnicalError = false;
	$scope.creditLimitSuccess = false;
	$scope.invoiceRequiredError = false;
	$scope.invoiceTechnicalError = false;
	$scope.invoiceSuccess = false;
	$scope.paymentRequiredError = false;
	$scope.paymentTechnicalError = false;
	$scope.paymentSuccess = false;
	$scope.commentRequiredError = false;
	$scope.commentTechnicalError = false;
	$scope.commentSuccess = false;
	$scope.reminderReplyRequiredError = false;
	$scope.reminderReplyTechnicalError = false;
	$scope.reminderReplySuccess = false;
	$scope.invoicePaymentRequiredError = false;
	$scope.invoicePaymentTechnicalError = false;
	$scope.invoicePaymentSuccess = false;
	$scope.collaboratorRequiredError = false;
	$scope.collaboratorTechnicalError = false;
	$scope.collaboratorSuccess = false;
	$scope.clientPortofolioRequiredError = false;
	$scope.clientPortofolioTechnicalError = false;
	$scope.clientPortofolioSuccess = false;
	$scope.contractRequiredError = false;
	$scope.contractTechnicalError = false;
	$scope.contractSuccess = false;
	$scope.reminderPortofolioRequiredError = false;
	$scope.reminderPortofolioTechnicalError = false;
	$scope.reminderPortofolioSuccess = false;
	$scope.reminderRequiredError = false;
	$scope.reminderTechnicalError = false;
	$scope.reminderSuccess = false;
	$scope.litigationRequiredError = false;
	$scope.litigationTechnicalError = false;
	$scope.litigationSuccess = false;
	$scope.validatedOutstandingCreditLimit = false;
	$scope.availableOutstanding = false;
	$scope.creditInsuranceDisabled = true;
	$scope.buttonDisabled = false;
	$scope.clientsImport = [];
	$scope.importing = false;
	$scope.checked = false;
	$scope.commentReplyDisplayed = false;
	$scope.notifications = null;
	$scope.notificationsCount = 0;
	
	$scope.baseUrl = "/client/client/rest/";
	$scope.contactBaseUrl = "/client/contact/rest/";
	$scope.contractBaseUrl = "/client/contract/rest/";
	$scope.matriculationBaseUrl = "/client/matriculation/rest/";
	$scope.attachmentBaseUrl = "/client/attachment/rest/";
	$scope.outstandingBaseUrl = "/credit/outstanding/rest/";
	$scope.outstandingWarrantyBaseUrl = "/credit/outstandingWarranty/rest/";
	$scope.creditLimitBaseUrl = "/credit/creditLimit/rest/";
	$scope.reminderBaseUrl = "/reminder/reminder/rest/";
	$scope.reminderReplyBaseUrl = "/reminder/reminderReply/rest/";
	$scope.litigationBaseUrl = "/reminder/litigation/rest/";
	$scope.promiseBaseUrl = "/reminder/promise/rest/";
	$scope.contenceBaseUrl = "/reminder/contence/rest/";
	$scope.creditInsuranceBaseUrl = "/credit/creditInsurance/rest/";
	$scope.invoiceBaseUrl = "/credit/invoice/rest/";
	$scope.paymentBaseUrl = "/credit/payment/rest/";
	$scope.invoicePaymentBaseUrl = "/credit/invoicePayment/rest/";
	$scope.invoiceCommentBaseUrl = "/credit/invoiceComment/rest/";
	$scope.litigationStageBaseUrl = "/reminder/litigationStage/rest/";
	$scope.reminderInvoiceBaseUrl = "/reminder/reminderInvoice/rest/";
	$scope.promiseInvoiceBaseUrl = "/reminder/promiseInvoice/rest/";
	$scope.notificationBaseUrl = "/notification/rest/";
	$scope.promiseRequiredError = false;
	$scope.promiseTechnicalError = false;
	$scope.promiseSuccess = false;
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addClientForm = false;
		$scope.editClientForm = false;
		CRUDService.init($scope);
		$scope.initListCompanies();
		$scope.initListAgencies();
		$scope.initListTypes();
		$scope.initListStatus();
		$scope.initListLegalForms();
		$scope.initListGovernances();
		$scope.initListCountries();
		$scope.initListAttachments();
		$scope.initListInsurances();
		$scope.initListInvoiceStatus();
		$scope.initListInvoiceTypes();
		$scope.initListPaymentMethods();
		$scope.initListCurrencies();
		$scope.initListWarranties();
		$scope.initListUsers();
		$scope.initListClientPortofolios();
		$scope.initListClientCategories();
//		$scope.initListClients();
		$scope.initListReminderPortofolios();
		$scope.initListActions();
		$scope.initListActionTypes();
		$scope.initListReminderStatus();
		$scope.initListLitigationStatus();
		$scope.initListLetterTemplates();
		$scope.getCurrentStats();
		$scope.initListContenceSteps();
		$scope.initListCommercialCourts();
		$scope.initListSieges();
		$scope.initListContractTypes();
		$scope.initListContractStatus();
		$scope.initListNotifications();
		$scope.initListGroups();
		
		$scope.items = [{
			  id: false,
			  name: 'Non'
			}, {
			  id: true,
			  name: 'Oui'
		}];
		
		$scope.clientContractStatus = [{
			  id: 1,
			  name: 'Clients sans contrat'
			}, {
			  id: 2,
			  name: 'Clients avec contrat'
		}];
		
		$scope.reminderReplyTypes = [{
			  id: 'Aucune réponse',
			  name: 'Aucune réponse'
			}, {
			  id: 'Commentaire',
			  name: 'Commentaire'
			}, {
			  id: 'Promesse de règlement',
			  name: 'Promesse de règlement'
		}];
		
		$scope.snoweditor = new Quill('#snoweditor', toolOptions());
	};
	
	toolOptions = function() {
		var toolbarOptions = [
			['bold', 'italic', 'underline', 'strike'],
			['blockquote', 'code-block'],
			[{'header':[!1,1,2,3,4,5,6]}],
			[{'list': 'ordered'}, {'list': 'bullet'}],
			[{'script': 'sub'}, {'script': 'super'}],
			[{'indent': '-1'}, {'indent': '+1'}],
			[{'direction': 'rtl'}],
			[{'size': ['small', false, 'large', 'huge']}],
			['link', 'image', 'video', 'formula'],
			[{'color': []}, {'background': []}],
			[{'font': []}, {size:[]}],
			[{'align': []}]
			];
			var options = {
			  modules: {
			    toolbar: toolbarOptions
			  },
			  theme: 'snow'
			};
		return options;
	}
	
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
	
	$scope.initListCountries = function() {
		$http.get(context+"/administration/referentiel/region/country/rest/getAll").success(function(data, status) {   
			$scope.countries = data;
		});
	};
	
	$scope.loadCities = function() {
		$http.get(context+"/administration/referentiel/region/city/rest/getByCountry/"+$scope.dto.countryId).success(function(data, status) { 
			$scope.cities = data;
		});
	}
	
	$scope.initListAttachments = function() {
		$http.get(context+"/administration/referentiel/attachment/rest/getAll").success(function(data, status) {   
			$scope.attachments = data;
		});
	};
	
	$scope.initListInsurances = function() {
		$http.get(context+"/administration/referentiel/insurance/rest/getAll").success(function(data, status) {   
			$scope.insurances = data;
		});
	};
	
	$scope.initListInvoiceStatus = function() {
		$http.get(context+"/administration/referentiel/invoiceStatus/rest/getAll").success(function(data, status) {   
			$scope.invoiceStatus = data;
		});
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
	
	$scope.initListClientPortofolios = function() {
		$http.get(context+"/client/portofolio/rest/getAll").success(function(data, status) {   
			$scope.clientPortofolios = data;
		});
	};
	
	$scope.initListClientCategories = function() {
		$http.get(context+"/client/category/rest/getAll").success(function(data, status) {   
			$scope.clientCategories = data;
		});
	};
	
//	$scope.initListClients = function() {
//		$http.get(context+"/client/client/rest/getAll").success(function(data, status) {   
//			$scope.clients = data;
//		});
//	};
	
	$scope.initListSieges = function() {
		$http.get(context+"/client/client/rest/getAllSieges").success(function(data, status) {   
			$scope.sieges = data;
		});
	};
	
	$scope.initListGroups = function() {
		$http.get(context+"/client/client/rest/getAllGroups").success(function(data, status) {   
			$scope.groups = data;
		});
	};
	
	$scope.initListReminderPortofolios = function() {
		$http.get(context+"/reminder/portofolio/rest/getAll").success(function(data, status) {   
			$scope.reminderPortofolios = data;
		});
	};
	
	$scope.initListInvoices = function(id) {
		$http.get(context+"/credit/invoice/rest/getAllUnpaidByClient/"+id).success(function(data, status) {   
			$scope.invoices = data;
		});
	};
	
	$scope.initListActions = function() {
		$http.get(context+"/administration/referentiel/action/rest/getAll").success(function(data, status) {   
			$scope.actionsList = data;
		});
	};
	
	$scope.initListActionTypes = function() {
		$http.get(context+"/administration/referentiel/actionType/rest/getAll").success(function(data, status) {   
			$scope.actionTypes = data;
		});
	};
	
	$scope.initListReminderStatus = function() {
		$http.get(context+"/administration/referentiel/reminderStatus/rest/getAll").success(function(data, status) {   
			$scope.reminderStatus = data;
		});
	};
	
	$scope.initListLitigationStatus = function() {
		$http.get(context+"/administration/referentiel/litigationStatus/rest/getAll").success(function(data, status) {   
			$scope.litigationStatus = data;
		});
	};
	
	$scope.initListLetterTemplates = function() {
		$http.get(context+"/reminder/letterTemplate/rest/getAll").success(function(data, status) {   
			$scope.letterTemplates = data;
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
	
	$scope.summary = function(id) {
		$http.get(context+$scope.invoiceBaseUrl+"getRemainingAmountByClient/"+id).success(function(data, status) {   
			$scope.totalRemainingAmount = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
			
			$http.get(context+$scope.invoiceBaseUrl+"getOverdueByClient/"+id).success(function(data, status) {   
				$scope.totalOverdueAmount = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
				
				$http.get(context+$scope.invoiceBaseUrl+"getOverdueAmountByClient/0/30/"+id).success(function(data, status) {   
					$scope.totalOverdueAmount30 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
					$scope.totalOverdueAmount30NotFormatted = data;
					
					$http.get(context+$scope.invoiceBaseUrl+"getOverdueAmountByClient/30/60/"+id).success(function(data, status) {   
						$scope.totalOverdueAmount60 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
						$scope.totalOverdueAmount60NotFormatted = data;
						
						$http.get(context+$scope.invoiceBaseUrl+"getOverdueAmountByClient/60/90/"+id).success(function(data, status) {   
							$scope.totalOverdueAmount90 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
							$scope.totalOverdueAmount90NotFormatted = data;
							
							$http.get(context+$scope.invoiceBaseUrl+"getOverdueAmountByClient/90/120/"+id).success(function(data, status) {   
								$scope.totalOverdueAmount120 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
								$scope.totalOverdueAmount120NotFormatted = data;
								
								$http.get(context+$scope.invoiceBaseUrl+"getOverdueAmountByClient/120/150/"+id).success(function(data, status) {   
									$scope.totalOverdueAmount150 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
									$scope.totalOverdueAmount150NotFormatted = data;
									
									$http.get(context+$scope.invoiceBaseUrl+"getOverdueAmountByClient/150/"+id).success(function(data, status) {   
										$scope.totalOverdueAmount151 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
										$scope.totalOverdueAmount151NotFormatted = data;
										$scope.flotOverdueAmount();
										
										$http.get(context+$scope.invoiceBaseUrl+"getNotOverdueAmountByClient/"+id).success(function(data, status) {   
											$scope.totalNotOverdueAmount = new Intl.NumberFormat().format(data);
											$scope.totalNotOverdueAmountNotFormatted = data;
											$scope.flotOverdueAmount();
										});
									});
								});
							});
						});
					});
				});
			});
		});
	};
	
//	$scope.flotOverdueAmount = function() {
//		var dataSet1 = [
//              { 
//                data: [[1, $scope.totalOverdueAmount30NotFormatted], [2, $scope.totalOverdueAmount60NotFormatted], [3, $scope.totalOverdueAmount90NotFormatted], [4, $scope.totalOverdueAmount120NotFormatted], [5, $scope.totalOverdueAmount150NotFormatted], [6, $scope.totalOverdueAmount151NotFormatted]], 
//                bars: { show: true, barWidth: 0.25, lineWidth: 1, fillColor: { colors: [{ opacity: 0.8 }, { opacity: 1}] }, order:2 } 
//              }
//        ];
//		var ticks = [[1, "Retard -30j"], [2, "Retard 30-60j"], [3, "Retard 60-90j"], [4, "Retard 90-120j"],[5, "Retard 120-150j"], [6, "Retard +150j"]];
//	    var options1 = {
//                colors: ['#fcc100'],
//                series: { shadowSize: 3 },
//                xaxis: { show: true, font: { color: '#ccc' }, position: 'bottom', ticks: ticks },
//                yaxis:{ show: true, font: { color: '#ccc' }},
//                grid: { hoverable: true, clickable: true, borderWidth: 0, color: 'rgba(120,120,120,0.5)' },
//                tooltip: true,
//                tooltipOpts: { content: '%y.2',  defaultTheme: false, shifts: { x: 0, y: -40 } }
//              };
//	    $.plot($("#flot-placeholder1"), dataSet1, options1);
//	}
	
	$scope.flotOverdueAmount = function() {
		const labels = ["Non échu", "0 - 30 j", "31 - 60 j", "61 - 90 j", "91 - 120 j", "121 - 150 j", "+ 150 j"];
		const data = {
		  labels: labels,
		  datasets: [
		    {
		      label: 'Encours client',
		      data: [$scope.totalNotOverdueAmountNotFormatted, $scope.totalOverdueAmount30NotFormatted, $scope.totalOverdueAmount60NotFormatted, $scope.totalOverdueAmount90NotFormatted, $scope.totalOverdueAmount120NotFormatted, $scope.totalOverdueAmount150NotFormatted, $scope.totalOverdueAmount151NotFormatted],
		      borderColor: "#BF925B",
		      backgroundColor: "#BF925B",
		    }
		  ]
		};
		const config = {type: 'bar', data: data, options: {responsive: true, plugins: {legend: {position: 'top', labels: {font: {family: "'Poppins', 'Open sans'"}}}},
			scales: {x: {ticks: {font: {family: "'Poppins', 'Open sans'"}}}, y: {ticks: {font: {family:"'Poppins', 'Open sans'"}}}}}};
		const flotOverdueAmount = new Chart(document.getElementById('flotOverdueAmount'), config);
	}
	
	$scope.flotPayment = function(id) {
		var currentDate = new Date(); $scope.amountMonth = [];
		var dataValueInvoice = [];
		var dataValuePayment = [];
		$http.get(context+$scope.invoiceBaseUrl+"getAmountByMonthByClient/"+currentDate.getFullYear()+"/"+id).success(function(data, status) {
			$scope.invoiceYear = data;
			$http.get(context+$scope.paymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/"+id).success(function(data, status) {
				$scope.paymentYear = data;
				if($scope.invoiceYear.length != 0) {
					for(i = 1; i <= 12; i++) {
						for(j = 0; j < $scope.invoiceYear.length; j++) {
							if(i == $scope.invoiceYear[j][0]) {
								dataValueInvoice.push($scope.invoiceYear[j][1]);
							}
						}
					}
				} else {
					for(i = 1; i <= 12; i++) {
						dataValueInvoice.push(0);
					}
				}
				if($scope.paymentYear.length != 0) {
					for(i = 1; i <= 12; i++) {
						for(j = 0; j < $scope.paymentYear.length; j++) {
							if(i == $scope.paymentYear[j][0]) {
								dataValuePayment.push($scope.paymentYear[j][1]);
							}
						}
					}
				} else {
					for(i = 1; i <= 12; i++) {
						dataValuePayment.push(0);
					}
				}
				
				const labels = ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'];
				
				const flotAmountData = {labels: labels, 
						datasets: [
							{label: 'Chiffre d\'affaires', backgroundColor: 'rgb(191, 146, 91)', borderColor: 'rgb(191, 146, 91)', data: dataValueInvoice, tension: 0.4, },
							{label: 'Encaissement', backgroundColor: 'rgb(72, 142, 66)', borderColor: 'rgb(72, 142, 66)', data: dataValuePayment, tension: 0.2, }
						]};
				const config = {type: 'line', data: flotAmountData, options: {responsive: true, animations: {radius: {duration: 400, easing: 'linear', loop: (context) => context.active}},
						hoverRadius: 12, hoverBackgroundColor: 'yellow', interaction: {mode: 'nearest', intersect: false, axis: 'x'},
						scales: {x: {ticks: {font: {family: "'Poppins', 'Open sans'"}}}, y: {ticks: {font: {family:"'Poppins', 'Open sans'"}}}},
						plugins: {tooltip: {enabled: true}, legend: {labels: {font: {family: "'Poppins', 'Open sans'"}}}}
				}};
				const flotAmount = new Chart(document.getElementById('flotAmount'), config);
			});
		});
	};
	
//	$scope.flotPayment = function(id) {
//		var currentDate = new Date(); $scope.paymentMonth = [];
//		$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/01/"+id).success(function(data, status) { 
//			$scope.paymentMonth[0] = data;
//			$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/02/"+id).success(function(data, status) { 
//				$scope.paymentMonth[1] = data;
//				$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/03/"+id).success(function(data, status) { 
//					$scope.paymentMonth[2] = data;
//					$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/04/"+id).success(function(data, status) { 
//						$scope.paymentMonth[3] = data;
//						$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/05/"+id).success(function(data, status) { 
//							$scope.paymentMonth[4] = data;
//							$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/06/"+id).success(function(data, status) { 
//								$scope.paymentMonth[5] = data;
//								$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/07/"+id).success(function(data, status) { 
//									$scope.paymentMonth[6] = data;
//									$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/08/"+id).success(function(data, status) { 
//										$scope.paymentMonth[7] = data;
//										$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/09/"+id).success(function(data, status) { 
//											$scope.paymentMonth[8] = data;
//											$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/10/"+id).success(function(data, status) { 
//												$scope.paymentMonth[9] = data;
//												$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/11/"+id).success(function(data, status) { 
//													$scope.paymentMonth[10] = data;
//													$http.get(context+$scope.invoicePaymentBaseUrl+"getPaymentByMonthByClient/"+currentDate.getFullYear()+"/12/"+id).success(function(data, status) { 
//														$scope.paymentMonth[11] = data;
//														
//														var dataSet = [
//												              { 
//												                data: [[1, $scope.paymentMonth[0]], [2, $scope.paymentMonth[1]], [3, $scope.paymentMonth[2]], [4, $scope.paymentMonth[3]], [5, $scope.paymentMonth[4]], [6, $scope.paymentMonth[5]], [7, $scope.paymentMonth[6]], [8, $scope.paymentMonth[7]], [9, $scope.paymentMonth[8]], [10, $scope.paymentMonth[9]], [11, $scope.paymentMonth[10]], [12, $scope.paymentMonth[11]]]
//												              }
//												        ];
//														var ticks = [[1, "Jan"], [2, "Fev"], [3, "Mars"], [4, "Avril"],[5, "Mai"], [6, "Juin"], [7, "Juil"], [8, "Août"], [9, "Sept"], [10, "Oct"], [11, "Nov"], [12, "Dec"]];
//													    var options = {
//													    		series: {lines: {show: true}, points: {radius: 3, fill: true, show: true}},
//													    		colors: ['#0cc2aa'],
//												                xaxis: { show: true, font: { color: '#ccc' }, position: 'bottom', ticks: ticks },
//												                yaxis:{ show: true, font: { color: '#ccc' }},
//												                grid: { hoverable: true, clickable: true, borderWidth: 0, color: 'rgba(120,120,120,0.5)' },
//												                tooltip: true,
//												                tooltipOpts: { content: '%y.2',  defaultTheme: false, shifts: { x: 0, y: -40 } }
//												              };
//													    $.plot($("#flot-placeholder5"), dataSet, options);
//													});
//												});
//											});
//										});
//									});
//								});
//							});
//						});
//					});
//				});
//			});
//		});
//	}
	
	$scope.flotDsoByMonth = function(id) {
		var currentDate = new Date(); $scope.dsoBarMonth = [];
		$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/01/"+id).success(function(data, status) {   
			$scope.dsoBarMonth[0] = data;
			$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/02/"+id).success(function(data, status) {   
				$scope.dsoBarMonth[1] = data;
				$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/03/"+id).success(function(data, status) {   
					$scope.dsoBarMonth[2] = data;
					$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/04/"+id).success(function(data, status) {   
						$scope.dsoBarMonth[3] = data;
						$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/05/"+id).success(function(data, status) {   
							$scope.dsoBarMonth[4] = data;
							$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/06/"+id).success(function(data, status) {   
								$scope.dsoBarMonth[5] = data;
								$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/07/"+id).success(function(data, status) {   
									$scope.dsoBarMonth[6] = data;
									$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/08/"+id).success(function(data, status) {   
										$scope.dsoBarMonth[7] = data;
										$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/09/"+id).success(function(data, status) {   
											$scope.dsoBarMonth[8] = data;
											$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/10/"+id).success(function(data, status) {   
												$scope.dsoBarMonth[9] = data;
												$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/11/"+id).success(function(data, status) {   
													$scope.dsoBarMonth[10] = data;
													$http.get(context+$scope.invoiceBaseUrl+"getDsoByMonthByClient/"+currentDate.getFullYear()+"/12/"+id).success(function(data, status) {   
														$scope.dsoBarMonth[11] = data;
														
														const labels = ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Jui', 'Jul', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];
														const dataDso = {
														  labels: labels,
														  datasets: [
														    {
														      label: 'DSO',
														      data: [$scope.dsoBarMonth[0], $scope.dsoBarMonth[1], $scope.dsoBarMonth[2], $scope.dsoBarMonth[3], $scope.dsoBarMonth[4], $scope.dsoBarMonth[5], $scope.dsoBarMonth[6], $scope.dsoBarMonth[7], $scope.dsoBarMonth[8], $scope.dsoBarMonth[9], $scope.dsoBarMonth[10], $scope.dsoBarMonth[11]],
														      borderColor: "#4E9249",
														      backgroundColor: "#4E9249",
														    }
														  ]
														};
														const config = {type: 'bar', data: dataDso, options: {responsive: true, plugins: {legend: {position: 'top', labels: {font: {family: "'Poppins', 'Open sans'"}}}},
															scales: {x: {ticks: {font: {family: "'Poppins', 'Open sans'"}}}, y: {ticks: {font: {family:"'Poppins', 'Open sans'"}}}}}};
														const flotDso = new Chart(document.getElementById('flotDso'), config);
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}
	
	loadScenarioByOutstanding = function() {
		$http.get(context+"/credit/outstanding/rest/getValidatedByClient/"+$scope.dto.id).success(function(data, status) {
			$scope.dto.reminder.clientCompanyName = data.clientCompanyName;
			$scope.dto.reminder.remainingAmount = data.realAmount;
			$scope.dto.reminder.currencyId = data.currencyId;
			$http.get(context+"/reminder/scenario/rest/getByClient/"+$scope.dto.id).success(function(data, status) {
				if(data != null) {
					$scope.dto.reminder.scenarioName = data.name;
					$http.get(context+"/reminder/scenarioStage/rest/getPeriodicStageByScenario/"+data.id).success(function(data, status) {
						$scope.scenarioStages = data;
					});
				}
			});
		});
	};
	
	loadScenarioByInvoice = function() {
		if($("#invoiceId").val() != null) {
			$http.get(context+"/credit/invoice/rest/load/"+($("#invoiceId").val().split(':'))[1]).success(function(data, status) {
				$scope.dto.reminder.remainingAmount = data.remainingAmount;
				$scope.dto.reminder.dueDate = data.dueDate;
				$scope.dto.reminder.currencyId = data.currencyId;
				$http.get(context+"/reminder/scenario/rest/getByClient/"+$scope.dto.id).success(function(data, status) {
					if(data != null) {
						$scope.dto.reminder.scenarioName = data.name;
						$http.get(context+"/reminder/scenarioStage/rest/getByScenario/"+data.id).success(function(data, status) {
							$scope.scenarioStages = data;
						});
					}
				});
			});
		}
	};
	
	$scope.loadLitigationByInvoice = function(id) {
		$http.get(context+"/credit/invoice/rest/load/"+id).success(function(data, status) {
			$scope.dto.litigation.amount = data.remainingAmount;
			$scope.dto.litigation.dueDate = data.dueDate;
		});
	};
	
	$scope.loadByScenarioStage = function(id) {
		$http.get(context+"/reminder/scenarioStage/rest/load/"+id).success(function(data, status) {
			$scope.dto.reminder.actionId = data.actionId;
			$scope.dto.reminder.actionTypeId = data.actionTypeId;
		});
	};
	
	$scope.getCurrentStats = function() {
		$http.get(context+"/client/client/rest/getCount").success(function(data, status) {   
			$scope.clientNum = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
		});
		$http.get(context+"/credit/invoice/rest/getRemainingAmount").success(function(data, status) {   
			if(data == null) $scope.remainingAmount = 0; else $scope.remainingAmount = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
		});
		$http.get(context+"/credit/invoice/rest/getOverdueRemainingAmount").success(function(data, status) {   
			if(data == null) $scope.overdueRemainingAmount = 0; else $scope.overdueRemainingAmount = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
		});
		$http.get(context+"/reminder/reminder/rest/getCount").success(function(data, status) {   
			$scope.reminderNum = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
		});
		$http.get(context+"/reminder/litigation/rest/getCount").success(function(data, status) {   
			$scope.litigationNum = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
		});
	};
	
	contactList = function() {
		$('#contactListModal').modal("show");
	};
	
	$scope.advancedSearchClientForm = function() {
		if(!angular.isUndefined($scope.dto.search.codeClient) && $scope.dto.search.codeClient != null)
			$('#codeClient').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/client/client/rest/getCode/"+params.term;
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
			$('#codeClient').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/client/client/rest/getCode/"+params.term;
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
			$('#companyName').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/client/client/rest/getName/"+params.term;
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
			$('#companyName').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/client/client/rest/getName/"+params.term;
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
		
		$('#advancedSearchClientModal').modal("show");
	};
	
	$scope.advancedSearchContractForm = function() {
		if(!angular.isUndefined($scope.dto.search.contractStatusId) && $scope.dto.search.contractStatusId != null)
			$('#contractStatusId').select2().select2('val', 'number:'+$scope.dto.search.contractStatusId);
		else
			$('#contractStatusId').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		if(!angular.isUndefined($scope.dto.search.contractTypeId) && $scope.dto.search.contractTypeId != null)
			$('#contractTypeId').select2().select2('val', 'number:'+$scope.dto.search.contractTypeId);
		else
			$('#contractTypeId').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		if(!angular.isUndefined($scope.dto.search.contractCode) && $scope.dto.search.contractCode != null)
			$('#contractCode').select2().select2('val', 'string:'+$scope.dto.search.contractCode);
		else
			$('#contractCode').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		if(!angular.isUndefined($scope.dto.search.contractKy) && $scope.dto.search.contractKy != null)
			$('#contractKy').select2().select2('val', 'string:'+$scope.dto.search.contractKy);
		else
			$('#contractKy').select2({placeholder: 'Choisir une option'}).select2('val', '');
		
		$('#advancedSearchContractModal').modal("show");
	};
	
	$scope.advancedSearchReminderForm = function() {
		if(!angular.isUndefined($scope.dto.search.invoiceReminderCode) && $scope.dto.search.invoiceReminderCode != null)
			$('#invoiceReminderCode').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/invoice/rest/getAllCodesByClient/"+$scope.dto.id+"/"+params.term;
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
						return context+"/credit/invoice/rest/getAllCodesByClient/"+$scope.dto.id+"/"+params.term;
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
	
	$scope.advancedSearchLitigationForm = function() {
		if(!angular.isUndefined($scope.dto.search.invoiceLitigationCode) && $scope.dto.search.invoiceLitigationCode != null)
			$('#invoiceLitigationCode').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/invoice/rest/getAllCodesByClient/"+$scope.dto.id+"/"+params.term;
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
			}).select2('val', $scope.dto.search.invoiceLitigationCode);
		else
			$('#invoiceLitigationCode').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/credit/invoice/rest/getAllCodesByClient/"+$scope.dto.id+"/"+params.term;
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
		
		$('#advancedSearchLitigationModal').modal("show");
	};
	
	$scope.addClient = function() {
		CRUDService.add($scope);
		$scope.editClientForm = false;
		$scope.addClientForm = true;
		$scope.clientSuccess = false;
		$scope.clientTechnicalError = false;
		$scope.clientRequiredError = false;
		$('#clientModal').modal("show");
	};
	
	$scope.importClients = function() {
		$scope.importing = false;
		document.getElementById('clientFileInput').value = '';
		CRUDService.add($scope);
		$scope.clientSuccess = false;
		$scope.clientTechnicalError = false;
		$scope.clientRequiredError = false;
		$('#importClientsModal').modal("show");
	};
	
	loadImportClients = function() {
		var file = $('#clientFileInput')[0].files[0];
		var sFilename = file.name;
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
	}
	
	$scope.importContracts = function() {
		document.getElementById('contractFileInput').value = '';
		$scope.contractSuccess = false;
		$scope.contractTechnicalError = false;
		$scope.contractRequiredError = false;
		$('#importContractsModal').modal("show");
	};
	
	loadImportContracts = function() {
		var file = $('#contractFileInput')[0].files[0];
		var sFilename = file.name;
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
	}
	
	$scope.addContact = function() {
		$scope.dto.contact = {};
		$scope.editContactForm = false;
		$scope.addContactForm = true;
		$scope.contactSuccess = false;
		$scope.contactTechnicalError = false;
		$scope.contactRequiredError = false;
		$('#contactModal').modal("show");
	};
	
	$scope.addContract = function() {
		$scope.dto.contract = {};
		$scope.editContractForm = false;
		$scope.addContractForm = true;
		$scope.contractSuccess = false;
		$scope.contractTechnicalError = false;
		$scope.contractRequiredError = false;
		$('#contractModal').modal("show");
	};
	
	$scope.addAttachment = function() {
		$scope.dto.attachment = {};
		$scope.editAttachmentForm = false;
		$scope.addAttachmentForm = true;
		$scope.attachmentSuccess = false;
		$scope.attachmentTechnicalError = false;
		$scope.attachmentRequiredError = false;
		$('#attachmentModal').modal("show");
	};
	
	$scope.addOutstanding = function() {
		if($scope.availableOutstanding) {
			Toastify({
				text: "Ce client dispose déjà d'un encours autorisé.",
				gravity: "top", position: "center", duration: 4000, close: true, stopOnFocus: true, style: {background: "linear-gradient(to right, #F06548, #df563a)"}
			}).showToast();
		} else {
			$scope.dto.outstanding = {};
			$scope.editOutstandingForm = false;
			$scope.addOutstandingForm = true;
			$scope.outstandingSuccess = false;
			$scope.outstandingTechnicalError = false;
			$scope.outstandingRequiredError = false;
			$('#outstandingModal').modal("show");
		}
	};
	
	$scope.addCreditLimit = function() {
		$http.get(context+$scope.outstandingBaseUrl+"getValidatedByClient/"+$scope.dto.id).success(function(data, status) {
			if(data != null && data.clientId != null) {
				$scope.dto.creditLimit = {};
				$scope.dto.creditLimit.outstandingId = data.id;
				$scope.editCreditLimitForm = false;
				$scope.addCreditLimitForm = true;
				$scope.creditLimitSuccess = false;
				$scope.creditLimitTechnicalError = false;
				$scope.creditLimitRequiredError = false;
				$('#creditLimitModal').modal("show");
			} else {
				Toastify({
					text: "Ce client ne dispose pas d'encours autorisé.",
					gravity: "top", position: "center", duration: 3000, close: true, stopOnFocus: true, style: {background: "#F06548"}
				}).showToast();
			}
		});
	};
	
	$scope.addInvoice = function() {
		$scope.dto.invoice = {};
		$scope.dto.invoice.paymentMethodId = $scope.dto.paymentMethodId;
		$scope.dto.invoice.currencyId = $scope.dto.currencyId;
		$scope.editInvoiceForm = false;
		$scope.addInvoiceForm = true;
		$scope.invoiceSuccess = false;
		$scope.invoiceTechnicalError = false;
		$scope.invoiceRequiredError = false;
		$('#invoiceModal').modal("show");
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
	
	$scope.addPromiseClient = function(name) {
		$scope.dto.promise = {};
		$scope.dto.promise.invoices = "";
		$scope.dto.promise.currencyId = $scope.dto.currencyId;
		$scope.dto.promise.clientId = $scope.dto.id;
		$scope.dto.promise.clientCompanyName = $scope.dto.companyName;
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
	
	$scope.addPromiseReminder = function(id) {
		$scope.dto.promise = {};
		$scope.dto.promise.invoices = "";
		$scope.dto.promise.currencyId = $scope.dto.currencyId;
		$scope.dto.promise.clientId = $scope.dto.id;
		$scope.dto.promise.clientCompanyName = $scope.dto.companyName;
		$scope.dto.promise.amount = 0;
		
		$http.get(context+"/reminder/reminderInvoice/rest/loadByReminder/"+id).success(function(data, status) {
			for(var reminderInvoice of data) {
				$scope.dto.promise.amount += reminderInvoice.amount;
				$scope.dto.promise.invoices += '<a href="#" onclick="showInvoiceDetail('+reminderInvoice.invoiceId+');" class="amount-link">'+reminderInvoice.invoiceCode+'</a>&nbsp;&nbsp;';
			}
		});
		$scope.editPromiseForm = false;
		$scope.addPromiseForm = true;
		$scope.promiseSuccess = false;
		$scope.promiseTechnicalError = false;
		$scope.promiseRequiredError = false;
		$('#promiseReminderModal').modal("show");
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
	
	$scope.showComment = function() {
		$('#commentListModal').modal("show");
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
			$scope.reminderInvoiceTable.ajax.url('/reminder/reminder/rest/listByInvoice/'+id).load();
			$scope.litigationInvoiceTable.ajax.url('/reminder/litigation/rest/listByInvoice/'+id).load();
			$scope.promiseInvoiceTable.ajax.url('/reminder/promise/rest/listByInvoice/'+id).load();
			$scope.contenceInvoiceTable.ajax.url('/reminder/contence/rest/listByInvoice/'+id).load();
			
			$('#invoiceDetailModal').modal("show");
		});
	};
	
	$scope.showReminderLitigation = function() {
		$http.get(context+$scope.litigationBaseUrl+"getByReminder/"+$scope.dto.reminder.id).success(function(data, status) { 
			$scope.dto.litigationDetail = data;
			$scope.litigationStageTable.ajax.url($scope.litigationStageBaseUrl+'list/'+data.id).load();
			$('#reminderLitigationModal').modal("show");
		});
	};
	
	$scope.searchClient = function() {
		var searchKey = 'NAN';
		if(!angular.isUndefined($scope.dto.search.key) && $scope.dto.search.key != '') searchKey = $scope.dto.search.key;
		$scope.clientTable.ajax.url('/client/client/rest/search/'+searchKey).load();
	};
	
	$scope.advancedSearchClient = function() {
		var searchId = 0; var searchCodeClient = 'NAN'; var searchCompanyName = 'NAN';  var searchIceNum = 'NAN'; var searchTaxNum = 'NAN'; var searchCompanyId = 0; var searchAgencyId = 0; var searchClientPortofolioId = 0; var searchContractStatus = 0;
		$scope.dto.search.codeClient = $("#codeClient").val();
		$scope.dto.search.companyName = $("#companyName").val();
		if(!angular.isUndefined($scope.dto.search.codeClient) && $scope.dto.search.codeClient != '') searchCodeClient = $scope.dto.search.codeClient;
		if(!angular.isUndefined($scope.dto.search.companyName) && $scope.dto.search.companyName != '') searchCompanyName = $scope.dto.search.companyName;
		if(!angular.isUndefined($scope.dto.search.iceNum) && $scope.dto.search.iceNum != '') searchIceNum = $scope.dto.search.iceNum;
		if(!angular.isUndefined($scope.dto.search.taxNum) && $scope.dto.search.taxNum != '') searchTaxNum = $scope.dto.search.taxNum;
		if(!angular.isUndefined($scope.dto.search.companyId) && $scope.dto.search.companyId != null) searchCompanyId = $scope.dto.search.companyId;
		if(!angular.isUndefined($scope.dto.search.agencyId) && $scope.dto.search.agencyId != null) searchAgencyId = $scope.dto.search.agencyId;
		if(!angular.isUndefined($scope.dto.search.clientPortofolioId) && $scope.dto.search.clientPortofolioId != null) searchClientPortofolioId = $scope.dto.search.clientPortofolioId;
		if(!angular.isUndefined($scope.dto.search.contractStatus) && $scope.dto.search.contractStatus != null) searchContractStatus = $scope.dto.search.contractStatus;
		$scope.clientTable.ajax.url('/client/client/rest/search/'+searchCodeClient+'/'+searchCompanyName+'/'+searchIceNum+'/'+searchTaxNum+'/'+searchCompanyId+'/'+searchAgencyId+'/'+searchClientPortofolioId+'/'+searchContractStatus).load();
		$('#advancedSearchClientModal').modal("hide");
	};
	
	$scope.advancedSearchContract = function() {
		var searchCode = 'NAN'; var searchKy = 'NAN'; var searchContractStatusId = 0; var searchContractTypeId = 0; var searchPaymentMethodId = 0; var searchClientId = 0; var searchStartDateStart = 'NAN'; var searchStartDateEnd = 'NAN'; var searchEndDateStart = 'NAN'; var searchEndDateEnd = 'NAN'; var searchAmountTtc = -1;
		var date = new Date();
		$scope.dto.search.contractCode = ($("#contractCode").val().split(':'))[1];
		$scope.dto.search.contractKy = ($("#contractKy").val().split(':'))[1];
		$scope.dto.search.contractStatusId = ($("#contractStatusId").val().split(':'))[1];
		$scope.dto.search.contractTypeId = ($("#contractTypeId").val().split(':'))[1];
		$scope.dto.search.clientId = $scope.dto.id;
		if(!angular.isUndefined($scope.dto.search.contractCode) && $scope.dto.search.contractCode != '') searchCode = $scope.dto.search.contractCode;
		if(!angular.isUndefined($scope.dto.search.contractKy) && $scope.dto.search.contractKy != '') searchKy = $scope.dto.search.contractKy;
		if(!angular.isUndefined($scope.dto.search.contractStatusId) && $scope.dto.search.contractStatusId != null) searchContractStatusId = $scope.dto.search.contractStatusId;
		if(!angular.isUndefined($scope.dto.search.contractTypeId) && $scope.dto.search.contractTypeId != null) searchContractTypeId = $scope.dto.search.contractTypeId;
		if(!angular.isUndefined($scope.dto.search.paymentMethodId) && $scope.dto.search.paymentMethodId != null) searchPaymentMethodId = $scope.dto.search.paymentMethodId;
		if(!angular.isUndefined($scope.dto.search.clientId) && $scope.dto.search.clientId != null) searchClientId = $scope.dto.search.clientId;
		if(!angular.isUndefined($scope.dto.search.amountTtc) && $scope.dto.search.amountTtc != null) searchAmountTtc = $scope.dto.search.amountTtc;
		if(!angular.isUndefined($scope.dto.search.startDateStart) && $scope.dto.search.startDateStart != '') {
			searchStartDateStart = moment($scope.dto.search.startDateStart).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.dto.search.startDateEnd) && $scope.dto.search.startDateEnd != '') {
				searchStartDateStart = moment(date).format('YYYY-MM-DD');
			}
		}
		if(!angular.isUndefined($scope.dto.search.startDateEnd) && $scope.dto.search.startDateEnd != '') {
			searchStartDateEnd = moment($scope.dto.search.startDateEnd).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.dto.search.startDateStart) && $scope.dto.search.startDateStart != '') {
				searchStartDateEnd = moment(date).format('YYYY-MM-DD');
			}
		}
		if(!angular.isUndefined($scope.dto.search.endDateStart) && $scope.dto.search.endDateStart != '') {
			searchEndDateStart = moment($scope.dto.search.endDateStart).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.dto.search.endDateEnd) && $scope.dto.search.endDateEnd != '') {
				searchEndDateStart = moment(date).format('YYYY-MM-DD');
			}
		}
		if(!angular.isUndefined($scope.dto.search.endDateEnd) && $scope.dto.search.endDateEnd != '') {
			searchEndDateEnd = moment($scope.dto.search.endDateEnd).format('YYYY-MM-DD');
		} else {
			if(!angular.isUndefined($scope.dto.search.endDateStart) && $scope.dto.search.endDateStart != '') {
				searchEndDateEnd = moment(date).format('YYYY-MM-DD');
			}
		}
		$scope.contractTable.ajax.url($scope.contractBaseUrl+'search/'+searchCode+'/'+searchKy+'/'+searchContractStatusId+'/'+searchContractTypeId+'/'+searchPaymentMethodId+'/'+searchClientId+'/'+searchAmountTtc+'/'+searchStartDateStart+'/'+searchStartDateEnd+'/'+searchEndDateStart+'/'+searchEndDateEnd).load();
		$('#advancedSearchContractModal').modal("hide");
	};
	
	$scope.advancedSearchReminder = function() {
		var searchInvoiceReminderCode = 'NAN'; var searchDateStart = 'NAN'; var searchDateEnd = 'NAN'; var searchClientId = 0; var searchActionId = 0; var searchActionTypeId = 0; var searchReminderStatusId = 0;
		var date = new Date();
		$scope.dto.search.invoiceReminderCode = $("#invoiceReminderCode").val();
		$scope.dto.search.clientId = $scope.dto.id;
		if(!angular.isUndefined($scope.dto.search.invoiceReminderCode) && $scope.dto.search.invoiceReminderCode != '') searchInvoiceReminderCode = $scope.dto.search.invoiceReminderCode;
		if(!angular.isUndefined($scope.dto.search.clientId) && $scope.dto.search.clientId != null) searchClientId = $scope.dto.search.clientId;
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
		
		$scope.reminderTable.ajax.url($scope.reminderBaseUrl+'search/'+searchInvoiceReminderCode+'/'+searchActionId+'/'+searchActionTypeId+'/'+searchReminderStatusId+'/'+searchClientId+'/'+searchDateStart+'/'+searchDateEnd).load();
		$('#advancedSearchReminderModal').modal("hide");
	};
	
	$scope.advancedSearchLitigation = function() {
		var searchInvoiceLitigationCode = 'NAN'; var searchDateStart = 'NAN'; var searchDateEnd = 'NAN'; var searchClientId = 0; var searchLitigationStatusId = 0;
		var date = new Date();
		$scope.dto.search.invoiceLitigationCode = $("#invoiceLitigationCode").val();
		$scope.dto.search.clientId = $scope.dto.id;
		if(!angular.isUndefined($scope.dto.search.invoiceLitigationCode) && $scope.dto.search.invoiceLitigationCode != '') searchInvoiceLitigationCode = $scope.dto.search.invoiceLitigationCode;
		if(!angular.isUndefined($scope.dto.search.clientId) && $scope.dto.search.clientId != null) searchClientId = $scope.dto.search.clientId;
		if(!angular.isUndefined($scope.dto.search.litigationStatusId) && $scope.dto.search.litigationStatusId != null) searchLitigationStatusId = $scope.dto.search.litigationStatusId;
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
		
		$scope.litigationTable.ajax.url($scope.litigationBaseUrl+'search/'+searchInvoiceLitigationCode+'/'+searchLitigationStatusId+'/'+searchClientId+'/'+searchDateStart+'/'+searchDateEnd).load();
		$('#advancedSearchLitigationModal').modal("hide");
	};
	
	$scope.addPayment = function() {
		$scope.dto.payment = {};
		$scope.dto.payment.invoicePaymentsDTO = [];
		$scope.dto.payment.amount = 0;
		$scope.dto.payment.paymentMethodId = $scope.dto.paymentMethodId;
		$scope.dto.payment.currencyId = $scope.dto.currencyId;
		$scope.editPaymentForm = false;
		$scope.addPaymentForm = true;
		$scope.paymentSuccess = false;
		$scope.paymentTechnicalError = false;
		$scope.paymentRequiredError = false;
		$('#paymentModal').modal("show");
	};
	
	$scope.addComment = function() {
		$scope.dto.comment = {};
		$scope.dto.comment.invoiceId = $scope.dto.invoice.id;
		$scope.editCommentForm = false;
		$scope.addCommentForm = true;
		$scope.commentSuccess = false;
		$scope.commentTechnicalError = false;
		$scope.commentRequiredError = false;
		$('#commentModal').modal("show");
	};
	
	$scope.addReminderReply = function() {
		$scope.dto.reply = {};
		$scope.dto.reply.reminderId = $scope.dto.reminder.id;
		$scope.editReminderReplyForm = false;
		$scope.addReminderReplyForm = true;
		$scope.reminderReplySuccess = false;
		$scope.reminderReplyTechnicalError = false;
		$scope.reminderReplyRequiredError = false;
		$('#reminderReplyModal').modal("show");
	};
	
	$scope.displayReplyComment = function() {
		if(!angular.isUndefined($scope.dto.reply) && !angular.isUndefined($scope.dto.reply.type))
			if($scope.dto.reply.type == "Commentaire")
				$scope.commentReplyDisplayed = true;
			else {
				$scope.dto.reply.comment = "";
				$scope.commentReplyDisplayed = false;
			}
		
	};

// addInvoicePayment = function(id) {
// $http.get(context+"/credit/invoice/rest/getByClient/"+id).success(function(data,
// status) {
// $scope.invoices = data;
// $scope.dto.invoicePayment = {};
// $scope.invoicePaymentSuccess = false;
// $scope.invoicePaymentTechnicalError = false;
// $scope.invoicePaymentRequiredError = false;
// $('#invoicePaymentModal').modal("show");
// });
// };
	
	$scope.addCommercial = function() {
		$scope.dto.clientSecUtilisateur = {};
		$scope.collaboratorSuccess = false;
		$scope.collaboratorTechnicalError = false;
		$scope.collaboratorRequiredError = false;
		//$('#collaborator').select2({placeholder: 'Choisir une option'}).select2('val', '');
		$('#commercialModal').modal("show");
	};
	
	$scope.addRecovery = function() {
		$scope.dto.clientSecUtilisateur = {};
		$scope.collaboratorSuccess = false;
		$scope.collaboratorTechnicalError = false;
		$scope.collaboratorRequiredError = false;
		//$('#collaborator').select2({placeholder: 'Choisir une option'}).select2('val', '');
		$('#recoveryModal').modal("show");
	};
	
	$scope.addClientPortofolio = function() {
		$scope.clientPortofolioSuccess = false;
		$scope.clientPortofolioTechnicalError = false;
		$scope.clientPortofolioRequiredError = false;
//		if($scope.dto.clientPortofolioId == null)
//			$('#clientPortofolio').select2({placeholder: 'Choisir une option'}).select2('val', '');
//		else
//			$('#clientPortofolio').select2().select2('val', 'number:'+$scope.dto.clientPortofolioId);
		$('#clientPortofolioModal').modal("show");
	};
	
	$scope.addReminderPortofolio = function() {
		$scope.reminderPortofolioSuccess = false;
		$scope.reminderPortofolioTechnicalError = false;
		$scope.reminderPortofolioRequiredError = false;
		$('#reminderPortofolioModal').modal("show");
	};
	
	$scope.addOutstandingWarranty = function() {
		$scope.dto.outstanding.outstandingWarrantiesDTO.push({});
	};
	
	$scope.addInvoicePayment = function() {
		$scope.dto.payment.invoicePaymentsDTO.push({});
	};
	
	$scope.removeInvoicePayment = function(id) {
		$scope.dto.payment.invoicePaymentsDTO.splice(id, 1);
		
		var paymentAmount = 0;
		for(var invoicePayment of $scope.dto.payment.invoicePaymentsDTO) {
			paymentAmount += parseFloat(invoicePayment.amount);
		}
		$scope.dto.payment.amount = paymentAmount;
	};
	
	$scope.setInvoiceFields = function(id) {
		if($('#invoiceId'+id+' option:selected').val() != null && $('#invoiceId'+id+' option:selected').val() != '?') {
			$http.get(context+$scope.invoiceBaseUrl+"load/"+($('#invoiceId'+id+' option:selected').val().split(':'))[1]).success(function(data, status) {
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
			$http.get(context+$scope.invoiceBaseUrl+"load/"+($('#invoiceId'+id+' option:selected').val().split(':'))[1]).success(function(data, status) {
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
	
	$scope.addReminder = function() {
		$scope.dto.reminder = {};
		$scope.editReminderForm = false;
		$scope.addReminderForm = true;
		$scope.reminderSuccess = false;
		$scope.reminderTechnicalError = false;
		$scope.reminderRequiredError = false;
		loadScenarioByOutstanding();
		$('#reminderModal').modal("show");
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
	    			if(!angular.isUndefined($scope.dto.reminder.dueDate) && $scope.dto.reminder.dueDate != null) {
	    				if(moment($scope.dto.reminder.dueDate, "DD/MM/YYYY").toDate() > moment(data.dueDate, "DD/MM/YYYY").toDate())
	    					$scope.dto.reminder.dueDate = data.dueDate;
	    			} else {
	    				$scope.dto.reminder.dueDate = data.dueDate;
	    			}
	    			$scope.dto.reminder.invoices += '<a href="#" onclick="showInvoiceDetail('+data.id+');" class="amount-link">'+data.code+'</a>&nbsp;&nbsp;';
	    		});
	    	}
	    }
		setTimeout(calculateDueDaysNum, 3000);
	};
	
	calculateDueDaysNum = function() {
		var dueDaysNum = Math.round(new Date() - moment($scope.dto.reminder.dueDate, "DD/MM/YYYY").toDate())/(1000 * 60 * 60 * 24);
		console.log(dueDaysNum);
		$http.get(context+"/reminder/scenario/rest/getByClient/"+$scope.dto.id).success(function(data, status) {
			if(data != null) {
				$scope.dto.reminder.scenarioId = data.id;
				$scope.dto.reminder.scenarioName = data.name;
				$http.get(context+"/reminder/scenarioStage/rest/getByScenario/"+data.id).success(function(data, status) {
					$scope.scenarioStages = data;
					$http.get(context+"/reminder/scenarioStage/rest/getByScenario/"+$scope.dto.reminder.scenarioId+"/"+dueDaysNum).success(function(data, status) {
						if(data != null) {
							$scope.dto.reminder.scenarioStageId = data;
							$scope.loadByScenarioStage($scope.dto.reminder.scenarioStageId);
						}
					});
				});
				$('#reminderClientModal').modal("show");
			} else {
				Toastify({
					text: "Ce client ne dispose d'aucun scénario de relance.",
					gravity: "top", position: "center", duration: 3000, close: true, stopOnFocus: true, style: {background: "#F06548"}
				}).showToast();
			}
		});
	}
	
//	$scope.addLitigation = function() {
//		$scope.dto.litigation = {};
//		$scope.dto.litigation.litigationStatusId = 1;
//		$scope.editLitigationForm = false;
//		$scope.addLitigationForm = true;
//		$scope.litigationSuccess = false;
//		$scope.litigationTechnicalError = false;
//		$scope.litigationRequiredError = false;
//		$('#litigationModal').modal("show");
//	};
	
	editClient = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto = data;
			CRUDService.edit($scope);
			$scope.addClientForm = false;
			$scope.editClientForm = true;
			$scope.clientSuccess = false;
			$scope.clientTechnicalError = false;
			$scope.clientRequiredError = false;
			$('#clientModal').modal("show");
		});
	};
	
	showClientDetail = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.clientDetail = data;
			$('#clientDetailModal').modal("show");
		});
	};
	
	showContractDetail = function(id) {
		$http.get(context+$scope.contractBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.contractDetail = data;
			$('#contractDetailModal').modal("show");
		});
	};
	
	$scope.showMatriculationDetail = function(id) {
		$http.get(context+$scope.matriculationBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.matriculationDetail = data;
			$('#matriculationDetailModal').modal("show");
		});
	};
	
	showMatriculationDetail = function(id) {
		$http.get(context+$scope.matriculationBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.matriculationDetail = data;
			$('#matriculationDetailModal').modal("show");
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
	
	editContract = function(id) {
		$http.get(context+$scope.contractBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.contract = data;
			$scope.dto.contract = $scope.contract;
			CRUDService.edit($scope);
			$scope.addContractForm = false;
			$scope.editContractForm = true;
			$scope.contractSuccess = false;
			$scope.contractTechnicalError = false;
			$scope.contractRequiredError = false;
			$('#contractModal').modal("show");
		});
	};
	
	editAttachment = function(id) {
		$http.get(context+$scope.attachmentBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.attachment = data;
			$scope.dto.attachment = $scope.attachment;
			CRUDService.edit($scope);
			$scope.addAttachmentForm = false;
			$scope.editAttachmentForm = true;
			$scope.attachmentSuccess = false;
			$scope.attachmentTechnicalError = false;
			$scope.attachmentRequiredError = false;
			$('#attachmentModal').modal("show");
		});
	};
	
	editOutstanding = function(id) {
		$http.get(context+$scope.outstandingBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.outstanding = data;
			$scope.dto.outstanding = $scope.outstanding;
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
				$('#outstandingModal').modal("show");
			});
		});
	};
	
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
	
	editInvoice = function(id) {
		$http.get(context+$scope.invoiceBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.invoice = data;
			$scope.dto.invoice = $scope.invoice;
			CRUDService.edit($scope);
			$scope.addInvoiceForm = false;
			$scope.editInvoiceForm = true;
			$scope.invoiceSuccess = false;
			$scope.invoiceTechnicalError = false;
			$scope.invoiceRequiredError = false;
			$('#invoiceDisplayModal').modal("show");
		});
	};
	
	editPayment = function(id) {
		$http.get(context+$scope.paymentBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.payment = data;
			$scope.dto.payment = $scope.payment;
			CRUDService.edit($scope);
			$scope.addPaymentForm = false;
			$scope.editPaymentForm = true;
			$scope.paymentSuccess = false;
			$scope.paymentTechnicalError = false;
			$scope.paymentRequiredError = false;
			$('#paymentModal').modal("show");
		});
	};

	editReminder = function(id) {
		$http.get(context+$scope.reminderBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.reminder = data;
			$scope.dto.reminder = $scope.reminder;
			CRUDService.edit($scope);
			
			$http.get(context+"/credit/invoice/rest/load/"+$scope.dto.reminder.invoiceId).success(function(data, status) {
				$('#invoiceId').select2().select2('val', 'number:'+data.id);
				$scope.dto.reminder.dueDate = data.dueDate;
				$http.get(context+"/reminder/scenario/rest/getByClient/"+$scope.dto.reminder.clientId).success(function(data, status) {
					if(data != null) {
						$scope.dto.reminder.scenarioName = data.name;
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
		$http.get(context+"/client/client/rest/load/"+$scope.dto.id).success(function(data, status) {
			$scope.client = data;
			if($scope.dto.reminder.actionId == 3) {
				$http.get(context+"/client/contact/rest/getByClient/"+data.id).success(function(data, status) {   
					$scope.contacts = data;
					$http.get(context+"/reminder/scenarioStage/rest/load/"+$scope.dto.reminder.scenarioStageId).success(function(data, status) {
						$scope.scenarioStage = data;
						$http.get(context+"/reminder/letterTemplate/rest/load/"+data.letterTemplateId).success(function(data, status) {   
							$scope.dto.reminder.mailSubject = $scope.scenarioStage.name;
							var dueDate = $scope.dto.reminder.dueDate.split("/");
							var letter = data.letter;
							var amount = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format($scope.dto.reminder.remainingAmount);
							letter = letter.replace(new RegExp('#LIEU', 'g'), 'CASABLANCA').replace(new RegExp('#DATEACTION', 'g'), $scope.dto.reminder.actionDate);
							letter = letter.replace(new RegExp('#NOMDESTINATAIRE', 'g'), $scope.client.companyName).replace(new RegExp('#ADRESSE', 'g'), $scope.client.address);
							letter = letter.replace(new RegExp('#OBJET', 'g'), $scope.scenarioStage.name);
							letter = letter.replace(new RegExp('#VILLE', 'g'), $scope.client.cityDesignation);
							letter = letter.replace(new RegExp('#NUMEROCOMPTE', 'g'), "022 810 0002180028227473 23 SGMB Rabat");
							letter = letter.replace(new RegExp('#BANQUE', 'g'), "La Société Générale");
							letter = letter.replace(new RegExp('#MOIS', 'g'), dueDate[1]).replace(new RegExp('#ANNEE', 'g'), dueDate[2]);
							
							letter = letter.replace(new RegExp('#MONTANTDU', 'g'), amount).replace(new RegExp('#CURRENCY', 'g'), $scope.dto.reminder.currencySymbol);
							
							$scope.snoweditor.root.innerHTML = letter;
							
							$scope.dto.reminder.mailFrom = 'tidjani.cherif.ousmane@gmail.com';
							
							$scope.reminderActionSuccess = false;
							$scope.reminderActionTechnicalError = false;
							$scope.reminderActionRequiredError = false;
							$('#reminderActionModal').modal("show");
						});
					});
				});
			}
			if($scope.dto.reminder.actionId == 1) {
				$scope.reminderActionSuccess = false;
				$scope.reminderActionTechnicalError = false;
				$scope.reminderActionRequiredError = false;
				$('#reminderPhoneActionModal').modal("show");
			}
		});
		
	};
	
	editLitigation = function(id) {
		$http.get(context+$scope.litigationBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.litigation = data;
			$scope.dto.litigation = $scope.litigation;
			CRUDService.edit($scope);
			$scope.addLitigationForm = false;
			$scope.editLitigationForm = true;
			$scope.litigationSuccess = false;
			$scope.litigationTechnicalError = false;
			$scope.litigationRequiredError = false;
			$('#litigationModal').modal("show");
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
	
	$scope.load = function(id) {
		$scope.validatedOutstandingCreditLimit = false;
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			$scope.initListInvoices(id);
			$http.get(context+$scope.outstandingBaseUrl+"getValidatedByClient/"+$scope.dto.id).success(function(data, status) {
				if(data != null && data.clientId != null) {
					$scope.validatedOutstanding = true;
				} else {
					$scope.validatedOutstanding = false;
				}
			});
			$http.get(context+$scope.outstandingBaseUrl+"getAvailableByClient/"+$scope.dto.id).success(function(data, status) {
				if(data.clientId != null) {
					$scope.availableOutstanding = true;
				} else {
					$scope.availableOutstanding = false;
				}
			});
			if($scope.dto.reminderPortofolioId != null) {
				$http.get(context+"/reminder/scenario/rest/getByClient/"+$scope.dto.id).success(function(data, status) {   
					$scope.dto.scenario = data;
					if($scope.dto.scenario != null) {
						var position = 0;
						for(var scenarioStage of $scope.dto.scenario.scenarioStagesDTO) {
							position += 100/($scope.dto.scenario.scenarioStagesDTO.length+1);
							scenarioStage.position = position+'%';
							if(scenarioStage.daysNum != 0) {
								if(scenarioStage.deadline == 0)
									scenarioStage.daysNum = '-'+scenarioStage.daysNum+' j';
								else if(scenarioStage.deadline == 1)
									scenarioStage.daysNum = '+'+scenarioStage.daysNum+' j';
								else if(scenarioStage.deadline == 2)
									scenarioStage.daysNum = 'Journalière';
								else if(scenarioStage.deadline == 3)
									scenarioStage.daysNum = 'Hebdomadaire';
								else if(scenarioStage.deadline == 4)
									scenarioStage.daysNum = 'Mensuelle';
								else
									scenarioStage.daysNum = 'N/A';
							}
						}
					}
				});
			}
			
			$http.get(context+"/reminder/reminder/rest/getCountCurrentByClient/"+$scope.dto.id).success(function(data, status) {   
				$scope.currentReminderClient = data;
			});
			$http.get(context+"/reminder/litigation/rest/getCountCurrentByClient/"+$scope.dto.id).success(function(data, status) {   
				$scope.currentLitigationClient = data;
			});
			$http.get(context+"/reminder/contence/rest/getCountCurrentByClient/"+$scope.dto.id).success(function(data, status) {   
				$scope.currentContenceClient = data;
			});
			$http.get(context+"/credit/invoice/rest/getRemainingAmountByClient/"+$scope.dto.id).success(function(data, status) {   
				if(data == null) $scope.remainingAmountClient = 0; else $scope.remainingAmountClient = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
			});
			$http.get(context+"/credit/invoice/rest/getOverdueByClient/"+$scope.dto.id).success(function(data, status) {   
				if(data == null) $scope.overdueClient = 0; else $scope.overdueClient = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
			});
			$http.get(context+"/client/contract/rest/getByClient/"+$scope.dto.id).success(function(data, status) {   
				$scope.contractsList = data;
			});
			$http.get(context+"/client/contact/rest/getByClient/"+$scope.dto.id).success(function(data, status) {   
				$scope.contactsList = data;
			});
			$scope.dto.search = {};
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadOutstanding = function(id) {
		$http.get(context+$scope.outstandingBaseUrl+"load/"+id).success(function(data, status) {
			$scope.outstanding = data;
			$scope.dto.outstanding = $scope.outstanding;
			if($scope.dto.outstanding.creditStatusId == 3)
				$scope.validatedOutstandingCreditLimit = true;
			else
				$scope.validatedOutstandingCreditLimit = false;
		});
	}
	
	$scope.loadReminder = function(id) {
		$http.get(context+$scope.reminderBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.reminder = data;
			$scope.dto.reminder = $scope.reminder;
			
			$scope.reminderReplyTable.ajax.url($scope.reminderReplyBaseUrl+"listByReminder/"+$scope.dto.reminder.id).load();
			
			if($scope.dto.reminder.actionId == 6 || $scope.dto.reminder.actionId == 7)
				$scope.litigationContence = true;
			else
				$scope.litigationContence = false;
		});
	}
	
	$scope.loadLitigation = function(id) {
		$http.get(context+$scope.litigationBaseUrl+"load/"+id).success(function(data, status) { 
			$scope.litigation = data;
			$scope.dto.litigation = $scope.litigation;
		});
	}

	$scope.loadInvoice = function(id) {
		$http.get(context+$scope.invoiceBaseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.invoice = data;
			
			$scope.commentTable.ajax.url($scope.invoiceCommentBaseUrl+"listByInvoice/"+id).load();
		});
	}
// $scope.loadInvoice = function(id) {
// $http.get(context+$scope.invoiceBaseUrl+"load/"+id).success(function(data,
// status) {
// $scope.invoice = data;
// $scope.dto.invoice = $scope.invoice;
// });
// }
//	
// $scope.loadPayment = function(id) {
// $http.get(context+$scope.paymentBaseUrl+"load/"+id).success(function(data,
// status) {
// $scope.payment = data;
// $scope.dto.payment = $scope.payment;
// });
// }
	
	$scope.calculateAmountTtc = function() {
		$scope.dto.invoice.amountTtc = Math.round(parseFloat($scope.dto.invoice.amountHt) * 1.2 * 100) / 100;
		$scope.dto.invoice.remainingAmount = $scope.dto.invoice.amountTtc;
	}
	
	$scope.saveClient = function() {
		if($scope.clientForm.$valid) {
			var currentDate = new Date();
			if($scope.dto.codeClient == null || $scope.dto.codeClient == '') {
				$http.get(context+"/client/client/rest/getAll").success(function(data, status) {   
					var seqNum = data.length + 1;
					$scope.dto.codeClient = "CL" + currentDate.getFullYear() + (currentDate.getMonth()+1).toString().padStart(2, '0') + seqNum.toString().padStart(3, '0');
					$scope.dto.prospect = false;
					$scope.dto.createdAt = currentDate;
					$scope.dto.convertClientDate = currentDate;
					CRUDService.save($scope,$scope.dto).success(function(data, status) {
						$scope.clientId = data.id;
						$scope.currencyId = data.currencyId;
						$http.get(context+$scope.outstandingBaseUrl+"getByClient/"+$scope.clientId).success(function(data, status) {
							if(data == null) {
								$scope.dto.outstanding = {};
								$scope.dto.outstanding.clientId = $scope.clientId;
								$scope.dto.outstanding.currencyId = $scope.currencyId;
								$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {   
									CRUDService.setEntityLoaded($scope,data);
									$scope.refreshList();
									$scope.clientTechnicalError = false;
									$scope.clientRequiredError = false;
									$scope.clientSuccess = true;
									$('#clientModal').modal("hide");
								}).error(function(data, status, headers, config) {
									$scope.clientTechnicalError = true;
								});
							} else {
								CRUDService.setEntityLoaded($scope,data);
								$scope.refreshList();
								$scope.clientTechnicalError = false;
								$scope.clientRequiredError = false;
								$scope.clientSuccess = true;
								$('#clientModal').modal("hide");
							}
						});
					}).error(function(data, status, headers, config) {
						$scope.clientTechnicalError = true;
					});
				});
			} else {
				$scope.dto.updatedAt = currentDate;
				CRUDService.save($scope,$scope.dto).success(function(data, status) {
					$scope.clientId = data.id;
					$scope.currencyId = data.currencyId;
					$http.get(context+$scope.outstandingBaseUrl+"getByClient/"+$scope.clientId).success(function(data, status) {
						if(data == null) {
							$scope.dto.outstanding = {};
							$scope.dto.outstanding.clientId = $scope.clientId;
							$scope.dto.outstanding.currencyId = $scope.currencyId;
							$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {   
								CRUDService.setEntityLoaded($scope,data);
								$scope.refreshList();
								$scope.clientTechnicalError = false;
								$scope.clientRequiredError = false;
								$scope.clientSuccess = true;
								$('#clientModal').modal("hide");
							}).error(function(data, status, headers, config) {
								$scope.clientTechnicalError = true;
							});
						} else {
							CRUDService.setEntityLoaded($scope,data);
							$scope.refreshList();
							$scope.clientTechnicalError = false;
							$scope.clientRequiredError = false;
							$scope.clientSuccess = true;
							$('#clientModal').modal("hide");
						}
					});
				}).error(function(data, status, headers, config) {
					$scope.clientTechnicalError = true;
				});
			}
		} else {
			$scope.clientRequiredError = true;
		}
	};
	
	$scope.saveImportClients = function() {
		$scope.buttonDisabled = true;
		$scope.importing = true;
		if(!angular.isUndefined($scope.sheet)) {
	    	for(i = 0; i < $scope.sheet.length; i++) {
	    		$scope.seq = i;
	    		$scope.dto = {};
	    		$scope.dto.codeClient = $scope.sheet[i]['Code Client'];
	    		$scope.dto.companyName = $scope.sheet[i]['Nom Client'];
	    		$scope.dto.commercialName = $scope.sheet[i]['Nom Client'];
	    		$scope.dto.address = $scope.sheet[i]['Adresse'];
	    		$scope.dto.cityDesignation = $scope.sheet[i]['Ville'];
	    		$scope.dto.paymentMethodCode = $scope.sheet[i]['Mode Reglement'];
	    		$scope.dto.iceNum = $scope.sheet[i]['ICE'];
	    		$scope.dto.typeName = $scope.sheet[i]['TYP Client'];
	    		$scope.dto.currencyId = 1;
	    		$scope.dto.enabled = 1;
	    		$scope.dto.prospect = false;
	    		
	    		$scope.clientsImport.push($scope.dto);
	        }
	    	$http.post(context+$scope.baseUrl+"saveImport", angular.toJson($scope.clientsImport)).success(function(data, status) {
				CRUDService.setEntityLoaded($scope,data);
				$scope.buttonDisabled = false;
				$scope.clientTechnicalError = false;
				$scope.clientRequiredError = false;
				$scope.clientSuccess = true;
				$scope.importing = false;
				$scope.refreshList();
				$('#importClientsModal').modal("hide");
			}).error(function(data, status, headers, config) {
					$scope.clientTechnicalError = true;
					$scope.importing = false;
			});
	    } else {
	    	$scope.buttonDisabled = false;
	    	$scope.clientTechnicalError = true;
	    	$scope.importing = false;
	    }
	}
	
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
	
	$scope.saveContract = function() {
		if($scope.contractForm.$valid) {
			$scope.dto.contract.clientId = $scope.dto.id;
			$http.post(context+$scope.contractBaseUrl+"save", angular.toJson($scope.dto.contract)).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
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
		if(!angular.isUndefined($scope.sheet)) {
	    	for(i = 0; i < $scope.sheet.length; i++) {
	    		$scope.seq = i;
	    		$scope.dto.contract = {};
	    		$scope.dto.contract.code = $scope.sheet[i]['N° contrat'];
	    		$scope.dto.contract.avenant = $scope.sheet[i]['Avt'];
	    		$scope.dto.contract.model = $scope.sheet[i]['Modèle'];
	    		$scope.dto.contract.matriculation = $scope.sheet[i]['Immat'];
	    		if($scope.sheet[i]['Déb'] != null && $scope.sheet[i]['Déb'] != '') {
	    			$scope.dto.contract.startDate = ExcelDateToJSDate($scope.sheet[i]['Déb']);
	    		}
	    		if($scope.sheet[i]['Fin prév'] != null && $scope.sheet[i]['Fin prév'] != '') {
	    			$scope.dto.contract.endDate = ExcelDateToJSDate($scope.sheet[i]['Fin prév']);
	    		}
	    		if($scope.sheet[i]['Fin réelle'] != null && $scope.sheet[i]['Fin réelle'] != '') {
	    			$scope.dto.contract.effectiveEndDate = ExcelDateToJSDate($scope.sheet[i]['Fin réelle']);
	    		}
	    		$scope.dto.contract.status = $scope.sheet[i]['Statut'];
	    		$scope.dto.contract.type = $scope.sheet[i]['Type'];
	    		$scope.dto.contract.commercial = $scope.sheet[i]['Commercila '];
	    		$scope.dto.contract.amountHt = $scope.sheet[i]['HT'];
	    		$scope.dto.contract.amountTva = $scope.sheet[i]['TVA '];
	    		$scope.dto.contract.amountTtc = $scope.sheet[i]['TTC'];
	    		$scope.dto.contract.ky = $scope.sheet[i]['Ky'];
	    		if($scope.sheet[i]['Echéance'] != '0000LE10')
	    			$scope.dto.contract.paymentDue = $scope.sheet[i]['Echéance'];
	    		$scope.dto.contract.periodicity = $scope.sheet[i]['Periodicté'];
	    		$scope.dto.contract.clientId = $scope.dto.id;
	    		$scope.dto.contract.codeClient = $scope.sheet[i]['Code client'];
	    		$scope.dto.contract.agencyId = $scope.sheet[i]['Age'];
	    		if($scope.sheet[i]['Paiement'] == 'CHE') {
	    			$scope.dto.contract.paymentMethodId = 1;
	    		}
	    		if($scope.sheet[i]['Paiement'] == 'VIR') {
	    			$scope.dto.contract.paymentMethodId = 3;
	    		}
	    		if($scope.sheet[i]['Paiement'] == 'PRE') {
	    			$scope.dto.contract.paymentMethodId = 4;
	    		}
	    		
	    		$scope.contracts.push($scope.dto.contract);
	    	}
	    	$http.post(context+$scope.contractBaseUrl+"saveImport", angular.toJson($scope.contracts)).success(function(data, status) {   
	    		$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.buttonDisabled = false;
				$scope.contractTechnicalError = false;
				$scope.contractRequiredError = false;
				$scope.contractSuccess = true;
				$('#importContractsModal').modal("hide");
	    	}).error(function(data, status, headers, config) {
				$scope.contractTechnicalError = true;
			});
	    } else {
	    	$scope.buttonDisabled = false;
	    	$scope.contractTechnicalError = true;
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
	
	$scope.saveAttachment = function() {
		if($scope.attachmentForm.$valid) {
			var currentDate = new Date();
			$scope.dto.attachment.clientId = $scope.dto.id;
			/*
			 * if($scope.dto.attachment.id == null) {
			 * $scope.dto.attachment.createdDate = currentDate; } else {
			 * $scope.dto.attachment.updatedDate = currentDate; }
			 */
			$http.post(context+$scope.attachmentBaseUrl+"save", angular.toJson($scope.dto.attachment)).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
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
	
	$scope.saveCreditLimit = function() {
		if($scope.creditLimitForm.$valid) {
			$scope.dto.creditLimit.creditStatusId = 1;
			$scope.outstandingId = $scope.dto.creditLimit.outstandingId;
			$http.post(context+$scope.creditLimitBaseUrl+"save", angular.toJson($scope.dto.creditLimit)).success(function(data, status) {
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.loadOutstanding($scope.outstanding.id);
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
					    			if(data.invoiceActionStatusId != 2) {
					    				data.invoiceActionStatusId = 2;
					    				$http.post(context+$scope.invoiceBaseUrl+"save", angular.toJson(data)).success(function(data, status) {});
					    			}
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
	
	$scope.savePromiseReminder = function() {
		if($scope.promiseReminderForm.$valid) {
			$scope.dto.promise.promiseStatusId = 1;
			if($scope.dto.promise.code == null) {
				var currentDate = new Date();
				$http.get(context+"/reminder/promise/rest/getAll").success(function(data, status) {   
					var seqNum = data.length + 1;
					$scope.dto.promise.code = "PR" + currentDate.getFullYear() + (currentDate.getMonth()+1).toString().padStart(2, '0') + seqNum.toString().padStart(3, '0');
					$http.post(context+$scope.promiseBaseUrl+"save", angular.toJson($scope.dto.promise)).success(function(data, status) {
						$scope.promiseId = data.id;
						
						$http.get(context+"/reminder/reminderInvoice/rest/loadByReminder/"+$scope.dto.reminder.id).success(function(data, status) {
							for(var reminderInvoice of data) {
								$scope.dto.promiseInvoice = {};
								$scope.dto.promiseInvoice.promiseId = $scope.promiseId;
				    			$scope.dto.promiseInvoice.invoiceId = reminderInvoice.invoiceId;
				    			$scope.dto.promiseInvoice.amount = reminderInvoice.amount;
				    			$http.post(context+$scope.promiseInvoiceBaseUrl+"save", angular.toJson($scope.dto.promiseInvoice)).success(function(data, status) {
				    				
				    			}).error(function(data, status, headers, config) {
				    				$scope.reminderTechnicalError = true;
				    			});
							}
						});
						$scope.dto.promise = {};
						$scope.promiseTechnicalError = false;
						$scope.promiseRequiredError = false;
						$scope.promiseSuccess = true;
						$('#promiseReminderModal').modal("hide");
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
	
	$scope.calculateCoverRate = function(creditInsuranceAmount, amountId) {
		if($(amountId).val() != 0 && $(amountId).val() != "")
			$scope.dto.creditInsurance.coverRate = parseFloat(creditInsuranceAmount/$(amountId).val()*100).toFixed(2);
		else
			$scope.dto.creditInsurance.coverRate = 0;
	}
	
	$scope.calculateDueDate = function(invoiceDate) {
		var dueDate = new Date(invoiceDate);
		dueDate.setDate(dueDate.getDate() + $scope.dto.paymentDue);
		$scope.dto.invoice.dueDate = String(dueDate.getDate()).padStart(2, '0') + '/' + String(dueDate.getMonth() + 1).padStart(2, '0') + '/' + dueDate.getFullYear();
	}
	
	getdate = function() {
	    var tt = document.getElementById('txtDate').value;

	    var date = new Date(tt);
	    var newdate = new Date(date);

	    newdate.setDate(newdate.getDate() + 3);
	    
	    var dd = newdate.getDate();
	    var mm = newdate.getMonth() + 1;
	    var y = newdate.getFullYear();

	    var someFormattedDate = mm + '/' + dd + '/' + y;
	    document.getElementById('follow_Date').value = someFormattedDate;
	}
	
	$scope.saveInvoice = function() {
		if($scope.invoiceForm.$valid) {
			$scope.dto.invoice.clientId = $scope.dto.id;
			$http.get(context+$scope.outstandingBaseUrl+"getValidatedByClient/"+$scope.dto.id).success(function(data, status) {
				if(data != null) {
					$scope.dto.outstanding = data;
					$http.post(context+$scope.invoiceBaseUrl+"save", angular.toJson($scope.dto.invoice)).success(function(data, status) { 
						$scope.dto.outstanding.realAmount = $scope.dto.outstanding.realAmount + $scope.dto.invoice.amountTtc;
						$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {
							$scope.dto = {};
							$scope.load($scope.selected.id);
							$scope.invoiceTechnicalError = false;
							$scope.invoiceRequiredError = false;
							$scope.invoiceSuccess = true;
							$('#invoiceModal').modal("hide");
						}).error(function(data, status, headers, config) {
							$scope.invoiceTechnicalError = true;
						});
					});
				} else {
					$scope.invoiceTechnicalError = true;
				}
			});
		} else {
			$scope.invoiceRequiredError = true;
		}
	};
	
	$scope.savePayment = function() {
		if($scope.paymentForm.$valid) {
			$scope.dto.payment.clientId = $scope.dto.id;
			$http.post(context+$scope.paymentBaseUrl+"save", angular.toJson($scope.dto.payment)).success(function(data, status) {   
				if($scope.dto.payment.invoicePaymentsDTO.length != 0) {
					for(var invoicePayment of $scope.dto.payment.invoicePaymentsDTO) {
						invoicePayment.paymentId = data.id;
						invoicePayment.paymentDate = data.paymentDate;
						$http.post(context+$scope.invoiceBaseUrl+"updateRemainingAmount/"+invoicePayment.invoiceId+"/"+invoicePayment.amount).success(function(data, status) {});
						$http.post(context+$scope.invoicePaymentBaseUrl+"save", angular.toJson(invoicePayment)).success(function(data, status) {});
					}
					$http.post(context+$scope.outstandingBaseUrl+"updateRealAmount/"+$scope.dto.id+"/"+$scope.dto.payment.amount).success(function(data, status) {});
					$http.post(context+$scope.baseUrl+"updateClientCategory/"+$scope.dto.id).success(function(data, status) {});
				}
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.paymentTechnicalError = false;
				$scope.paymentRequiredError = false;
				$scope.paymentSuccess = true;
				$('#paymentModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.paymentTechnicalError = true;
			});
		} else {
			$scope.paymentRequiredError = true;
		}
	};
	
	$scope.saveComment = function() {
		if($scope.commentForm.$valid) {
			$http.post(context+$scope.invoiceCommentBaseUrl+"save", angular.toJson($scope.dto.comment)).success(function(data, status) {   
				$scope.dto.invoice = {};
				$scope.loadInvoice(data.invoiceId);
				$scope.commentTechnicalError = false;
				$scope.commentRequiredError = false;
				$scope.commentSuccess = true;
				$('#commentModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.commentTechnicalError = true;
			});
		} else {
			$scope.commentRequiredError = true;
		}
	};

	$scope.saveReminder = function() {
		if($scope.reminderForm.$valid) {
			$scope.dto.reminder.clientId = $scope.dto.id;
			$scope.dto.reminder.reminderStatusId = 1;
			$http.post(context+$scope.reminderBaseUrl+"save", angular.toJson($scope.dto.reminder)).success(function(data, status) {
				$scope.dto = {};
				$scope.load($scope.selected.id);
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
	
	$scope.saveReminderReply = function() {
		if($scope.reminderReplyForm.$valid) {
			$http.post(context+$scope.reminderReplyBaseUrl+"save", angular.toJson($scope.dto.reply)).success(function(data, status) {   
				$scope.dto.reminder = {};
				$scope.loadReminder(data.reminderId);
				$scope.reminderReplyTechnicalError = false;
				$scope.reminderReplyRequiredError = false;
				$scope.reminderReplySuccess = true;
				$('#reminderReplyModal').modal("hide");
				if(data.type == "Promesse de règlement")
					$scope.addPromiseReminder(data.reminderId);
			}).error(function(data, status, headers, config) {
				$scope.reminderReplyTechnicalError = true;
			});
		} else {
			$scope.reminderReplyRequiredError = true;
		}
	};
	
//	$scope.saveReminder = function() {
//		if($scope.reminderForm.$valid && $("#invoiceId").val() != null) {
//			$scope.dto.reminder.invoiceId = ($("#invoiceId").val().split(':'))[1];
//			$scope.dto.reminder.clientId = $scope.dto.id;
//			$scope.dto.reminder.reminderStatusId = 1;
//			$http.post(context+$scope.reminderBaseUrl+"save", angular.toJson($scope.dto.reminder)).success(function(data, status) {
//				if(data.actionId == 6) {
//					$scope.dto.litigation = {};
//					$scope.dto.litigation.date = data.actionDate;
//					$scope.dto.litigation.amount = data.remainingAmount;
//					$scope.dto.litigation.litigationStatusId = 1;
//					$scope.dto.litigation.invoiceId = data.invoiceId;
//					$scope.dto.litigation.currencyId = data.currencyId;
//					$scope.dto.litigation.clientId = data.clientId;
//					$scope.dto.litigation.dueDate = data.dueDate;
//					$scope.dto.litigation.reminderId = data.id
//					
//					var currentDate = new Date();
//					$http.get(context+"/reminder/litigation/rest/getAll").success(function(data, status) {   
//						var seqNum = data.length + 1;
//						$scope.dto.litigation.code = "LT" + currentDate.getFullYear() + (currentDate.getMonth()+1).toString().padStart(2, '0') + seqNum.toString().padStart(3, '0');
//						$http.post(context+$scope.litigationBaseUrl+"save", angular.toJson($scope.dto.litigation)).success(function(data, status) {
//							$scope.dto = {};
//							$scope.load($scope.selected.id);
//							$scope.reminderTechnicalError = false;
//							$scope.reminderRequiredError = false;
//							$scope.reminderSuccess = true;
//							$('#reminderModal').modal("hide");
//						}).error(function(data, status, headers, config) {
//							$scope.litigationTechnicalError = true;
//						});
//					});
//				} else {
//					$scope.dto = {};
//					$scope.load($scope.selected.id);
//					$scope.reminderTechnicalError = false;
//					$scope.reminderRequiredError = false;
//					$scope.reminderSuccess = true;
//					$('#reminderModal').modal("hide");
//				}
//			}).error(function(data, status, headers, config) {
//				$scope.reminderTechnicalError = true;
//			});
//		} else {
//			$scope.reminderRequiredError = true;
//		}
//	};
	
	$scope.saveReminderClient = function() {
		if($scope.reminderClientForm.$valid) {
			$scope.dto.reminder.clientId = $scope.dto.id;
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
			    			if(data.invoiceActionStatusId != 1) {
			    				data.invoiceActionStatusId = 1;
			    				$http.post(context+$scope.invoiceBaseUrl+"save", angular.toJson(data)).success(function(data, status) {});
			    			}
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
				$('#invoiceTotalModal').modal("hide");
				$('#invoiceNotOverdueModal').modal("hide");
				$('#invoiceOverdueModal').modal("hide");
				$('#invoiceOverdue30Modal').modal("hide");
				$('#invoiceOverdue60Modal').modal("hide");
				$('#invoiceOverdue90Modal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.reminderTechnicalError = true;
			});
		} else {
			$scope.reminderRequiredError = true;
		}
	};
	
	$scope.saveReminderDate = function() {
		if($scope.reminderDateForm.$valid) {
			$http.post(context+$scope.reminderBaseUrl+"save", angular.toJson($scope.dto.reminder)).success(function(data, status) {
				$scope.dto = {};
				$scope.load($scope.selected.id);
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
		$scope.importing = true;
		if($scope.reminderActionForm.$valid) {
			$scope.dto.reminder.letter = $("#summernote").code();
			$http.post(context+$scope.reminderBaseUrl+"send", angular.toJson($scope.dto.reminder)).success(function(data, status) {
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.reminderActionTechnicalError = false;
				$scope.reminderActionRequiredError = false;
				$scope.reminderActionSuccess = true;
				$scope.importing = false;
				$('#reminderActionModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.importing = false;
				$scope.reminderActionTechnicalError = true;
			});
		} else {
			$scope.importing = false;
			$scope.reminderActionRequiredError = true;
		}
	};
	
	$scope.saveAndFinishReminderAction = function() {
		$scope.importing = true;
		if($scope.reminderActionForm.$valid) {
			$scope.dto.reminder.letter = $scope.snoweditor.root.innerHTML;
			$scope.dto.reminder.reminderStatusId = 2;
			$http.post(context+$scope.reminderBaseUrl+"sendAndFinish", angular.toJson($scope.dto.reminder)).success(function(data, status) {
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.reminderActionTechnicalError = false;
				$scope.reminderActionRequiredError = false;
				$scope.reminderActionSuccess = true;
				$scope.importing = false;
				$('#reminderActionModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.importing = false;
				$scope.reminderActionTechnicalError = true;
			});
		} else {
			$scope.importing = false;
			$scope.reminderActionRequiredError = true;
		}
	};
	
	$scope.finishReminderAction = function() {
		if($scope.dto.reminder.actionId == 3) {
			if($scope.reminderActionForm.$valid) {
				$scope.dto.reminder.letter = $("#summernote").code();
				$scope.dto.reminder.reminderStatusId = 2;
				$http.post(context+$scope.reminderBaseUrl+"save", angular.toJson($scope.dto.reminder)).success(function(data, status) {
					$scope.dto = {};
					$scope.load($scope.selected.id);
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
		if($scope.dto.reminder.actionId == 1) {
			if($scope.reminderPhoneActionForm.$valid) {
				$scope.dto.reminder.reminderStatusId = 2;
				$http.post(context+$scope.reminderBaseUrl+"save", angular.toJson($scope.dto.reminder)).success(function(data, status) {
					$scope.dto = {};
					$scope.load($scope.selected.id);
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
						$http.get(context+$scope.invoiceBaseUrl+"load/"+data.invoiceId).success(function(data, status) {
							if(data.invoiceActionStatusId != 3) {
			    				data.invoiceActionStatusId = 3;
			    				$http.post(context+$scope.invoiceBaseUrl+"save", angular.toJson(data)).success(function(data, status) {});
			    			}
						});
						$http.get(context+$scope.litigationBaseUrl+"getCountByInvoice/"+data.invoiceId).success(function(data, status) {
							$scope.invoiceLitigationNum = data;
						});
						$scope.litigationCurrentTable.ajax.reload();
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
					$scope.dto = {};
					$scope.load($scope.selected.id);
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
						$http.get(context+$scope.invoiceBaseUrl+"load/"+data.invoiceId).success(function(data, status) {
							if(data.invoiceActionStatusId != 4) {
			    				data.invoiceActionStatusId = 4;
			    				$http.post(context+$scope.invoiceBaseUrl+"save", angular.toJson(data)).success(function(data, status) {});
			    			}
						});
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
	
	$scope.closeLitigation = function() {
		if(confirm("Voulez-vous vraiment clôturer ce dossier de litige ?") == true) {
			$scope.dto.litigation.litigationStatusId = 2;
			$http.post(context+$scope.litigationBaseUrl+"save", angular.toJson($scope.dto.litigation)).success(function(data, status) {
				$scope.dto = {};
				$scope.load($scope.selected.id);
			}).error(function(data, status, headers, config) {
				$scope.litigationTechnicalError = true;
			});
		};
	};
	
//	$scope.saveOutstanding = function() {
//		if($scope.outstandingForm.$valid) {
//			$scope.dto.outstanding.creditStatusId = 1;
//			$scope.dto.outstanding.clientId = $scope.dto.id;
//			$scope.dto.outstanding.currencyId = $scope.dto.currencyId;
//			$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {   
//				$scope.dto = {};
//				$scope.load($scope.selected.id);
//				$scope.outstandingTechnicalError = false;
//				$scope.outstandingRequiredError = false;
//				$scope.outstandingSuccess = true;
//				$('#outstandingModal').modal("hide");
//			}).error(function(data, status, headers, config) {
//				$scope.outstandingTechnicalError = true;
//			});
//		} else {
//			$scope.outstandingRequiredError = true;
//		}
//	};
	
	$scope.saveOutstanding = function() {
		if($scope.outstandingForm.$valid) {
			if(angular.isUndefined($scope.dto.outstanding.creditStatusId) || $scope.dto.outstanding.creditStatusId == null)
				$scope.dto.outstanding.creditStatusId = 1;
			$scope.dto.outstanding.clientId = $scope.dto.id;
			$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {
				if(!angular.isUndefined($scope.dto.outstanding.outstandingWarrantiesDTO) && $scope.dto.outstanding.outstandingWarrantiesDTO != null) {
					for(var outstandingWarranty of $scope.dto.outstanding.outstandingWarrantiesDTO){
						outstandingWarranty.outstandingId = $scope.dto.outstanding.id;
						$http.post(context+$scope.outstandingWarrantyBaseUrl+"save", angular.toJson(outstandingWarranty)).success(function(data, status) {});
					}
				}
				$scope.dto.creditInsurance.outstandingId = data.id;
				$http.post(context+$scope.creditInsuranceBaseUrl+"save", angular.toJson($scope.dto.creditInsurance)).success(function(data, status) {
				}).error(function(data, status, headers, config) {
					$scope.outstandingTechnicalError = true;
				});
				$scope.dto = {};
				$scope.load($scope.selected.id);
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
	
	$scope.validateCreditLimit = function() {
		if($scope.valCreditLimitForm.$valid) {
			$scope.dto.creditLimit.creditStatusId = 3;
			$http.post(context+$scope.creditLimitBaseUrl+"save", angular.toJson($scope.dto.creditLimit)).success(function(data, status) {
//				$scope.dto.outstanding = $scope.outstanding;
//				$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {   
//					$scope.dto = {};
//					$scope.load($scope.selected.id);
//					$scope.loadOutstanding($scope.outstanding.id);
//					$scope.creditLimitTechnicalError = false;
//					$scope.creditLimitRequiredError = false;
//					$scope.creditLimitSuccess = true;
//					$('#valCreditLimitModal').modal("hide");
//				}).error(function(data, status, headers, config) {
//					$scope.creditLimitTechnicalError = true;
//				});
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
			$scope.dto.outstanding.creditStatusId = 2;
			$scope.dto.outstanding.clientId = $scope.dto.id;
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
	
	$scope.rejectCreditLimit = function() {
		$scope.dto.creditLimit.creditStatusId = 2;
		$http.post(context+$scope.creditLimitBaseUrl+"save", angular.toJson($scope.dto.creditLimit)).success(function(data, status) {   
			$scope.dto = {};
			$scope.load($scope.selected.id);
			$scope.loadOutstanding($scope.outstanding.id);
			$scope.creditLimitTechnicalError = false;
			$scope.creditLimitRequiredError = false;
			$scope.creditLimitSuccess = true;
			$('#valCreditLimitModal').modal("hide");
		}).error(function(data, status, headers, config) {
			$scope.creditLimitTechnicalError = true;
		});
	};
	
	$scope.saveCommercial = function() {
		//$scope.dto.clientSecUtilisateur.secUtilisateurId = ($("#collaborator").val().split(':'))[1];
		$scope.dto.clientSecUtilisateur.clientId = $scope.dto.id;
		$scope.dto.clientSecUtilisateur.secUtilisateurId = $scope.dto.commercialUserId;
		$scope.dto.clientSecUtilisateur.date = new Date();
		if($scope.commercialForm.$valid) {
			$http.post( context+$scope.baseUrl+"saveClientSecUtilisateur", angular.toJson($scope.dto.clientSecUtilisateur)).success(function(data, status) {
				$http.post(context+$scope.baseUrl+"save", angular.toJson($scope.dto)).success(function(data, status) {   
					CRUDService.setEntityLoaded($scope,data);
					$scope.refreshList();
					$scope.collaboratorTechnicalError = false;
					$scope.collaboratorRequiredError = false;
					$scope.collaboratorSuccess = true;
					$('#commercialModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.creditLimitTechnicalError = true;
				});
			}).error(function(data, status, headers, config) {
				$scope.collaboratorTechnicalError = true;
			});
		} else {
			$scope.collaboratorRequiredError = true;
		}
	};
	
	$scope.saveRecovery = function() {
		//$scope.dto.clientSecUtilisateur.secUtilisateurId = ($("#collaborator").val().split(':'))[1];
		$scope.dto.clientSecUtilisateur.clientId = $scope.dto.id;
		$scope.dto.clientSecUtilisateur.secUtilisateurId = $scope.dto.recoveryUserId;
		$scope.dto.clientSecUtilisateur.date = new Date();
		if($scope.recoveryForm.$valid) {
			$http.post( context+$scope.baseUrl+"saveClientSecUtilisateur", angular.toJson($scope.dto.clientSecUtilisateur)).success(function(data, status) {
				$http.post(context+$scope.baseUrl+"save", angular.toJson($scope.dto)).success(function(data, status) {   
					CRUDService.setEntityLoaded($scope,data);
					$scope.refreshList();
					$scope.collaboratorTechnicalError = false;
					$scope.collaboratorRequiredError = false;
					$scope.collaboratorSuccess = true;
					$('#recoveryModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.creditLimitTechnicalError = true;
				});
			}).error(function(data, status, headers, config) {
				$scope.collaboratorTechnicalError = true;
			});
		} else {
			$scope.collaboratorRequiredError = true;
		}
	};
	
	$scope.saveClientPortofolio = function() {
//		if($("#clientPortofolio").val() != null && $("#clientPortofolio").val() != '?') {
//			$scope.dto.clientPortofolioId = ($("#clientPortofolio").val().split(':'))[1];
//		}
		if(!angular.isUndefined($scope.dto.clientPortofolioId)) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.clientPortofolioTechnicalError = false;
				$scope.clientPortofolioRequiredError = false;
				$scope.clientPortofolioSuccess = true;
				$('#clientPortofolioModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.clientPortofolioTechnicalError = true;
			});
		} else {
			$scope.clientPortofolioRequiredError = true;
		}
	};
	
	$scope.saveReminderPortofolio = function() {
		if($scope.reminderPortofolioForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.reminderPortofolioTechnicalError = false;
				$scope.reminderPortofolioRequiredError = false;
				$scope.reminderPortofolioSuccess = true;
				$('#reminderPortofolioModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.reminderPortofolioTechnicalError = true;
			});
		} else {
			$scope.reminderPortofolioRequiredError = true;
		}
	};
	
	/*
	 * $scope.saveClientPortofolio = function() {
	 * $scope.dto.clientPortofolioClient.clientPortofolioId =
	 * ($("#clientPortofolio").val().split(':'))[1];
	 * $scope.dto.clientPortofolioClient.clientId = $scope.dto.id;
	 * $scope.dto.clientPortofolioClient.date = new Date();
	 * if($scope.clientPortofolioForm.$valid) { $http.post(
	 * context+$scope.baseUrl+"saveClientPortofolioClient",
	 * angular.toJson($scope.dto.clientPortofolioClient)).success(function(data,
	 * status) { CRUDService.setEntityLoaded($scope,data); $scope.refreshList();
	 * $scope.clientPortofolioTechnicalError = false;
	 * $scope.clientPortofolioRequiredError = false;
	 * $scope.clientPortofolioSuccess = true;
	 * $('#clientPortofolioModal').modal("hide"); }).error(function(data,
	 * status, headers, config) { $scope.clientPortofolioTechnicalError = true;
	 * }); } else { $scope.clientPortofolioRequiredError = true; } };
	 */
	
	$scope.refreshList = function() {
		$scope.clientTable.ajax.reload();
		//$scope.clientUserTable.ajax.reload();
		$scope.dto = {};
	};

	$scope.confirmDeleteClient = function() {
		CRUDService.remove($scope.dto.id).success(function(data, status) {
			$('#deleteClientModal').modal("hide");
			$scope.refreshList();
			Toastify({
				text: "Le client a été supprimé avec succès.",
				gravity: "top", position: "center", duration: 4000, close: true, stopOnFocus: true, style: {background: "linear-gradient(to right, #4fea98, #45cb85)"}
			}).showToast();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	$scope.confirmDeleteOutstanding = function() {
		$scope.dto.outstanding.requestedAmount = null;
		$scope.dto.outstanding.validatedAmount = null;
		$scope.dto.outstanding.creditStatusId = null;
		$scope.dto.outstanding.reason = null;
		$scope.dto.outstanding.realAmount = null;
		$scope.dto.outstanding.validatedDate = null;
		$scope.dto.outstanding.comments = null;
		if($scope.dto.outstanding.creditInsuranceDTO != null) {
			$http.post( context+$scope.creditInsuranceBaseUrl+"delete/"+data.creditInsuranceDTO.id).success(function(data, status) {
				$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) { 
					$scope.dto = {};
					$scope.load($scope.selected.id);
					$('#deleteOutstandingModal').modal("hide");
					Toastify({
						text: "L'encours client a été supprimé avec succès.",
						gravity: "top", position: "center", duration: 4000, close: true, stopOnFocus: true, style: {background: "linear-gradient(to right, #4fea98, #45cb85)"}
					}).showToast();
				}).error(function(data, status, headers, config) {
					console.log("error");
				});
			}).error(function(data, status, headers, config) {
				console.log("error");
			});
		}
		else {
			$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) { 
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$('#deleteOutstandingModal').modal("hide");
				Toastify({
					text: "L'encours client a été supprimé avec succès.",
					gravity: "top", position: "center", duration: 4000, close: true, stopOnFocus: true, style: {background: "linear-gradient(to right, #4fea98, #45cb85)"}
				}).showToast();
			}).error(function(data, status, headers, config) {
				console.log("error");
			});
		}
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
	
	removeContract = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteContract(id);
		};
	};

	$scope.confirmDeleteContract = function(id) {
		$http.post( context+$scope.contractBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeComment = function(id) {
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteComment(id);
		};
	};

	$scope.confirmDeleteComment = function(id) {
		$scope.invoiceCommentId = $scope.dto.invoice.id;
		$http.post(context+$scope.invoiceCommentBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.dto.invoice = {};
			$scope.loadInvoice($scope.invoiceCommentId);
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeReminderReply = function(id) {
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteReminderReply(id);
		};
	};

	$scope.confirmDeleteReminderReply = function(id) {
		$scope.reminderId = $scope.dto.reminder.id;
		$http.post(context+$scope.reminderReplyBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.dto.reminder = {};
			$scope.loadReminder($scope.reminderId);
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeAttachment = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteAttachment(id);
		};
	};

	$scope.confirmDeleteAttachment = function(id) {
		$http.post( context+$scope.attachmentBaseUrl+"delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
		}).error(function(data, status, headers, config) {
			console.log("error");
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
	
	removeReminder = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteReminder(id);
		};
	};

	$scope.confirmDeleteReminder = function(id) {
		$http.post(context+$scope.reminderInvoiceBaseUrl+"deleteByReminder/"+id).success(function(data, status) {
			$http.post(context+$scope.litigationBaseUrl+"deleteByReminder/"+id).success(function(data, status) { 
				$http.post(context+$scope.reminderBaseUrl+"delete/"+id).success(function(data, status) { 
					$scope.dto = {};
					$scope.load($scope.selected.id);
				}).error(function(data, status, headers, config) {
					console.log("error");
				});
			}).error(function(data, status, headers, config) {
				console.log("error");
			});
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeLitigation = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteLitigation(id);
		};
	};

	$scope.confirmDeleteLitigation = function(id) {
		$http.post(context+$scope.litigationBaseUrl+"delete/"+id).success(function(data, status) { 
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
	
	errorMessage = function() {
		console.log("test");
		document.getElementById("genreminder")&&document.getElementById("genreminder").addEventListener("click",function(){Swal.fire({html:'<div class="mt-3"><lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f06548,secondary:#f7b84b" style="width:120px;height:120px"></lord-icon><div class="mt-4 pt-2 fs-15"><h4>Oops...! Something went Wrong !</h4><p class="text-muted mx-4 mb-0">Your email Address is invalid</p></div></div>',showCancelButton:!0,showConfirmButton:!1,cancelButtonClass:"btn btn-primary w-xs mb-1",cancelButtonText:"Dismiss",buttonsStyling:!1,showCloseButton:!0})});
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

app.controller('clientTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.contactTable.ajax.url('/client/contact/rest/list/'+newValue).load();
			// $scope.$parent.attachmentTable.ajax.url('/client/attachment/rest/list/'+newValue).load();
			$scope.$parent.outstandingStatusTable.ajax.url('/credit/outstanding/rest/list/validated/'+newValue).load();
			$scope.$parent.outstandingTable.ajax.url('/credit/outstanding/rest/list/'+newValue).load();
			$scope.$parent.reminderTable.ajax.url('/reminder/reminder/rest/list/current/'+newValue).load();
			$scope.$parent.litigationCurrentTable.ajax.url('/reminder/litigation/rest/list/current/'+newValue).load();
			$scope.$parent.invoiceTotalTable.ajax.url('/credit/invoice/rest/list/unpaidByClient/'+newValue).load();
			$scope.$parent.invoiceNotOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidNotOverdueByClient/'+newValue).load();
			$scope.$parent.invoiceOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidOverdueByClient/'+newValue).load();
			$scope.$parent.invoiceOverdue30Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue30ByClient/'+newValue).load();
			$scope.$parent.invoiceOverdue60Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue60ByClient/'+newValue).load();
			$scope.$parent.invoiceOverdue90Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue90ByClient/'+newValue).load();
			// $scope.$parent.invoiceTable.ajax.url('/credit/invoice/rest/list/'+newValue).load();
			// $scope.$parent.paymentTable.ajax.url('/credit/payment/rest/list/'+newValue).load();
		}
		else {
			$scope.$parent.contactTable.ajax.url('/client/contact/rest/list/-1').load();
			// $scope.$parent.attachmentTable.ajax.url('/client/attachment/rest/list/-1').load();
			$scope.$parent.outstandingStatusTable.ajax.url('/credit/outstanding/rest/list/validated/-1').load();
			$scope.$parent.outstandingTable.ajax.url('/credit/outstanding/rest/list/-1').load();
			$scope.$parent.reminderTable.ajax.url('/reminder/reminder/rest/list/current/-1').load();
			$scope.$parent.litigationCurrentTable.ajax.url('/reminder/litigation/rest/list/current/-1').load();
			$scope.$parent.invoiceTotalTable.ajax.url('/credit/invoice/rest/list/unpaidByClient/-1').load();
			$scope.$parent.invoiceNotOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidNotOverdueByClient/-1').load();
			$scope.$parent.invoiceOverdueTable.ajax.url('/credit/invoice/rest/list/unpaidOverdueByClient/-1').load();
			$scope.$parent.invoiceOverdue30Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue30ByClient/-1').load();
			$scope.$parent.invoiceOverdue60Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue60ByClient/-1').load();
			$scope.$parent.invoiceOverdue90Table.ajax.url('/credit/invoice/rest/list/unpaidOverdue90ByClient/-1').load();
			// $scope.$parent.invoiceTable.ajax.url('/credit/invoice/rest/list/-1').load();
			// $scope.$parent.paymentTable.ajax.url('/credit/payment/rest/list/-1').load();
		}
	});
	
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="form-check"><input class="form-check-input clientId" type="checkbox" value="'+full.id+'" onclick="check(\'clientId\')" /></div>';
			}},
			{mDataProp: 'codeClient'},
			{mDataProp: 'companyName'},
			{mDataProp: 'siege'},
			{mDataProp: 'cityDesignation'},
			{mDataProp: 'iceNum'},
			{mDataProp: 'paymentMethodName'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="contactList()" class="edit-item-btn"><i style="font-size: 17px" class="ri-group-2-fill align-bottom me-2 text-success"></i></a> <a href="#" onclick="editClient('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a> <a href="#" data-bs-toggle="modal" data-bs-target="#deleteClientModal" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.clientTable = TableManager.init("clientTable", $scope.$parent.baseUrl+"list", columns, 0, "DESC");
		
		$scope.$parent.clientTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.clientTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
//				$scope.$parent.summary(id);
//				$scope.$parent.flotDsoByMonth(id);
//				$scope.$parent.flotPayment(id);
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
				result='<a href="#" onclick="editContact('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a>&nbsp;<a href="#" onclick="removeContact('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.contactTable = TableManager.init("contactTable", $scope.$parent.contactBaseUrl+"list/-1", columns);
	};
});

app.controller('contractTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'code'},
			{mDataProp: 'startDate'},
			{mDataProp: 'endDate'},
			{mDataProp: 'status'},
			{mDataProp: 'type'},
			{mDataProp: 'matriculationCode', "mRender": function(data, type, full) {
				if(full.matriculationId == null)
					return null;
				return '<a href="#" onclick="showMatriculationDetail('+full.matriculationId+');" class="amount-link">'+full.matriculationCode+'</a>';
			}},
			{mDataProp: 'amountTtc', "mRender": function(data, type, full) {
				if(full.amountTtc != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amountTtc)+'</a>';
				return 0;
			}},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="showContractDetail('+full.id+');" class="btn btn-fw orange" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-desktop"></i></a>';
				return result;
			}}
		];
		$scope.$parent.contractTable = TableManager.init("contractTable", $scope.$parent.contractBaseUrl+"list/-1", columns);
	};
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
			{mDataProp: 'validatedAmountTotal', "mRender": function(data, type, full) {
				if(full.validatedAmountTotal != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.validatedAmountTotal);
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
				if(full.realAmount != null && full.validatedAmount != null) {
					if(full.realAmount >= full.validatedAmount)
						return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format((full.realAmount - full.validatedAmount));
				}
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
		$scope.$parent.outstandingStatusTable = TableManager.init("outstandingStatusTable", $scope.$parent.outstandingBaseUrl+"list/validated/-1", columns);
	};
});

app.controller('outstandingTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.outstanding.id', function(newValue, oldValue) {
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

app.controller('reminderTableController', function($scope,$http) {
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
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="removeReminder('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.reminderTable = TableManager.init("reminderTable", $scope.$parent.reminderBaseUrl+"list/current/-1", columns);
		
		$scope.$parent.reminderTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.reminderTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.loadReminder(id);
			}
		});
	};
});

app.controller('reminderReplyTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'type'},
			{mDataProp: 'comment'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="removeReminderReply('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.reminderReplyTable = TableManager.init("reminderReplyTable", $scope.$parent.reminderReplyBaseUrl+"listByReminder/-1", columns);
	};
});

app.controller('reminderInvoiceTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'reminderStatusName', "mRender": function(data, type, full) {
				var result = '';
				if(full.reminderStatusId == 1) {
					result = '<span class="badge text-bg-info">'+full.reminderStatusName+'</span>';
				} else {
					result = '<span class="badge text-bg-success">'+full.reminderStatusName+'</span>';
				}
				return result;
			}},
			{mDataProp: 'actionDate'},
			{mDataProp: 'actionName', "mRender": function(data, type, full) {
				result = '<span class="badge text-bg-success" style="background-color: '+full.actionColor+'"><i class="'+full.actionIcon+'" style="position: relative; top: 2px;"></i> '+full.actionName+'</span>';
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
				if(full.litigationStatusId == 1) {
					result = '<span class="badge text-bg-info">'+full.litigationStatusName+'</span>';
				} else {
					result = '<span class="badge text-bg-success">'+full.litigationStatusName+'</span>';
				}
				return result;
			}},
			{mDataProp: 'date'},
			{mDataProp: 'code'},
			{mDataProp: 'invoiceCode'},
			{mDataProp: 'amount', "mRender": function(data, type, full) {
				if(full.amount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amount);
				return 0;
			}},
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

app.controller('litigationStageTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'date'},
			{mDataProp: 'actionName', "mRender": function(data, type, full) {
				if(full.actionId == 1)
					result = '<span class="label blue"><i class="fa fa-phone"></i> '+full.actionName+'</span>';
				if(full.actionId == 2)
					result = '<span class="label orange"><i class="fa fa-file-text"></i> '+full.actionName+'</span>';
				if(full.actionId == 3)
					result = '<span class="label orange"><i class="fa fa-file-text"></i> '+full.actionName+'</span>';
				if(full.actionId == 4)
					result = '<span class="label orange"><i class="fa fa-file-text"></i> '+full.actionName+'</span>';
				if(full.actionId == 5)
					result = '<span class="label red"><i class="fa fa-envelope"></i> '+full.actionName+'</span>';
				return result;
			}},
			{mDataProp: 'actionTypeName'},
			{mDataProp: 'name'},
			{mDataProp: 'letterTemplateName'}
		];
		$scope.$parent.litigationStageTable = TableManager.init("litigationStageTable", $scope.$parent.litigationStageBaseUrl+"list/-1", columns);
		
	};
});

app.controller('commentTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'comment'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="removeComment('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.commentTable = TableManager.init("commentTable", $scope.$parent.invoiceCommentBaseUrl+"listByInvoice/-1", columns);
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
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'},
			{mDataProp: 'invoiceActionStatusName', "mRender": function(data, type, full) {
				var result = '<span class="badge text-bg-dark">N/A</span>';
				if(full.invoiceActionStatusColor != null)
					result = '<span class="badge text-bg-'+full.invoiceActionStatusColor+'">'+full.invoiceActionStatusName+'</span>';
				return result;
			}}
		];
		$scope.$parent.invoiceTotalTable = TableManager.init("invoiceTotalTable", $scope.$parent.invoiceBaseUrl+"list/unpaidByClient/-1", columns, 3, "ASC");
		
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
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<div class="checkbox"><label class="ui-check"><input class="invoiceNotOverdueId" type="checkbox" value="'+full.id+'" onclick="check(\'invoiceNotOverdueId\')"><i class="dark-white"></i></label></div>';
				return result;
			}},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
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
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'},
			{mDataProp: 'reminderCount'}
		];
		$scope.$parent.invoiceNotOverdueTable = TableManager.init("invoiceNotOverdueTable", $scope.$parent.invoiceBaseUrl+"list/unpaidNotOverdueByClient/-1", columns, 2, "ASC");
		//$scope.$parent.invoiceNotOverdueTable = TableManager.init("invoiceNotOverdueTable", $scope.$parent.invoiceBaseUrl+"list/unpaidNotOverdueByClient/-1", columns, 0, "DESC", false);
		
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
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<div class="checkbox"><label class="ui-check"><input class="invoiceOverdueId" type="checkbox" value="'+full.id+'" onclick="check(\'invoiceOverdueId\')"><i class="dark-white"></i></label></div>';
				return result;
			}},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
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
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'},
			{mDataProp: 'reminderCount'}
		];
		$scope.$parent.invoiceOverdueTable = TableManager.init("invoiceOverdueTable", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdueByClient/-1", columns, 2, "ASC");
		//$scope.$parent.invoiceOverdueTable = TableManager.init("invoiceOverdueTable", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdueByClient/-1", columns, 0, "DESC", false);
		
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
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<div class="checkbox"><label class="ui-check"><input class="invoiceOverdue30Id" type="checkbox" value="'+full.id+'" onclick="check(\'invoiceOverdue30Id\')"><i class="dark-white"></i></label></div>';
				return result;
			}},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
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
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'},
			{mDataProp: 'reminderCount'}
		];
		$scope.$parent.invoiceOverdue30Table = TableManager.init("invoiceOverdue30Table", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdue30ByClient/-1", columns, 2, "ASC");
		//$scope.$parent.invoiceOverdue30Table = TableManager.init("invoiceOverdue30Table", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdue30ByClient/-1", columns, 0, "DESC", false);
		
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
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<div class="checkbox"><label class="ui-check"><input class="invoiceOverdue60Id" type="checkbox" value="'+full.id+'" onclick="check(\'invoiceOverdue60Id\')"><i class="dark-white"></i></label></div>';
				return result;
			}},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
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
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'},
			{mDataProp: 'reminderCount'}
		];
		$scope.$parent.invoiceOverdue60Table = TableManager.init("invoiceOverdue60Table", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdue60ByClient/-1", columns, 2, "ASC");
		//$scope.$parent.invoiceOverdue60Table = TableManager.init("invoiceOverdue60Table", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdue60ByClient/-1", columns, 0, "DESC", false);
		
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
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<div class="checkbox"><label class="ui-check"><input class="invoiceOverdue90Id" type="checkbox" value="'+full.id+'" onclick="check(\'invoiceOverdue90Id\')"><i class="dark-white"></i></label></div>';
				return result;
			}},
			{mDataProp: 'invoiceDate'},
			{mDataProp: 'dueDate'},
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
			{mDataProp: 'remainingAmount', "mRender": function(data, type, full) {
				if(full.remainingAmount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.remainingAmount);
				return 0;
			}},
			{mDataProp: 'paymentMethodDescription'},
			{mDataProp: 'reminderCount'}
		];
		$scope.$parent.invoiceOverdue90Table = TableManager.init("invoiceOverdue90Table", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdue90ByClient/-1", columns, 2, "ASC");
		//$scope.$parent.invoiceOverdue90Table = TableManager.init("invoiceOverdue90Table", $scope.$parent.invoiceBaseUrl+"list/unpaidOverdue90ByClient/-1", columns, 0, "DESC", false);
		
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

app.controller('litigationCurrentTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.litigation.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.litigationStageTable.ajax.url('/reminder/litigationStage/rest/list/'+newValue).load();
		}
		else {
			$scope.$parent.litigationStageTable.ajax.url('/reminder/litigationStage/rest/list/-1').load();
		}
	});
	
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'litigationStatusId', "mRender": function(data, type, full) {
				if(full.litigationStatusId == 1) {
					result = '<span class="badge text-bg-info">'+full.litigationStatusName+'</span>';
				} else {
					result = '<span class="badge text-bg-success">'+full.litigationStatusName+'</span>';
				}
				return result;
			}},
			{mDataProp: 'date'},
			{mDataProp: 'code'},
			{mDataProp: 'invoiceCode'},
			{mDataProp: 'amount', "mRender": function(data, type, full) {
				if(full.amount != null)
					return new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(full.amount);
				return 0;
			}},
			{mDataProp: 'comment'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editLitigation('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a> <a href="#" onclick="removeLitigation('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.litigationCurrentTable = TableManager.init("litigationCurrentTable", $scope.$parent.litigationBaseUrl+"list/current/-1", columns);
		
		$scope.$parent.litigationCurrentTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.litigationCurrentTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				id = rowData[0].id;
				$scope.$parent.loadLitigation(id);
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
		$scope.$parent.notificationTable = TableManager.init("notificationListTable", $scope.$parent.notificationBaseUrl+"list", columns);
	};
});