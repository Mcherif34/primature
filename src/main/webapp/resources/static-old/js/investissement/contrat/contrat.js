app.controller('contratController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {

	$scope.dto = {};
	$scope.invest = {};
	$scope.filtre = {};
	$scope.table = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.tableDossierApprob = null;
	$scope.dto.investisseurLastId = null;
	$scope.baseUrl = "/investissement/contrat/rest/";
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		CRUDService.init($scope);
		
		$scope.initListDemandes();
		$scope.initListProvinces();
		$scope.initListCommunes();
		$scope.initListKsars();
		$scope.initListInvestisseurs();
	};
	
	$scope.initListDemandes = function() {
		$http.get(context+"/investissement/demande/rest/getAll").success(function(data, status) {   
			$scope.demandes = data;
		});
	};
	
	$scope.initListProvinces = function() {
		$http.get(context+"/referentiel/province/rest/getAll").success(function(data, status) {   
			$scope.provinces = data;
		});
	};
	
	$scope.initListCommunes = function() {
		$http.get(context+"/referentiel/commune/rest/getAll").success(function(data, status) {   
			$scope.communes = data;
		});
	};
	
	$scope.initListKsars = function() {
		$http.get(context+"/referentiel/ksar/rest/getAll").success(function(data, status) {   
			$scope.ksars = data;
		});
	};
	
	$scope.initListInvestisseurs = function() {
		$http.get(context+"/referentiel/investisseur/rest/getAll").success(function(data, status) {   
			$scope.investisseurs = data;
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
			for(i = 0; i < $scope.dto.investContratsDTO.length; i++) {
			    if($scope.dto.investContratsDTO[i] != null && $scope.dto.investContratsDTO[i].onActif == 1) 
			    	$scope.dto.investisseurLastId = $scope.dto.investContratsDTO[i].investisseurId;
			}
			//if($scope.dto.investContratsDTO.slice(-1)[0] != null)
				//$scope.dto.investisseurLastId = $scope.dto.investContratsDTO.slice(-1)[0].investisseurId;
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveInvestisseur = function(){  
        var index = $scope.investisseurs.map(function (item) {
            return item.id;
         }).indexOf($scope.dto.investisseurId);
         
         if($scope.dto.investisseursDTO == null){
        	 $scope.dto.investisseursDTO = [];
         }
         $scope.investisseurs[index].id = $scope.dto.id;
         $scope.dto.investisseursDTO.push($scope.investisseurs[index]);
         console.log($scope.investisseurs[index]);
         $scope.investisseurs.splice(index, 1);
         $scope.dto.investisseurId = null;
    };
    
	$scope.save = function() {
		CRUDService.save($scope,$scope.dto).success(function(data, status) {
			$scope.dto.investContrat = {};
			$http.get(context+"/investissement/contrat/rest/getByNumero/"+$scope.dto.numeroContrat).success(function(data, status) { 
				$scope.dto.investContrat.investisseurId = $scope.dto.investisseurLastId;
				$scope.dto.investContrat.dateEffet = $scope.dto.dateContrat;
				$scope.dto.investContrat.contratId = data.id;
				$scope.dto.investContrat.naureBenef = 'A';
				$scope.dto.investContrat.onActif = 1;
				$http.post( context+"/investissement/investContrat/rest/save", angular.toJson($scope.dto.investContrat)).success(function(data, status) {   
					$scope.dto.investContrat = {};
					CRUDService.setEntityLoaded($scope,data);
					$scope.refreshList();
					NotificationService.showSuccess();
				}).error(function(data, status, headers, config) {
					if(status=="400" && data !="") {
						NotificationService.showCustomError(data);					
					} else {
						NotificationService.showTechnicalError();
					}
				});
			});
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
	
	$scope.loadCommunes = function(id) {
		$http.get(context+"/referentiel/commune/rest/getByProvince/"+id).success(function(data, status) { 
			$scope.communes = data;
		});
	}
	
	$scope.loadKsars = function(id) {
		$http.get(context+"/referentiel/ksar/rest/getByCommune/"+id).success(function(data, status) { 
			$scope.ksars = data;
		});
	}
	
	$scope.loadInvestContrat = function(id){
		$http.get(context+"/investissement/investContrat/rest/load/"+id).success(function(data, status) { 
			$scope.investContrat = data;
		});
	}
	
	$scope.addInvestContrat = function(){
		if($scope.dto.id != null){
			$('#investContratPopup').modal("show");
		}
		else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez modifier");
		}
	};
	
	$scope.removeInvestContrat = function(){
		if($scope.investContrat.id != null){
			$ngBootbox.confirm("Voulez-vous vraiment supprimer cet enregistrement ?").then(function () {
				$scope.removeConfirmInvestContrat($scope.investContrat.id);
			}, function () {

			});
		}else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez supprimer");
		}
	};
	
	$scope.removeConfirmInvestContrat = function(id) {
		$http.post( context+"/investissement/investContrat/rest/delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
			$scope.investContrat = {};
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.closeInvestContrat = function(){
		$('#investContratPopup').modal("hide");
	};
	
	$scope.saveInvestContrat = function() {
		if($scope.investContratForm.$valid) {
			$scope.dto.investContrat.contratId = $scope.dto.id;
			$scope.dto.investContrat.naureBenef = 'A';
			$scope.dto.investContrat.onActif = 1;
			$scope.dto.investContratLast =  $scope.dto.investContratsDTO.slice(-1)[0];
			$http.post( context+"/investissement/investContrat/rest/save", angular.toJson($scope.dto.investContrat)).success(function(data, status) {   
				$scope.dto.investContratLast.onActif = false;
				$http.post( context+"/investissement/investContrat/rest/save", angular.toJson($scope.dto.investContratLast)).success(function(data, status) {
					$scope.dto = {};
					$scope.load($scope.selected.id);
					$scope.dto.investContrat = {};
				});
			}).error(function(data, status, headers, config) {
				if(status=="400" && data !="") {
					NotificationService.showCustomError(data);					
				} else {
					NotificationService.showTechnicalError();
				}
			});
		}
		else{
			NotificationService.showAvertissement("Veuillez remplir tous les champs obligatoires !");
		}
	};
	
	$scope.addAvenant = function(){
		if($scope.dto.id != null){
			$('#avenantPopup').modal("show");
		}
		else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez modifier");
		}
	};
	
	$scope.closeAvenant = function(){
		$('#avenantPopup').modal("hide");
	};
	
	$scope.loadAvenant = function(id) {
		$http.get(context+"/investissement/avenant/rest/load/"+id).success(function(data, status) { 
			$scope.avenant = data;
		});
	}
	
	$scope.editAvenant = function() {
		if($scope.avenant.id != null) {
			$scope.dto.avenant = $scope.avenant;
			CRUDService.edit($scope);
			$('#avenantPopup').modal("show");
		}else{
			NotificationService.showAvertissement("Veuillez sélectionner un enregistrement");
		}
	}
	
	$scope.removeAvenant = function() {
		if($scope.avenant.id != null) {
			$ngBootbox.confirm("Voulez-vous vraiment supprimer cet enregistrement ?").then(function () {
				$scope.removeConfirmAvenant($scope.avenant.id);
			}, function () {

			});
		}else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez supprimer");
		}
	};
	
	$scope.removeConfirmAvenant = function(id) {
		$http.post( context+"/investissement/avenant/rest/delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
			$scope.avenant = {};
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveAvenant = function() {
		if($scope.avenantForm.$valid){
			$scope.dto.avenant.contratId = $scope.dto.id;
			$http.post( context+"/investissement/avenant/rest/save", angular.toJson($scope.dto.avenant)).success(function(data, status) {   
				$scope.dto = {};
				$scope.load($scope.selected.id);
				$scope.dto.avenant = {};
				$scope.closeAvenant();
			}).error(function(data, status, headers, config) {
				if(status=="400" && data !="") {
					NotificationService.showCustomError(data);					
				} else {
					NotificationService.showTechnicalError();
				}
			});
		}
		else{
			NotificationService.showAvertissement("Veuillez remplir tous les champs obligatoires !");
		}
	};
});

app.controller('contratTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'numeroContrat'},
			{mDataProp: 'dateContrat'},
			{mDataProp: 'dateFin'},
			{mDataProp: 'rfParcelle'},
			{mDataProp: 'superficie'}
		];
		$scope.$parent.table = TableManager.init("contratTable", $scope.$parent.baseUrl+"list", columns);
		
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

app.controller('investContratTableController', function($scope,$http,$compile) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null){
			$scope.$parent.tableInvestContrat.rows().clear();
			$scope.$parent.tableInvestContrat.rows.add($scope.$parent.dto.investContratsDTO).draw();
			$compile($scope.$parent.tableInvestContrat.rows())($scope);
		}
		else{
			$scope.$parent.tableInvestContrat.rows().clear();
			$scope.$parent.tableInvestContrat.rows.add([]).draw();
			$compile($scope.$parent.tableInvestContrat.rows())($scope);
		}
	});
	
	$scope.init = function() {
		$scope.$parent.tableInvestContrat =  $("#investContratTable").mytable({
			name:"investContratTable",
			compile:$compile,
			scope:$scope,
			local:true,
			columnsVis:false,
			pagination:false,
			search:false,
			columns:[ 
				{id: 'id', "visible": false},
				{id: 'investisseurNom'},
				{id: 'dateEffet'},
				{id: 'onActif', "mRender": function(data, type, full) {
					var result = '';
					if(full.onActif == true) {
						result = '<span class="code-color" style="background-color:#73c473; color: white; padding: 2px 15px 2px 15px;"> Actif </span>';
					}
					else {
						result = '<span class="code-color" style="background-color:#db6767; color: white; padding: 2px 15px 2px 15px;">Inactif</span>';
					}
					return result;
				}}
			]
		}); 

		$scope.$parent.tableInvestContrat.on('select', function ( e, dt, type, indexes ) {
			var rowData = 	$scope.$parent.tableInvestContrat.rows( indexes ).data().toArray();
			var id = null;
			if(rowData.length > 0){
				id = rowData[0].id;
				$scope.$parent.loadInvestContrat(id);
			}
		});

	};

});

app.controller('avenantTableController', function($scope,$http,$compile) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null){
			$scope.$parent.tableAvenant.rows().clear();
			$scope.$parent.tableAvenant.rows.add($scope.$parent.dto.avenantsDTO).draw();
			$compile($scope.$parent.tableAvenant.rows())($scope);
		}
		else{
			$scope.$parent.tableAvenant.rows().clear();
			$scope.$parent.tableAvenant.rows.add([]).draw();
			$compile($scope.$parent.tableAvenant.rows())($scope);
		}
	});
	
	$scope.init = function() {
		$scope.$parent.tableAvenant =  $("#avenantTable").mytable({
			name:"avenantTable",
			compile:$compile,
			scope:$scope,
			local:true,
			columnsVis:false,
			pagination:false,
			search:false,
			columns:[ 
				{id: 'id', "visible": false},
				{id: 'dateEffet'},
				{id: 'superficie'}
				]
		}); 

		$scope.$parent.tableAvenant.on('select', function ( e, dt, type, indexes ) {
			var rowData = 	$scope.$parent.tableAvenant.rows( indexes ).data().toArray();
			var id = null;
			if(rowData.length > 0){
				id = rowData[0].id;
				$scope.$parent.loadAvenant(id);
			}
		});

	};

});
