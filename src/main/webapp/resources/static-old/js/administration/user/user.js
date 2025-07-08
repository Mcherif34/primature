app.controller('userController', function($scope,$compile,$http,$ngBootbox,CRUDService,NotificationService) {
	$scope.table = null;
	$scope.dto = {};
	$scope.dto.idSecProfiles = [];
	$scope.selected = null;
	$scope.mode = null;
	$scope.baseUrl = "/administration/user/rest/";

	$scope.modulesList = [];
	$scope.fModulesList = [];

	$scope.initListModules = function(id){		
		$scope.modulesList = [];

		$http.get(context+"/administration/profile/rest/modulesByUser/"+id).success(function(data, status) { 
			$scope.modulesList = data;

		});
	};


	$scope.$watch('modulesList', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null){

			for(i=0;i<$scope.modulesList.length;i++){
				switch($scope.modulesList[i]) {
				case 'foncier':
					$scope.fModulesList.push({id:$scope.modulesList[i], libelle:'Foncier'});
					break;
				case 'urbaine':
					$scope.fModulesList.push({id:$scope.modulesList[i], libelle:'Urbaine'});
					break;
				case 'etude':
					$scope.fModulesList.push({id:$scope.modulesList[i], libelle:'Etude'});
					break;
				case 'travaux':
					$scope.fModulesList.push({id:$scope.modulesList[i], libelle:'Travaux'});
					break;
				case 'dev':
					$scope.fModulesList.push({id:$scope.modulesList[i], libelle:'Développement'});
					break;
				case 'site':
					$scope.fModulesList.push({id:$scope.modulesList[i], libelle:'Site'});
					break;
				case 'global':
					$scope.fModulesList.push({id:$scope.modulesList[i], libelle:'Global'});
					break;
				}				
			}

		}
	});


	$scope.zoneRecheche = false;

	$scope.init = function(){
		$scope.mode="read";
		CRUDService.init($scope);
		var filtres =	[];
		var columns = [ 
			{mDataProp : 'id',"visible":false,"searchable":false} ,
			{"sWidth": "10px", bSortable: false,searchable:false , orderable: false,"mRender": function(data, type, full) {
				return  '<input type="checkbox"  ng-disabled="mode == \'read\'" ng-checked="checked('+full.id+')" ng-click="toggleChecked('+full.id+')" />';
			}},
			{mDataProp : 'intitule'}
			];

		$scope.profilesUrl = "/administration/profile/rest/";
		//Table Init
		$scope.profilesTable = TableManager.initCompiled("profilesTable",$scope.profilesUrl+"list", columns,filtres,$compile,$scope);
	};

	$scope.add = function(){
		CRUDService.add($scope);
//		$scope.dto = {};
		$scope.dto.idSecProfiles = [];
		$scope.profilesTable.page("first").draw("page");
//		$scope.mode="edit";
	};

	$scope.edit = function(){
		CRUDService.edit($scope);
	};


	$scope.load = function(id){
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			$scope.profilesTable.page("first").draw("page");
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};

	$scope.save = function(){
		CRUDService.save($scope,$scope.dto).success(function(data, status) {  
			CRUDService.setEntityLoaded($scope,data);
			$scope.profilesTable.page("first").draw("page");
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};

	$scope.refreshList = function(){
		$scope.table.ajax.reload();
	};


	$scope.remove = function(){
		$scope.dto = {};
		var count = $scope.table.rows( { selected: true } ).count();
		if(count > 0){
			$ngBootbox.confirm("Voulez-vous vraiment supprimer cet enregistrement ?").then(function () {
				if($scope.selected.id != null){
					$scope.confirmDelete($scope.selected.id);
				}
			}, function () {

			});
		}else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez modifier");
		}
	};


	$scope.confirmDelete = function(id){
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};

	$scope.checked = function (idAuthorite) {
		return $scope.dto.idSecProfiles.indexOf(idAuthorite) > -1;
	};

	$scope.toggleChecked = function (idProfile) {
		var index = $scope.dto.idSecProfiles.indexOf(idProfile);
		if (index > -1) {
			$scope.dto.idSecProfiles.splice(index, 1);
		} else {
			$scope.dto.idSecProfiles.push(idProfile);
		}
	};

	$scope.changePassword = function(){
		if($scope.dto.id != null){
			$('#changementMotPassePopup').modal("show");
		}
		else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez modifier");
		}
	};
	
	$scope.closeChangementMotPasse = function(){
		$('#changementMotPassePopup').modal("hide");
	};

	$scope.confirmChange = function(){
		if($scope.changementMotPasseForm.$valid){
			$http.post( context+$scope.baseUrl+"/changePassword", angular.toJson($scope.dto)).success(function(data, status) {   
				if(data == true){
					$('#changementMotPassePopup').modal("hide");
					NotificationService.showSuccess();
				}
				else{
					NotificationService.showAvertissement("Veuillez vérifier les mots de passe !");
				}
			}).error(function(data, status, headers, config) {
				NotificationService.showTechnicalError();
			});
		}
		else{
			NotificationService.showAvertissement("Veuillez remplir tous les champs obligatoires !");
		}
	};

});

app.controller('userTableController', function($scope,$http) {
	$scope.init = function(){
		var columns = [ 
			{
				mDataProp : 'id',"visible": false
			} ,{
				mDataProp : 'login'
			} ,{
				mDataProp : 'nom'
			} ,{
				mDataProp : 'prenom'
			}];
		$scope.$parent.table = TableManager.init("userTable", $scope.$parent.baseUrl +"list", columns);
		$scope.$parent.table.on('select', function ( e, dt, type, indexes ) {
			var rowData = 	$scope.$parent.table.rows( indexes ).data().toArray();
			var id = null;
			if(rowData.length > 0){
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
				$scope.$parent.initListModules(id);
			}
		});
	};


});
