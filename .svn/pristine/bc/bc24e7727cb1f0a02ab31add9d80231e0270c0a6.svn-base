app.controller('documentTableController', function($scope,$http,$compile,CRUDService,$ngBootbox,NotificationService) {
	$scope.baseUrl = "/ged/document/rest/";
	$scope.selectedObject = {};
	$scope.documentDto = {};
	$scope.typesDocuments = [];
	$scope.principale = null;
	$scope.authorizedEdit = null;

	$scope.initForm = function(authorize){
		$scope.authorizedEdit = authorize;
	};

	$scope.$watch('$parent.gedDocuments', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null &&
				!angular.isUndefined(newValue.idObject) && newValue.idObject != null){
			$scope.selectedObject = newValue;
			$scope.principale = newValue.principale;
			$scope.load(newValue);
		}else{
			$scope.tableValValeur.rows().clear();
			$scope.tableValValeur.rows.add([]).draw();
			$compile($scope.tableValValeur.rows())($scope);
		}
	});

	$scope.$watch('$parent.mediatheque', function(newValue, oldValue) {
		if(!angular.isUndefined(newValue) && newValue != null &&
				!angular.isUndefined(newValue.idObject) && newValue.idObject != null){
			$scope.$parent.mediathequeId = newValue.idObject;
			$scope.$parent.mediathequeEnumId = newValue.idNiveau;
			if(newValue.byEntite == true){
				$scope.initMediathequeByEntite(newValue.idNiveau, newValue.idObject);
			}
			else{
				$scope.initMediatheque(newValue.idNiveau, newValue.idObject);
			}

		}else{
			$scope.$parent.mediatheques = [];
		}
	});

	$scope.init = function(){
		var filtres =	[];

		$('#myModal').modal({
			show : false,
			backdrop: 'static',
			open:function(event,ui){

			}
		});

		$('#myMediathequeModal').modal({
			show : false,
			backdrop: 'static',
			open:function(event,ui){

			}
		});

		$('#document').on("change" ,function(){
			$scope.selectFile();
		});

		$('#documentMediatheque').on("change" ,function(){
			$scope.selectFileMediatheque();
			$scope.previewImage();
		});

		//Table Init
		$scope.tableValValeur = $("#documentTable").mytable({
			name:"documentTable",
			local:true,
			select: false,
			filtre: false,
			compile : $compile,
			scope : $scope,
			columns:[ 
				{id : 'id',"visible": false,"searchable":false} ,
				{id : 'libelle'},
				{id : 'gedTypeDocumentLibelle'} ,
				{id : 'observation'},
				{id : 'dateDoc'},
				{width: 60,visible: true, orderable: false,"mRender": function(data, type, full) {
					var button = '<button type="button" class="btn btn-sm btn-icon btn-circle btn-danger" ng-click="download('+full.id+')" ><i class="fa fa-download"></i></button>';
					if($scope.principale){
						button += '<button type="button" class="btn btn-sm btn-icon btn-circle btn-success ng-hide" ng-show="authorizedEdit || enableDelete" ng-click="remove('+full.id+')" ><i class="fa fa-close"></i></button>';
					}
					return button;
				}}
				]
		});

		$('body').mouseup(function(e) {

			var docWindow = $('.theme-panel');

			if (docWindow.hasClass("active") && !docWindow.is(e.target) && docWindow.has(e.target).length === 0){
				docWindow.removeClass("active");
			}
		});

	};

	$scope.load = function(object){
		$http.get(context+$scope.baseUrl+"niveau/"+object.idNiveau+"/"+object.idObject).success(function(data, status) {
			$scope.reloadTable(data.documents);
			$scope.typesDocuments = data.typesDocuments;
		}).error(function(data, status, headers, config) {
			$scope.tableValValeur.rows().clear();
			NotificationService.showTechnicalError();
		});
	};

	$scope.reloadTable = function(data){
		$scope.tableValValeur.rows().clear();
		$scope.tableValValeur.rows.add(data).draw();
	};


	$scope.upload = function(){
		$('#document').click();
	};

	$scope.initMediatheque = function(idNiveau, idObject){
		$http.get(context+"/ged/document/rest/mediatheque/"+idNiveau+"/"+idObject).success(function(data, status) {
			$scope.$parent.mediatheques = data;
		});
	};
	$scope.initMediathequeByEntite = function(idEntite, idObject){
		$http.get(context+"/ged/document/rest/mediatheque/byEntite/"+idEntite+"/"+idObject).success(function(data, status) {
			$scope.$parent.mediatheques = data;
		});
	};

	$scope.uploadMediatheque = function(){
		$('#documentMediatheque').click();
	};


	$scope.selectFile = function(){
		$scope.documentDto.fileName = $('#document').val().replace(/C:\\fakepath\\/i, '');
		$scope.$apply();
	};

	$scope.selectFileMediatheque = function(){
		$scope.setImageDetails();
		$scope.$apply();
	};

	$scope.download = function(id){
		window.open(context+$scope.baseUrl+"document/"+id, "_self");
	};

	$scope.add = function(){
		$scope.documentForm.$setSubmitted();
		if ($scope.documentForm.$valid) {
			var formData = new FormData($("#documentForm")[0]);
			formData.append("objectId", $scope.selectedObject.idObject);
			formData.append("gedNiveauClassementId", $scope.selectedObject.idNiveau);
			$http({
				url: context+$scope.baseUrl+"save",
				method: 'POST',
				data: formData,
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity  
			}).success(function(data, status) {
				$scope.reloadTable(data);
				$('#documentForm')[0].reset();
				$scope.close();
				NotificationService.showSuccess();
			}).error(function(data, status, headers, config) {
				if(status=="400" && data !=""){
					NotificationService.showCustomError(data);					
				}else{
					NotificationService.showTechnicalError();
				}
			});
		}else{
			NotificationService.showAvertissement("Veuillez remplir tous les champs obligatoires !");
		}
	};

	$scope.addMediatheque = function(){
		$scope.mediathequeForm.$setSubmitted();
		if ($scope.mediathequeForm.$valid) {
			var formData = new FormData($("#mediathequeForm")[0]);
			formData.append("objectId", $scope.$parent.mediathequeId);
			formData.append("enumId", $scope.$parent.mediathequeEnumId);
			$http({
				url: context+$scope.baseUrl+"mediatheque/save",
				method: 'POST',
				data: formData,
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity  
			}).success(function(data, status) {
				$('#mediathequeForm')[0].reset();
				$scope.closeMediatheque();
				$scope.initMediatheque($scope.$parent.mediathequeEnumId, $scope.$parent.mediathequeId);
				NotificationService.showSuccess();
			}).error(function(data, status, headers, config) {
				if(status=="400" && data !=""){
					NotificationService.showCustomError(data);					
				}else{
					NotificationService.showTechnicalError();
				}
			});
		}else{
			NotificationService.showAvertissement("Veuillez remplir tous les champs obligatoires !");
		}
	};

	$scope.addMediathequeEdit = function(){
		if ($scope.mediathequeEditForm.$valid) {
			$http.post( context+$scope.baseUrl+"mediatheque/update", angular.toJson($scope.mediathequeDto)).success(function(data, status) {   
				$scope.closeMediathequeEdit();
				$scope.initMediatheque($scope.$parent.mediathequeEnumId, $scope.$parent.mediathequeId);
//				$scope.mediathequeDto = {};
			}).error(function(data, status, headers, config) {
				NotificationService.showTechnicalError();
			});
		}else{
			NotificationService.showAvertissement("Veuillez remplir tous les champs obligatoires !");
		}
	};

	$scope.remove = function(id){
		$ngBootbox.confirm("Voulez-vous vraiment supprimer cet enregistrement ?").then(function () {
			$http.post(context+$scope.baseUrl+"delete/"+id).success(function(data, status) {  
				$scope.load($scope.$parent.gedDocuments);
			}).error(function(data, status, headers, config) {
				NotificationService.showTechnicalError();
			});
		}, function () {

		});
	};

	$scope.open = function(){
		$('#myModal').modal("show");
	};

	$scope.close = function(){
		$("#myModal").modal("hide");
		$scope.documentDto = {};
	};

	$scope.showMediatheque = function(){
		$('#myMediathequeModal').modal("show");
	};

	$scope.closeMediatheque = function(){
		$("#myMediathequeModal").modal("hide");
		$scope.documentDto = {};
		document.getElementById("imagePreview").src = null;
	};

	$scope.closeMediathequeEdit = function(){
		$("#myMediathequeEditModal").modal("hide");
//		$scope.mediathequeDto = {};
	};

	$scope.setImageDetails = function(){
		$scope.documentDto.fileName = $('#documentMediatheque').val().replace(/C:\\fakepath\\/i, '');
		$scope.documentDto.fileType = $('#documentMediatheque').val().split('.').pop();

		var oFReader = new FileReader();
		oFReader.readAsDataURL(document.getElementById("documentMediatheque").files[0]);

		oFReader.onload = function (oFREvent){
			var img = new Image;

			img.onload = function() {
				$scope.documentDto.dimensions = img.width+' x '+img.height;
				$scope.$apply();
			};

			img.src = oFReader.result;
		};
	};

	$scope.previewImage = function(){
		var oFReader = new FileReader();
		oFReader.readAsDataURL(document.getElementById("documentMediatheque").files[0]);

		oFReader.onload = function (oFREvent){
			document.getElementById("imagePreview").src = oFREvent.target.result;
		};
	};

});





