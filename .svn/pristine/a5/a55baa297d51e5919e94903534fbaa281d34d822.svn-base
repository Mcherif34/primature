app.controller('demandeController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {

	$scope.dto = {};
	$scope.filtre = {};
	$scope.table = null;
	$scope.selected = null;
	$scope.mode = null;
	
	$scope.baseUrl = "/investissement/demande/rest/";
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		CRUDService.init($scope);
		
		$scope.initListInvestisseurs();
		$scope.initListAvis();
		$scope.initListOrigines();
	};
	
	$scope.initListInvestisseurs = function() {
		$http.get(context+"/referentiel/investisseur/rest/getAll").success(function(data, status) {   
			$scope.investisseurs = data;
			
		});
	};
	
	$scope.initListAvis = function() {
		$http.get(context+"/list/REF/avisDemande/avis").success(function(data, status) {   
			$scope.avis = data;
		});
	};
	
	$scope.initListOrigines = function() {
		$http.get(context+"/list/REF/demande/origine").success(function(data, status) {   
			$scope.origines = data;
		});
	};
	
	$scope.addAvisDemande = function(){
		if($scope.dto.id != null){
			$('#avisDemandePopup').modal("show");
		}
		else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez modifier");
		}
	};
	
	$scope.closeAvisDemande = function(){
		$('#avisDemandePopup').modal("hide");
	};
	
	$scope.add = function() {
		CRUDService.add($scope);
	};

	$scope.edit = function() {
		CRUDService.edit($scope);
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.save = function() {
		CRUDService.save($scope,$scope.dto).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			$scope.refreshList();
			NotificationService.showSuccess();
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.refreshList = function() {
		$scope.table.ajax.reload();
		$scope.dto = {};
	};

	$scope.remove = function() {
		$scope.dto = {};
		var count = $scope.table.rows( { selected: true } ).count();
		if(count > 0) {
			$ngBootbox.confirm("Voulez-vous vraiment supprimer cet enregistrement ?").then(function () {
				if($scope.selected.id != null) {
					$scope.confirmDelete($scope.selected.id);
				}
			}, function () {

			});
		} else {
			NotificationService.showAvertissement("Veuillez sélectionner l'enregistrement que vous voulez supprimer");
		}
	};

	$scope.confirmDelete = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.loadAvisDemande = function(id){
		$http.get(context+"/investissement/avisDemande/rest/load/"+id).success(function(data, status) { 
			$scope.avisDemande = data;
		});
	}
	
	$scope.editAvisDemande = function() {
		if($scope.avisDemande.id != null) {
			$scope.dto.avisDemande = $scope.avisDemande;
			CRUDService.edit($scope);
			$('#avisDemandePopup').modal("show");
		}else{
			NotificationService.showAvertissement("Veuillez sélectionner un enregistrement");
		}
	}
	
	$scope.saveAvisDemande = function() {
		if($scope.dto.avisDemandesDTO.slice(-1)[0] != null && $scope.dto.avisDemandesDTO.slice(-1)[0].avisId == 1) {
			NotificationService.showAvertissement("Cette demande dispose déjà d'un avis favorable !");
		} else {
			if($scope.avisDemandeForm.$valid) {
				$scope.dto.avisDemande.demandeId = $scope.dto.id;
				$http.post( context+"/investissement/avisDemande/rest/save", angular.toJson($scope.dto.avisDemande)).success(function(data, status) {   
					$scope.dto.avisDemande = data;
					$scope.dto = {};
					$scope.load($scope.selected.id);
					$scope.dto.avisDemande = {};
					$scope.closeAvisDemande();
				}).error(function(data, status, headers, config) {
					if(status=="400" && data !=""){
						NotificationService.showCustomError(data);					
					}else{
						NotificationService.showTechnicalError();
					}
				});
			}
			else{
				NotificationService.showAvertissement("Veuillez remplir tous les champs obligatoires !");
			}
		}
	};
	
	$scope.removeAvisDemande = function(){
		if($scope.avisDemande.id != null){
			$ngBootbox.confirm("Voulez-vous vraiment supprimer cet enregistrement ?").then(function () {
				$scope.removeConfirmAvisDemande($scope.avisDemande.id);
			}, function () {

			});
		}else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez supprimer");
		}
	};
	
	$scope.removeConfirmAvisDemande = function(id) {
		$http.post( context+"/investissement/avisDemande/rest/delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
			$scope.avisDemande = {};
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
});

app.controller('demandeTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'dateDemande'},
			{mDataProp: 'superficie'},
			{mDataProp: 'refParcelle'},
			{mDataProp: 'investisseurNom'}
		];
		$scope.$parent.table = TableManager.init("demandeTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.table.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.table.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('avisDemandeTableController', function($scope,$http,$compile) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null){
			$scope.$parent.tableAvisDemande.rows().clear();
			$scope.$parent.tableAvisDemande.rows.add($scope.$parent.dto.avisDemandesDTO).draw();
			$compile($scope.$parent.tableAvisDemande.rows())($scope);
		}
		else{
			$scope.$parent.tableAvisDemande.rows().clear();
			$scope.$parent.tableAvisDemande.rows.add([]).draw();
			$compile($scope.$parent.tableAvisDemande.rows())($scope);
		}
	});
	
	$scope.init = function() {
		$scope.$parent.tableAvisDemande =  $("#avisDemandeTable").mytable({
			name:"avisDemandeTable",
			compile:$compile,
			scope:$scope,
			local:true,
			columnsVis:false,
			pagination:false,
			search:false,
			columns:[ 
				{id: 'id', "visible": false},
				{id: 'dateAvis'},
				{id: 'avisLibelle'},
				{id: 'motif'}
				]
		}); 

		$scope.$parent.tableAvisDemande.on('select', function ( e, dt, type, indexes ) {
			var rowData = 	$scope.$parent.tableAvisDemande.rows( indexes ).data().toArray();
			var id = null;
			if(rowData.length > 0){
				id = rowData[0].id;
				$scope.$parent.loadAvisDemande(id);
			}
		});

	};

});
