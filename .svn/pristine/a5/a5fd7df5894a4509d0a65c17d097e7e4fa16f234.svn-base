app.controller('dossierApprobhcController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {

	$scope.dto = {};
	$scope.dto.idSousRubriques = [];
	$scope.filtre = {};
	$scope.table = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.parcelle = {};
	
	$scope.baseUrl = "/investissement/dossierApprobhc/rest/";
	
	$scope.zoneRecheche = false;

	$scope.init = function() {
		//$scope.mode="read";
		CRUDService.init($scope);
		
		$scope.initListInvestisseurs();
		$scope.initListKsars();
		$scope.initListProvinces();
		$scope.initListCommunes();
		$scope.initListRubriques();
		$scope.initListSousRubriques();
		$scope.initListParcelles();
		$scope.initListNatureActs();
	};
	
	$scope.initListInvestisseurs = function() {
		$http.get(context+"/referentiel/investisseur/rest/getAll").success(function(data, status) {   
			$scope.investisseurs = data;
		});
	};
	
	$scope.initListKsars = function() {
		$http.get(context+"/referentiel/ksar/rest/getAll").success(function(data, status) {   
			$scope.ksars = data;
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
	
	$scope.initListNatureActs = function() {
		$http.get(context+"/list/REF/activite/natureAct").success(function(data, status) {   
			$scope.natureActs = data;
		});
	};
	
	$scope.add = function() {
		CRUDService.add($scope);
		$scope.loadSousRubriques(-1);
		$scope.dto.idSousRubriques = [];
		if(!angular.equals($scope.parcelle, {})) {
			$scope.disabled = true;
			$scope.dto.parcelleId = $scope.parcelle.id;
			$scope.dto.supTotal = $scope.parcelle.superficie;
			$scope.dto.provinceId = $scope.parcelle.provinceId;
			$scope.dto.communeId = $scope.parcelle.communeId;
			$scope.dto.ksarId = $scope.parcelle.ksarId;
			$scope.dto.investisseurId = $scope.parcelle.investisseurId;
		}
	};

	$scope.edit = function() {
		CRUDService.edit($scope);
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
			if($scope.parcelle != null) {
				$scope.dto.supTotal = $scope.parcelle.superficie;
				$scope.dto.parcelleId = $scope.parcelle.id;
			}
			if($scope.dto.rubriqueId != null) {
				$scope.loadSousRubriques($scope.dto.rubriqueId);
			}
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.save = function() {
		$scope.dto.statutId = 7;
		$scope.dto.utilisateurSaisieId = 1;
		$http.get(context+"/referentiel/rubrique/rest/load/"+$scope.dto.rubriqueId).success(function(data, status) { 
			$scope.rubrique = data;
			if(($scope.rubrique.typeId == 1 || $scope.rubrique.typeId == 2 || $scope.rubrique.typeId == 3) && $scope.dto.supApprouve == null) {
				NotificationService.showAvertissement("Veuillez remplir tous les champs obligatoires !");
			} else {
				$http.get(context+"/investissement/dossierApprobhc/rest/getByParcelle/"+$scope.parcelle.id+"/"+$scope.dto.rubriqueId).success(function(data, status) {   
					var sumsup = parseInt($scope.dto.supApprouve);
					for(i = 0; i < data.length; i++) {
						if($scope.dto.id == null || ($scope.dto.id != null && data[i].id != $scope.dto.id))
						sumsup += parseInt(data[i].supApprouve);
					}
					if(sumsup > $scope.parcelle.superficie) {
						NotificationService.showAvertissement("La somme des superficies à approuver ne doit pas dépasser la superficie totale !");
					} else {
						CRUDService.save($scope,$scope.dto).success(function(data, status) {   
							CRUDService.setEntityLoaded($scope,data);
							$scope.refreshList();
							NotificationService.showSuccess();
						}).error(function(data, status, headers, config) {
							NotificationService.showTechnicalError();
						});
					}
				});
			}
		});
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
		$http.get(context+"/investissement/activite/rest/load/"+id).success(function(data, status) { 
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
		$http.post( context+"/investissement/activite/rest/delete/"+id).success(function(data, status) { 
			$scope.dto = {};
			$scope.load($scope.selected.id);
			$scope.activite = {};
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveActivite = function() {
		if($scope.activiteForm.$valid){
			$scope.dto.activite.dossierApprobId = $scope.dto.id;
			$scope.dto.activite.utilisateurSaisieId = 1;
			$http.post( context+"/investissement/activite/rest/save", angular.toJson($scope.dto.activite)).success(function(data, status) {
				if($scope.dto.activite.natureActId == 12)
					$scope.dto.statutId = 8;
				else if($scope.dto.activite.natureActId == 14)
					$scope.dto.statutId = 9;
				else if($scope.dto.activite.natureActId == 16)
					$scope.dto.statutId = 10;
				else
					$scope.dto.statutId = 7;
				$http.post( context+"/investissement/dossierApprobhc/rest/save", angular.toJson($scope.dto)).success(function(data, status) {
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

app.controller('dossierApprobTableController', function($scope,$http) {
	$scope.init = function(parcelleId) {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'numeroDossier'},
			{mDataProp: 'dateDepot'},
			{mDataProp: 'supApprouve'},
			{mDataProp: 'statutLibelle', "mRender": function(data, type, full) {
				var result = '';
				if(full.statutId == 8) {
					result = '<span class="code-color" style="background-color:#f2b860; color: white; padding: 2px 15px 2px 15px;"> '+full.statutLibelle+' </span>';
				}
				else if(full.statutId == 9) {
					result = '<span class="code-color" style="background-color:#73c473; color: white; padding: 2px 15px 2px 15px;"> '+full.statutLibelle+' </span>';
				}
				else if(full.statutId == 10) {
					result = '<span class="code-color" style="background-color:#db6767; color: white; padding: 2px 15px 2px 15px;"> '+full.statutLibelle+' </span>';
				}
				else {
					result = '<span class="code-color" style="background-color:#87cef2; color: white; padding: 2px 15px 2px 15px;"> '+full.statutLibelle+' </span>';
				}
				return result;
			}}
		];
		if(parcelleId != null) {
			$http.get(context+"/investissement/parcelle/rest/load/"+parcelleId).success(function(data, status) {
				$scope.$parent.parcelle = data;
				$scope.$parent.disabled = true;
				$scope.$parent.dto.parcelleId = $scope.$parent.parcelle.id;
				$scope.$parent.dto.supTotal = $scope.$parent.parcelle.superficie;
				$scope.$parent.dto.provinceId = $scope.$parent.parcelle.provinceId;
				$scope.$parent.dto.communeId = $scope.$parent.parcelle.communeId;
				$scope.$parent.dto.ksarId = $scope.$parent.parcelle.ksarId;
				$scope.$parent.dto.investisseurId = $scope.$parent.parcelle.investisseurId;
			});
			$scope.$parent.table = TableManager.init("dossierApprobTable", $scope.$parent.baseUrl+"list/parcelle/"+parcelleId, columns);
		} else {
			$scope.$parent.table = TableManager.init("dossierApprobTable", $scope.$parent.baseUrl+"list/", columns);
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
					if(full.natureActId == 12) {
						result = '<span class="code-color" style="background-color:#f2b860; color: white; padding: 2px 15px 2px 15px;"> '+full.natureActLibelle+' </span>';
					}
					else if(full.natureActId == 14) {
						result = '<span class="code-color" style="background-color:#73c473; color: white; padding: 2px 15px 2px 15px;"> '+full.natureActLibelle+' </span>';
					}
					else if(full.natureActId == 16) {
						result = '<span class="code-color" style="background-color:#db6767; color: white; padding: 2px 15px 2px 15px;"> '+full.natureActLibelle+' </span>';
					}
					else {
						result = '<span class="code-color" style="background-color:#87cef2; color: white; padding: 2px 15px 2px 15px;"> '+full.natureActLibelle+' </span>';
					}
					return result;
				}}
				]
		}); 

		$scope.$parent.tableActivite.on('select', function ( e, dt, type, indexes ) {
			var rowData = 	$scope.$parent.tableActivite.rows( indexes ).data().toArray();
			var id = null;
			if(rowData.length > 0) {
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
					return '<input type="checkbox"  ng-disabled="mode == \'read\'" ng-checked="checked('+full.id+')" ng-click="toggleChecked('+full.id+')" />';
				}},
				{id: 'designation'}
				]
		});
	};

});