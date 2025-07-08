app.controller('profileController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.profileTable = null;
	$scope.dto.idSecAuthorites = [];
	$scope.selected = null;
	$scope.mode = null;
	$scope.profileRequiredError = false;
	$scope.profileTechnicalError = false;
	$scope.profileSuccess = false;
	$scope.userRequiredError = false;
	$scope.userTechnicalError = false;
	$scope.userSuccess = false;
	
	$scope.baseUrl = "/administration/profile/rest/";
	$scope.userBaseUrl = "/administration/user/rest/";
	$scope.zoneRecheche = false;
	
	$scope.idAuthorites = [];
	
	$scope.init = function() {
		$scope.mode="read";
		$scope.addProfileForm = false;
		$scope.editProfileForm = false;
		CRUDService.init($scope);
	};
	
	$scope.add = function() {
		CRUDService.add($scope);
		$scope.dto.idSecAuthorites = [];
		$scope.editProfileForm = false;
		$scope.addProfileForm = true;
		$scope.profileSuccess = false;
		$scope.profileTechnicalError = false;
		$scope.profileRequiredError = false;
		
		$('#profileModal').modal("show");
		
		$('.panel-collapse.in').collapse('hide');
	};
	
	$scope.edit = function() {
		CRUDService.edit($scope);
		$scope.addProfileForm = false;
		$scope.editProfileForm = true;
		$scope.profileSuccess = false;
		$scope.profileTechnicalError = false;
		$scope.profileRequiredError = false;
		$('#profileModal').modal("show");
	};

	    
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {  
			$('.panel-collapse.in').collapse('hide'); 
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveProfile = function() {
		if($scope.profileForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$('.panel-collapse.in').collapse('hide');
				$scope.refreshList();
				$scope.profileTechnicalError = false;
				$scope.profileRequiredError = false;
				$scope.profileSuccess = true;
				$('#profileModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.profileTechnicalError = true;
			});
		} else {
			$scope.profileRequiredError = true;
		}
	};

	$scope.refreshList = function() {
		$scope.profileTable.ajax.reload();
		$scope.dto = {};
	};
	
	removeProfile = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteProfile(id);
		};
	};

	$scope.confirmDeleteProfile = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
	
	$scope.checked = function (idAuthorite) {
		return $scope.dto.idSecAuthorites.indexOf(idAuthorite) > -1;
	};

	$scope.toggleChecked = function (idAuthorite) {
		var index = $scope.dto.idSecAuthorites.indexOf(idAuthorite);
		if (index > -1) {
			$scope.dto.idSecAuthorites.splice(index, 1);
		} else {
			$scope.dto.idSecAuthorites.push(idAuthorite);
		}
	};
});

app.controller('profileTableController', function($scope,$http) {
	$scope.init = function(){
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'code'},
			{mDataProp: 'intitule'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editProfile();" class="btn btn-fw info" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeProfile('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.profileTable = TableManager.init("profileTable", $scope.$parent.baseUrl +"list", columns);
		
		$scope.$parent.profileTable.on('select', function (e, dt, type, indexes) {
			var rowData = $scope.$parent.profileTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});