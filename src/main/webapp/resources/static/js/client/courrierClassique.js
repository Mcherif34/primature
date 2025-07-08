app.controller('courrierController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.dto.search = {};
	$scope.filtre = {};
	$scope.courrierTable = null;
	$scope.taskTable = null;
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
	
	$scope.baseUrl = "/courrier/regular/rest/";
	$scope.senderBaseUrl = "/courrier/sender/rest/";
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addCourrierForm = false;
		$scope.editCourrierForm = false;
		CRUDService.init($scope);
		$scope.initListSenders();
		document.getElementById("export-sheet").style.display = "none";
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
	
	$scope.initListSenders = function() {
		$http.get(context+$scope.senderBaseUrl+"getAll").success(function(data, status) {
			$scope.senders = data;
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
	
	$scope.advancedSearchRegular = function() {
		var searchRefArriveeBoc = 'NAN'; var searchReceptionDateStart = 'NAN'; var searchReceptionDateEnd = 'NAN'; var searchRefExpediteur = 'NAN'; var searchEnregistrementDateStart = 'NAN'; var searchEnregistrementDateEnd = 'NAN'; var searchEcheanceDateStart = 'NAN'; var searchEcheanceDateEnd = 'NAN'; var searchExpediteur = 'NAN'; var searchStatus = 'NAN'; var searchTypeCourrier = 'NAN'; var searchTypeInstructionDg = 'NAN'; var searchObjet = 'NAN'; var searchUrgence = 'NAN';
		if(!angular.isUndefined($scope.dto.search.refArriveeBoc) && $scope.dto.search.refArriveeBoc != '') searchRefArriveeBoc = $scope.dto.search.refArriveeBoc.replaceAll("/", "-");
		if(!angular.isUndefined($scope.dto.search.receptionDateStart) && $scope.dto.search.receptionDateStart != '') {
			searchReceptionDateStart = $scope.dto.search.receptionDateStart.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.receptionDateStart.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.receptionDateStart.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.receptionDateEnd) && $scope.dto.search.receptionDateEnd != '') {
			searchReceptionDateEnd = $scope.dto.search.receptionDateEnd.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.receptionDateEnd.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.receptionDateEnd.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.refExpediteur) && $scope.dto.search.refExpediteur != '') searchRefExpediteur = $scope.dto.search.refExpediteur.replaceAll("/", "-");
		if(!angular.isUndefined($scope.dto.search.enregistrementDateStart) && $scope.dto.search.enregistrementDateStart != '') {
			searchEnregistrementDateStart = $scope.dto.search.enregistrementDateStart.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateStart.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateStart.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.enregistrementDateEnd) && $scope.dto.search.enregistrementDateEnd != '') {
			searchEnregistrementDateEnd = $scope.dto.search.enregistrementDateEnd.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateEnd.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateEnd.toLocaleString("default", { year: "numeric" });
		}
		if($(".select2 option:selected").text() != null && $(".select2 option:selected").text() != '') searchExpediteur = $(".select2 option:selected").text();
		if(!angular.isUndefined($scope.dto.search.status) && $scope.dto.search.status != '') searchStatus = $scope.dto.search.status;
		if(!angular.isUndefined($scope.dto.search.typeCourrier) && $scope.dto.search.typeCourrier != '') searchTypeCourrier = $scope.dto.search.typeCourrier;
		if(!angular.isUndefined($scope.dto.search.echeanceDateStart) && $scope.dto.search.echeanceDateStart != '') {
			searchEcheanceDateStart = $scope.dto.search.echeanceDateStart.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.echeanceDateStart.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.echeanceDateStart.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.echeanceDateEnd) && $scope.dto.search.echeanceDateEnd != '') {
			searchEcheanceDateEnd = $scope.dto.search.echeanceDateEnd.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.echeanceDateEnd.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.echeanceDateEnd.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.typeInstructionDg) && $scope.dto.search.typeInstructionDg != '') searchTypeInstructionDg = $scope.dto.search.typeInstructionDg.replaceAll("/", "@");
		if(!angular.isUndefined($scope.dto.search.objet) && $scope.dto.search.objet != '') searchObjet = $scope.dto.search.objet.replaceAll("/", "@");
		if(!angular.isUndefined($scope.dto.search.urgence) && $scope.dto.search.urgence != '') searchUrgence = $scope.dto.search.urgence;
		
		$scope.courrierTable.ajax.url($scope.baseUrl+'search/'+searchRefArriveeBoc+'/'+searchReceptionDateStart+'/'+searchReceptionDateEnd+'/'+searchRefExpediteur+'/'+searchEnregistrementDateStart+'/'+searchEnregistrementDateEnd+'/'+searchExpediteur+'/'+searchStatus+'/'+searchEcheanceDateStart+'/'+searchEcheanceDateEnd+'/'+searchTypeCourrier+'/'+searchTypeInstructionDg+'/'+searchObjet+'/'+searchUrgence).load();
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
	
	$scope.loadByReference = function(reference) {
		$http.get(context+$scope.baseUrl+"loadByReference/"+reference.replaceAll("/", "-")).success(function(data, status) { 
			$scope.dto = data;
			$('#courrierDetailsModal').modal("show");
			$http.get(context+$scope.baseUrl+"loadDocumentsByReference/"+reference.replaceAll("/", "-")).success(function(documentData, status) { 
				$scope.dto.documents = documentData;
			})
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
	
	$scope.downloadAttachment = function(id) {
		window.location.href = context+$scope.baseUrl+"downloadAttachment/"+id;
	}
	
	$scope.refreshList = function() {
		$scope.courrierTable.ajax.reload();
		//$scope.courrierUserTable.ajax.reload();
		$scope.dto = {};
	};
	
	$scope.displayTasks = function() {
		$('#taskModal').modal("show");
	}
	
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
	
	$scope.exportSheets = function(name) {
		document.getElementById("export-sheet").style.display = "inline";
		$scope.sheetTab = [];
		var title = ["REFERENCE COURRIER", "DATE ENREGISTREMENT", "DATE RECEPTION", "EXPEDITEUR", "OBJET", "INSTRUCTIONS DG", "ETAPE EN COURS", "STATUT"];
		$scope.sheetTab.push(title);
		var inputs = document.getElementsByClassName(name);
		for(var i = 0, l = inputs.length; i < l; ++i) {
			if(inputs[i].checked) {
				$http.get(context+$scope.baseUrl+"loadByReference/"+inputs[i].value.replaceAll("/", "-")).success(function(data, status) {
					var sheet = [];
					sheet[0] = data.refArriveeBoc;
					sheet[1] = data.dateEnregistrement;
					sheet[2] = data.dateReception;
					sheet[3] = data.expediteur;
					sheet[4] = data.objet;
					sheet[5] = data.typeInstructionDg;
					sheet[6] = data.taskTitle;
					var status = "";
					if(data.wSubWorkDateCompleted != null)
						status = 'CLOTURE';
					else
						status = 'EN COURS';
					sheet[7] = status;
					
					$scope.sheetTab.push(sheet);
	    		});
	    	}
	    }
		setTimeout($scope.downloadFile, 5000);
	}
	
	$scope.downloadFile = function() {
		exportExcelFile($scope.sheetTab, 'CourrierClassiques.xlsx', 'CourrierClassiques');
	}
	
	exportExcelFile = function(ws_data, filename, type) {
		var wb = XLSX.utils.book_new();
        wb.Props = {};
        
        wb.SheetNames.push(type);
        var ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets[type] = ws;
        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

        var buf = new ArrayBuffer(wbout.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;

        saveAs(new Blob([buf],{type:"application/octet-stream"}), filename);
        
        document.getElementById("export-sheet").style.display = "none";
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
	$scope.$watch('$parent.dto.wSubWorkId', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.taskTable.ajax.url($scope.$parent.baseUrl+"taskList/"+newValue).load();
		}
		else {
			$scope.$parent.taskTable.ajax.url($scope.$parent.baseUrl+"taskList/-1").load();
		}
	});
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="form-check"><input class="form-check-input sheetId" type="checkbox" value="'+full.refArriveeBoc+'" onclick="check(\'sheetId\')" /></div>';
			}},
			{mDataProp: 'refArriveeBoc'},
			{mDataProp: 'dateEnregistrement'},
			{mDataProp: 'dateReception'},
			{mDataProp: 'expediteur'},
			{mDataProp: 'objet'},
			{mDataProp: 'typeInstructionDg'},
			{mDataProp: 'taskTitle'},
			{mDataProp: 'wSubWorkDateCompleted', "mRender": function(data, type, full) {
				if(full.wSubWorkDateCompleted != null) {
					result = '<span class="badge text-bg-success">CLOTURE</span>';
				} else {
					result = '<span class="badge text-bg-info">EN COURS</span>';
				}
				return result;
			}}
		];
		$scope.$parent.courrierTable = TableManager.init("courrierTable", $scope.$parent.baseUrl+"list", columns, 1, "DESC");
		
		$scope.$parent.courrierTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.courrierTable.rows(indexes).data().toArray();
			var reference = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				reference = rowData[0].refArriveeBoc;
				$scope.$parent.loadByReference(reference);
			}
		});
	};
});

