app.controller('secUtilisateurController', function($scope,$http,$ngBootbox,$location,CRUDService,NotificationService,constants) {

	$scope.dto = {};
	$scope.filtre = {};
	$scope.table = null;
	$scope.selected = null;
	$scope.mode = null;
	
	$scope.baseUrl = "/administration/user/rest/";
	
	$scope.zoneRecheche = false;
	
	
	$scope.init = function(){
		$scope.mode="read";
		CRUDService.init($scope);
	};
	
	
	$scope.add = function(){
		CRUDService.add($scope);
	};

	$scope.edit = function(){
		CRUDService.edit($scope);
	};
	
	$scope.load = function(id){
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.save = function(){
		CRUDService.save($scope,$scope.dto).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			$scope.refreshList();
			NotificationService.showSuccess();
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.refreshList = function(){
		$scope.table.ajax.reload();
		$scope.dto = {};
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
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez supprimer");
		}
	};


	$scope.confirmDelete = function(id){
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.toggleCheckedNotif = function (secAuthoriteId) {
		var index = $scope.dto.secUtilisateurAuthoriteDTOs.findIndex( item => item.secAuthoriteId === secAuthoriteId );
		if($scope.dto.secUtilisateurAuthoriteDTOs[index].onNotif == true){
			$scope.dto.secUtilisateurAuthoriteDTOs[index].onNotif = false;
		}
		else{
			$scope.dto.secUtilisateurAuthoriteDTOs[index].onNotif = true;
		};
	};
	
	$scope.toggleCheckedMail = function (secAuthoriteId) {
		var index = $scope.dto.secUtilisateurAuthoriteDTOs.findIndex( item => item.secAuthoriteId === secAuthoriteId );
		if($scope.dto.secUtilisateurAuthoriteDTOs[index].onMail == true){
			$scope.dto.secUtilisateurAuthoriteDTOs[index].onMail = false;
		}
		else{
			$scope.dto.secUtilisateurAuthoriteDTOs[index].onMail = true;
		};
	};
	
});


app.controller('secUtilisateurTableController', function($scope,$http,$compile) {

		$scope.init = function(idEntite){
			
			$scope.$parent.idEntite = idEntite;
			
			$scope.$parent.table =  $("#secUtilisateurTable").mytable({
				name:"secUtilisateurTable",
				url:$scope.$parent.baseUrl +"list",
				idEntite:$scope.$parent.idEntite,
				columns:[ 
					{id : 'id',"visible":false},
					{id : 'login'},
					{id : 'nom'},
					{id : 'prenom'}
					]
			});
			
			$scope.$parent.table.on('select', function ( e, dt, type, indexes ) {
				var rowData = 	$scope.$parent.table.rows( indexes ).data().toArray();
				var id = null;
				if(rowData.length > 0){
					$scope.$parent.selected = rowData[0];
					id = rowData[0].id;
					$scope.$parent.load(id);
				}
			});
		};
		
});

app.controller('secUtilisateurAuthoriteTableController', function($scope,$http,$compile) {

	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null){
			$scope.$parent.tableSecUtilisateurAuthorite.rows().clear();
			$scope.$parent.tableSecUtilisateurAuthorite.rows.add($scope.$parent.dto.secUtilisateurAuthoriteDTOs).draw();
			$compile($scope.$parent.tableSecUtilisateurAuthorite.rows())($scope);
		}
	});

	$scope.init = function(){

		$scope.$parent.tableSecUtilisateurAuthorite =  $("#secUtilisateurAuthoriteTable").mytable({
			name:"secUtilisateurAuthoriteTable",
			compile:$compile,
			scope:$scope,
			local:true,
			columnsVis:false,
			ordre :  [ 3, "ASC" ],
			columns:[ 
				{id : 'id',"visible":false},
				{"mRender": function(data, type, full) {
					return  '<input type="checkbox"  ng-disabled="mode == \'read\'" ng-checked="'+full.onNotif+'" ng-click="toggleCheckedNotif('+full.secAuthoriteId+')" />';
				}},
				{"mRender": function(data, type, full) {
					return  '<input type="checkbox"  ng-disabled="mode == \'read\'" ng-checked="'+full.onMail+'" ng-click="toggleCheckedMail('+full.secAuthoriteId+')" />';
				}},
				{id : 'secAuthoriteLibelle'},
				]
		}); 
	};

});
