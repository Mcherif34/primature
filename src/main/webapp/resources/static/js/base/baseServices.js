var app = angular.module('primature', [ 'ngAnimate', 'ngBootbox', 'simple-autocomplete', 'ngMessages' ]).config(function($ngBootboxConfigProvider) {

	$ngBootboxConfigProvider.setDefaultLocale('fr');

	showLocalisationPopup = function(id){
		$("#iFrameLocalisation").attr('src',URL+id);
		$('#modal-localisation').modal('show');
	};

	showLocalisationPopup = function(id,baseUrl){
		if(!angular.isUndefined(baseUrl) && baseUrl !==""){
			URL = baseUrl;
		}
		$("#iFrameLocalisation").attr('src',URL+id);
		$('#modal-localisation').modal('show');
	};
	
	swalDelete = {
			title: 'Êtes-vous sur de bien vouloir supprimer cet enregistrement ?',
			text: "Si vous voulez ignorer cette opération, cliquer sur « Annuler »",
			type: 'error',
			width: 600,
			showCancelButton: true,
			reverseButtons: true,
			focusConfirm: false,
			focusCancel: true,
			confirmButtonColor: '#d33',
			confirmButtonText: 'Supprimer',
			cancelButtonText: 'Annuler'
	};
	
	swalConfirm = {
			title: 'Êtes-vous sur de bien vouloir quitter ce formulaire sans enregister ?',
			text: "Si vous voulez ignorer cette opération cliquer sur « Non »",
			type: 'info',
			width: 600,
			showCancelButton: true,
			reverseButtons: true,
			confirmButtonColor: '#49b6d6',
			confirmButtonText: 'Oui',
			cancelButtonText: 'Non'
	};

});
/**
 * Constants
 */
app.constant('constants', {
	MSG_SELECT_ROW: "Veuillez sélectionner l'enregistrement que vous voulez modifier",
	MSG_ERROR_REQUIRED: "Veuillez remplir tous les champs obligatoires !",
	REF_TYPOLOGIE: 1036,
	REF_AFFECTATION: 1037,
	REF_STATUT_DEV: 1038
});

/**
 * 
 */
app.directive("errorMessage", function() {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope:{
			name: '@',
			error: '@'
		},
		template: '<div><p ng-show="$parent.{{name}}.$dirty">Dirty</p><p ng-show="$parent.{{name}}.$error.{{error}}"><span ng-transclude></span></p></div>'
	};
});   

app.directive('formInput', function () {
	return {
		template:
			'<div class="form-group">'+
			'<label class="col-md-4 control-label">'+
			'{{title}}'+
			' <span ng-show="{{obligatoire && !consultable}}" class="asterik"> * </span> '+ 
			'</label>'+
			'<div class="col-md-8">'+
			'<input type="text" '+ 
			'ng-class="numeric ? \'form-control form-field input-number\' : \'form-control form-field \' "'+
			'name="{{inputName}}" '+
			'ng-disabled="$parent.isDisabled" '+
			'only-digits="{{numeric}}" '+
			'ng-model="customModel" ng-required="{{obligatoire && !consultable}}" ng-readonly="consultable" />'+
			'<span class="text-danger ng-cloak col-xs-10 col-sm-10" ng-show="$parent.form.$submitted &amp;&amp; $parent.form.{{inputName}}.$error.required">Ce champ est obligatoire</span>'+
			'</div>'+
			'</div>',
			restrict: 'E',
			replace: true,
			scope: {
				title: "@",
				inputName: "@name",
				customModel: '=ngModel',
				consultable: '=',
				numeric: '=',
				dateFormat: '=',
				obligatoire:"@",
				fieldType: "@",
				value: "@",
				options: "=",
			},
			link: function($scope, $element, $attrs, form) {
				$scope.field = $scope;
			}
	};
});
//app.directive('jqdatepicker', function () {
//return {
//restrict: 'A',
//require: 'ngModel',
//link: function (scope, element, attrs, ctrl) {
//$(element).datepicker({
//orientation: "bottom auto",
//format: 'dd/mm/yyyy'
//}).on('changeDate', function(e,ctrl) {
//scope.$apply(function(scope) {
//scope.dateOperation = e.date;
//});
//});
//}
//};
//});

