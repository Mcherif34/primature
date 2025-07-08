app.controller('letterTemplateController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.letterTemplateTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.letterTemplateRequiredError = false;
	$scope.letterTemplateTechnicalError = false;
	$scope.letterTemplateSuccess = false;
	$scope.notifications = null;
	$scope.notificationsCount = 0;
	
	$scope.baseUrl = "/reminder/letterTemplate/rest/";
	$scope.notificationBaseUrl = "/notification/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addLetterTemplateForm = false;
		$scope.editLetterTemplateForm = false;
		CRUDService.init($scope);
		
		$scope.initListNotifications();
		
		$scope.snoweditor = new Quill('#snoweditor', toolOptions());
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
	
	$scope.addLetterTemplate = function() {
		CRUDService.add($scope);
		$scope.editLetterTemplateForm = false;
		$scope.addLetterTemplateForm = true;
		$scope.letterTemplateSuccess = false;
		$scope.letterTemplateTechnicalError = false;
		$scope.letterTemplateRequiredError = false;
		$scope.snoweditor.root.innerHTML = "";
		$('#letterTemplateModal').modal("show");
	};
	
	editLetterTemplate = function(id) {
		console.log("test");
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.dto = data;
			$scope.snoweditor.root.innerHTML = $scope.dto.letter;
			CRUDService.edit($scope);
			$scope.addLetterTemplateForm = false;
			$scope.editLetterTemplateForm = true;
			$scope.letterTemplateSuccess = false;
			$scope.letterTemplateTechnicalError = false;
			$scope.letterTemplateRequiredError = false;
			$('#letterTemplateModal').modal("show");
		});
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveLetterTemplate = function() {
		if($scope.letterTemplateForm.$valid) {
			$scope.dto.letter = $scope.snoweditor.root.innerHTML;
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.letterTemplateTechnicalError = false;
				$scope.letterTemplateRequiredError = false;
				$scope.letterTemplateSuccess = true;
				$('#letterTemplateModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.letterTemplateTechnicalError = true;
			});
		} else {
			$scope.letterTemplateRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.letterTemplateTable.ajax.reload();
		$scope.dto = {};
	};

	removeLetterTemplate = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteLetterTemplate(id);
		};
	};

	$scope.confirmDeleteLetterTemplate = function(id) {
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
		if(checked)
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

app.controller('letterTemplateTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="form-check"><input class="form-check-input letterTemplateId" type="checkbox" value="'+full.id+'" onclick="check(\'letterTemplateId\')" /></div>';
			}},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editLetterTemplate('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a> <a href="#" onclick="removeLetterTemplate('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.letterTemplateTable = TableManager.init("letterTemplateTable", $scope.$parent.baseUrl+"list", columns);
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