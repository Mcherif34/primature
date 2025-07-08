app.controller('dossierSubvhcController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {

	$scope.dto = {};
	$scope.dto.idSousRubriques = [];
	$scope.filtre = {};
	$scope.table = null;
	$scope.selected = null;
	$scope.mode = null;
	
	$scope.baseUrl = "/investissement/dossierSubvhc/rest/";
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		//$scope.mode="read";
		CRUDService.init($scope);
		
		$scope.initListInvestisseurs();
		$scope.initListDossierApprobs();
		$scope.initListRubriques();
		$scope.initListSousRubriques();
		$scope.initListParcelles();
		$scope.initListNatureActSubvs();
	};
	
	$scope.initListInvestisseurs = function() {
		$http.get(context+"/referentiel/investisseur/rest/getAll").success(function(data, status) {   
			$scope.investisseurs = data;
		});
	};
	
	$scope.initListDossierApprobs = function() {
		$http.get(context+"/investissement/dossierApprob/rest/getAll").success(function(data, status) {   
			$scope.dossierApprobs = data;
		});
	};
	
	$scope.initListRubriques = function() {
		$http.get(context+"/referentiel/rubrique/rest/getAll").success(function(data, status) {   
			$scope.rubriques = data;
		});
	};
	
	$scope.initListSousRubriques = function() {
		$http.get(context+"/referentiel/sousRubrique/rest/getAll").success(function(data, status) {   
			$scope.sousRubriques = data;
		});
	};
	
	$scope.initListParcelles = function() {
		$http.get(context+"/investissement/parcelle/rest/getAll").success(function(data, status) {   
			$scope.parcelles = data;
		});
	};
	
	$scope.loadSousRubriques = function(id) {
		$http.get(context+"/referentiel/sousRubrique/rest/getByRubrique/"+id).success(function(data, status) { 
			$scope.sousRubriques = data;
			$scope.tableSousRubrique.rows().clear();
			$scope.tableSousRubrique.rows.add($scope.sousRubriques).draw();
		});
	}
	
	$scope.initListNatureActSubvs = function() {
		$http.get(context+"/list/REF/activiteSubv/natureActSubv").success(function(data, status) {   
			$scope.natureActSubvs = data;
		});
	};
	
	$scope.add = function() {
		CRUDService.add($scope);
		if($scope.dossierApprob != null && !angular.equals($scope.dossierApprob, {})) {
			$scope.disabled = true;
			$scope.dto.dossierApprobId = $scope.dossierApprob.id;
			$scope.dto.investisseurId = $scope.dossierApprob.investisseurId;
			$scope.dto.rubriqueId = $scope.dossierApprob.rubriqueId;
			if($scope.dto.rubriqueId != null) {
				$scope.loadSousRubriques($scope.dto.rubriqueId);
			}
			$scope.dto.idSousRubriques = $scope.dossierApprob.idSousRubriques;
		}
		if($scope.parcelle != null && !angular.equals($scope.parcelle, {})) {
			$scope.loadSousRubriques(-1);
			$scope.dto.idSousRubriques = [];
			$scope.disabled = true;
			$scope.dto.parcelleId = $scope.parcelle.id;
			$scope.dto.supTotal = $scope.parcelle.superficie;
			$scope.dto.investisseurId = $scope.parcelle.investisseurId;
		}
	};

	$scope.edit = function() {
		CRUDService.edit($scope);
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			
			if($scope.dto.rubriqueId != null) {
				$scope.loadSousRubriques($scope.dto.rubriqueId);
			}
			
			if($scope.dossierApprob != null) {
				$scope.dto.supApprouve = $scope.dossierApprob.supApprouve;
			}
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.save = function() {
		$scope.dto.statutId = 7;
		$scope.dto.utilisateurSaisieId = 1;
		var mandatory = false;
		if($scope.dossierApprob != null) {
			for(i = 0; i < $scope.dto.sousRubriqueDTOs.length; i++) {
				if(($scope.dto.sousRubriqueDTOs[i].typeId == 1 || $scope.dto.sousRubriqueDTOs[i].typeId == 2 || $scope.dto.sousRubriqueDTOs[i].typeId == 3) && $scope.dto.supSubv == null) {
					mandatory = true;
				}
			}
		}
		if($scope.parcelle != null) {
			for(i = 0; i < $scope.dto.idSousRubriques.length; i++) {
				for(j = 0; j < $scope.sousRubriques.length; j++) {
					if($scope.dto.idSousRubriques[i] == $scope.sousRubriques[j].id && ($scope.sousRubriques[j].typeId == 1 || $scope.sousRubriques[j].typeId == 2 || $scope.sousRubriques[j].typeId == 3) && $scope.dto.supSubv == null) {
						mandatory = true;
					}
				}
			}
		}
		if(mandatory) {
			NotificationService.showAvertissement("Veuillez remplir tous les champs obligatoires !");
		} else {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				NotificationService.showSuccess();
			}).error(function(data, status, headers, config) {
				NotificationService.showTechnicalError();
			});
		}
	};
	
	$scope.refreshList = function() {
		$scope.loadSousRubriques(-1);
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
	
	$scope.addActivite = function(){
		if($scope.dto.id != null){
			$('#activitePopup').modal("show");
		}
		else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez modifier");
		}
	};
	
	$scope.closeActivite = function(){
		$('#activitePopup').modal("hide");
	};
	
	$scope.loadActivite = function(id) {
		$http.get(context+"/investissement/activiteSubv/rest/load/"+id).success(function(data, status) { 
			$scope.activite = data;
		});
	}
	
	$scope.editActivite = function() {
		if($scope.activite.id != null) {
			$scope.dto.activite = $scope.activite;
			CRUDService.edit($scope);
			$('#activitePopup').modal("show");
		}else{
			NotificationService.showAvertissement("Veuillez sélectionner un enregistrement");
		}
	}
	
	$scope.removeActivite = function() {
		if($scope.activite.id != null) {
			$ngBootbox.confirm("Voulez-vous vraiment supprimer cet enregistrement ?").then(function () {
				$scope.removeConfirmActivite($scope.activite.id);
			}, function () {

			});
		}else{
			NotificationService.showAvertissement("Veuillez sélectionner l’enregistrement que vous voulez supprimer");
		}
	};
	
	$scope.removeConfirmActivite = function(id) {
		$http.post( context+"/investissement/activiteSubv/rest/delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
			$scope.activite = {};
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveActivite = function() {
		if($scope.activiteForm.$valid){
			$scope.dto.activite.dossierSubvId = $scope.dto.id;
			$scope.dto.activite.utilisateurSaisieId = 1;
			$http.post( context+"/investissement/activiteSubv/rest/save", angular.toJson($scope.dto.activite)).success(function(data, status) {   
				if($scope.dto.activite.natureActSubvId == 18)
					$scope.dto.statutId = 8;
				else if($scope.dto.activite.natureActSubvId == 22)
					$scope.dto.statutId = 9;
				else
					$scope.dto.statutId = 7;
				$http.post( context+"/investissement/dossierSubv/rest/save", angular.toJson($scope.dto)).success(function(data, status) {
					$scope.dto = {};
					$scope.load($scope.selected.id);
					$scope.dto.activite = {};
					$scope.closeActivite();
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
});

app.controller('dossierSubvTableController', function($scope,$http) {
	$scope.init = function(dossierApprobId, parcelleId) {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'numeroDossier'},
			{mDataProp: 'dateDepot'},
			{mDataProp: 'supSubv'},
			{mDataProp: 'statutLibelle', "mRender": function(data, type, full) {
				var result = '';
				if(full.statutId == 8) {
					result = '<span class="code-color" style="background-color:#f2b860; color: white; padding: 2px 15px 2px 15px;"> '+full.statutLibelle+' </span>';
				}
				else if(full.statutId == 9) {
					result = '<span class="code-color" style="background-color:#73c473; color: white; padding: 2px 15px 2px 15px;"> '+full.statutLibelle+' </span>';
				}
				else {
					result = '<span class="code-color" style="background-color:#87cef2; color: white; padding: 2px 15px 2px 15px;"> '+full.statutLibelle+' </span>';
				}
				return result;
			}}
		];
		
		if(dossierApprobId != null) {
			$http.get(context+"/investissement/dossierApprobhc/rest/load/"+dossierApprobId).success(function(data, status) {
				$scope.$parent.dossierApprob = data;
				$scope.$parent.disabled = true;
				$scope.$parent.disabledSubv = true;
				$scope.$parent.dto.dossierApprobId = $scope.$parent.dossierApprob.id;
				$scope.$parent.dto.supApprouve = $scope.$parent.dossierApprob.supApprouve;
				$scope.$parent.dto.investisseurId = $scope.$parent.dossierApprob.investisseurId;
				$scope.$parent.dto.rubriqueId = $scope.$parent.dossierApprob.rubriqueId;
				$scope.$parent.dto.idSousRubriques = $scope.$parent.dossierApprob.idSousRubriques;
				$scope.$parent.dto.sousRubriqueDTOs = $scope.$parent.dossierApprob.sousRubriqueDTOs;
				$scope.$parent.loadSousRubriques($scope.$parent.dto.rubriqueId);
				
			});
			$scope.$parent.table = TableManager.init("dossierSubvTable", $scope.$parent.baseUrl+"list/dossierApprob/"+dossierApprobId, columns);
		}
		else if(parcelleId != null) {
			$http.get(context+"/investissement/parcelle/rest/load/"+parcelleId).success(function(data, status) {
				$scope.$parent.parcelle = data;
				$scope.$parent.disabled = true;
				$scope.$parent.dto.parcelleId = $scope.$parent.parcelle.id;
				$scope.$parent.dto.supTotal = $scope.$parent.parcelle.superficie;
				$scope.$parent.dto.investisseurId = $scope.$parent.parcelle.investisseurId;
				
			});
			$scope.$parent.table = TableManager.init("dossierSubvTable", $scope.$parent.baseUrl+"list/parcelle/"+parcelleId, columns);
		}
		else {
			$scope.$parent.table = TableManager.init("dossierSubvTable", $scope.$parent.baseUrl+"list/", columns);
		}
		
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

app.controller('activiteTableController', function($scope,$http,$compile) {
	$scope.$watch('$parent.dto.id', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null){
			$scope.$parent.tableActivite.rows().clear();
			$scope.$parent.tableActivite.rows.add($scope.$parent.dto.activitesDTO).draw();
			$compile($scope.$parent.tableActivite.rows())($scope);
		}
		else{
			$scope.$parent.tableActivite.rows().clear();
			$scope.$parent.tableActivite.rows.add([]).draw();
			$compile($scope.$parent.tableActivite.rows())($scope);
		}
	});
	
	$scope.init = function() {
		$scope.$parent.tableActivite =  $("#activiteTable").mytable({
			name:"activiteTable",
			compile:$compile,
			scope:$scope,
			local:true,
			columnsVis:false,
			pagination:false,
			search:false,
			columns:[ 
				{id: 'id', "visible": false},
				{id: 'dateActivite'},
				{id: 'observation'},
				{id: 'natureActLibelle', "mRender": function(data, type, full) {
					var result = '';
					if(full.natureActSubvId == 18) {
						result = '<span class="code-color" style="background-color:#f2b860; color: white; padding: 2px 15px 2px 15px;"> '+full.natureActSubvLibelle+' </span>';
					}
					else if(full.natureActSubvId == 22) {
						result = '<span class="code-color" style="background-color:#73c473; color: white; padding: 2px 15px 2px 15px;"> '+full.natureActSubvLibelle+' </span>';
					}
					else {
						result = '<span class="code-color" style="background-color:#87cef2; color: white; padding: 2px 15px 2px 15px;"> '+full.natureActSubvLibelle+' </span>';
					}
					return result;
				}}
				]
		}); 

		$scope.$parent.tableActivite.on('select', function ( e, dt, type, indexes ) {
			var rowData = 	$scope.$parent.tableActivite.rows( indexes ).data().toArray();
			var id = null;
			if(rowData.length > 0){
				id = rowData[0].id;
				$scope.$parent.loadActivite(id);
			}
		});

	};

});

app.controller('sousRubriqueTableController', function($scope,$http,$compile) {	
	$scope.toggleChecked = function (idSousRubrique) {
		var index = $scope.$parent.dto.idSousRubriques.indexOf(idSousRubrique);
		if (index > -1) {
			$scope.$parent.dto.idSousRubriques.splice(index, 1);
		} else {
			$scope.$parent.dto.idSousRubriques.push(idSousRubrique);
		}
	};
	
	$scope.checked = function (idSousRubrique) {
		if($scope.$parent.dto.idSousRubriques != null)
			return $scope.$parent.dto.idSousRubriques.indexOf(idSousRubrique) > -1;
	};
	
	$scope.init = function() {
		$scope.$parent.tableSousRubrique =  $("#sousRubriqueTable").mytable({
			name:"sousRubriqueTable",
			compile:$compile,
			scope:$scope,
			local:true,
			columnsVis:false,
			pagination:false,
			search:false,
			columns:[ 
				{id: 'id', "visible": false},
				{"sWidth": "10px", bSortable: false,searchable:false , orderable: false,"mRender": function(data, type, full) {
					return '<input type="checkbox" ng-disabled="'+$scope.$parent.disabledSubv+'" ng-checked="checked('+full.id+')" ng-click="toggleChecked('+full.id+')" />';
				}},
				{id: 'designation'}
				]
		});
	};

});