app.directive("datepicker", function () {
	return {
		restrict: "A",
		require: "ngModel",
		link: function (scope, elem, attrs, ngModelCtrl) {
			var updateModel = function (dateText) {
				scope.$apply(function () {
					ngModelCtrl.$setViewValue(dateText);
				});
			};
			var options = {
					orientation: "bottom auto",
					autoclose:true,
					format: 'dd/mm/yyyy',
					language: 'fr'
			};
			$(elem).datepicker(options).on('changeDate', function(e) {
				updateModel(e.date);
			});
		}
	}
});

app.directive("daterangepicker", function () {
	return {
		restrict: "A",
		require: "ngModel",
		link: function (scope, elem, attrs, ngModelCtrl) {
			var updateModel = function (dateText) {
				scope.$apply(function () {
					ngModelCtrl.$setViewValue(dateText);
				});
			};
			var options = {
					locale: {
						format: 'DD/MM/YYYY',
						language: 'fr'
					}
			};
			$(elem).daterangepicker(options).on('changeDate', function(e) {
				updateModel(e.date);
			});
		}
	}
});
app.directive("datetimepicker", function () {
	return {
		restrict: "A",
		require: "ngModel",
		link: function (scope, elem, attrs, ngModelCtrl) {
			var updateModel = function (dateText) {
				scope.$apply(function () {
					ngModelCtrl.$setViewValue(dateText);
				});
			};
			var options = {
					locale:'fr'
			};
			$(elem).datetimepicker(options).on('dp.change', function(e) {
				updateModel(e.date);
//				$(this).datetimepicker('hide');
			}).end().on('keypress paste', function (e) {
				e.preventDefault();
				return false;
			});

		}
	}
});
app.directive('formInputDate', function () {
	return {
		template:
			'<div class="form-group">'+
			'<label class="col-md-4 control-label">'+
			'{{title}}'+
			' <span ng-show="{{obligatoire && !consultable}}" class="asterik"> * </span> '+ 
			'</label>'+
			'<div class="col-md-8">'+
			'<input type="text" '+ 
			'ng-class="\'form-control form-field\' "'+
			'datepicker="datepicker" '+
			'name="{{inputName}}" '+
			'ng-disabled="$parent.isDisabled" '+
			'only-digits="{{numeric}}" '+
			'ng-model="customModel" ng-required="{{obligatoire && !consultable}}" ng-readonly="consultable" />'+
			'<span class="text-danger ng-cloak col-xs-10 col-sm-10" ng-show="$parent.form.$submitted &amp;&amp; $parent.form.{{inputName}}.$error.required">Ce champ est obligatoire</span>'+
			'</div>'+
			'</div>',
			restrict: 'E',
			replace: true,
			scope: {
				title: "@",
				inputName: "@name",
				customModel: '=ngModel',
				consultable: '=',
				numeric: '=',
				dateFormat: '=',
				obligatoire:"@",
				fieldType: "@",
				value: "@",
				options: "=",
			},
			link: function($scope, $element, $attrs, form) {
				$scope.field = $scope;
			}
	};
});

