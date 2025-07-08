app.controller('helpController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.dto.search = {};
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
	
	$scope.notQualified = 0;
	
	$scope.clientBaseUrl = "/client/client/rest/";
	$scope.contactBaseUrl = "/client/contact/rest/";
	$scope.sheetBaseUrl = "/client/sheet/rest/";
	$scope.commentBaseUrl = "/client/comment/rest/";
	$scope.traceBaseUrl = "/client/trace/rest/";
	$scope.categoryBaseUrl = "/client/category/rest/";
	$scope.materialBaseUrl = "/client/material/rest/";
	$scope.cityBaseUrl = "/client/city/rest/";
	$scope.attachmentBaseUrl = "/client/attachment/rest/";
	$scope.userBaseUrl = "/administration/user/rest/";
	
	$scope.baseUrl = "/help/rest/";
	$scope.attachmentQuestionBaseUrl = "/client/attachmentQuestion/rest/";
	$scope.dtoq = {};
	$scope.dtoq.attachmentsDTO = [{}];
	
	$scope.init = function() {
		$scope.getQuestions();
		
		$scope.mode="read";
		$scope.addSheetForm = false;
		$scope.editSheetForm = false;
		CRUDService.init($scope);
		$scope.initListCategories();
		$scope.initListCities();
	};

	$scope.getQuestions = function() {
		$http.get(context+$scope.baseUrl+"getAll").success(function(data, status) {   
			$scope.questions = data;
		});
	};
	
	$scope.addAttachment = function() {
		$scope.dto.attachmentsDTO.push({});
	};
	
	$scope.addSheet = function(id) {
		CRUDService.add($scope);
		$scope.dto.attachmentsDTO = [{}];
		$http.get(context+$scope.cityBaseUrl+"getAll").success(function(data, status) {   
			if(data.length == 1) {
				$scope.dto.cityId = data[0].id;
				$scope.disabled = true;
			}
		});
		$http.get(context+$scope.userBaseUrl+"getCurrentUser").success(function(data, status) {
			$http.get(context+$scope.contactBaseUrl+"getByUser/"+data.id).success(function(data, status) {
				if(data != null) {
					$scope.dto.contact = data;
					$scope.dto.ctName = data.name;
					$scope.dto.ctGsm = data.phone;
					$scope.dto.ctEmail = data.mail;
				}
			});
		});
		$scope.editSheetForm = false;
		$scope.addSheetForm = true;
		$scope.sheetSuccess = false;
		$scope.sheetTechnicalError = false;
		$scope.sheetRequiredError = false;
		$('#sheetModal').modal("show");
	};
	
	addHours = function(date, hours) {
		date.setHours(date.getHours() + hours);
		return date;
	}
	
	$scope.saveSheet = function() {
		if($scope.sheetForm.$valid) {
			var currentDate = addHours(new Date(), 1);
			if($scope.dto.code == null || $scope.dto.code == '') {
				$http.get(context+$scope.sheetBaseUrl+"getCountByYear/"+currentDate.getFullYear()).success(function(data, status) {   
					var seqNum = data + 1;
					$scope.dto.code = "MEDA-" + currentDate.getFullYear() + '-' + (currentDate.getMonth()+1).toString().padStart(2, '0') + '-' + seqNum.toString().padStart(3, '0');
					$scope.dto.receptionDate = currentDate;
					$scope.dto.materialPlace = "workPlace";
					$scope.dto.status = "not qualified";
					$scope.dto.centerId = 9;
					$scope.dto.maintenance = "Non";
					$scope.dto.warranty = "Oui";
					$scope.dto.packing = "Non";
					$scope.dto.battery = "Non";
					$scope.dto.charger = "Non";
					$scope.dto.consumables = "Non";
					$scope.dto.cables = "Non";
					$scope.dto.contactId = $scope.dto.contact.id;
					$scope.dto.clientId = $scope.dto.contact.clientId;
					
					$http.post(context+$scope.sheetBaseUrl+"save", angular.toJson($scope.dto)).success(function(data, status) {
						$scope.dto.trace = {};
						$scope.dto.trace.affectDate = currentDate;
						$scope.dto.trace.reception = true;
						$scope.dto.trace.status = "not qualified";
						$scope.dto.trace.sheetId = data.id;
						$scope.dto.trace.employeeId = 36;
						$scope.sheetId = data.id;
						$http.post(context+$scope.traceBaseUrl+"save", angular.toJson($scope.dto.trace)).success(function(data, status) {
							const url = "https://api.cloudinary.com/v1_1/dhsbffdjn/upload";
							const attachments = document.getElementsByClassName("attachment");
							for (var i = 0; i < attachments.length; i++) {
								let files = attachments[i].files;
								const formData = new FormData();
								console.log(files.length);
								for (let j = 0; j < files.length; j++) {
									console.log(files[j]);
									let file = files[j];
									formData.append("file", file);
								    formData.append("upload_preset", "ebxcexr6");
								    fetch(url, {
								      method: "POST",
								      body: formData
								    })
								      .then((response) => {
								        return response.text();
								      })
								      .then((data) => {
								    	  $scope.dto.attachment = {};
								    	  $scope.dto.attachment.sheetId = $scope.sheetId;
								    	  $scope.dto.attachment.url = JSON.parse(data).secure_url;
								    	  $scope.dto.attachment.type = "ticket";
										  $http.post(context+$scope.attachmentBaseUrl+"save", angular.toJson($scope.dto.attachment)).success(function(data, status) {
											  
										  }).error(function(data, status, headers, config) {
											  $scope.sheetTechnicalError = true;
										  });
								      });
								}
								CRUDService.setEntityLoaded($scope,data);
								$scope.sheetTechnicalError = false;
								$scope.sheetRequiredError = false;
								$scope.sheetSuccess = true;
								$('#sheetModal').modal("hide");
							}
						}).error(function(data, status, headers, config) {
							$scope.sheetTechnicalError = true;
						});
					}).error(function(data, status, headers, config) {
						$scope.sheetTechnicalError = true;
					});
				});
			}
			else {
				$http.post(context+$scope.sheetBaseUrl+"save", angular.toJson($scope.dto)).success(function(data, status) {
					CRUDService.setEntityLoaded($scope,data);
					$scope.sheetTechnicalError = false;
					$scope.sheetRequiredError = false;
					$scope.sheetSuccess = true;
					$('#sheetModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.sheetTechnicalError = true;
				});
			}
		} else {
			$scope.sheetRequiredError = true;
		}
	};
	
	$scope.initListCategories = function() {
		$http.get(context+$scope.categoryBaseUrl+"getByClient").success(function(data, status) {   
			$scope.categories = data;
		});
	};
	
	$scope.initListCities = function() {
		$scope.disabled = false;
		$http.get(context+$scope.cityBaseUrl+"getAll").success(function(data, status) {   
			$scope.cities = data;
		});
	};
	
	$scope.loadMaterials = function() {
		if(!angular.isUndefined($scope.dto) && !angular.isUndefined($scope.dto.categoryId) && $scope.dto.categoryId != null) {
			$http.get(context+$scope.materialBaseUrl+"getByCategory/"+$scope.dto.categoryId).success(function(data, status) {   
				$scope.materials = data;
			});
		}
	};
	
	$scope.addAttachmentQ = function() {
		$scope.dtoq.attachmentsDTO.push({});
	};
	
	$scope.addQuestion = function() {
		CRUDService.add($scope);
		$scope.dtoq.attachmentsDTO = [{}];
		$scope.editQuestionForm = false;
		$scope.addQuestionForm = true;
		$scope.questionSuccess = false;
		$scope.questionTechnicalError = false;
		$scope.questionRequiredError = false;
		$('#questionModal').modal("show");
	};
	
	$scope.contactForm = function() {
		$('#contactModal').modal("show");
	};
	
	$scope.saveQuestion = function() {
		if($scope.questionForm.$valid) {
			$http.post(context+$scope.baseUrl+"save", angular.toJson($scope.dtoq)).success(function(data, status) {
				$scope.questionId = data.id;
				const url = "https://api.cloudinary.com/v1_1/dhsbffdjn/upload";
				const attachments = document.getElementsByClassName("attachment");
				for (var i = 0; i < attachments.length; i++) {
					let files = attachments[i].files;
					const formData = new FormData();
					for (let j = 0; j < files.length; j++) {
						let file = files[j];
						formData.append("file", file);
					    formData.append("upload_preset", "ebxcexr6");
					    fetch(url, {
					      method: "POST",
					      body: formData
					    })
					      .then((response) => {
					        return response.text();
					      })
					      .then((data) => {
					    	  $scope.dtoq.attachmentQuestion = {};
					    	  $scope.dtoq.attachmentQuestion.questionId = $scope.questionId;
					    	  $scope.dtoq.attachmentQuestion.url = JSON.parse(data).secure_url;
					    	  $http.post(context+$scope.attachmentQuestionBaseUrl+"save", angular.toJson($scope.dtoq.attachmentQuestion)).success(function(data, status) {
								  
							  }).error(function(data, status, headers, config) {
								  $scope.questionTechnicalError = true;
							  });
					      });
					}
					CRUDService.setEntityLoaded($scope,data);
					$scope.questionTechnicalError = false;
					$scope.questionRequiredError = false;
					$scope.questionSuccess = true;
					$('#questionModal').modal("hide");
					$scope.getQuestions();
				}
			}).error(function(data, status, headers, config) {
				$scope.questionTechnicalError = true;
			});
		} else {
			$scope.questionRequiredError = true;
		}
	};
	
});

