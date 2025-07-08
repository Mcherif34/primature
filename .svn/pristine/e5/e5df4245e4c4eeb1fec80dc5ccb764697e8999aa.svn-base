app.controller('referentielController', function($scope,$http,$ngBootbox,$compile,CRUDService,NotificationService) {

	$scope.table = null;
	$scope.sousValeursTable = null;
	$scope.dto = {};
	$scope.dtoFils = {};
	$scope.filtre = {};
	$scope.selected = null;
	$scope.mode = null;

	$scope.typeColonne = null;

	/*Referentiels Liste */
	$scope.entites = [];
	$scope.colonnes = [];
	$scope.baseUrl = "/commun/referentiel/rest/";

	$scope.zoneRecheche = false;

	$scope.init = function(){
		$scope.mode="read";
		CRUDService.init($scope);
	};

	$scope.add = function(){
		CRUDService.add( $scope);
	};

	$scope.save = function(){
//		if($scope.dto.valeurn!=null || $scope.dto.valeurc != null){
			$scope.dto.colonneId = $scope.filtre.colonne;
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				NotificationService.showSuccess();
			}).error(function(data, status, headers, config) {
				NotificationService.showTechnicalError();
			});
//		}else{
//			NotificationService.showAvertissement("Veuillez remplir une des valeurs ( Numérique ou Charactére )  !");
//		}
	};

	$scope.edit = function(){
		CRUDService.edit($scope);
//		$scope.getListSousValeurs();
	};

	$scope.load = function(id){
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
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



	$scope.refreshList = function(){
		$scope.table.ajax.reload();
	};


	$scope.getListColonne = function(entiteId){
		$http.get(context + $scope.baseUrl+"colonne/"+entiteId).success(function(data, status) {   
			$scope.colonnes = data;
		});
	};
	

	$scope.$watch('dto.valeurn', function(newValue, oldValue) {
		if(newValue != null){
			$scope.dto.valeurc = null;
		}
	});

	$scope.$watch('dto.valeurc', function(newValue, oldValue) {
		if(newValue != null){
			$scope.dto.valeurn = null;
		}
	});



	$scope.saveFils = function(){
		$scope.dtoFils.parentId =  $scope.dto.id;
		$http.post( context+$scope.baseUrl+"fils/save", angular.toJson($scope.dtoFils)).success(function(data, status) {   
			$scope.dtoFils = data;
			$scope.dtoFils = {};
			$scope.sousValeursTable.ajax.url($scope.baseUrl +"list/parent/"+$scope.dto.id).load();
			$('#modalReferentielFils').modal('hide');
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};

	
	$scope.removeValeur = function(id){
		$ngBootbox.confirm("Voulez-vous vraiment supprimer cette valeur ?").then(function () {
			if(id != null){
				$scope.confirmRemoveValeur(id);
			}
		}, function () {

		});
	};
	
	
	$scope.confirmRemoveValeur = function(id){
		$http.post(context+$scope.baseUrl+"fils/remove/"+id+'/'+$scope.dto.id).success(function(data, status) {   
			$scope.load($scope.dto.id);
			$scope.sousValeursTable.ajax.url($scope.baseUrl +"list/parent/"+$scope.dto.id).load();
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};

	
	$scope.addFilsReferentiel = function(){
		$scope.dtoFils = null;
		$('#modalReferentielFils').modal("show");
	};
	
	$scope.closeModal = function(){
		$("#modalReferentielFils").modal("hide");
	};
	
	$scope.getListSousValeurs = function(entiteId){
		$http.get(context + $scope.baseUrl+"values/notaffected/"+$scope.dto.colonneParentId+'/'+$scope.dto.id).success(function(data, status) {   
			$scope.listSousValeurs = data;
		});
	};
	
});


//GRID Referentiel
app.controller('referentielTableController', function($scope,$http) {

	$scope.$watch('$parent.filtre.entite', function(newValue, oldValue) {
		if(newValue != null){
			$scope.$parent.getListColonne(newValue);
			$scope.table.ajax.url($scope.$parent.baseUrl +"list/"+0).load();
		}
	});

	$scope.$watch('$parent.filtre.colonne', function(newValue, oldValue) {
		if(newValue != null){
			$scope.table.ajax.url($scope.$parent.baseUrl +"list/"+$scope.$parent.filtre.entite+"/"+newValue).load();
			$scope.getType($scope.$parent.filtre.colonne);
		}
	});

	$scope.getType = function(id){
		var index = $scope.$parent.colonnes.map(function (item) {
			return item.id.toString();
		}).indexOf(id);

		$scope.$parent.typeColonne = $scope.$parent.colonnes[index].typeCol;

	}


	$scope.getListEntite = function(idEntite){
		$scope.$parent.idEntite = idEntite;
		$scope.init(0,0);
		$http.get(context + $scope.baseUrl+"/entites/all").success(function(data, status) {   
			$scope.$parent.entites = data;
		});
	};

	$scope.init = function(entiteId,colonneId){
		$scope.$parent.table =  $("#referentielTable").mytable({
			name:"referentielTable",
			url:$scope.$parent.baseUrl +"list/"+entiteId+"/"+colonneId,
			idEntite:$scope.$parent.idEntite,
			columns:[ 
				{id : 'id'} ,
				{id : 'colonneLibelle',visible:false} ,
				{id : 'designation'}],
				ordre:[[0,"ASC"]]	
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


//GRID Quartier Controller
/*app.controller('sousValeursTableController', function($scope,$http,$compile) {


	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(newValue != null && !angular.isUndefined(newValue)){
			$scope.$parent.sousValeursTable.ajax.url($scope.$parent.baseUrl +"list/parent/"+newValue).load();
		}
	});

	$scope.init = function(){
		var id = -1;
		if(!angular.isUndefined($scope.$parent.dto.id)){
			id = $scope.$parent.dto.id;
		}
		$scope.$parent.sousValeursTable =  $("#sousValeursTable").mytable({
			name:"sousValeursTable",
			compile:$compile,
			scope:$scope,
			exportExcel:false,
			exportPDF:false,
			url:$scope.$parent.baseUrl +"list/parent/"+id,
			columns:[ 
				{id : 'id'} ,
				{id : 'valeur'},
				{width: 60,visible: true, orderable: false,"mRender": function(data, type, full) {
					return '<button type="button" class="btn btn-sm btn-icon btn-circle btn-danger " ng-click="$parent.removeValeur('+full.id+')" ><i class="fa fa-close"></i></button>';
				}}],
				ordre:[[0,"ASC"]]	
		});
	};


	
	
});*/