app.directive('formInputTime', function () {
	return {
		template:
			'<div class="form-group">'+
			'<label class="col-md-4 control-label">'+
			'{{title}}'+
			' <span ng-show="{{obligatoire && !consultable}}" class="asterik"> * </span> '+ 
			'</label>'+
			'<div class="col-md-8">'+
			'<input type="text" '+ 
			'ng-class="\'form-control form-field\' "'+
			'datetimepicker="datetimepicker" '+
			'name="{{inputName}}" '+
			'ng-disabled="$parent.isDisabled" '+
			'only-digits="{{numeric}}" '+
			'ng-model="customModel" ng-required="{{obligatoire && !consultable}}" />'+
			'<span class="text-danger ng-cloak col-xs-10 col-sm-10" ng-show="$parent.form.$submitted &amp;&amp; $parent.form.{{inputName}}.$error.required">Ce champ est obligatoire</span>'+
			'</div>'+
			'</div>',
			restrict: 'E',
			replace: true,
			scope: {
				title: "@",
				inputName: "@name",
				customModel: '=ngModel',
				consultable: '=',
				numeric: '=',
				dateFormat: '=',
				obligatoire:"@",
				fieldType: "@",
				value: "@",
				options: "=",
			},
			link: function($scope, $element, $attrs, form) {
				$scope.field = $scope;
			}
	};
});

app.directive('formInputDateGrid', function () {
	return {
		template:
			'<div class="form-group">'+
			'<label class="col-md-4 control-label">'+
			'{{title}}'+
			' <span ng-show="{{obligatoire && !consultable}}" class="asterik"> * </span> '+ 
			'</label>'+
			'<div class="col-md-8">'+
			'<input type="text" '+ 
			'ng-class="\'form-control form-field\' "'+
			'datepicker="datepicker" '+
			'name="{{inputName}}" '+
			'ng-disabled="false" '+
			'only-digits="{{numeric}}" '+
			'ng-model="customModel" ng-required="{{obligatoire && !consultable}}" ng-readonly="consultable" />'+
			'<span class="text-danger ng-cloak col-xs-10 col-sm-10" ng-show="$parent.form.$submitted &amp;&amp; $parent.form.{{inputName}}.$error.required">Ce champ est obligatoire</span>'+
			'</div>'+
			'</div>',
			restrict: 'E',
			replace: true,
			scope: {
				title: "@",
				inputName: "@name",
				customModel: '=ngModel',
				consultable: '=',
				numeric: '=',
				dateFormat: '=',
				obligatoire:"@",
				fieldType: "@",
				value: "@",
				options: "=",
			},
			link: function($scope, $element, $attrs, form) {
				$scope.field = $scope;
			}
	};
});
app.directive('formInputIcon', function () {
	return {
		template:
			'<div class="form-group">'+
			'<label class="col-md-4 control-label">'+
			'&nbsp;{{title}}'+
			' <span ng-show="{{obligatoire && !consultable}}" class="asterik"> * </span> '+ 
			'</label>'+
			'<div class="col-md-8">'+
			'<div class="input-group">'+
			'<input type="text" '+
			'ng-class="numeric ? \'form-control form-field input-number\' : \'form-control form-field \' "'+
			'name="{{inputName}}" '+
			'ng-disabled="$parent.isDisabled" '+
			'only-digits="{{numeric}}" '+
			'ng-model="customModel" ng-required="{{obligatoire && !consultable}}" ng-readonly="consultable" />'+
			'<span class="input-group-addon">{{iconText}}</span>'+
			'</div>'+
			'<span class="text-danger ng-cloak col-xs-10 col-sm-10" ng-show="$parent.form.$submitted &amp;&amp; $parent.form.{{inputName}}.$error.required">Ce champ est obligatoire</span>'+
			'</div>'+
			'</div>',
			restrict: 'E',
			replace: true,
			scope: {
				title: "@",
				inputName: "@name",
				customModel: '=ngModel',
				consultable: '=',
				obligatoire:"@",
				numeric: '=',
				iconText: '@',
				value: "@",
				options: "=",
			},
			link: function($scope, $element, $attrs, form) {
				$scope.field = $scope;
//				form.addField($scope);
			}
	};
});


