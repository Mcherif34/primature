app.controller('matriculationController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.matriculationTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.buttonDisabled = false;
	$scope.matriculations = [];
	$scope.importing = false;
	$scope.matriculationFileTypeError = false;
	$scope.notifications = null;
	$scope.notificationsCount = 0;
	
	$scope.baseUrl = "/client/matriculation/rest/";
	$scope.notificationBaseUrl = "/notification/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addMatriculationForm = false;
		$scope.editMatriculationForm = false;
		CRUDService.init($scope);
		
		$scope.initListVehicles();
		$scope.initListCompanies();
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
	
	$scope.initListVehicles = function() {
		$http.get(context+"/administration/referentiel/vehicle/rest/getAll").success(function(data, status) {   
			$scope.vehicles = data;
		});
	};
	
	$scope.initListCompanies = function() {
		$http.get(context+"/administration/referentiel/company/rest/getAll").success(function(data, status) {   
			$scope.companies = data;
		});
	};
	
	$scope.advancedSearchMatriculationForm = function() {
		$('#advancedSearchMatriculationModal').modal("show");
	};
	
	$scope.addMatriculation = function() {
		CRUDService.add($scope);
		$scope.editMatriculationForm = false;
		$scope.addMatriculationForm = true;
		$scope.matriculationSuccess = false;
		$scope.matriculationTechnicalError = false;
		$scope.matriculationRequiredError = false;
		$('#matriculationModal').modal("show");
	};
	
	$scope.importMatriculations = function() {
		$scope.matriculationFileTypeError = false;
		$scope.importing = false;
		document.getElementById('matriculationFileInput').value = '';
		CRUDService.add($scope);
		$scope.matriculationSuccess = false;
		$scope.matriculationTechnicalError = false;
		$scope.matriculationRequiredError = false;
		$('#importMatriculationsModal').modal("show");
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
	
	loadImportMatriculations = function() {
		var file = $('#matriculationFileInput')[0].files[0];
		var sFilename = file.name;
		if(!checkfile(sFilename))
			$scope.matriculationFileTypeError = true;
		else {
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
		    $scope.matriculationFileTypeError = false;
		}
	}
	
	editMatriculation = function() {
		CRUDService.edit($scope);
		$scope.addMatriculationForm = false;
		$scope.editMatriculationForm = true;
		$scope.matriculationSuccess = false;
		$scope.matriculationTechnicalError = false;
		$scope.matriculationRequiredError = false;
		$('#matriculationModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.advancedSearchMatriculation = function() {
		var searchCode = 'NAN'; var searchKy = 'NAN'; var searchSerie = 'NAN'; var searchOwnerCompanyId = 0; var searchLegalCompanyId = 0; var searchVehicleCode = 0; var searchVehicleModel = 0; var searchDateStart = 'NAN'; var searchDateEnd = 'NAN';
		var date = new Date();
		if(!angular.isUndefined($scope.dto.search.code) && $scope.dto.search.code != '') searchCode = $scope.dto.search.code;
		if(!angular.isUndefined($scope.dto.search.serie) && $scope.dto.search.serie != '') searchSerie = $scope.dto.search.serie;
		if(!angular.isUndefined($scope.dto.search.ownerCompanyId) && $scope.dto.search.ownerCompanyId != null) searchOwnerCompanyId = $scope.dto.search.ownerCompanyId;
		if(!angular.isUndefined($scope.dto.search.legalCompanyId) && $scope.dto.search.legalCompanyId != null) searchLegalCompanyId = $scope.dto.search.legalCompanyId;
		if(!angular.isUndefined($scope.dto.search.vehicleCode) && $scope.dto.search.vehicleCode != null) searchVehicleCode = $scope.dto.search.vehicleCode;
		if(!angular.isUndefined($scope.dto.search.vehicleModel) && $scope.dto.search.vehicleModel != null) searchVehicleModel = $scope.dto.search.vehicleModel;
		if(!angular.isUndefined($scope.dto.search.dateStart) && $scope.dto.search.dateStart != '') {
			searchDateStart = $scope.dto.search.dateStart+'';
			searchDateStart = searchDateStart.split('/');
			searchDateStart = searchDateStart[2]+'-'+searchDateStart[1]+'-'+searchDateStart[0];
		} else {
			if(!angular.isUndefined($scope.dto.search.dateEnd) && $scope.dto.search.dateEnd != '') {
				searchDateStart = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			}
		}
		if(!angular.isUndefined($scope.dto.search.dateEnd) && $scope.dto.search.dateEnd != '') {
			searchDateEnd = $scope.dto.search.dateEnd+'';
			searchDateEnd = searchDateEnd.split('/');
			searchDateEnd = searchDateEnd[2]+'-'+searchDateEnd[1]+'-'+searchDateEnd[0];
		} else {
			if(!angular.isUndefined($scope.dto.search.dateStart) && $scope.dto.search.dateStart != '') {
				searchDateEnd = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			}
		}
		$scope.matriculationTable.ajax.url($scope.baseUrl+'search/'+searchCode+'/'+searchKy+'/'+searchSerie+'/'+searchOwnerCompanyId+'/'+searchLegalCompanyId+'/'+searchVehicleCode+'/'+searchVehicleModel+'/'+searchDateStart+'/'+searchDateEnd).load();
		$('#advancedSearchMatriculationModal').modal("hide");
	};
	
	$scope.searchMatriculation = function() {
		var searchKey = 'NAN';
		if(!angular.isUndefined($scope.dto.search.key) && $scope.dto.search.key != '') searchKey = $scope.dto.search.key;
		$scope.matriculationTable.ajax.url('/client/matriculation/rest/search/'+searchKey).load();
	};
	
	showMatriculationDetail = function(id) {
		$http.get(context+$scope.baseUrl+"load/"+id).success(function(data, status) { 
			$scope.matriculationDetail = data;
			$('#matriculationDetailModal').modal("show");
		});
	};
	
	$scope.saveMatriculation = function() {
		if($scope.matriculationForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.matriculationTechnicalError = false;
				$scope.matriculationRequiredError = false;
				$scope.matriculationSuccess = true;
				$('#matriculationModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.matriculationTechnicalError = true;
			});
		} else {
			$scope.matriculationRequiredError = true;
		}
	};
	
	$scope.saveImportMatriculations = function() {
		$scope.buttonDisabled = true;
		$scope.importing = true;
		if(!angular.isUndefined($scope.sheet)) {
	    	for(i = 0; i < $scope.sheet.length; i++) {
	    		$scope.seq = i;
	    		$scope.dto = {};
	    		
	    		$scope.dto.vehicleCode = $scope.sheet[i]['Code parc '];
	    		$scope.dto.code = $scope.sheet[i]['immatri'];
	    		if($scope.sheet[i]['date immat'] != null && $scope.sheet[i]['date immat'] != '') {
	    			$scope.dto.date = ExcelDateToJSDate($scope.sheet[i]['date immat']);
	    		}
	    		$scope.dto.ky = $scope.sheet[i]['KY'];
	    		
	    		$scope.matriculations.push($scope.dto);
	        }
	    	$http.post(context+$scope.baseUrl+"saveImport", angular.toJson($scope.matriculations)).success(function(data, status) {   
	    		CRUDService.setEntityLoaded($scope,data);
	    		$scope.buttonDisabled = false;
				$scope.matriculationTechnicalError = false;
				$scope.matriculationRequiredError = false;
				$scope.matriculationSuccess = true;
				$scope.importing = false;
				$scope.refreshList();
				$('#importMatriculationsModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.matriculationTechnicalError = true;
				$scope.importing = false;
			});
	    } else {
	    	$scope.buttonDisabled = false;
	    	$scope.matriculationTechnicalError = true;
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
	
	$scope.refreshList = function() {
		$scope.matriculationTable.ajax.reload();
		$scope.dto = {};
	};

	removeMatriculation = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteMatriculation(id);
		};
	};

	$scope.confirmDeleteMatriculation = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('matriculationTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'vehicleCode'},
			{mDataProp: 'code'},
			{mDataProp: 'vehicleModel'},
			{mDataProp: 'date'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="showMatriculationDetail('+full.id+');" class="btn btn-fw orange" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-desktop"></i></a>';
				return result;
			}}
		];
		$scope.$parent.matriculationTable = TableManager.init("matriculationTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.matriculationTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.matriculationTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
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
		$scope.$parent.clientTable = TableManager.init("notificationListTable", $scope.$parent.notificationBaseUrl+"list", columns);
	};
});