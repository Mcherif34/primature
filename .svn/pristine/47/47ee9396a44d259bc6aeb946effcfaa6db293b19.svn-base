app.controller('attachmentController', function($scope, $http, $ngBootbox, $location, CRUDService, NotificationService, constants) {
	$scope.dto = {};
	$scope.filtre = {};
	$scope.attachmentTable = null;
	$scope.selected = null;
	$scope.mode = null;
	$scope.attachmentRequiredError = false;
	$scope.attachmentTechnicalError = false;
	$scope.attachmentSuccess = false;
	
	$scope.baseUrl = "/administration/referentiel/attachment/rest/";
	$scope.zoneRecheche = false;

	$scope.init = function() {
		$scope.mode="read";
		$scope.addAttachmentForm = false;
		$scope.editAttachmentForm = false;
		CRUDService.init($scope);
	};
	
	$scope.addAttachment = function() {
		CRUDService.add($scope);
		$scope.editAttachmentForm = false;
		$scope.addAttachmentForm = true;
		$scope.attachmentSuccess = false;
		$scope.attachmentTechnicalError = false;
		$scope.attachmentRequiredError = false;
		$('#attachmentModal').modal("show");
	};
	
	editAttachment = function() {
		CRUDService.edit($scope);
		$scope.addAttachmentForm = false;
		$scope.editAttachmentForm = true;
		$scope.attachmentSuccess = false;
		$scope.attachmentTechnicalError = false;
		$scope.attachmentRequiredError = false;
		$('#attachmentModal').modal("show");
	};
	
	$scope.load = function(id) {
		CRUDService.get(id).success(function(data, status) {   
			CRUDService.setEntityLoaded($scope,data);
		}).error(function(data, status, headers, config) {
			NotificationService.showTechnicalError();
		});
	};
	
	$scope.saveAttachment = function() {
		if($scope.attachmentForm.$valid) {
			CRUDService.save($scope,$scope.dto).success(function(data, status) {   
				CRUDService.setEntityLoaded($scope,data);
				$scope.refreshList();
				$scope.attachmentTechnicalError = false;
				$scope.attachmentRequiredError = false;
				$scope.attachmentSuccess = true;
				$('#attachmentModal').modal("hide");
			}).error(function(data, status, headers, config) {
				$scope.attachmentTechnicalError = true;
			});
		} else {
			$scope.attachmentRequiredError = true;
		}
	};
	
	$scope.refreshList = function() {
		$scope.attachmentTable.ajax.reload();
		$scope.dto = {};
	};

	removeAttachment = function(id) {
		$scope.dto = {};
		if(confirm("Voulez-vous vraiment supprimer cet enregistrement ?") == true) {
			$scope.confirmDeleteAttachment(id);
		};
	};

	$scope.confirmDeleteAttachment = function(id) {
		CRUDService.remove(id).success(function(data, status) {   
			$scope.refreshList();
		}).error(function(data, status, headers, config) {
			console.log("error");
		});
	};
});

app.controller('attachmentTableController', function($scope,$http) {
	$scope.init = function() {
		var columns = [ 
			{mDataProp: 'id', "visible": false},
			{mDataProp: 'name'},
			{mDataProp: 'description'},
			{mDataProp: 'id', "mRender": function(data, type, full) {
				result = '<a href="#" onclick="editAttachment();" class="btn btn-fw orange" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-pencil"></i></a> <a href="#" onclick="removeAttachment('+full.id+');" class="btn btn-fw danger" style="min-width: 1rem; padding-top: 3px; padding-bottom: 3px;"><i class="fa fa-trash"></i></a>';
				return result;
			}}
		];
		$scope.$parent.attachmentTable = TableManager.init("attachmentTable", $scope.$parent.baseUrl+"list", columns);
		
		$scope.$parent.attachmentTable.on('select', function (e, dt, type, indexes) {
			var rowData = 	$scope.$parent.attachmentTable.rows(indexes).data().toArray();
			var id = null;
			if(rowData.length > 0) {
				$scope.$parent.selected = rowData[0];
				id = rowData[0].id;
				$scope.$parent.load(id);
			}
		});
	};
});