app.controller('mediathequeController', function($scope,$http,$compile,CRUDService,$ngBootbox,NotificationService) {

	$scope.display = {};

	$scope.showMediatheque = function(){
		$('#myMediathequeModal').modal("show");
	};

	$scope.editMediatheque = function(id){
		$http.get(context+"/ged/document/rest/load/"+id).success(function(data, status) {
			$scope.$parent.mediathequeDto = data;
		});
		$('#myMediathequeEditModal').modal("show");
	};

	$scope.closeMediatheque = function(){
		$("#myMediathequeModal").modal("hide");
		$scope.$parent.documentDto = {};
		document.getElementById("imagePreview").src = null;
	};

	$scope.displayImage = function(code, titre, type){
		$('#video-player').src = "";
		$('#video-player').load();
		$scope.display.code = code;
		$scope.display.titre = titre;
		$scope.display.type = type;
		$('#myDisplayModal').modal("show");
	};

	$scope.closeImage = function(){
		$('#video-player').src = "";
		$('#video-player').load();
		$('#myDisplayModal').modal("hide");
	};

	$scope.getDisplayURL = function(code){
		return context+'/ged/document/image/load/'+code;
	};

	$scope.removeMediatheque = function(id){
		Swal.fire(swalDelete).then((result) => {
			if (result.value) {
				$http.post(context+"/ged/document/rest/mediatheque/delete/"+id).success(function(data, status) {  
					$scope.$parent.mediatheque = {idNiveau : $scope.$parent.mediathequeEnumId, idObject : $scope.$parent.mediathequeId};
				}).error(function(data, status, headers, config) {
					NotificationService.showTechnicalError();
				});
			}
		});
	};

	$scope.downloadMediatheque = function(id){
		window.open(context+"/ged/document/rest/document/"+id, "_self");
	};

});