app.directive('formSelect', function () {
	return {
		template:
			'<div class="form-group">'+
			'<label class="col-md-4 control-label">'+
			'{{title}}'+
			' <span ng-show="{{obligatoire && !consultable}}" class="asterik"> * </span> '+ 
			'</label>'+
			'<div class="col-md-8">'+
			'<select type="text" class="form-control form-field" '+
			'name="{{inputName}}" '+
			'ng-disabled="consultable || $parent.isDisabled" '+
			'ng-model="customModel" ng-required="{{obligatoire && !consultable}}"  '+ 
			'ng-options="o.id as o.'+'{{optionsLabel}}'+' for o in options" >'+
			'<option value=""></option>'+
			'</select>'+ 
			'<span class="text-danger ng-cloak col-xs-10 col-sm-10" ng-show="$parent.form.$submitted &amp;&amp; $parent.form.{{inputName}}.$error.required">Ce champ est obligatoire</span>'+
			'</div>'+
			'</div>',
			restrict: 'E',
			replace: true,
			scope: {
				title: "@",
				inputName: "@name",
				customModel: '=ngModel',
				consultable: '=',
				obligatoire:"@",
				fieldType: "@",
				value: "@",
				options: "=",
				optionsLabel: "@",
			},
			link: function($scope, $element, $attrs, form) {
				$scope.field = $scope;
//				if(angular.isUndefined($attrs.optionsLabel) || $attrs.optionsLabel === null ) {
//				$attrs.optionsLabel =  "libelle";
//				}
//				form.addField($scope);
			}
	};
});

app.directive('formCheckbox', function () {
	return {
		template:
			'<div class="form-group">'+
			'<label class="col-md-4 control-label">'+
			'{{title}}'+
			' <span ng-show="{{obligatoire && !consultable}}" class="asterik"> * </span> '+ 
			'</label>'+
			'<div class="col-md-8">'+
			'<label class="radio-inline" ng-repeat="item in options">'+
			'<input type="radio" class="form-field" name="{{inputName}}"  consultation="consultation" checked="checked" '+
			'ng-disabled="consultable || $parent.isDisabled" '+
			'/>'+
			'{{item.libelle}}'+ 
			'</label>'+
			'<span class="text-danger ng-cloak col-xs-10 col-sm-10" ng-show="$parent.form.$submitted &amp;&amp; $parent.form.{{inputName}}.$error.required">Ce champ est obligatoire</span>'+
			'</div>'+
			'</div>',
			restrict: 'E',
			replace: true,
			scope: {
				title: "@",
				inputName: "@name",
				customModel: '=ngModel',
				consultable: '=',
				obligatoire:"@",
				checked: "@",
				value: "@",
				options: "=",
			},
			link: function($scope, $element, $attrs, form) {
				$scope.field = $scope;
//				form.addField($scope);
			}
	};
});

app.directive('formText', function () {
	return {
		template:
			'<div class="form-group">'+
			'<label class="col-md-4 control-label">'+
			'{{title}}'+
			' <span ng-show="{{obligatoire && !consultable}}" class="asterik"> * </span> '+ 
			'</label>'+
			'<div class="col-md-8">'+
			'<textarea class="form-control form-field" '+
			'name="{{inputName}}" '+
			'ng-model="customModel" ng-required="{{obligatoire && !consultable}}" ng-readonly="consultable" ng-disabled="$parent.isDisabled"  >'+
			'</textarea>'+
			'<span class="text-danger ng-cloak col-xs-10 col-sm-10" ng-show="$parent.form.$submitted &amp;&amp; $parent.form.{{inputName}}.$error.required">Ce champ est obligatoire</span>'+
			'</div>'+
			'</div>',
			restrict: 'E',
			replace: true,
			scope: {
				title: "@",
				inputName: "@name",
				customModel: '=ngModel',
				consultable: '=',
				obligatoire:"@",
				checked: "@",
				value: "@",
				options: "=",
			},
			link: function($scope, $element, $attrs, form) {
				$scope.field = $scope;
//				form.addField($scope);
			}
	};
});


