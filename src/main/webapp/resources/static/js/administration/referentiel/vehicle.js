app.controller('vehicleController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.vehicleTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.vehicleRequiredError = false;
	$scope.vehicleTechnicalError = false;
	$scope.vehicleFileTypeError = false;
	$scope.vehicleSuccess = false;
	$scope.buttonDisabled = false;
	$scope.vehicles = [];
	$scope.importing = false;
	
	$scope.baseUrl = "/administration/referentiel/vehicle/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addVehicleForm = false;
		$scope.editVehicleForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addVehicle = function() {
		CRUDService.add($scope);
		$scope.editVehicleForm = false;
		$scope.addVehicleForm = true;
		$scope.vehicleSuccess = false;
		$scope.vehicleTechnicalError = false;
		$scope.vehicleRequiredError = false;
		$('#vehicleModal').modal("show");
	};
	
	$scope.importVehicles = function() {
		$scope.vehicleFileTypeError = false;
		$scope.importing = false;
		document.getElementById('vehicleFileInput').value = '';
		$scope.vehicleSuccess = false;
		$scope.vehicleTechnicalError = false;
		$scope.vehicleRequiredError = false;
		$('#importVehiclesModal').modal("show");
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
	
	loadImportVehicles = function() {
		var file = $('#vehicleFileInput')[0].files[0];
		var sFilename = file.name;
		if(!checkfile(sFilename))
			$scope.vehicleFileTypeError = true;
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
		    $scope.vehicleFileTypeError = false;
		}
	}
	
	editVehicle = function() {
		CRUDService.edit($scope);
		$scope.addVehicleForm = false;
		$scope.editVehicleForm = true;
		$scope.vehicleSuccess = false;
		$scope.vehicleTechnicalError = false;
		$scope.vehicleRequiredError = false;
		$('#vehicleModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.searchVehicle = function() {
		var searchKey = 'NAN';
		if(!angular.isUndefined($scope.dto.search.key) && $scope.dto.search.key != '') searchKey = $scope.dto.search.key;
		$scope.vehicleTable.ajax.url('/client/vehicle/rest/search/'+searchKey).load();
	};
	
	$scope.saveVehicle = function() {
		if($scope.vehicleForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.vehicleTechnicalError = false;
				$scope.vehicleRequiredError = false;
				$scope.vehicleSuccess = true;
				$('#vehicleModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.vehicleTechnicalError = true;
			});
		} else {
			$scope.vehicleRequiredError = true;
		}
	};
	
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	$scope.saveImportVehicles = function() {
		$scope.buttonDisabled = true;
		$scope.importing = true;
		if(!angular.isUndefined($scope.sheet)) {
	    	for(i = 0; i < $scope.sheet.length; i++) {
	    		$scope.seq = i;
	    		$scope.dto = {};
	    		$scope.dto.code = $scope.sheet[i]['F090KY'];
	    		$scope.dto.model = $scope.sheet[i]['F090LIB'];
	    		$scope.dto.serie = $scope.sheet[i]['F090SERIE'];
	    		$scope.dto.type = $scope.sheet[i]['K090T07TYP'];
	    		if($scope.sheet[i]['F090INDT'] != null && $scope.sheet[i]['F090INDT'] != '') {
	    			$scope.dto.entryDate = ExcelDateToJSDate($scope.sheet[i]['F090INDT']);
	    		}
	    		if($scope.sheet[i]['F090OUTDT'] != null && $scope.sheet[i]['F090OUTDT'] != '') {
	    			$scope.dto.outputDate = ExcelDateToJSDate($scope.sheet[i]['F090OUTDT']);
	    		}
	    		if($scope.sheet[i]['F090DTMISC'] != null && $scope.sheet[i]['F090DTMISC'] != '') {
	    			$scope.dto.circulationDate = ExcelDateToJSDate($scope.sheet[i]['F090DTMISC']);
	    		}
	    		if($scope.sheet[i]['F090ACTIF'] == 1) {
	    			$scope.dto.enabled = true;
	    		} else {
	    			$scope.dto.enabled = false;
	    		}
	    		$scope.dto.ownerTemp = $scope.sheet[i]['K090050PRO'];
	    		$scope.dto.companyTemp = $scope.sheet[i]['K090001SOC'];
	    		$scope.dto.agencyTemp = $scope.sheet[i]['K090030AGE'];
	    		
	    		$scope.vehicles.push($scope.dto);
	        }
	    	$http.post(context+$scope.baseUrl+"saveImport", angular.toJson($scope.vehicles)).success(function(data, status) {   
	    		CRUDService.setEntityLoaded($scope,data);
	    		$scope.buttonDisabled = false;
				$scope.vehicleTechnicalError = false;
				$scope.vehicleRequiredError = false;
				$scope.vehicleSuccess = true;
				$scope.importing = false;
				$scope.refreshList();
				$('#importVehiclesModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.vehicleTechnicalError = true;
				$scope.importing = false;
			});
	    } else {
	    	$scope.buttonDisabled = false;
	    	$scope.vehicleTechnicalError = true;
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
		$scope.vehicleTable.ajax.reload();
		$scope.dto = {};
	};

	removeVehicle = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteVehicle(id);
		};
	};

	$scope.confirmDeleteVehicle = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('vehicleTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'code'},
			{mDataProp: 'entryDate'},
			{mDataProp: 'outputDate'},
			{mDataProp: 'circulationDate'},
			{mDataProp: 'model'},
			{mDataProp: 'vehicleBrandName'},
			{mDataProp: 'vehicleTypeName'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="showVehicleDetail('+full.id+');" class="btn btn-fw orange" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-desktop"></i></a>';
				return result;
			}}
		];
		$scope.$parent.vehicleTable = TableManager.init("vehicleTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.vehicleTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.vehicleTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});
