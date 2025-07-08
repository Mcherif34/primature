app.controller('dashboardController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.dto.search = {};
	$scope.filtre = {};
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
	$scope.clientsWithoutCollaborator = null;
	$scope.notifications = null;
	$scope.notificationsCount = 0;
	$scope.invoices = null;
	$scope.clientInvoiceList = null;
	$scope.reminderInvoiceTable = null;
	$scope.litigationInvoiceTable = null;
	$scope.promiseInvoiceTable = null;
	$scope.contenceInvoiceTable = null;
	$scope.flotOverdueAmountChart = null;
	
	$scope.baseUrl = "/dashboard/overdueAmount/rest/";
	$scope.notificationBaseUrl = "/notification/rest/";
	$scope.invoiceBaseUrl = "/credit/invoice/rest/";
	$scope.contactBaseUrl = "/client/contact/rest/";
	$scope.paymentBaseUrl = "/credit/payment/rest/";
	$scope.invoicePaymentBaseUrl = "/credit/invoicePayment/rest/";
	$scope.outstandingBaseUrl = "/credit/outstanding/rest/";
	$scope.invoiceCommentBaseUrl = "/credit/invoiceComment/rest/";
	$scope.reminderBaseUrl = "/reminder/reminder/rest/";
	$scope.litigationBaseUrl = "/reminder/litigation/rest/";
	$scope.promiseBaseUrl = "/reminder/promise/rest/";
	$scope.contenceBaseUrl = "/reminder/contence/rest/";
	$scope.zoneRecheche = false;
	$scope.clientsNames = '';
	$scope.uncategorizedClientsNames = '';
	$scope.notificationInvoiceDescription = '';

	$scope.init = function() {
		$scope.mode="read";
		CRUDService.init($scope);
		$scope.currentYear = new Date().getFullYear();
		$scope.summary();
		$scope.initListNotifications();
		$scope.initListClientPortofolios();
		$scope.searchClient();
		$scope.initListRecoveryUsers();
	};
	
	$scope.initListNotifications = function(){
		$http.get(context+$scope.notificationBaseUrl+"getNotificationsByUser").success(function(data, status) {
			$scope.notificationsInverse = data.slice(0,5);
			$scope.notifications = $scope.notificationsInverse.slice(0,5);
			if(data != null)
				$scope.notificationsCount = data.length;
		});
	};
	
	$scope.initListClientPortofolios = function() {
		$http.get(context+"/client/portofolio/rest/getAll").success(function(data, status) {   
			$scope.clientPortofolios = data;
		});
	};
	
	$scope.initListRecoveryUsers = function() {
		$http.get(context+"/administration/user/rest/getRecoveryAll").success(function(data, status) {   
			$scope.recoveryUsers = data;
		});
	};
	
	$scope.searchClient = function() {
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
	};
	
	openNotificationModal = function(id){
		$scope.loadNotification(id);
		$('#notificationModal').modal("show");
	}
	
	$scope.openNotificationModal = function(id){
		$scope.loadNotification(id);
		$('#notificationModal').modal("show");
	}
	
	$scope.showAllNotification = function(){
		$http.get(context+$scope.notificationBaseUrl+"getNotificationsByUser").success(function(data, status) {
			$scope.notificationList = data
			$('#notificationListModal').modal("show");
		}).error(function(data, status, headers, config){
			console.log("erreur de la recupération!!!!");
		});
	}
	
	$scope.notificationTest = function(){
		$http.post(context+$scope.notificationBaseUrl+"saveOutstandingClients").success(function(data, status){
			$scope.initListNotifications();
			console.log(data);
		}).error(function(data, status, headers, config){
			console.log("Erreur");
		});
	}
	
	$scope.loadNotification = function(id){
		$http.get(context+$scope.notificationBaseUrl+"load/"+id).success(function(data, status) {
			$scope.notificationInvoice = data;
			document.getElementById("notifDescription").innerHTML = $scope.notificationInvoice.description;

		});
	}
	
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
	
	$scope.summary = function() {
		$http.get(context+$scope.baseUrl+"getRemainingAmount").success(function(data, status) {   
			$scope.totalRemainingAmount = new Intl.NumberFormat().format(data);
			
			$http.get(context+$scope.baseUrl+"getOverdueAmount").success(function(data, status) {   
				$scope.totalOverdueAmount = new Intl.NumberFormat().format(data);
				$scope.totalOverdueAmountNotFormatted = data;
				
				$http.get(context+$scope.baseUrl+"getOverdueAmount/0/30").success(function(data, status) {   
					$scope.totalOverdueAmount30 = new Intl.NumberFormat().format(data);
					$scope.tauxOverdueAmount30 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
					$scope.totalOverdueAmount30NotFormatted = data;
					
					$http.get(context+$scope.baseUrl+"getOverdueAmount/30/60").success(function(data, status) {   
						$scope.totalOverdueAmount60 = new Intl.NumberFormat().format(data);
						$scope.tauxOverdueAmount60 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
						$scope.totalOverdueAmount60NotFormatted = data;
						
						$http.get(context+$scope.baseUrl+"getOverdueAmount/60/90").success(function(data, status) {   
							$scope.totalOverdueAmount90 = new Intl.NumberFormat().format(data);
							$scope.tauxOverdueAmount90 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
							$scope.totalOverdueAmount90NotFormatted = data;
							
							$http.get(context+$scope.baseUrl+"getOverdueAmount/90/120").success(function(data, status) {   
								$scope.totalOverdueAmount120 = new Intl.NumberFormat().format(data);
								$scope.tauxOverdueAmount120 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
								$scope.totalOverdueAmount120NotFormatted = data;
								
								$http.get(context+$scope.baseUrl+"getOverdueAmount/120/150").success(function(data, status) {   
									$scope.totalOverdueAmount150 = new Intl.NumberFormat().format(data);
									$scope.tauxOverdueAmount150 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
									$scope.totalOverdueAmount150NotFormatted = data;
									
									$http.get(context+$scope.baseUrl+"getOverdueAmount/150").success(function(data, status) {   
										$scope.totalOverdueAmount151 = new Intl.NumberFormat().format(data);
										$scope.tauxOverdueAmount151 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
										$scope.totalOverdueAmount151NotFormatted = data;
										
										$http.get(context+$scope.baseUrl+"getNotOverdueAmount").success(function(data, status) {   
											$scope.totalNotOverdueAmount = new Intl.NumberFormat().format(data);
											$scope.totalNotOverdueAmountNotFormatted = data;
											const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
											$scope.currentDate = new Date().toLocaleDateString(undefined, options);
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
	
	$scope.advancedSearch = function() {
		var currentDate = new Date();
		$scope.displayDate = new Date();
		var searchId = 0; var searchCodeClient = 'NAN'; var searchCompanyName = 'NAN';  var searchClientPortofolioId = 0; var searchRecoveryUserId = 0; var searchDate = 'NAN';
		$scope.dto.search.codeClient = $("#codeClient").val();
		$scope.dto.search.companyName = $("#companyName").val();
		if(!angular.isUndefined($scope.dto.search.codeClient) && $scope.dto.search.codeClient != '') searchCodeClient = $scope.dto.search.codeClient;
		if(!angular.isUndefined($scope.dto.search.companyName) && $scope.dto.search.companyName != '') searchCompanyName = $scope.dto.search.companyName;
		if(!angular.isUndefined($scope.dto.search.clientPortofolioId) && $scope.dto.search.clientPortofolioId != null) searchClientPortofolioId = $scope.dto.search.clientPortofolioId;
		if(!angular.isUndefined($scope.dto.search.recoveryUserId) && $scope.dto.search.recoveryUserId != null) searchRecoveryUserId = $scope.dto.search.recoveryUserId;
		if(!angular.isUndefined($scope.dto.search.date) && $scope.dto.search.date != '') {
			searchDate = moment($scope.dto.search.date).format('YYYY-MM-DD');
			$scope.displayDate = $scope.dto.search.date;
		} else {
			if(!angular.isUndefined($scope.dto.search.date) && $scope.dto.search.date != '') {
				searchDate = moment(currentDate).format('YYYY-MM-DD');
				$scope.displayDate = $scope.dto.search.date;
			}
		}
		$scope.outstandingStatusTable.ajax.url("/credit/outstanding/rest/list/validated/search/"+searchCodeClient+"/"+searchCompanyName+"/"+searchClientPortofolioId+"/"+searchRecoveryUserId+"/"+searchDate).load();
		
		$http.get(context+$scope.baseUrl+"getRemainingAmount").success(function(data, status) {   
			$scope.totalRemainingAmount = new Intl.NumberFormat().format(data);
			
			$http.get(context+$scope.baseUrl+"getOverdueAmount/search/"+searchCodeClient+"/"+searchCompanyName+"/"+searchClientPortofolioId+"/"+searchRecoveryUserId+"/"+searchDate).success(function(data, status) {   
				$scope.totalOverdueAmount = new Intl.NumberFormat().format(data);
				$scope.totalOverdueAmountNotFormatted = data;
				
				$http.get(context+$scope.baseUrl+"getOverdueAmount/search/0/30/"+searchCodeClient+"/"+searchCompanyName+"/"+searchClientPortofolioId+"/"+searchRecoveryUserId+"/"+searchDate).success(function(data, status) {   
					$scope.totalOverdueAmount30 = new Intl.NumberFormat().format(data);
					$scope.tauxOverdueAmount30 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
					$scope.totalOverdueAmount30NotFormatted = data;
					
					$http.get(context+$scope.baseUrl+"getOverdueAmount/search/30/60/"+searchCodeClient+"/"+searchCompanyName+"/"+searchClientPortofolioId+"/"+searchRecoveryUserId+"/"+searchDate).success(function(data, status) {   
						$scope.totalOverdueAmount60 = new Intl.NumberFormat().format(data);
						$scope.tauxOverdueAmount60 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
						$scope.totalOverdueAmount60NotFormatted = data;
						
						$http.get(context+$scope.baseUrl+"getOverdueAmount/search/60/90/"+searchCodeClient+"/"+searchCompanyName+"/"+searchClientPortofolioId+"/"+searchRecoveryUserId+"/"+searchDate).success(function(data, status) {   
							$scope.totalOverdueAmount90 = new Intl.NumberFormat().format(data);
							$scope.tauxOverdueAmount90 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
							$scope.totalOverdueAmount90NotFormatted = data;
							
							$http.get(context+$scope.baseUrl+"getOverdueAmount/search/90/120/"+searchCodeClient+"/"+searchCompanyName+"/"+searchClientPortofolioId+"/"+searchRecoveryUserId+"/"+searchDate).success(function(data, status) {   
								$scope.totalOverdueAmount120 = new Intl.NumberFormat().format(data);
								$scope.tauxOverdueAmount120 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
								$scope.totalOverdueAmount120NotFormatted = data;
								
								$http.get(context+$scope.baseUrl+"getOverdueAmount/search/120/150/"+searchCodeClient+"/"+searchCompanyName+"/"+searchClientPortofolioId+"/"+searchRecoveryUserId+"/"+searchDate).success(function(data, status) {   
									$scope.totalOverdueAmount150 = new Intl.NumberFormat().format(data);
									$scope.tauxOverdueAmount150 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
									$scope.totalOverdueAmount150NotFormatted = data;
									
									$http.get(context+$scope.baseUrl+"getOverdueAmount/search/150/"+searchCodeClient+"/"+searchCompanyName+"/"+searchClientPortofolioId+"/"+searchRecoveryUserId+"/"+searchDate).success(function(data, status) {   
										$scope.totalOverdueAmount151 = new Intl.NumberFormat().format(data);
										$scope.tauxOverdueAmount151 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data / $scope.totalOverdueAmountNotFormatted * 100);
										$scope.totalOverdueAmount151NotFormatted = data;
										
										$http.get(context+$scope.baseUrl+"getNotOverdueAmount/search/"+searchCodeClient+"/"+searchCompanyName+"/"+searchClientPortofolioId+"/"+searchRecoveryUserId+"/"+searchDate).success(function(data, status) {   
											$scope.totalNotOverdueAmount = new Intl.NumberFormat().format(data);
											$scope.totalNotOverdueAmountNotFormatted = data;
											const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
											$scope.currentDate = $scope.displayDate.toLocaleDateString(undefined, options);
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
		if($scope.flotOverdueAmountChart != null)
			$scope.flotOverdueAmountChart.destroy();
		$scope.flotOverdueAmountChart = new Chart(document.getElementById('flotOverdueAmount'), config);
	}
	
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

app.controller('outstandingStatusTableController', function($scope,$http) {
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
				if(full.validatedAmount != null) {
					if(full.realAmount/full.validatedAmount*100 > 100) {
						result = '<span class="label red">'+Math.round(full.realAmount/full.validatedAmount*100)+'%</span>';
					}
					else if(full.realAmount/full.validatedAmount*100 > 50 && full.realAmount/full.validatedAmount*100 <= 100) {
						result = '<span class="label orange">'+Math.round(full.realAmount/full.validatedAmount*100)+'%</span>';
					}
					else {
						result = '<span class="label green">'+Math.round(full.realAmount/full.validatedAmount*100)+'%</span>';
					}
				} else {
					result = '<span class="label">N/A</span>';
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
		$scope.$parent.outstandingStatusTable = TableManager.init("outstandingStatusTable", "/credit/outstanding/rest/list/validated", columns);
		
		$scope.$parent.outstandingStatusTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.outstandingStatusTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.loadValidated(id);
			}
		});
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