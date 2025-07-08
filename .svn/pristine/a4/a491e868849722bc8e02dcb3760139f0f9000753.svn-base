app.controller('zoneRechercheController', function($scope,$http,$compile, $compile,CRUDService,$ngBootbox,NotificationService) {
	$scope.baseUrl = "/recherche/rest/";
	$scope.columns = [];
	$scope.selectedColumn = null;
	$scope.loading = true;

	$scope.$watch('$parent.idEntite', function(newValue, oldValue) {
		if(newValue != null){
	    	$("#formZoneRecherche").data("idEntite", newValue);
			$http.post(context + $scope.baseUrl+newValue).success(function(data, status) { 
		    	$scope.columns = [];
				data.forEach(function(item) {
				    if (item.columnName) {
				    	$scope.columns.push(item);
				    }
				}); 
				$scope.loading = false;
			}).error(function(data, status, headers, config) {
				$scope.loading = false;
				NotificationService.showTechnicalError();
			});
		};
	});

	$scope.$watch('$parent.marcheId', function(newValue, oldValue) {
		if(newValue != null){
	    	$("#formZoneRecherche").data("marcheId", newValue);
		}
	});
	
    $scope.rechercher = function() {
    	$("#formZoneRecherche").data("filtres", $("#formZoneRecherche").serializeArray());
    	$scope.$parent.table.columns().search("");
    	$("#"+$scope.$parent.table.context[0].sTableId+"_wrapper input[id^='search_']").val("");
    	$scope.$parent.table.ajax.reload();
    };

    $scope.reset = function() {
    	$("#formZoneRecherche")[0].reset();
    	  $scope.rechercher();
    };

	$scope.add = function(){
		if($scope.selectedColumn){
			var html = "";
			if($scope.selectedColumn.listDTOs !=null && $scope.selectedColumn.listDTOs.length >0){
				html = "<li><select-searche></select-searche></li>";
			}else if($scope.selectedColumn.typeCol === "D"){
				html = "<li><input-date-searche></input-date-searche></li>";
			}else if($scope.selectedColumn.typeCol === "C"){
				html = '<li><input-searche numeric="false" ></input-searche></li>';
			}else if($scope.selectedColumn.typeCol === "N"){
				html = '<li><input-searche numeric="false" ></input-searche></li>';
			}
			angular.element(document.getElementById('zoneRecherche')).append( $compile(html)($scope));
			$scope.columns.splice($scope.columns.indexOf($scope.selectedColumn),1);
		}
	};
	
}).directive('inputSearche', function () {
  return {
    restrict: 'E',
    scope: {
    	numeric: '='
     },
    template:'<div><label class="control-label">'+
		'{{column.columnName}}'+
		'</label><div class="input-group">'+
		'<input type="text" '+
		'ng-class="numeric ? \'form-control form-field input-number\' : \'form-control form-field \' "'+
		'name="{{column.colonne}}" '+
		'ng-model="customModel"'+
		'only-digits="{{numeric}}" />'+
		'<span class="input-group-addon btn btn-danger" style="cursor:pointer;" ng-click="remove()"><i class="fa fa-trash-o"></i></span>'+
		'</div></div>',
    controller: function($scope, $element) {
    	$scope.column = $scope.$parent.selectedColumn;
        $scope.remove = function() {
          $scope.$parent.columns.push($scope.column);
		  $element.parent("li").remove();
		  $scope.$parent.rechercher();
		  $scope.$destroy();
        }
    }
  };
}).directive('selectSearche', function () {
	  return {
		    restrict: 'E',
		    scope: {},
		    template: '<div><label class="control-label">'+
				'{{column.columnName}}'+
				'</label><div class="input-group">'+
				'<select type="text" '+
				'class="form-control" '+
				'name="{{column.colonne}}" '+
				'ng-model="customModel" ><option value=""></option>'+
				'<option ng-repeat="item in column.listDTOs" ng-value="item.id">{{item.libelle}}</option></select>'+
				'<span class="input-group-addon btn btn-danger" style="cursor:pointer;" ng-click="remove()"><i class="fa fa-trash-o"></i></span>'+
				'</div></div>',
		    controller: function($scope, $element) {
		    	$scope.column = $scope.$parent.selectedColumn;
		        $scope.remove = function() {
		          $scope.$parent.columns.push($scope.column);
				  $element.parent("li").remove();
				  $scope.$parent.rechercher();
				  $scope.$destroy();
		        }
		    }
		  };
}).directive('inputDateSearche', function () {
  return {
	    restrict: 'E',
	    scope: {},
	    template: '<div><label class="control-label">'+
			'{{column.columnName}}'+
			'</label><div class="input-group">'+
			'<input type="text" '+
			'ng-class="\'form-control form-field\'"'+
			'name="{{column.colonne}}" '+
			'daterangepicker="daterangepicker" '+
			'ng-model="customModel" />'+
			'<span class="input-group-addon btn btn-danger" style="cursor:pointer;" ng-click="remove()"><i class="fa fa-trash-o"></i></span>'+
			'</div></div>',
	    controller: function($scope, $element) {
	    	$scope.column = $scope.$parent.selectedColumn;
	        $scope.remove = function() {
	          $scope.$parent.columns.push($scope.column);
			  $element.parent("li").remove();
			  $scope.$parent.rechercher();
			  $scope.$destroy();
	        }
	    }
	  };
});