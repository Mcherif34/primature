var handleDataTableCombinationSetting = function() {
	"use strict";
	if ($('#data-table').length !== 0) {
		$('#data-table').DataTable({
			dom: 'lBfrtip',
			buttons: [
				{ extend: 'copy', className: 'btn-sm' },
				{ extend: 'csv', className: 'btn-sm' },
				{ extend: 'excel', className: 'btn-sm' },
				{ extend: 'pdf', className: 'btn-sm' },
				{ extend: 'print', className: 'btn-sm' }
				],
				responsive: true,
				autoFill: true,
				colReorder: true,
				keys: true,
				rowReorder: true,
				select: true
		});
	}
};

var TableManageCombine = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleDataTableCombinationSetting();
		}
	};
}();

var TableManager = function () {
	"use strict";
	return {
		//main function
		init: function (tableId,url,columns,initFiltre) {
			constructFiltreZone(tableId);
			
			var table = $('#'+tableId).DataTable({
				pageResize: true,
				select: true,
				"bProcessing": true,
				"bServerSide" : true,
				"aoColumns" :  columns,
				"aoSearchCols": initFiltre,
				"sAjaxSource" : context + url,
				"fnServerData" : prepareRestData,
				"sAjaxDataProp" : 'data',
				"oLanguage" : language,
				dom: '<B>rtipl',
				scroller:       true,
				scrollY:        '50vh',
				scrollCollapse: true,
				buttons: []
//			keys: true // selection by td 
			});

			$('#'+tableId+'_wrapper .table-custom-search').on( 'click', function () {
				table.columns().eq( 0 ).each( function ( colIdx ) {
					this
					.column( colIdx )
					.search($('#'+tableId+'_wrapper #search_'+colIdx).val());
				} );
				table.ajax.reload();
			} );

			$('#'+tableId+'_wrapper .filtres .input-group').keypress(function (e) {
				if(e.which == 13) {
					$(this).find('.table-custom-search').click();
				}
			});
			return table;
		},
		initLocal: function (tableId,url,columns,initFiltre,zoneFiltre,compile,scope) {
			zoneFiltre = zoneFiltre != false ? true : false;
			if(zoneFiltre ==true){
				constructFiltreZone(tableId);
			}
			var table = $('#'+tableId).DataTable({
				pageResize: true,
				responsive: true,
				"aoColumns" :  columns,
				"aoSearchCols": initFiltre,
				"aaData": [],
				"oLanguage" : language,
				"pagingType": "numbers",
				dom: '<B>rtipl',
				scroller:       true,
				scrollY:        '50vh',
				scrollCollapse: true,
				buttons: [],
				fnCreatedRow : function(nRow, aData, iDataIndex ){
					if(compile != undefined ) compile(nRow)(scope);
		        }
			});

			$('#'+tableId+'_wrapper .table-custom-search').on( 'click', function () {
				table.columns().eq( 0 ).each( function ( colIdx ) {
					//Disable Search for actions column
					var searchEnabled = TableManager.getColumnProperty(this,colIdx,'bSortable');
					if(searchEnabled !=false ){
						this.column( colIdx ).search($('#'+tableId+'_wrapper #search_'+colIdx).val()).draw();
					}
				} );
			} );
			
			this.enableFiltreClick(tableId);
			
			return table;
		},
		//initCompiled
		initCompiled: function (tableId,url,columns,initFiltre,compile,scope) {
			constructFiltreZone(tableId);
			var table = $('#'+tableId).DataTable({
				pageResize: true,
				select: true,
				"bProcessing": true,
				"bServerSide" : true,
				"aoColumns" :  columns,
				"aoSearchCols": initFiltre,
				"sAjaxSource" : context + url,
				"fnServerData" : prepareRestData,
				"sAjaxDataProp" : 'data',
				"oLanguage" : language,
				dom: '<B>rtipl',
				scroller:       true,
				scrollY:        '50vh',
				scrollCollapse: true,
				fnCreatedRow : function(nRow, aData, iDataIndex ){
                   compile(nRow)(scope);
	        	},
	        	fnDrawCallback : function() {
	               scope.$apply();
	        	},
				buttons: []
			});

			$('#'+tableId+'_wrapper .table-custom-search').on( 'click', function () {
				table.columns().eq( 0 ).each( function ( colIdx ) {
					this
					.column( colIdx )
					.search($('#'+tableId+'_wrapper #search_'+colIdx).val());
				} );
				table.ajax.reload();
			} );

			this.enableFiltreClick(tableId);


			return table;
		},
		getColumnProperty(table,columnIndex,propertieIndex){
			var propertie = null;
			if(!angular.isUndefined(table.columns().init().aoColumns[columnIndex][propertieIndex])){
				propertie = table.columns().init().aoColumns[columnIndex][propertieIndex];
			}
			return propertie;
		},
		enableFiltreClick(tableId){
			$('#'+tableId+'_wrapper .filtres .input-group').keypress(function (e) {
				if(e.which == 13) {
					$(this).find('.table-custom-search').click();
				}
			});
		}
	};
}();


