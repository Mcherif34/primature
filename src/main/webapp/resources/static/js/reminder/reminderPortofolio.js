app.controller('reminderPortofolioController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.reminderPortofolioTable = null;
	$scope.clientTabId = [];
	$scope.selected = null;
	$scope.mode = null;
	$scope.reminderPortofolioRequiredError = false;
	$scope.reminderPortofolioTechnicalError = false;
	$scope.reminderPortofolioSuccess = false;
	$scope.clientRequiredError = false;
	$scope.clientTechnicalError = false;
	$scope.clientSuccess = false;
	$scope.notifications = null;
	$scope.notificationsCount = 0;
	
	$scope.baseUrl = "/reminder/portofolio/rest/";
	$scope.clientBaseUrl = "/client/client/rest/";
	$scope.notificationBaseUrl = "/notification/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addReminderPortofolioForm = false;
		$scope.editReminderPortofolioForm = false;
		CRUDService.init($scope);
		
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
	
	$scope.initListClients = function() {
		$http.get(context+"/client/client/rest/getAllWithoutReminderPortofolio").success(function(data, status) {   
			$scope.clients = data;
		});
	};
	
	$scope.addReminderPortofolio = function() {
		CRUDService.add($scope);
		$scope.editReminderPortofolioForm = false;
		$scope.addReminderPortofolioForm = true;
		$scope.reminderPortofolioSuccess = false;
		$scope.reminderPortofolioTechnicalError = false;
		$scope.reminderPortofolioRequiredError = false;
		$('#reminderPortofolioModal').modal("show");
	};
	
	addClient = function(id) {
		$scope.clientSuccess = false;
		$scope.clientTechnicalError = false;
		$scope.clientRequiredError = false;
		console.log(id);
		$('#clientModal').modal("show");
	};
	
	editReminderPortofolio = function() {
		CRUDService.edit($scope);
		$scope.addReminderPortofolioForm = false;
		$scope.editReminderPortofolioForm = true;
		$scope.reminderPortofolioSuccess = false;
		$scope.reminderPortofolioTechnicalError = false;
		$scope.reminderPortofolioRequiredError = false;
		$('#reminderPortofolioModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveReminderPortofolio = function() {
		if($scope.reminderPortofolioForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
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
	
	$scope.saveClient = function(name) {
		$scope.clientTabId = [];
		var inputs = document.getElementsByClassName(name);
		for(var i = 0, l = inputs.length; i < l; ++i) {
			if(inputs[i].checked) {
				$scope.clientTabId.push(inputs[i].value);			
//				$http.get(context+$scope.clientBaseUrl+"load/"+inputs[i].value).success(function(data, status) {
//					$scope.dto.client = data;
//					$scope.dto.client.reminderPortofolioId = $scope.dto.id;
//					$http.post(context+$scope.clientBaseUrl+"save", angular.toJson($scope.dto.client)).success(function(data, status) {}).error(function(data, status, headers, config) {});
//				});
	    	}
	    }
		$http.post(context+$scope.clientBaseUrl+"save/"+$scope.dto.id, angular.toJson($scope.clientTabId)).success(function(data, status) {
			$scope.refreshList();
			$scope.clientTechnicalError = false;
			$scope.clientRequiredError = false;
			$scope.clientSuccess = true;
			$('#clientModal').modal("hide");
		}).error(function(data, status, headers, config) {
			$scope.clientTechnicalError = true;
		});
		/*if($scope.clientForm.$valid) {
			$scope.clientId = ($("#client").val().split(':'))[1];
			$http.get(context+$scope.clientBaseUrl+"load/"+$scope.clientId).success(function(data, status) {
				$scope.dto.client = data;
				$scope.dto.client.reminderPortofolioId = $scope.dto.id;
				$http.post(context+$scope.clientBaseUrl+"save", angular.toJson($scope.dto.client)).success(function(data, status) {   
					$scope.refreshList();
					$scope.clientTechnicalError = false;
					$scope.clientRequiredError = false;
					$scope.clientSuccess = true;
					$('#clientModal').modal("hide");
				}).error(function(data, status, headers, config) {
					$scope.clientTechnicalError = true;
				});
			});
		} else {
			$scope.clientRequiredError = true;
		}*/
	};
	
	$scope.removeClient = function(name) {
		if(confirm("Voulez-vous vraiment supprimer ces clients du portefeuille ?") == true) {
			$scope.clientTabId = [];
			var inputs = document.getElementsByClassName(name);
			for(var i = 0, l = inputs.length; i < l; ++i) {
				if(inputs[i].checked) {
					$scope.clientTabId.push(inputs[i].value);
		    	}
		    }
			$http.post(context+$scope.clientBaseUrl+"removeFromReminderPortofolio", angular.toJson($scope.clientTabId)).success(function(data, status) {
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.clientTechnicalError = false;
				$scope.clientRequiredError = false;
				$scope.clientSuccess = true;
				$('#clientModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.clientTechnicalError = true;
			});
		}
	};
	
	$scope.refreshList = function() {
		$scope.reminderPortofolioTable.ajax.reload();
		$scope.dto = {};
	};

	removeReminderPortofolio = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteReminderPortofolio(id);
		};
	};

	$scope.confirmDeleteReminderPortofolio = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	removeClient = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer ce client du portefeuille ?") == true) {
			$scope.confirmDeleteClient(id);
		};
	};

	$scope.confirmDeleteClient = function(id) {
		$http.get(context+$scope.clientBaseUrl+"load/"+id).success(function(data, status) {
			$scope.dto.client = data;
			$scope.dto.client.reminderPortofolioId = null;
			$http.post(context+$scope.clientBaseUrl+"save", angular.toJson($scope.dto.client)).success(function(data, status) {
				$scope.dto = {};
				$scope.load($scope.selected.id);
			}).error(function(data, status, headers, config) {
				$scope.clientTechnicalError = true;
			});
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

app.controller('reminderPortofolioTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null) {
			$scope.$parent.clientTable.ajax.url('/client/client/rest/listByReminderPortofolio/'+newValue).load();
		}
		else {
			$scope.$parent.clientTable.ajax.url('/client/client/rest/listByReminderPortofolio/-1').load();
		}
	});
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="form-check"><input class="form-check-input reminderPortofolioId" type="checkbox" value="'+full.id+'" onclick="check(\'reminderPortofolioId\')" /></div>';
			}},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'description'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="addClient('+full.id+');" class="edit-item-btn"><i style="font-size: 17px" class="ri-user-add-fill align-bottom me-2 text-success"></i></a> <a href="#" onclick="editReminderPortofolio();" class="edit-item-btn"><i style="font-size: 17px" class="ri-pencil-fill align-bottom me-2"></i></a> <a href="#" onclick="removeReminderPortofolio('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.reminderPortofolioTable = TableManager.init("reminderPortofolioTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.reminderPortofolioTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.reminderPortofolioTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('clientTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="form-check"><input class="form-check-input reminderClientId" type="checkbox" value="'+full.id+'" onclick="check(\'reminderClientId\')" /></div>';
			}},
			{mDataProp: 'codeClient'},
			{mDataProp: 'companyName'},
			{mDataProp: 'siege'},
			{mDataProp: 'cityDesignation'},
			{mDataProp: 'iceNum'},
			{mDataProp: 'paymentMethodName'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="removeClient('+full.id+');" class="remove-item-btn"><i style="font-size: 17px" class="ri-delete-bin-fill align-bottom me-2 text-danger"></i></a>';
				return result;
			}}
		];
		$scope.$parent.clientTable = TableManager.init("clientTable", $scope.$parent.clientBaseUrl+"listByReminderPortofolio/-1", columns);
	};
});

app.controller('clientWithoutPortofolioTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				return '<div class="checkbox"><label class="ui-check"><input class="clientId" type="checkbox" value="'+full.id+'" onclick="check(\'clientId\')"><i class="dark-white"></i></label></div>';
			}},
			{mDataProp: 'codeClient'},
			{mDataProp: 'companyName'},
			{mDataProp: 'siege'},
			{mDataProp: 'cityDesignation'}
		];
		$scope.$parent.clientWithoutPortofolioTable = TableManager.init("clientWithoutPortofolioTable", $scope.$parent.clientBaseUrl+"listWithoutReminderPortofolio", columns);
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