app.controller('courrierController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.dto.search = {};
	$scope.filtre = {};
	$scope.dto.documents = [];
	$scope.courrierCurrentTable = null;
	$scope.courrierDoneTable = null;
	$scope.courrierCloseTable = null;
	$scope.taskTable = null;
	
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
	$scope.validateProgress = false;
	$scope.removeProgress = false;
	$scope.wSubWorkId = null;
	
	$scope.currentDocument = null;
    $scope.isLoading = false;
    $scope.error = null;
    $scope.documentType = null;
    $scope.fileName = '';
    $scope.zoom = 100;
    $scope.currentPageIndex = 0;
    $scope.totalPages = 1;
    $scope.pdfPages = [];
    $scope.thumbnails = [];
    $scope.rotation = 0;
    $scope.pdfDocument = null;
    
	$scope.baseUrl = "/congeexterne/rest/";
	$scope.profileBaseUrl = "/administration/profile/rest/";
	$scope.performerBaseUrl = "/courrier/performer/rest/";
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addCourrierForm = false;
		$scope.editCourrierForm = false;
		$scope.courrierSuccess = false;
		$scope.courrierTechnicalError = false;
		$scope.courrierRequiredError = false;
		CRUDService.init($scope);
		$scope.initIndicators();
		let elements = document.getElementsByClassName('export-courrier');
		for (let i = 0; i < elements.length; i++) {
		    elements[i].style.display = 'none';
		}
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
	
	$scope.loadDocument = function(documentId) {
		  $('#viewerModal').modal("show");
		  $scope.isLoading = true;
		  $scope.error = null;
		  $scope.currentPageIndex = 0;
		  $scope.rotation = 0;
		  
		  $http({
		    method: 'GET',
		    url: context + $scope.baseUrl + "viewAttachment/" + documentId,
		    responseType: 'arraybuffer',
		    headers: {
		      'Accept': 'application/pdf,image/*,text/*,application/octet-stream'
		    }
		  }).then(function success(response) {
		    if (!response.data) {
		      $scope.error = 'Aucune donnée reçue';
		      $scope.isLoading = false;
		      return;
		    }
		    
		    const data = response.data;
		    const contentType = response.headers('Content-Type') || 'application/octet-stream';
		    
		    const contentDisposition = response.headers('Content-Disposition');
		    if (contentDisposition) {
		      const fileNameMatch = /filename="?([^"]*)"?/.exec(contentDisposition);
		      if (fileNameMatch && fileNameMatch[1]) {
		        $scope.fileName = fileNameMatch[1];
		      }
		    } else {
		      $scope.fileName = 'document-' + documentId;
		    }
		    
		    if (contentType.startsWith('image/')) {
		      $scope.documentType = 'image';
		      
		      const arrayBufferView = new Uint8Array(data);
		      let binaryString = '';
		      for (let i = 0; i < arrayBufferView.length; i++) {
		        binaryString += String.fromCharCode(arrayBufferView[i]);
		      }
		      const base64 = btoa(binaryString);
		      $scope.currentDocument = 'data:' + contentType + ';base64,' + base64;
		      $scope.totalPages = 1;
		    } 
		    else if (contentType.startsWith('text/')) {
		      $scope.documentType = 'text';
		      try {
		        $scope.currentDocument = new TextDecoder().decode(data);
		      } catch (e) {
		        const uint8Array = new Uint8Array(data);
		        let result = '';
		        for (let i = 0; i < uint8Array.length; i++) {
		          result += String.fromCharCode(uint8Array[i]);
		        }
		        $scope.currentDocument = result;
		      }
		      $scope.totalPages = 1;
		    } 
		    else if (contentType.startsWith('application/pdf')) {
		      $scope.documentType = 'pdf';
		      
		      if (typeof pdfjsLib === 'undefined' || pdfjsLib === null) {
		    	    $scope.error = 'La bibliothèque PDF.js n\'est pas correctement chargée';
		    	    $scope.isLoading = false;
		    	    return;
		      }
		      
		      const arrayBufferView = new Uint8Array(data);
		      let binaryString = '';
		      for (let i = 0; i < arrayBufferView.length; i++) {
		        binaryString += String.fromCharCode(arrayBufferView[i]);
		      }
		      const base64 = btoa(binaryString);
		      $scope.pdfData = atob(base64);
		      if (typeof pdfjsLib !== 'undefined') {
		    	  const pdfDataRaw = new Uint8Array(data);
		    	  try {
		    		  var pdfDataUrl = 'data:application/pdf;base64,' + base64;
		    		  const loadingTask = pdfjsLib.getDocument({data: $scope.pdfData});
		    		  loadingTask.promise.then(function(pdf) {
		    			$scope.pdfDocument = pdf;
				        $scope.totalPages = pdf.numPages;
				        $scope.pdfPages = [];
				        $scope.thumbnails = [];
				        
				        // Charger la première page
				        $scope.loadPdfPage(1);
				        
				        // Générer les miniatures pour toutes les pages
				        for (let i = 1; i <= $scope.totalPages; i++) {
				          $scope.generateThumbnail(pdf, i);
				        }
				        
				        $scope.$applyAsync();
		    	    }).catch(function(error) {
		    	      console.error('Erreur PDF.js:', error);
		    	      $scope.error = 'Erreur lors du chargement du PDF: ' + error.message;
		    	      $scope.isLoading = false;
		    	      $scope.$applyAsync();
		    	    });
		    	  } catch (error) {
		    	    console.error('Exception PDF.js:', error);
		    	    $scope.error = 'Exception lors du chargement du PDF: ' + error.message;
		    	    $scope.isLoading = false;
		    	    $scope.$applyAsync();
		    	  }
		      }
		    } 
		    else {
		      // Pour les autres types
		      $scope.documentType = 'unsupported';
		      $scope.error = 'Type de document non pris en charge: ' + contentType;
		    }
		    
		    $scope.$applyAsync(); // Forcer AngularJS à mettre à jour la vue si nécessaire
		    $scope.isLoading = false;
		  }, function error(response) {
		    $scope.error = 'Erreur lors du chargement du document: ' + 
		                (response.statusText || 'Erreur de connexion');
		    $scope.isLoading = false;
		  });
		};

		// Fonction pour charger une page spécifique d'un PDF
		$scope.loadPdfPage = function(pageNumber) {
		  if (!$scope.pdfDocument) return;
		  
		  $scope.isLoading = true;
		  $scope.pdfDocument.getPage(pageNumber).then(function(page) {
		    // Calculer les dimensions en tenant compte de la rotation
		    let viewport = page.getViewport({ scale: 1.0, rotation: $scope.rotation });
		    let canvas = document.getElementById('pdf-canvas');
		    let context = canvas.getContext('2d');
		    
		    // Adapter la taille du canvas
		    canvas.height = viewport.height;
		    canvas.width = viewport.width;
		    
		    // Rendre la page
		    let renderContext = {
		      canvasContext: context,
		      viewport: viewport
		    };
		    
		    page.render(renderContext).promise.then(function() {
		      $scope.currentPageIndex = pageNumber - 1;
		      $scope.isLoading = false;
		      $scope.$applyAsync();
		    });
		  });
		};

		// Fonction pour générer une miniature
		$scope.generateThumbnail = function(pdf, pageNumber) {
		  pdf.getPage(pageNumber).then(function(page) {
		    let viewport = page.getViewport({ scale: 0.2 }); // Échelle réduite pour miniature
		    let canvas = document.createElement('canvas');
		    let context = canvas.getContext('2d');
		    
		    canvas.height = viewport.height;
		    canvas.width = viewport.width;
		    
		    let renderContext = {
		      canvasContext: context,
		      viewport: viewport
		    };
		    
		    page.render(renderContext).promise.then(function() {
		      $scope.thumbnails[pageNumber - 1] = canvas.toDataURL();
		      $scope.$applyAsync();
		    });
		  });
		};

		// Navigation entre les pages
		$scope.previousPage = function() {
		  if ($scope.currentPageIndex > 0) {
		    $scope.loadPdfPage($scope.currentPageIndex);
		  }
		};

		$scope.nextPage = function() {
		  if ($scope.currentPageIndex < $scope.totalPages - 1) {
		    $scope.loadPdfPage($scope.currentPageIndex + 2);
		  }
		};

		$scope.goToPage = function(pageNumber) {
		  $scope.loadPdfPage(pageNumber);
		};

		// Fonctions de rotation
		$scope.rotateLeft = function() {
		  $scope.rotation = ($scope.rotation - 90) % 360;
		  if ($scope.rotation < 0) $scope.rotation += 360;
		  if ($scope.documentType === 'pdf') {
		    $scope.loadPdfPage($scope.currentPageIndex + 1);
		  }
		};

		$scope.rotateRight = function() {
		  $scope.rotation = ($scope.rotation + 90) % 360;
		  if ($scope.documentType === 'pdf') {
		    $scope.loadPdfPage($scope.currentPageIndex + 1);
		  }
		};

		// Fonction de téléchargement
		$scope.downloadDocument = function() {
		  if (!$scope.currentDocument && !$scope.pdfData) return;
		  
		  const docData = $scope.documentType === 'pdf' ? $scope.pdfData : $scope.currentDocument;
		  const link = document.createElement('a');
		  link.href = docData;
		  link.download = $scope.fileName || 'document';
		  link.target = '_blank';
		  document.body.appendChild(link);
		  link.click();
		  document.body.removeChild(link);
		};

		// Fonctions de contrôle du zoom pour les images
		$scope.zoomIn = function() {
		  if ($scope.zoom < 200) {
		    $scope.zoom += 10;
		  }
		};

		$scope.zoomOut = function() {
		  if ($scope.zoom > 50) {
		    $scope.zoom -= 10;
		  }
		};

		$scope.resetZoom = function() {
		  $scope.zoom = 100;
		};

		// Nettoyage URL object lors de la destruction du contrôleur
		$scope.$on('$destroy', function() {
		  if ($scope.currentDocument && $scope.documentType !== 'text') {
		    window.URL.revokeObjectURL($scope.currentDocument);
		  }
		  if ($scope.pdfDocument) {
		    $scope.pdfDocument.destroy();
		  }
		});
    
	$scope.initIndicators = function() {
		$http.get(context+$scope.baseUrl+"getCurrentCountByProfile").success(function(data, status) {   
			$scope.currentCongeExterneCountByProfile = data;
			$scope.taskByProfile = $scope.currentCongeExterneCountByProfile;
		});
	}

	$scope.addAttachment = function() {
		$scope.dto.documents.push({});
	};
	
	$scope.addCourrier = function() {
		let profileName = document.getElementById("profileName").value;
		CRUDService.add($scope);
		$scope.dto.documents = [];
		$scope.dto.dateEnregistrement = getCurrentDate();
		$scope.editCourrierForm = false;
		$scope.addCourrierForm = true;
		$scope.courrierSuccess = false;
		$scope.courrierTechnicalError = false;
		$scope.courrierRequiredError = false;
		$scope.validateProgress = false;
		$('#courrierModal').modal("show");
	};
	
	getCurrentDate = function() {
		const today = new Date();
		const jour = String(today.getDate()).padStart(2, '0');
		const mois = String(today.getMonth() + 1).padStart(2, '0');
		const annee = today.getFullYear();
		const dateFormatee = `${jour}/${mois}/${annee}`;
		
		return dateFormatee;
	}	
	
	$scope.advancedSearchCurrentCongeExterne = function() {
		var searchReferenceCourrier = 'NAN'; var searchReferenceDemande = 'NAN'; var searchEnregistrementDateStart = 'NAN'; var searchEnregistrementDateEnd = 'NAN'; var searchObjet = 'NAN';
		if(!angular.isUndefined($scope.dto.search.referenceCourrierCurrent) && $scope.dto.search.referenceCourrierCurrent != '') searchReferenceCourrier = $scope.dto.search.referenceCourrierCurrent.replaceAll("/", "-");
		if(!angular.isUndefined($scope.dto.search.referenceDemandeCurrent) && $scope.dto.search.referenceDemandeCurrent != '') searchReferenceDemande = $scope.dto.search.referenceDemandeCurrent.replaceAll("/", "-");
		if(!angular.isUndefined($scope.dto.search.enregistrementDateStartCurrent) && $scope.dto.search.enregistrementDateStartCurrent != '') {
			searchEnregistrementDateStart = $scope.dto.search.enregistrementDateStartCurrent.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateStartCurrent.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateStartCurrent.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.enregistrementDateEndCurrent) && $scope.dto.search.enregistrementDateEndCurrent != '') {
			searchEnregistrementDateEnd = $scope.dto.search.enregistrementDateEndCurrent.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateEndCurrent.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateEndCurrent.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.objetCurrent) && $scope.dto.search.objetCurrent != '') searchObjet = $scope.dto.search.objetCurrent.replaceAll("/", "@");
		
		$scope.courrierCurrentTable.ajax.url($scope.baseUrl+'search/'+searchReferenceCourrier+'/'+searchReferenceDemande+'/'+searchEnregistrementDateStart+'/'+searchEnregistrementDateEnd+'/'+searchObjet+'/current').load();
	};
	
	$scope.advancedSearchDoneCongeExterne = function() {
		var searchReferenceCourrier = 'NAN'; var searchReferenceDemande = 'NAN'; var searchEnregistrementDateStart = 'NAN'; var searchEnregistrementDateEnd = 'NAN'; var searchObjet = 'NAN';
		if(!angular.isUndefined($scope.dto.search.referenceCourrierDone) && $scope.dto.search.referenceCourrierDone != '') searchReferenceCourrier = $scope.dto.search.referenceCourrierDone.replaceAll("/", "-");
		if(!angular.isUndefined($scope.dto.search.referenceDemandeDone) && $scope.dto.search.referenceDemandeDone != '') searchReferenceDemande = $scope.dto.search.referenceDemandeDone.replaceAll("/", "-");
		if(!angular.isUndefined($scope.dto.search.enregistrementDateStartDone) && $scope.dto.search.enregistrementDateStartDone != '') {
			searchEnregistrementDateStart = $scope.dto.search.enregistrementDateStartDone.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateStartDone.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateStartDone.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.enregistrementDateEndDone) && $scope.dto.search.enregistrementDateEndDone != '') {
			searchEnregistrementDateEnd = $scope.dto.search.enregistrementDateEndDone.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateEndDone.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateEndDone.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.objetDone) && $scope.dto.search.objetDone != '') searchObjet = $scope.dto.search.objetDone.replaceAll("/", "@");
		
		$scope.courrierDoneTable.ajax.url($scope.baseUrl+'search/'+searchReferenceCourrier+'/'+searchReferenceDemande+'/'+searchEnregistrementDateStart+'/'+searchEnregistrementDateEnd+'/'+searchObjet+'/done').load();
	};
	
	$scope.advancedSearchCompletedCongeExterne = function() {
		var searchReferenceCourrier = 'NAN'; var searchReferenceDemande = 'NAN'; var searchEnregistrementDateStart = 'NAN'; var searchEnregistrementDateEnd = 'NAN'; var searchObjet = 'NAN';
		if(!angular.isUndefined($scope.dto.search.referenceCourrierCompleted) && $scope.dto.search.referenceCourrierCompleted != '') searchReferenceCourrier = $scope.dto.search.referenceCourrierCompleted.replaceAll("/", "-");
		if(!angular.isUndefined($scope.dto.search.referenceDemandeCompleted) && $scope.dto.search.referenceDemandeCompleted != '') searchReferenceDemande = $scope.dto.search.referenceDemandeCompleted.replaceAll("/", "-");
		if(!angular.isUndefined($scope.dto.search.enregistrementDateStartCompleted) && $scope.dto.search.enregistrementDateStartCompleted != '') {
			searchEnregistrementDateStart = $scope.dto.search.enregistrementDateStartCompleted.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateStartCompleted.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateStartCompleted.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.enregistrementDateEndCompleted) && $scope.dto.search.enregistrementDateEndCompleted != '') {
			searchEnregistrementDateEnd = $scope.dto.search.enregistrementDateEndCompleted.toLocaleString("default", { day: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateEndCompleted.toLocaleString("default", { month: "2-digit" }) + "-" + $scope.dto.search.enregistrementDateEndCompleted.toLocaleString("default", { year: "numeric" });
		}
		if(!angular.isUndefined($scope.dto.search.objetCompleted) && $scope.dto.search.objetCompleted != '') searchObjet = $scope.dto.search.objetCompleted.replaceAll("/", "@");
		
		$scope.courrierCloseTable.ajax.url($scope.baseUrl+'search/'+searchReferenceCourrier+'/'+searchReferenceDemande+'/'+searchEnregistrementDateStart+'/'+searchEnregistrementDateEnd+'/'+searchObjet+'/completed').load();
	};
	
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
	
	$scope.displayNotifications = function() {
		$('#notificationModal').modal("show");
	}
	
	$scope.getPerformerName = function() {
		$http.get(context+$scope.performerBaseUrl+"load/"+$scope.dto.conseillerTechnique).success(function(data, status) { 
			if(data != null)
				$scope.performerName = data.name;
		});
	}
	
	loadByReference = function(reference) {
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
	
	loadByReferenceAction = function(reference) {
		$http.get(context+$scope.baseUrl+"loadByReference/"+reference.replaceAll("/", "-")).success(function(data, status) { 
			$scope.dto = data;
			$scope.getPerformerName();
			$scope.dto.documents = [];
			$('#courrierActionModal').modal("show");
			$http.get(context+$scope.baseUrl+"loadDocumentsByReference/"+reference.replaceAll("/", "-")).success(function(documentData, status) { 
				$scope.documents = documentData;
			})
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveCourrier = function() {
		const saveCourrierId = document.getElementById("saveCourrierId");
		if($scope.courrierForm.$valid) {
			$('#confirmationModal').modal("show");
		} else {
			$('#confirmationModal').modal("hide");
			saveCourrierId.removeAttribute("style");
			$scope.courrierRequiredError = true;
		}
	}
	
	$scope.saveConfirmCourrier = function() {
		$scope.validateProgress = true;
		const saveCourrierId = document.getElementById("saveCourrierId");
		saveCourrierId.style.pointerEvents = "none";
		saveCourrierId.style.backgroundColor = "gray";
		saveCourrierId.style.borderColor = "#AAAAAA";
		const saveConfirmCourrierId = document.getElementById("saveConfirmCourrierId");
		saveConfirmCourrierId.style.pointerEvents = "none";
		saveConfirmCourrierId.style.backgroundColor = "gray";
		saveConfirmCourrierId.style.borderColor = "#AAAAAA";
		
		let profileName = document.getElementById("profileName").value;
		var formData = new FormData();
		formData.append("referenceDemande", $scope.dto.referenceDemande);
		formData.append("dateEnregistrement", new Date());
		formData.append("dateDebutConge", $scope.dto.dateDebutConge);
		formData.append("dateFinConge", $scope.dto.dateFinConge);
		formData.append("objet", $scope.dto.objet.replace(/\n/g, "<"+"br/>"));
		var index = 0;
		for(var doc of $scope.dto.documents) {
			formData.append("documents", $('.attachment-save')[index].files[0]);
			index++;
		}
		$http({
			url: context+"/congeexterne/rest/save",
			method: 'POST',
			data: formData,
			headers: {'Content-Type': undefined},
			transformRequest: angular.identity
		}).success(function(data, status) {
			$scope.validateProgress = false;
			saveCourrierId.removeAttribute("style");
			saveConfirmCourrierId.removeAttribute("style");
			$('#confirmationModal').modal("hide");
			$('#courrierModal').modal("hide");
			if(data != "FAILED") {
				$scope.refreshList();
				Toastify({
					text: "La décision a été bien enregistrée sous la référence Nº "+data,
					gravity: "top", position: "right", duration: 4000, close: true, stopOnFocus: true, style: {fontWeight: "bold", background: "linear-gradient(to right, #4fea98, #38a56b)"}
				}).showToast();
			} else {
				Toastify({
					text: "Impossible d'enregistrer la décision. Veuillez contacter l'administrateur du système.",
					gravity: "top", position: "right", duration: 4000, close: true, stopOnFocus: true, style: {fontWeight: "bold", background: "linear-gradient(to right, #e84e4e, #a33737)"}
				}).showToast();
			}
		}).error(function(data, status, headers, config) {
			$('#confirmationModal').modal("hide");
			$scope.validateProgress = false;
			saveCourrierId.removeAttribute("style");
			saveConfirmCourrierId.removeAttribute("style");
			$scope.invoiceTechnicalError = true;
		});
	};
	
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
		$scope.courrierCurrentTable.ajax.reload();
		$scope.courrierDoneTable.ajax.reload();
		$scope.dto = {};
	};
	
	$scope.displayTasks = function() {
		$('#taskModal').modal("show");
	}
	
	removeCourrier = function(id) {
		$scope.wSubWorkId = id;
		$scope.removeProgress = false;
		$('#removeCourrierModal').modal("show");
	}
	
	$scope.confirmRemoveCourrier = function() {
		$scope.removeProgress = true;
		$http.post(context+$scope.baseUrl+"delete", angular.toJson($scope.wSubWorkId)).success(function(data, status) {
			$scope.removeProgress = false;
			$('#removeCourrierModal').modal("hide");
			$scope.refreshList();
			Toastify({
				text: "La décision a été supprimée avec succès.",
				gravity: "top", position: "right", duration: 4000, close: true, stopOnFocus: true, style: {fontWeight: "bold", background: "linear-gradient(to right, #4fea98, #38a56b)"}
			}).showToast();
		}).error(function(data, status, headers, config) {
			$scope.removeProgress = false;
			$('#removeCourrierModal').modal("hide");
			Toastify({
				text: "Impossible de supprimer la décision. Veuillez contacter l'administrateur du système.",
				gravity: "top", position: "right", duration: 4000, close: true, stopOnFocus: true, style: {fontWeight: "bold", background: "linear-gradient(to right, #4fea98, #38a56b)"}
			}).showToast();
	});
	};
	
	sendCourrier = function(id) {
		$scope.wSubWorkId = id;
		$scope.validateProgress = false;
		$('#sendCourrierModal').modal("show");
	}
	
	$scope.saveCourrier = function() {
		const saveCourrierId = document.getElementById("saveCourrierId");
		if($scope.courrierForm.$valid) {
			$('#confirmationModal').modal("show");
		} else {
			$('#confirmationModal').modal("hide");
			saveCourrierId.removeAttribute("style");
			$scope.courrierRequiredError = true;
		}
	}
	
	$scope.sendCourrier = function(id) {
		$scope.wSubWorkId = id;
		$scope.validateProgress = false;
		if($scope.courrierForm.$valid) {
			$('#sendCourrierModal').modal("show");
		} else {
			$('#sendCourrierModal').modal("hide");
			$scope.courrierRequiredError = true;
		}
	}
	
	$scope.confirmSendCourrier = function() {
		const sendCourrierId = document.getElementById("sendCourrierId");
		sendCourrierId.style.pointerEvents = "none";
		sendCourrierId.style.backgroundColor = "gray";
		sendCourrierId.style.borderColor = "#AAAAAA";
		const confirmSendCourrierId = document.getElementById("confirmSendCourrierId");
		confirmSendCourrierId.style.pointerEvents = "none";
		confirmSendCourrierId.style.backgroundColor = "gray";
		confirmSendCourrierId.style.borderColor = "#AAAAAA";
		$scope.validateProgress = true;
		
		var formData = new FormData();
		formData.append("wSubWorkId", $scope.wSubWorkId);
		var index = 0;
		for(var doc of $scope.dto.documents) {
			formData.append("documents", $('.attachment-send')[index].files[0]);
			index++;
		}
		$http({
			url: context+"/congeexterne/rest/send",
			method: 'POST',
			data: formData,
			headers: {'Content-Type': undefined},
			transformRequest: angular.identity
		}).success(function(data, status) {
			$scope.validateProgress = false;
			sendCourrierId.removeAttribute("style");
			$('#sendCourrierModal').modal("hide");
			$('#courrierActionModal').modal("hide");
			if(data == "SUCCESS") {
				$scope.refreshList();
				Toastify({
					text: "La décision a été transférée avec succès.",
					gravity: "top", position: "right", duration: 4000, close: true, stopOnFocus: true, style: {fontWeight: "bold", background: "linear-gradient(to right, #4fea98, #38a56b)"}
				}).showToast();
			} else {
				Toastify({
					text: "Impossible de transférer la décision. Veuillez contacter l'administrateur du système.",
					gravity: "top", position: "right", duration: 4000, close: true, stopOnFocus: true, style: {fontWeight: "bold", background: "linear-gradient(to right, #e84e4e, #a33737)"}
				}).showToast();
			}
		}).error(function(data, status, headers, config) {
			$scope.validateProgress = false;
			sendCourrierId.removeAttribute("style");
			$('#sendCourrierModal').modal("hide");
			$('#courrierDetailsModal').modal("hide");
			Toastify({
				text: "Impossible de transférer la décision. Veuillez contacter l'administrateur du système.",
				gravity: "top", position: "right", duration: 4000, close: true, stopOnFocus: true, style: {fontWeight: "bold", background: "linear-gradient(to right, #e84e4e, #a33737)"}
			}).showToast();
		});
	}
	
	$scope.cancelCourrier = function(id) {
		$scope.wSubWorkId = id;
		$scope.validateProgress = false;
		$('#cancelCourrierModal').modal("show");
	}
	
	$scope.confirmCancelCourrier = function() {
		if($scope.cancelCourrierForm.$valid) {
			$scope.courrierRequiredError = false;
			const cancelCourrierId = document.getElementById("cancelCourrierId");
			cancelCourrierId.style.pointerEvents = "none";
			cancelCourrierId.style.backgroundColor = "gray";
			cancelCourrierId.style.borderColor = "#AAAAAA";
			const confirmCancelCourrierId = document.getElementById("confirmCancelCourrierId");
			confirmCancelCourrierId.style.pointerEvents = "none";
			confirmCancelCourrierId.style.backgroundColor = "gray";
			confirmCancelCourrierId.style.borderColor = "#AAAAAA";
			$scope.validateProgress = true;
			
			var formData = new FormData();
			formData.append("wSubWorkId", $scope.wSubWorkId);
			formData.append("motif", $scope.dto.motif);
			$http({
				url: context+"/congeexterne/rest/send",
				method: 'POST',
				data: formData,
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity
			}).success(function(data, status) {
				$scope.validateProgress = false;
				cancelCourrierId.removeAttribute("style");
				$('#cancelCourrierModal').modal("hide");
				$('#courrierActionModal').modal("hide");
				if(data == "SUCCESS") {
					$scope.refreshList();
					Toastify({
						text: "La décision a été rejetée avec succès.",
						gravity: "top", position: "right", duration: 4000, close: true, stopOnFocus: true, style: {fontWeight: "bold", background: "linear-gradient(to right, #4fea98, #38a56b)"}
					}).showToast();
				} else {
					Toastify({
						text: "Impossible de rejeter la décision. Veuillez contacter l'administrateur du système.",
						gravity: "top", position: "right", duration: 4000, close: true, stopOnFocus: true, style: {fontWeight: "bold", background: "linear-gradient(to right, #e84e4e, #a33737)"}
					}).showToast();
				}
			}).error(function(data, status, headers, config) {
				$scope.validateProgress = false;
				cancelCourrierId.removeAttribute("style");
				$('#cancelCourrierModal').modal("hide");
				$('#courrierDetailsModal').modal("hide");
				Toastify({
					text: "Impossible de rejeter la décision. Veuillez contacter l'administrateur du système.",
					gravity: "top", position: "right", duration: 4000, close: true, stopOnFocus: true, style: {fontWeight: "bold", background: "linear-gradient(to right, #e84e4e, #a33737)"}
				}).showToast();
			});
		} else {
			$scope.courrierRequiredError = true;
		}
	}
	
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
	
	$scope.exportCourriers = function(name) {
		let elements = document.getElementsByClassName('export-courrier');
		for (let i = 0; i < elements.length; i++) {
		    elements[i].style.display = 'inline';
		}
		$scope.courrierTab = [];
		var title = ["REFERENCE COURRIER", "DATE ENREGISTREMENT", "REFERENCE DEMANDE", "OBJET", "TRANSFERE A", "STATUT"];
		$scope.courrierTab.push(title);
		var inputs = document.getElementsByClassName(name);
		for(var i = 0, l = inputs.length; i < l; ++i) {
			if(inputs[i].checked) {
				$http.get(context+$scope.baseUrl+"loadByReference/"+inputs[i].value.replaceAll("/", "-")).success(function(data, status) {
					var courrier = [];
					courrier[0] = data.referenceCourrier;
					courrier[1] = data.dateEnregistrement;
					courrier[2] = data.referenceDemande;
					courrier[3] = data.objet;
					courrier[4] = data.taskTitle;
					var status = "";
					if(data.wSubWorkDateCompleted != null)
						status = 'CLOTURE';
					else
						status = 'EN COURS';
					courrier[5] = status;
					
					$scope.courrierTab.push(courrier);
	    		});
	    	}
	    }
		setTimeout($scope.downloadFile, 5000);
	}
	
	$scope.downloadFile = function() {
		exportExcelFile($scope.courrierTab, 'Demandes de congés.xlsx', 'Demandes de congés');
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
        
        let elements = document.getElementsByClassName('export-courrier');
		for (let i = 0; i < elements.length; i++) {
		    elements[i].style.display = 'none';
		}
	}
	
});

app.controller('courrierCurrentTableController', function($scope,$http) {
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
				return '<div class="form-check"><input class="form-check-input courrierCurrentId" type="checkbox" value="'+full.referenceCourrier+'" onclick="check(\'courrierCurrentId\')" /></div>';
			}},
			{mDataProp: 'referenceCourrier', "mRender": function(data, type, full) {
				return '<a href="#" onclick="loadByReference(\''+full.referenceCourrier+'\')" style="text-decoration: underline !important; font-weight: bold">'+full.referenceCourrier+'</a>';
			}},
			{mDataProp: 'dateEnregistrement'},
			{mDataProp: 'referenceDemande'},
			{mDataProp: 'objet'},
			{mDataProp: 'performerName'},
			{mDataProp: 'wSubWorkDateCompleted', "mRender": function(data, type, full) {
				if(full.wSubWorkDateCompleted != null) {
					result = '<span class="badge text-bg-success">CLOTURE</span>';
				} else {
					if(full.taskTitle.includes("[Rejet]"))
						result = '<span class="badge text-bg-danger">REJETE</span>';
					else	
						result = '<span class="badge text-bg-info">EN COURS</span>';
				}
				return result;
			}},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" class="badge text-bg-success" style="background-color: #00BA59 !important" title="Plus d\'informations" onclick="loadByReferenceAction(\''+full.referenceCourrier+'\')">ACCEDER</a>';
				return result;
			}}
		];
		$scope.$parent.courrierCurrentTable = TableManager.init("courrierCurrentTable", $scope.$parent.baseUrl+"currentList", columns, 1, "DESC");
		
		$scope.$parent.courrierCurrentTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.courrierCurrentTable.rows(indexes).data().toArray();
			var reference = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				reference = rowData[0].referenceCourrier;
			}
		});
	};
});

