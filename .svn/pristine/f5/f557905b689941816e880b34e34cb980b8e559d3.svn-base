app.controller('formTestController', function($scope,$http,formService) {

	$scope.form = {};
	var url = '/user/rest/';

	var fields=[ {id:"id",title:"Champ1",type: "string",placeholder: "Make a comment1",nonModifiable : true},
	             {id:"nom",title:"Champ2",type: "string",placeholder: "Make a comment2",obligatoire:true},
	             {id:"prenom",title:"Champ3",type: "string",placeholder: "Make a comment3"},
	             {id:"roleLibelle",title:"Champ4",type: "string",placeholder: "Make a comment4"},
	             {id:"roleCode",title:"Champ5",type: "string",placeholder: "Make a comment5"}		  
	             ];

	$scope.init = function(){
		$scope.form	= formService.init("formTest",fields,url);
		formService.load(1).then(function(result){
			$scope.form.model = result.data;
	    });
	};

});

