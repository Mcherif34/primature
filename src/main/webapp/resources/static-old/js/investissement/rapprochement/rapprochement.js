app.controller('rapprochementController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants, $compile) {

	$scope.dto = {};
	$scope.filtre = {};
	$scope.table = null;
	$scope.selected = null;
	$scope.mode = null;
	
	$scope.baseUrl = "/investissement/contrat/rest/";
	$scope.demandeUrl = "/investissement/demande/rest/";
	
	$scope.demandesByContrat = [];
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		CRUDService.init($scope);
		
		$scope.initListDemandes();
		$scope.initListKsars();
		$scope.initListCommunes();
	};
	
	$scope.initListDemandes = function() {
		$http.get(context+"/investissement/demande/rest/getAll").success(function(data, status) {   
			$scope.demandes = data;
		});
	};
	
	$scope.getDemandesByContrat = function(id) {
		$http.get(context+"/investissement/demande/rest/getByContrat/"+id).success(function(data, status) { 
			$scope.demandesByContrat = data;
		}); 
	};
	
	
	$scope.initListKsars = function() {
		$http.get(context+"/referentiel/ksar/rest/getAll").success(function(data, status) {   
			$scope.ksars = data;
		});
	};
	
	$scope.initListCommunes = function() {
		$http.get(context+"/referentiel/commune/rest/getAll").success(function(data, status) {   
			$scope.communes = data;
		});
	};
	
	$scope.loadDemande = function(id) {
		$http.get(context+"/investissement/demande/rest/load/"+id).success(function(data, status) { 
			$scope.demande = data;
		}); 
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
	
	$scope.associate = function() {
		CRUDService.save($scope,$scope.dto).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			$scope.refreshList();
			NotificationService.showSuccess();
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
		$scope.closeRapprochement();
	};
	
	$scope.dissociate = function() {
		$scope.dto.demandeId = null;
		CRUDService.save($scope,$scope.dto).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			$scope.demande = null;
			$scope.refreshList();
			NotificationService.showSuccess();
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
		$scope.closeRapprochement();
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
	
	$scope.associateDemande = function(){
		if($scope.dto.id != null){
			$('#rapprochementPopup').modal("show");
		}
		else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez modifier");
		}
	};
	
	$scope.closeRapprochement = function(){
		$('#rapprochementPopup').modal("hide");
	};
});

app.controller('contratTableController', function($scope,$http) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null){
			$scope.$parent.tableDemande.ajax.url('/investissement/demande/rest/list/'+newValue).load();
		}
		else{
			$scope.$parent.tableDemande.ajax.url('/investissement/demande/rest/list').load();
		}
	});
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'numeroContrat'},
			{mDataProp: 'dateContrat'},
			{mDataProp: 'dateFin'},
			{mDataProp: 'rfParcelle'},
			{mDataProp: 'demandeDate'},
			{mDataProp: 'demandeId', "visible": false}
		];
		$scope.$parent.table = TableManager.init("contratTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.table.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.table.rows(indexes).data().toArray();
			var id = null;
			var demandeId = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});

app.controller('demandeTableController', function($scope,$http,$compile) {
	$scope.init = function() {
		$scope.$parent.tableDemande =  $("#demandeTable").mytable({
			name:"demandeTable",
			url:'/investissement/demande/rest/list',
			compile:$compile,
			scope:$scope,
			columnsVis:false,
			exportExcel:false,
			columns:[ 
				{id: 'id', "visible": false},
				{id: 'dateDemande'},
				{id: 'superficie'},
				{id: 'refParcelle'}
				]
		}); 

		$scope.$parent.tableDemande.on('select', function ( e, dt, type, indexes ) {
			var rowData = 	$scope.$parent.tableDemande.rows( indexes ).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.loadDemande(rowData[0].id);
				$scope.$parent.dto.demandeId = rowData[0].id;
				$http.get(context+"/investissement/demande/rest/load/"+rowData[0].id).success(function(data, status) { 
					$scope.$parent.dto.rfParcelle = data.refParcelle;
				});
			}
		});

	};

});