app.controller('courrierDoneTableController', function($scope,$http) {
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
				return '<div class="form-check"><input class="form-check-input courrierDoneId" type="checkbox" value="'+full.referenceCourrier+'" onclick="check(\'courrierDoneId\')" /></div>';
			}},
			{mDataProp: 'referenceCourrier', "mRender": function(data, type, full) {
				return '<a href="#" onclick="loadByReference(\''+full.referenceCourrier+'\')" style="text-decoration: underline !important; font-weight: bold">'+full.referenceCourrier+'</a>';
			}},
			{mDataProp: 'dateEnregistrement'},
			{mDataProp: 'referenceDemande'},
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
		$scope.$parent.courrierDoneTable = TableManager.init("courrierDoneTable", $scope.$parent.baseUrl+"doneList", columns, 1, "DESC");
		
		$scope.$parent.courrierDoneTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.courrierDoneTable.rows(indexes).data().toArray();
			var reference = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				reference = rowData[0].referenceCourrier;
				$scope.$parent.loadByReference(reference);
			}
		});
	};
});

app.controller('courrierCloseTableController', function($scope,$http) {
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
				return '<div class="form-check"><input class="form-check-input courrierCompletedId" type="checkbox" value="'+full.referenceCourrier+'" onclick="check(\'courrierCompletedId\')" /></div>';
			}},
			{mDataProp: 'referenceCourrier', "mRender": function(data, type, full) {
				return '<a href="#" onclick="loadByReference(\''+full.referenceCourrier+'\')" style="text-decoration: underline !important; font-weight: bold">'+full.referenceCourrier+'</a>';
			}},
			{mDataProp: 'dateEnregistrement'},
			{mDataProp: 'referenceDemande'},
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
		$scope.$parent.courrierCloseTable = TableManager.init("courrierCloseTable", $scope.$parent.baseUrl+"closeList", columns, 1, "DESC");
		
		$scope.$parent.courrierCloseTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.courrierCloseTable.rows(indexes).data().toArray();
			var reference = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				reference = rowData[0].referenceCourrier;
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
		  return dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
	}
	
	$scope.init = function() {
		var columns = [
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'subWorkTaskTitle'},
			{mDataProp: 'subWorkTaskDateReady'},
			{mDataProp: 'subWorkTaskDateDone', "mRender": function(data, type, full) {
				var result = 'N/A';
				if(full.subWorkTaskDateDone != null) {
					result = full.subWorkTaskDateDone;
				}
				return result;
			}},
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