app.directive('onlyDigits', function () {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function (scope, element, attrs, modelCtrl) {
			if(attrs.onlyDigits=="true" || attrs.onlyDigits=="onlyDigits"){
				modelCtrl.$parsers.push(function (inputValue) {
					if (inputValue == undefined) return '';
//					var transformedInput = inputValue.replace(/[^0-9]/g, '');
					var transformedInput = inputValue.replace(/[^0-9.]/g, '');
					if (transformedInput !== inputValue) {
						modelCtrl.$setViewValue(transformedInput);
						modelCtrl.$render();
					}
					return transformedInput;
				});
			}
		}
	};
});


app.run(function($rootScope) {
	$rootScope.globalFoo = function() {
		alert("I'm global foo!");
	};
});

app.factory('CRUDService', function($rootScope,$http, $q,NotificationService,constants){
	var BASE_URL =null;
	return {
		//Get a db object by id
		init: function($scope) {
			BASE_URL = context+ $scope.baseUrl;
			$rootScope.$broadcast("updates");
			var filtre = this.getQueryParam("filtre");
			if(!angular.isUndefined(filtre)){
				$('.panel').eq(0).hide();
				$scope.load(filtre);
				$scope.zoneRecheche = false;
				$scope.$watch('idEntite', function(newValue, oldValue) {
					if(!angular.isUndefined(newValue) && newValue != null && !angular.isUndefined(filtre)){
						$scope.selected =filtre;
						$scope.gedDocuments = {idEntite : newValue, idObject :filtre, principale : true};
					}
				});

			}
		},
		setEntityLoaded :function($scope,entity) {
			//$scope.form.$submitted = false;
			$scope.dto = entity;
			$scope.isDisabled = true;
			$scope.mode = "read";
		},
		add: function($scope) {
			$scope.dto = {};
			$scope.mode="edit";
			$scope.isDisabled = false;
		},
		edit: function($scope) {
			if($scope.dto != null && $scope.dto.id != null){
				$scope.mode="edit";
				$scope.isDisabled = false;
			}else{
				//NotificationService.showAvertissement(constants['MSG_SELECT_ROW']);
			}
		},
		get: function(objectId, callback) {
			return $http.get(BASE_URL+"load/"+objectId);
		},
		save: function($scope,entity) {
			//$scope.form.$setSubmitted();
			//if ($scope.form.$valid) {
				var nvEntite = {};
				angular.copy(entity, nvEntite);
				for (var name in nvEntite) {
					if (nvEntite.hasOwnProperty(name)) {
						if((entity[name] instanceof Date)){
							nvEntite[name]  = moment(nvEntite[name]).format();
						}
					}
				}
				return $http.post( BASE_URL+"save", angular.toJson(nvEntite));
			/*}else{
				NotificationService.showAvertissement(constants['MSG_ERROR_REQUIRED']);
			}*/
		},
		saveUrl: function($scope,url,entity) {
			$scope.form.$setSubmitted();
			if ($scope.form.$valid) {
				return $http.post(url, angular.toJson(entity));
			}else{
				NotificationService.showAvertissement(constants['MSG_ERROR_REQUIRED']);
			}
		},
		remove: function(objectId) {
			return $http.post( BASE_URL+"delete/"+objectId);
		},
		isChecked : function (list,id) {
			return $scope.list.indexOf(id) > -1;
		},
		getQueryParam : function (param) {
			var found;
			window.location.search.substr(1).split("&").forEach(function(item) {
				if (param ==  item.split("=")[0]) {
					found = item.split("=")[1];
				}
			});
			return found;
		},
		loading : function(id,value){
			var target = $("#"+id).closest('.panel');
			if(value=='on'){
				if (!$(target).hasClass('panel-loading')) {
					var targetBody = $(target).find('.panel-body');
					var spinnerHtml = '<div class="panel-loader"><span class="spinner-small"></span></div>';
					$(target).addClass('panel-loading');
					$(targetBody).prepend(spinnerHtml);
				}
			}
			else if(value=='off'){
				$(target).removeClass('panel-loading');
				$(target).find('.panel-loader').remove();
			}
		}

	}
});


