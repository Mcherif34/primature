app.controller('homeController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.dto.search = {};
	$scope.courrierTable = null;
	$scope.dto.attachmentsDTO = [{}];
	$scope.filtre = {};
	$scope.selected = null;
	$scope.mode = null;
	$scope.clients = null;
	$scope.contacts = null;
	$scope.sheets = null;
	$scope.categories = null;
	$scope.materials = null;
	$scope.cities = null;
	$scope.clientTable = null;
	$scope.contactTable = null;
	$scope.sheetTable = null;
	$scope.commentTable = null;
	$scope.sheetRequiredError = false;
	$scope.sheetTechnicalError = false;
	$scope.sheetSuccess = false;
	$scope.commentRequiredError = false;
	$scope.commentTechnicalError = false;
	$scope.commentSuccess = false;
	$scope.qualificationDelayPlaceholderStatus = true;
	$scope.reparationDelayPlaceholderStatus = true;
	$scope.ClosingDelayPlaceholderStatus = true;
	$scope.newTicket = true;
	$scope.fieldBg = "#FFFFFF";
	$scope.defaultTable = "invoice";
	
	$scope.notQualified = 0;
	
	$scope.baseUrl = "/rest/";
	$scope.correspondanceSgBaseUrl = "/correspondancesg/rest/";
	$scope.correspondanceDircabBaseUrl = "/correspondancedircab/rest/";
	$scope.nominationBaseUrl = "/nomination/rest/";
	$scope.titularisationBaseUrl = "/titularisation/rest/";
	$scope.congeExterneBaseUrl = "/congeexterne/rest/";
	$scope.missionExterneBaseUrl = "/missionexterne/rest/";
	$scope.missionInterneBaseUrl = "/missioninterne/rest/";
	$scope.decisionBaseUrl = "/decision/rest/";
	$scope.materielBaseUrl = "/materiel/rest/";
	$scope.regularBaseUrl = "/courrier/regular/rest/";
	$scope.outgoingBaseUrl = "/courrier/outgoing/rest/";
	$scope.invoiceBaseUrl = "/courrier/invoice/rest/";
	
	$scope.zoneRecheche = false;
	
	$scope.init = function() {
		$scope.mode="read";
		$scope.addSheetForm = false;
		$scope.editSheetForm = false;
		CRUDService.init($scope);
		
		$scope.initIndicators();
		$scope.courrierProcess();
		$scope.courrierProcessYear();
		
		$scope.currentDate = moment().format('dddd, D MMMM YYYY');
		$scope.currentYear = new Date().getFullYear();
		
		/*$scope.sheetTitle = "TOUS LES TICKETS";
		$scope.getCountSheet();
		$scope.initListCategories();
		$scope.initListProblemTypes();
		$scope.initListCities();
		if(document.getElementById('profileUser').value == 'Administrateur') {
			$scope.qualificationDelay();
			$scope.reparationDelay();
			$scope.closingDelay();
		}
		document.getElementById("export-sheet").style.display = "none";*/
		
	};
	
	$scope.initIndicators = function() {
		//Procédures en cours de traitement
		$http.get(context+$scope.correspondanceSgBaseUrl+"getCurrentCount").success(function(data, status) {   
			$scope.currentCorrespondanceSgCount = data;
			$http.get(context+$scope.correspondanceDircabBaseUrl+"getCurrentCount").success(function(data, status) {   
				$scope.currentCorrespondanceDircabCount = data;
				$scope.currentCorrespondanceCount = $scope.currentCorrespondanceSgCount + $scope.currentCorrespondanceDircabCount;
			});
		});
		$http.get(context+$scope.congeExterneBaseUrl+"getCurrentCount").success(function(data, status) {   
			$scope.currentCongeExterneCount = data;
			$scope.currentCongeCount = $scope.currentCongeExterneCount;
		});
		$http.get(context+$scope.missionExterneBaseUrl+"getCurrentCount").success(function(data, status) {   
			$scope.currentMissionExterneCount = data;
			$http.get(context+$scope.missionInterneBaseUrl+"getCurrentCount").success(function(data, status) {   
				$scope.currentMissionInterneCount = data;
				$scope.currentMissionCount = $scope.currentMissionInterneCount + $scope.currentMissionExterneCount;
			});
		});
		$http.get(context+$scope.decisionBaseUrl+"getCurrentCount").success(function(data, status) {   
			$scope.currentDecisionCount = data;
		});
		$http.get(context+$scope.materielBaseUrl+"getCurrentCount").success(function(data, status) {   
			$scope.currentMaterielCount = data;
		});
		$http.get(context+$scope.nominationBaseUrl+"getCurrentCount").success(function(data, status) {   
			$scope.currentNominationCount = data;
		});
		$http.get(context+$scope.titularisationBaseUrl+"getCurrentCount").success(function(data, status) {   
			$scope.currentTitularisationCount = data;
		});
		$http.get(context+$scope.correspondanceSgBaseUrl+"getCurrentCountByProfile").success(function(data, status) {   
			$scope.currentCorrespondanceCountByProfile = data;
			$scope.taskByProfile = $scope.currentCorrespondanceCountByProfile;
		});
		
		//Répartition des procédures par entité
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Secrétariat Particulier du Premier ministre").success(function(data, status) {   
			$scope.currentCountSpm = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Direction de Cabinet").success(function(data, status) {   
			$scope.currentCountDircab = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Secrétaire Général").success(function(data, status) {   
			$scope.currentCountSg = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Conseiller").success(function(data, status) {   
			$scope.currentCountConseiller = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Direction du courrier").success(function(data, status) {   
			$scope.currentCountCourrier = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Ressources Humaines").success(function(data, status) {   
			$scope.currentCountRh = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Direction des Affaires Administratives").success(function(data, status) {   
			$scope.currentCountDaaf = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Direction de Protocole").success(function(data, status) {   
			$scope.currentCountProtocole = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Service Ordre de Mission").success(function(data, status) {   
			$scope.currentCountSom = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Direction des communications").success(function(data, status) {   
			$scope.currentCountDircom = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Service des Matériels").success(function(data, status) {   
			$scope.currentCountMateriel = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCurrentCountByEntity/Ministère").success(function(data, status) {   
			$scope.currentCountExterne = data;
		});
		
		//Status de traitement des procédures
		$http.get(context+$scope.baseUrl+"getCurrentCount").success(function(data, status) {   
			$scope.currentCount = data;
		});
		
		$http.get(context+$scope.baseUrl+"getCompletedCount").success(function(data, status) {   
			$scope.completedCount = data;
		});
		
		$http.get(context+$scope.baseUrl+"getRejectedCount").success(function(data, status) {   
			$scope.rejectedCount = data;
		});
	}
	
	$scope.displayCorrespondance = function() {
		$scope.defaultTable = "correspondance";
	}
	
	$scope.displayNotifications = function() {
		$('#notificationModal').modal("show");
	}
	
	$scope.courrierProcess = function() {
		$http.get(context+$scope.correspondanceSgBaseUrl+"getCurrentCount").success(function(data, status) {
			var currentCorrespondanceSgCount = data;
			$http.get(context+$scope.correspondanceSgBaseUrl+"getCurrentCount").success(function(data, status) {
				var currentCorrespondanceDircabCount = data;
				var currentCorrespondanceCount = currentCorrespondanceSgCount + currentCorrespondanceDircabCount;
				$http.get(context+$scope.congeExterneBaseUrl+"getCurrentCount").success(function(data, status) {
					var currentCongeCount = data;
					$http.get(context+$scope.materielBaseUrl+"getCurrentCount").success(function(data, status) {
						var currentMaterielCount = data;
						$http.get(context+$scope.missionExterneBaseUrl+"getCurrentCount").success(function(data, status) {
							var currentMissionExterneCount = data;
							$http.get(context+$scope.missionInterneBaseUrl+"getCurrentCount").success(function(data, status) {
								var currentMissionInterneCount = data;
								var currentMissionCount = currentMissionExterneCount + currentMissionInterneCount;
								$http.get(context+$scope.decisionBaseUrl+"getCurrentCount").success(function(data, status) {
									var currentDecisionCount = data;
									$http.get(context+$scope.titularisationBaseUrl+"getCurrentCount").success(function(data, status) {
										var currentTitularisationCount = data;
										$http.get(context+$scope.nominationBaseUrl+"getCurrentCount").success(function(data, status) {
											var currentNominationCount = data;
											
											var options,
											chart,
											dealTypeChartsColors=((
												options = {
													series: [
														{
															name: 'NOMBRE DE PROCEDURES EN COURS ',
															data: [currentCorrespondanceCount, currentTitularisationCount, currentMissionCount, currentCongeCount, currentDecisionCount, currentNominationCount, currentMaterielCount],
															color: '#299CDB'
														}
													],
													chart: {
														type: 'bar',
														height: 350,
														toolbar: {
												            show: false
												          }
													},
													plotOptions: {
														bar: {
															horizontal: false,
															columnWidth: '65%',
															endingShape: 'rounded'
														},
													},
													dataLabels: {
														enabled: false,
													},
													stroke: {
														show: true,
														width: 4,
														colors: ['transparent'],
													},
													grid: {
												          borderColor: '#e7e7e7',
												          row: {
												            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
												            opacity: 0.5
												          },
												        },
													xaxis: {
														categories: ['CORRESPONDANCES', 'TITULARISATIONS', 'MISSIONS', 'CONGES PAYES', 'DECISIONS', 'NOMINATIONS', 'MATERIELS'],
													},
													yaxis: {
													},
													fill: {
														opacity: 1,
													},
													tooltip: {
														y: {
															formatter: function (val) {
															return val;
														},
													},
												},
											},
											(chart=new ApexCharts(document.querySelector("#courrierProcess"),options)).render()));
											$scope.qualificationDelayPlaceholderStatus = false;	
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
	
	$scope.courrierProcessYear = function() {
		var currentDataValue = [];
		var completedDataValue = [];
		$http.get(context+$scope.correspondanceSgBaseUrl+"getCurrentCountByYear/"+new Date().getFullYear()).success(function(data, status) {
			if(data.length != 0) {
				for(i = 1; i <= 12; i++) {
					for(j = 0; j < data.length; j++) {
						if(i == data[j][0]) {
							currentDataValue.push(data[j]);
						}
						else {
							currentDataValue.push([i, 0]);
						}
					}
				}
			} else {
				for(i = 1; i <= 12; i++) {
					currentDataValue.push([i, 0]);
				}
			}
			$http.get(context+$scope.correspondanceSgBaseUrl+"getCompletedCountByYear/"+new Date().getFullYear()).success(function(data, status) {
				if(data.length != 0) {
					for(i = 1; i <= 12; i++) {
						for(j = 0; j < data.length; j++) {
							if(i == data[j][0]) {
								completedDataValue.push(data[j]);
							}
							else {
								completedDataValue.push([i, 0]);
							}
						}
					}
				} else {
					for(i = 1; i <= 12; i++) {
						completedDataValue.push([i, 0]);
					}
				}
				var options,
				chart,
				dealTypeChartsColors=((
						options = {
						          series: [
						          {
						            name: "NOMBRE DE PROCEDURES EN COURS ",
						            data: [currentDataValue[0][1], currentDataValue[1][1], currentDataValue[2][1], currentDataValue[3][1], currentDataValue[4][1], currentDataValue[5][1], currentDataValue[6][1], currentDataValue[7][1], currentDataValue[8][1], currentDataValue[9][1], currentDataValue[10][1], currentDataValue[11][1]],
						            color: "#009EC7"
						          },
						          {
						            name: "NOMBRE DE PROCEDURES CLOTUREES ",
						            data: [completedDataValue[0][1], completedDataValue[1][1], completedDataValue[2][1], completedDataValue[3][1], completedDataValue[4][1], completedDataValue[5][1], completedDataValue[6][1], completedDataValue[7][1], completedDataValue[8][1], completedDataValue[9][1], completedDataValue[10][1], completedDataValue[11][1]],
						            color: "#51BA98"
						          }
						        ],
						          chart: {
						          height: 350,
						          type: 'line',
						          dropShadow: {
						            enabled: false,
						            color: '#000',
						            top: 18,
						            left: 7,
						            blur: 10,
						            opacity: 0.2
						          },
						          toolbar: {
						            show: false
						          }
						        },
						        colors: ['#299CDB', '#45CB85'],
						        dataLabels: {
						          enabled: false,
						        },
						        stroke: {
						          curve: 'straight'
						        },
						        grid: {
						          borderColor: '#e7e7e7',
						          row: {
						            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
						            opacity: 0.5
						          },
						        },
						        markers: {
						          size: 1
						        },
						        xaxis: {
						          categories: ['JAN', 'FEV', 'MARS', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOUT', 'SEPT', 'OCT', 'NOV', 'DEC'],
						        },
						        yaxis: {
						        },
						        legend: {
						          position: 'top',
						          horizontalAlign: 'center',
						          floating: false,
						        }
						        },

						(chart=new ApexCharts(document.querySelector("#courrierProcessYear"),options)).render()));
						$scope.qualificationDelayPlaceholderStatus = false;
			});
		});
	}
	
});

app.controller('courrierTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'refArriveeBoc'},
			{mDataProp: 'dateEnregistrement'},
			{mDataProp: 'dateReception'},
			{mDataProp: 'dateFacture'},
			{mDataProp: 'numFacture'},
			{mDataProp: 'expediteur'},
			{mDataProp: 'montantFacture'},
			{mDataProp: 'taskTitle'},
			{mDataProp: 'performer', "mRender": function(data, type, full) {
				if(full.wSubWorkDateCompleted != null) {
					result = '';
				} else {
					result = full.performer;
				}
				return result;
			}},
			{mDataProp: 'wSubWorkDateInitiated', "mRender": function(data, type, full) {
				var result = '';
				if(full.wSubWorkDateInitiated != null) {
					var date = full.wSubWorkDateInitiated.split('/');
					if(Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24)) > 4) {
						result = '<span class="badge text-bg-danger">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' JOUR(S)</span>';
					}
					else {
						result = '<span class="badge text-bg-info">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' JOUR(S)</span>';
					}
				}
				
				return result;
			}}
		];
		$scope.$parent.courrierTable = TableManager.init("courrierTable", $scope.$parent.invoiceBaseUrl+"currentList", columns, 0, "DESC");
		
		$scope.$parent.courrierTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.courrierTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('courrierClassiqueTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'refArriveeBoc'},
			{mDataProp: 'dateEnregistrement'},
			{mDataProp: 'dateReception'},
			{mDataProp: 'expediteur'},
			{mDataProp: 'objet'},
			{mDataProp: 'typeInstructionDg'},
			{mDataProp: 'taskTitle'},
			{mDataProp: 'performer', "mRender": function(data, type, full) {
				if(full.wSubWorkDateCompleted != null) {
					result = '';
				} else {
					result = full.performer;
				}
				return result;
			}},
			{mDataProp: 'wSubWorkDateInitiated', "mRender": function(data, type, full) {
				var result = '';
				if(full.wSubWorkDateInitiated != null) {
					var date = full.wSubWorkDateInitiated.split('/');
					if(Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24)) > 4) {
						result = '<span class="badge text-bg-danger">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' JOUR(S)</span>';
					}
					else {
						result = '<span class="badge text-bg-info">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' JOUR(S)</span>';
					}
				}
				
				return result;
			}}
		];
		$scope.$parent.courrierClassiqueTable = TableManager.init("courrierClassiqueTable", $scope.$parent.regularBaseUrl+"currentList", columns, 0, "DESC");
		
		$scope.$parent.courrierClassiqueTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.courrierClassiqueTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('courrierDepartTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'refDepartBoc'},
			{mDataProp: 'dateLivraison'},
			{mDataProp: 'dateDepart'},
			{mDataProp: 'destinataire'},
			{mDataProp: 'observations'},
			{mDataProp: 'redacteur'},
			{mDataProp: 'taskTitle'},
			{mDataProp: 'performer', "mRender": function(data, type, full) {
				if(full.wSubWorkDateCompleted != null) {
					result = '';
				} else {
					result = full.performer;
				}
				return result;
			}},
			{mDataProp: 'wSubWorkDateInitiated', "mRender": function(data, type, full) {
				var result = '';
				if(full.wSubWorkDateInitiated != null) {
					var date = full.wSubWorkDateInitiated.split('/');
					if(Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24)) > 4) {
						result = '<span class="badge text-bg-danger">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' JOUR(S)</span>';
					}
					else {
						result = '<span class="badge text-bg-info">'+Math.round((new Date()-new Date(date[2]+'-'+date[1]+'-'+date[0]))/(1000*60*60*24))+' JOUR(S)</span>';
					}
				}
				
				return result;
			}}
		];
		$scope.$parent.courrierDepartTable = TableManager.init("courrierDepartTable", $scope.$parent.outgoingBaseUrl+"currentList", columns, 0, "DESC");
		
		$scope.$parent.courrierDepartTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.courrierDepartTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('courrierCurrentTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="form-check"><input class="form-check-input currentCourrierId" type="checkbox" value="'+full.referenceCourrier+'" onclick="check(\'currentCourrierId\')" /></div>';
			}},
			{mDataProp: 'referenceCourrier'},
			{mDataProp: 'dateReception'},
			{mDataProp: 'dateEnregistrement'},
			{mDataProp: 'referenceExpediteur'},
			{mDataProp: 'expediteur'},
			{mDataProp: 'objet'},
			{mDataProp: 'performerName'},
			{mDataProp: 'wSubWorkDateCompleted', "mRender": function(data, type, full) {
				if(full.wSubWorkDateCompleted != null) {
					result = '<span class="badge text-bg-success">CLOTURE</span>';
				} else {
					result = '<span class="badge text-bg-info">EN COURS</span>';
				}
				return result;
			}}
		];
		$scope.$parent.courrierCurrentTable = TableManager.init("courrierCurrentTable", $scope.$parent.correspondanceBaseUrl+"currentListDashboard", columns, 1, "DESC");
		
	};
});