var constructFiltreZone = function (tableId){
	var header = $('#'+tableId+' thead');
	header.prepend('<tr class="filtres"></tr>');
//	$('#'+tableId+' thead th').not(".actions").each(function() {
	$('#'+tableId+' thead th').each(function() {
		var filtre = $('#'+tableId+' thead .filtres');
		if(this.className=="actions"){
			filtre.append('<th>'+'</th>');
		}else{
			filtre.append('<th>'+
					'<div class="input-group" style="width:100%" ><input style="width:100%" id="search_' + $(this).index() + '" type="text" class="form-control input-sm" " />'+
					'<span class="input-group-addon table-custom-search" data-index="'+ $(this).index() + '" style="width: 10px!important"> <span class="fa fa-search" ></span> </span>'
					+'</div></th>');
		}
	});
};

var prepareRestData = function(sSource, aoData, fnCallback,oSettings) {
	//extract name/value pairs into a simpler map for use later
	var paramMap = {};
	var paramSearch= {};
	for ( var i = 0; i < aoData.length; i++) {
		paramMap[aoData[i].name] = aoData[i].value;

	}

	//Search column
	for ( var i = 0; i < aoData.length; i++) {
		if(aoData[i].name !="" && aoData[i].name.indexOf("sSearch") >= 0 && aoData[i].value != ""){
			var searchColName= paramMap[aoData[i].name.replace("sSearch", "mDataProp")];
			paramSearch[searchColName] = aoData[i].value;
		}
	}

	//page calculations
	var pageSize = paramMap.iDisplayLength;
	var start = paramMap.iDisplayStart;
	var pageNum = (start == 0) ? 1 : (start / pageSize) + 1; // pageNum is 1 based

	// extract sort information
	var sortCol = paramMap.iSortCol_0;
	var sortDir = paramMap.sSortDir_0;
	var sortName = paramMap['mDataProp_' + sortCol];

	//create new json structure for parameters for REST request
	var searchParams = "";
	var restParams = new Array();
	restParams.push({"name" : "limit", "value" : pageSize});
	restParams.push({"name" : "page", "value" : pageNum });
	restParams.push({"name" : "sort", "value" : sortName });
	restParams.push({"name" : "direction", "value" : sortDir });

	//if we are searching by name, override the url and add the name parameter
	var url = sSource;
	if (paramSearch != undefined && !jQuery.isEmptyObject(paramSearch)) {
		searchParams = [];
		$.each(paramSearch, function(key) {
			searchParams.push({"name" : key, "value" : paramSearch[key] });
		});
	}
	restParams.push({"name" : "search", "value" :JSON.stringify(searchParams)  });

	if(oSettings.ajax!=null){
		url = context+ oSettings.ajax;
	}
	//finally, make the request
	$.ajax({
		"dataType" : 'json',
		"type" : "GET",
		"url" : url,
		"data" : restParams,
		"success" : function(response) {
			var result = {};
			result.iTotalRecords = response.totalCount;
			result.iTotalDisplayRecords = response.totalCount;
			result.data = response.data;
			fnCallback(result);
		}
	});
};