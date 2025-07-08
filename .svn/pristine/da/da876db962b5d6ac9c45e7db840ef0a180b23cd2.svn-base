app.controller('courrierController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.dto.search = {};
	$scope.filtre = {};
	$scope.courrierTable = null;
	//$scope.courrierUserTable = null;

	$scope.selected = null;
	$scope.mode = null;
	$scope.hidden = false;
	$scope.courrierRequiredError = false;
	$scope.courrierTechnicalError = false;
	$scope.courrierSuccess = false;
	$scope.buttonDisabled = false;
	$scope.courriersImport = [];
	$scope.importing = false;
	$scope.checked = false;
	$scope.commentReplyDisplayed = false;
	$scope.notifications = null;
	$scope.notificationsCount = 0;
	
	$scope.baseUrl = "/client/courrier/rest/";

	$scope.promiseRequiredError = false;
	$scope.promiseTechnicalError = false;
	$scope.promiseSuccess = false;
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addCourrierForm = false;
		$scope.editCourrierForm = false;
		CRUDService.init($scope);
		$scope.initListCourriers();

		
		$scope.items = [{
			  id: false,
			  name: 'Non'
			}, {
			  id: true,
			  name: 'Oui'
		}];
		
		$scope.courrierContractStatus = [{
			  id: 1,
			  name: 'Courriers sans contrat'
			}, {
			  id: 2,
			  name: 'Courriers avec contrat'
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
	
	$scope.initListCourriers = function() {
		$http.get(context+$scope.baseUrl+"/getAll").success(function(data, status) {
			$scope.courriers = data;
			$scope.courrier = data[1];
			console.warn("COURRIER : ", data);
		});
	};



	$scope.advancedSearchCourrierForm = function() {
		if(!angular.isUndefined($scope.dto.search.codeCourrier) && $scope.dto.search.codeCourrier != null)
			$('#codeCourrier').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/courrier/courrier/rest/getCode/"+params.term;
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
			}).select2('val', $scope.dto.search.courrierCode);
		else
			$('#codeCourrier').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/courrier/courrier/rest/getCode/"+params.term;
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
		
		if(!angular.isUndefined($scope.dto.search.courrierCompanyName) && $scope.dto.search.courrierCompanyName != null)
			$('#companyName').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/courrier/courrier/rest/getName/"+params.term;
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
			}).select2('val', $scope.dto.search.courrierCompanyName);
		else
			$('#companyName').select2({
				placeholder: 'Choisir une option',
				minimumInputLength: 2,
				ajax: {
					url: function (params) {
						return context+"/courrier/courrier/rest/getName/"+params.term;
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
		
		$('#advancedSearchCourrierModal').modal("show");
	};

	$scope.incrementSequence = function (id) {
	    $http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) {
            $scope.dto = data;
            if($scope.dto.type === "courrier") {
                $scope.dto.sequence = $scope.dto.sequence + 1;
                CRUDService.save($scope,$scope.dto).success(function(data, status) {
                    $scope.courrier = data;
                }).error(function(data, status, headers, config) {
                    $scope.courrierTechnicalError = true;
                });
            } else {
                console.error("Erreur")
            }

        });
	}

	
	$scope.addCourrier = function() {
		CRUDService.add($scope);
		$scope.editCourrierForm = false;
		$scope.addCourrierForm = true;
		$scope.courrierSuccess = false;
		$scope.courrierTechnicalError = false;
		$scope.courrierRequiredError = false;
		$('#courrierModal').modal("show");


		$scope.incrementSequence(2);
	};
	
	$scope.importCourriers = function() {
		$scope.importing = false;
		document.getElementById('courrierFileInput').value = '';
		CRUDService.add($scope);
		$scope.courrierSuccess = false;
		$scope.courrierTechnicalError = false;
		$scope.courrierRequiredError = false;
		$('#importCourriersModal').modal("show");
	};
	

	

	

	


	
	$scope.searchCourrier = function() {
		var searchKey = 'NAN';
		if(!angular.isUndefined($scope.dto.search.key) && $scope.dto.search.key != '') searchKey = $scope.dto.search.key;
		$scope.courrierTable.ajax.url('/courrier/courrier/rest/search/'+searchKey).load();
	};
	
	$scope.advancedSearchCourrier = function() {
		var searchId = 0; var searchCodeCourrier = 'NAN'; var searchCompanyName = 'NAN';  var searchIceNum = 'NAN'; var searchTaxNum = 'NAN'; var searchCompanyId = 0; var searchAgencyId = 0; var searchCourrierPortofolioId = 0; var searchContractStatus = 0;
		$scope.dto.search.codeCourrier = $("#codeCourrier").val();
		$scope.dto.search.companyName = $("#companyName").val();
		if(!angular.isUndefined($scope.dto.search.codeCourrier) && $scope.dto.search.codeCourrier != '') searchCodeCourrier = $scope.dto.search.codeCourrier;
		if(!angular.isUndefined($scope.dto.search.companyName) && $scope.dto.search.companyName != '') searchCompanyName = $scope.dto.search.companyName;
		if(!angular.isUndefined($scope.dto.search.iceNum) && $scope.dto.search.iceNum != '') searchIceNum = $scope.dto.search.iceNum;
		if(!angular.isUndefined($scope.dto.search.taxNum) && $scope.dto.search.taxNum != '') searchTaxNum = $scope.dto.search.taxNum;
		if(!angular.isUndefined($scope.dto.search.companyId) && $scope.dto.search.companyId != null) searchCompanyId = $scope.dto.search.companyId;
		if(!angular.isUndefined($scope.dto.search.agencyId) && $scope.dto.search.agencyId != null) searchAgencyId = $scope.dto.search.agencyId;
		if(!angular.isUndefined($scope.dto.search.courrierPortofolioId) && $scope.dto.search.courrierPortofolioId != null) searchCourrierPortofolioId = $scope.dto.search.courrierPortofolioId;
		if(!angular.isUndefined($scope.dto.search.contractStatus) && $scope.dto.search.contractStatus != null) searchContractStatus = $scope.dto.search.contractStatus;
		$scope.courrierTable.ajax.url('/courrier/courrier/rest/search/'+searchCodeCourrier+'/'+searchCompanyName+'/'+searchIceNum+'/'+searchTaxNum+'/'+searchCompanyId+'/'+searchAgencyId+'/'+searchCourrierPortofolioId+'/'+searchContractStatus).load();
		$('#advancedSearchCourrierModal').modal("hide");
	};
	
;
	



	
	editCourrier = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto = data;
			CRUDService.edit($scope);
			$scope.addCourrierForm = false;
			$scope.editCourrierForm = true;
			$scope.courrierSuccess = false;
			$scope.courrierTechnicalError = false;
			$scope.courrierRequiredError = false;
			$('#courrierModal').modal("show");
		});
	};
	
	$scope.load = function(id) {
		$scope.validatedOutstandingCreditLimit = false;
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			$scope.initListInvoices(id);
			$http.get(context+$scope.outstandingBaseUrl+"getValidatedByCourrier/"+$scope.dto.id).success(function(data, status) {
				if(data != null && data.courrierId != null) {
					$scope.validatedOutstanding = true;
				} else {
					$scope.validatedOutstanding = false;
				}
			});
			$http.get(context+$scope.outstandingBaseUrl+"getAvailableByCourrier/"+$scope.dto.id).success(function(data, status) {
				if(data.courrierId != null) {
					$scope.availableOutstanding = true;
				} else {
					$scope.availableOutstanding = false;
				}
			});
			if($scope.dto.reminderPortofolioId != null) {
				$http.get(context+"/reminder/scenario/rest/getByCourrier/"+$scope.dto.id).success(function(data, status) {   
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
			
			$http.get(context+"/reminder/reminder/rest/getCountCurrentByCourrier/"+$scope.dto.id).success(function(data, status) {   
				$scope.currentReminderCourrier = data;
			});
			$http.get(context+"/reminder/litigation/rest/getCountCurrentByCourrier/"+$scope.dto.id).success(function(data, status) {   
				$scope.currentLitigationCourrier = data;
			});
			$http.get(context+"/reminder/contence/rest/getCountCurrentByCourrier/"+$scope.dto.id).success(function(data, status) {   
				$scope.currentContenceCourrier = data;
			});
			$http.get(context+"/credit/invoice/rest/getRemainingAmountByCourrier/"+$scope.dto.id).success(function(data, status) {   
				if(data == null) $scope.remainingAmountCourrier = 0; else $scope.remainingAmountCourrier = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
			});
			$http.get(context+"/credit/invoice/rest/getOverdueByCourrier/"+$scope.dto.id).success(function(data, status) {   
				if(data == null) $scope.overdueCourrier = 0; else $scope.overdueCourrier = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(data);
			});
			$http.get(context+"/courrier/contract/rest/getByCourrier/"+$scope.dto.id).success(function(data, status) {   
				$scope.contractsList = data;
			});
			$http.get(context+"/courrier/contact/rest/getByCourrier/"+$scope.dto.id).success(function(data, status) {   
				$scope.contactsList = data;
			});
			$scope.dto.search = {};
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	

	
	$scope.saveCourrier = function() {
		if($scope.courrierForm.$valid) {
			var currentDate = new Date();
			if($scope.dto.codeCourrier == null || $scope.dto.codeCourrier == '') {
				$http.get(context+"/courrier/courrier/rest/getAll").success(function(data, status) {   
					var seqNum = data.length + 1;
					$scope.dto.codeCourrier = "CL" + currentDate.getFullYear() + (currentDate.getMonth()+1).toString().padStart(2, '0') + seqNum.toString().padStart(3, '0');
					$scope.dto.prospect = false;
					$scope.dto.createdAt = currentDate;
					$scope.dto.convertCourrierDate = currentDate;
					CRUDService.save($scope,$scope.dto).success(function(data, status) {
						$scope.courrierId = data.id;
						$scope.currencyId = data.currencyId;
						$http.get(context+$scope.outstandingBaseUrl+"getByCourrier/"+$scope.courrierId).success(function(data, status) {
							if(data == null) {
								$scope.dto.outstanding = {};
								$scope.dto.outstanding.courrierId = $scope.courrierId;
								$scope.dto.outstanding.currencyId = $scope.currencyId;
								$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {   
									CRUDService.setEntityLoaded($scope,data);
									$scope.refreshList();
									$scope.courrierTechnicalError = false;
									$scope.courrierRequiredError = false;
									$scope.courrierSuccess = true;
									$('#courrierModal').modal("hide");
								}).error(function(data, status, headers, config) {
									$scope.courrierTechnicalError = true;
								});
							} else {
								CRUDService.setEntityLoaded($scope,data);
								$scope.refreshList();
								$scope.courrierTechnicalError = false;
								$scope.courrierRequiredError = false;
								$scope.courrierSuccess = true;
								$('#courrierModal').modal("hide");
							}
						});
					}).error(function(data, status, headers, config) {
						$scope.courrierTechnicalError = true;
					});
				});
			} else {
				$scope.dto.updatedAt = currentDate;
				CRUDService.save($scope,$scope.dto).success(function(data, status) {
					$scope.courrierId = data.id;
					$scope.currencyId = data.currencyId;
					$http.get(context+$scope.outstandingBaseUrl+"getByCourrier/"+$scope.courrierId).success(function(data, status) {
						if(data == null) {
							$scope.dto.outstanding = {};
							$scope.dto.outstanding.courrierId = $scope.courrierId;
							$scope.dto.outstanding.currencyId = $scope.currencyId;
							$http.post(context+$scope.outstandingBaseUrl+"save", angular.toJson($scope.dto.outstanding)).success(function(data, status) {   
								CRUDService.setEntityLoaded($scope,data);
								$scope.refreshList();
								$scope.courrierTechnicalError = false;
								$scope.courrierRequiredError = false;
								$scope.courrierSuccess = true;
								$('#courrierModal').modal("hide");
							}).error(function(data, status, headers, config) {
								$scope.courrierTechnicalError = true;
							});
						} else {
							CRUDService.setEntityLoaded($scope,data);
							$scope.refreshList();
							$scope.courrierTechnicalError = false;
							$scope.courrierRequiredError = false;
							$scope.courrierSuccess = true;
							$('#courrierModal').modal("hide");
						}
					});
				}).error(function(data, status, headers, config) {
					$scope.courrierTechnicalError = true;
				});
			}
		} else {
			$scope.courrierRequiredError = true;
		}
	};
	
	$scope.saveImportCourriers = function() {
		$scope.buttonDisabled = true;
		$scope.importing = true;
		if(!angular.isUndefined($scope.sheet)) {
	    	for(i = 0; i < $scope.sheet.length; i++) {
	    		$scope.seq = i;
	    		$scope.dto = {};
	    		$scope.dto.codeCourrier = $scope.sheet[i]['Code Courrier'];
	    		$scope.dto.companyName = $scope.sheet[i]['Nom Courrier'];
	    		$scope.dto.commercialName = $scope.sheet[i]['Nom Courrier'];
	    		$scope.dto.address = $scope.sheet[i]['Adresse'];
	    		$scope.dto.cityDesignation = $scope.sheet[i]['Ville'];
	    		$scope.dto.paymentMethodCode = $scope.sheet[i]['Mode Reglement'];
	    		$scope.dto.iceNum = $scope.sheet[i]['ICE'];
	    		$scope.dto.typeName = $scope.sheet[i]['TYP Courrier'];
	    		$scope.dto.currencyId = 1;
	    		$scope.dto.enabled = 1;
	    		$scope.dto.prospect = false;
	    		
	    		$scope.courriersImport.push($scope.dto);
	        }
	    	$http.post(context+$scope.baseUrl+"saveImport", angular.toJson($scope.courriersImport)).success(function(data, status) {
				CRUDService.setEntityLoaded($scope,data);
				$scope.buttonDisabled = false;
				$scope.courrierTechnicalError = false;
				$scope.courrierRequiredError = false;
				$scope.courrierSuccess = true;
				$scope.importing = false;
				$scope.refreshList();
				$('#importCourriersModal').modal("hide");
			}).error(function(data, status, headers, config) {
					$scope.courrierTechnicalError = true;
					$scope.importing = false;
			});
	    } else {
	    	$scope.buttonDisabled = false;
	    	$scope.courrierTechnicalError = true;
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

	


	
	$scope.refreshList = function() {
		$scope.courrierTable.ajax.reload();
		//$scope.courrierUserTable.ajax.reload();
		$scope.dto = {};
	};

	$scope.confirmDeleteCourrier = function() {
		CRUDService.remove($scope.dto.id).success(function(data, status) {
			$('#deleteCourrierModal').modal("hide");
			$scope.refreshList();
			Toastify({
				text: "Le courrier a été supprimé avec succès.",
				gravity: "top", position: "center", duration: 4000, close: true, stopOnFocus: true, style: {background: "linear-gradient(to right, #4fea98, #45cb85)"}
			}).showToast();
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

app.controller('courrierTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'type'},
			{mDataProp: 'sequence'},

			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="contactList()" class="edit-item-btn"><i style="font-size: 17px" class="ri-group-2-fill align-bottom me-2 text-success"></i></a> <a href="#" onclick="editCourrier('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a> <a href="#" data-bs-toggle="modal" data-bs-target="#deleteCourrierModal" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.courrierTable = TableManager.init("courrierTable", $scope.$parent.baseUrl+"list", columns, 0, "DESC");
		
		$scope.$parent.courrierTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.courrierTable.rows(indexes).data().toArray();
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