app.controller('taskTableController', function($scope,$http) {
	function strToDate(dtStr) {
		  if (!dtStr) return null
		  let dateParts = dtStr.split("/");
		  let timeParts = dateParts[2].split(" ")[1].split(":");
		  dateParts[2] = dateParts[2].split(" ")[0];
		  // month is 0-based, that's why we need dataParts[1] - 1
		  return dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
	}
	
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'subWorkTaskTitle', "mRender": function(data, type, full) {
				if(full.subWorkTaskTitle == "GESTIONNAIRE D'ELEMENT")
					return "CLOTURE";
				else
					return full.subWorkTaskTitle;
			}},
			{mDataProp: 'subWorkTaskDateDone'},
			{mDataProp: 'subWorkTaskDateDone', "mRender": function(data, type, full) {
				var result = '';
				if(full.subWorkTaskDateDone != null) {
					if(Math.round((strToDate(full.subWorkTaskDateDone)-strToDate(full.subWorkTaskDateReady))/(1000*60*60*24)) > 4) {
						result = '<span class="badge text-bg-danger">'+Math.round((strToDate(full.subWorkTaskDateDone)-strToDate(full.subWorkTaskDateReady))/(1000*60*60*24))+' JOUR(S)</span>';
					}
					else {
						result = '<span class="badge text-bg-info">'+Math.round((strToDate(full.subWorkTaskDateDone)-strToDate(full.subWorkTaskDateReady))/(1000*60*60*24))+' JOUR(S)</span>';
					}
				} else {
					if(Math.round((new Date()-strToDate(full.subWorkTaskDateReady))/(1000*60*60*24)) > 4) {
						result = '<span class="badge text-bg-danger">'+Math.round((new Date()-strToDate(full.subWorkTaskDateReady))/(1000*60*60*24))+' JOUR(S)</span>';
					}
					else {
						result = '<span class="badge text-bg-info">'+Math.round((new Date()-strToDate(full.subWorkTaskDateReady))/(1000*60*60*24))+' JOUR(S)</span>';
					}
				}
				
				return result;
			}},
			{mDataProp: 'performerName', "mRender": function(data, type, full) {
				return full.performerName;
			}},
			{mDataProp: 'subWorkTaskDateDone', "mRender": function(data, type, full) {
				var result = '<span class="badge text-bg-info">EN COURS</span>';
				if(full.subWorkTaskDateDone != null)
					result = '<span class="badge text-bg-success">TERMINE</span>';
				return result;
			}}
		];
		$scope.$parent.taskTable = TableManager.init("taskTable", $scope.$parent.baseUrl+"taskList/-1", columns, 2, "DESC");
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