app.service('NotificationService', function($http) {

	this.showSuccess = function() {
		$.gritter.add({
			title: "Notification",
			text: "Opération effectuée avec succès",
			sticky: false,
			time: 8000,
			class_name: 'gritter-success'
		});
	};

	this.showCustomError = function(message) {
		$.gritter.add({
			title: "Notification",
			text: message,
			sticky: false,
			time: 8000,
			class_name: 'gritter-error'
		});
	};

	this.showTechnicalError = function() {
		$.gritter.add({
			title: "Notification",
			text: "Opération non effectuée. Merci de réessayer. <br/> Si le problème persiste veuillez contacter l’administrateur.",
			sticky: false,
			time: 8000,
			class_name: 'gritter-error'
		});
	};

	this.showAvertissement = function(message) {
		$.gritter.add({
			title: "Avertissement",
			text: message,
			sticky: false,
			time: 8000,
			class_name: 'gritter-warning'
		});
	};
});

app.factory('ngWizard', function(){
	var wizard = null;
	return {
		init: function($scope,id,buttons,currentStep,loadStepEvent,anchorClick) {
			wizard = $("#"+id).smartWizard({
				selected: currentStep !== null ? currentStep : 0,
				transitionEffect:'fade',
				cycleSteps: false,
				theme: 'dots',
				showStepURLhash: false,
				lang: {  // Language variables
					next: 'Suivant', 
					previous: 'Précédent '
				},
				toolbarSettings: {toolbarPosition: 'both',
					toolbarExtraButtons: buttons
				},
				anchorSettings: {anchorClickable: anchorClick}
				
			});
			
			if(loadStepEvent){
				$("#smartwizard .sw-btn-next").off("click").on("click", function(){
					if(!$(this).hasClass("disabled")){
						loadStepEvent(wizard.data().smartWizard.current_index, "forward");
					}
				});
				$("#smartwizard .sw-btn-prev").off("click").on("click", function(){
					if(!$(this).hasClass("disabled")){
						loadStepEvent(wizard.data().smartWizard.current_index, "backward");
					}
				});
			}

			wizard.on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
				if(stepPosition === 'first'){
					$("#prev-btn").addClass('disabled');
				}else if(stepPosition === 'final'){
					$("#next-btn").addClass('disabled');
				}else{
					$("#prev-btn").removeClass('disabled');
					$("#next-btn").removeClass('disabled');
				}
			});


			return wizard;
		}
	}});

app.service('FormService', function($http) {
	var form = {};

	var defaults = {
			id:"",
			url:"",
			mode:"read",
			display: 6,
			validate: false,
			model: {},
			buttons:[
				{selecteur:"btn btn-default btn-icon btn-circle btn-lg",label:"Ajouter",icon:"fa-plus",action:nouveau},
				{selecteur:"btn btn-info btn-icon btn-circle btn-lg",label:"Modifier",icon:"fa-pencil",action:null},
				{selecteur:"btn btn-success btn-icon btn-circle btn-lg",label:"Enregistrer",icon:"fa-expand",action:save},
				{selecteur:"btn btn-danger btn-icon btn-circle btn-lg",label:"Supprimer",icon:"fa-trash-o",action:supprimer}]
	};

	this.init = function(id,fields,url) {
		defaults.url = url;
		form = defaults;
		form.id = id;
		form.fields = fields;
		return form;
	};

	function nouveau() {
		form.model = {};
		form.mode = "edit";
	};

	function save() {
		form.model = {};
		form.mode = "edit";
	};

	function supprimer() {

	};


	this.load = function(id) {
		if(id != null){
			var parameters = {};
			parameters.id =id;
			return $http.get(context+defaults.url+'load',{params: parameters});
		}
	};



});
