app.controller('intervenantController', function($scope,$http,$ngBootbox,$location,CRUDService,NotificationService,constants) {

	$scope.dto = {};
	$scope.filtre = {};
	$scope.table = null;
	$scope.selected = null;
	$scope.mode = null;
	
	$scope.baseUrl = "/intervenant/rest/";
	
	$scope.natures = [];
	
	$scope.zoneRecheche = false;

	$scope.init = function(){
		$scope.mode="read";
		CRUDService.init($scope);
		$scope.initListNatures();
	};
	
	
	$scope.initListNatures = function(){
		$http.get(context+"/list/REF/Intervenant/nature").success(function(data, status) {   
			$scope.natures = data;
		});
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
	
	
});


app.controller('intervenantTableController', function($scope,$http) {


		$scope.init = function(idEntite){
			
			$scope.$parent.idEntite = idEntite;
			
			$scope.$parent.table =  $("#intervenantTable").mytable({
				name:"intervenantTable",
				url:$scope.$parent.baseUrl +"list",
				idEntite:$scope.$parent.idEntite,
				columns:[ 
					{id : 'id',"visible":false},
					{id : 'raisonSociale'},
					{id : 'libNature'},
					{id : 'representant'},
					{id : 'telephone'},
					{id : 'adresse'}
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
