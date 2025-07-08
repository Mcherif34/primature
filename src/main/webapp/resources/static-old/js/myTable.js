(function($) {

	jQuery.fn.dataTable.Api.register( 'sum()', function ( ) {
		return this.flatten().reduce( function ( a, b ) {
			if ( typeof a === 'string' ) {
				a = a.replace(/[^\d.-]/g, '') * 1;
			}
			if ( typeof b === 'string' ) {
				b = b.replace(/[^\d.-]/g, '') * 1;
			}
			return a + b;
		}, 0 );
	} );

	jQuery.fn.dataTableExt.oApi.fnFindCellRowIndexes = function ( oSettings, sSearch, iColumn )
	{
		var
		i,iLen, j, jLen, val,
		aOut = [], aData,
		columns = oSettings.aoColumns;

		for ( i=0, iLen=oSettings.aoData.length ; i<iLen ; i++ )
		{
			aData = oSettings.aoData[i]._aData;

			if ( iColumn === undefined )
			{
				for ( j=0, jLen=columns.length ; j<jLen ; j++ )
				{
					val = this.fnGetData(i, j);

					if ( val == sSearch )
					{
						aOut.push( i );
					}
				}
			}
			else if (this.fnGetData(i, iColumn) == sSearch )
			{
				aOut.push( i );
			}
		}

		return aOut;
	};

	var language = {
			"sProcessing":     "Traitement en cours...",
			"sSearch":         "Rechercher&nbsp;:",
			"sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
			"sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
			"sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
			"sInfoSelected":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
			"sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
			"sInfoPostFix":    "",
			"sLoadingRecords": "Chargement en cours...",
			"sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
			"sEmptyTable":     "Aucune donn&eacute;e disponible",
			"oPaginate": {
				"sFirst":      "Premier",
				"sPrevious":   "Pr&eacute;c&eacute;dent",
				"sNext":       "Suivant",
				"sLast":       "Dernier"
			},
			"oAria": {
				"sSortAscending":  ": activer pour trier la colonne par ordre croissant",
				"sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
			},
			select: {
				rows: {
					_: ""//"You have selected %d rows",
				}
			}
	};
	var filtres = null;
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
				var searchColName = paramMap[aoData[i].name.replace("sSearch", "mDataProp")];
				var searchColType = oSettings.aoColumns[aoData[i].name.replace("sSearch_", "")].sType;
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
		var searchParams = [];
		var restParams = new Array();
		restParams.push({"name" : "limit", "value" : pageSize});
		restParams.push({"name" : "page", "value" : pageNum });
		restParams.push({"name" : "sort", "value" : sortName });
		restParams.push({"name" : "direction", "value" : sortDir });

//		var filtres = $("#formZoneRecherche").data("filtres");
		var filtres = $("#formFilter").data("filter");
		
		if(filtres && filtres.length >0){
			$.each(filtres, function(key, filtre) {
				searchParams.push({"name" : filtre.name, "value" : filtre.value});
			});
		}

		//if we are searching by name, override the url and add the name parameter
		var url = sSource;
		if (paramSearch != undefined && !jQuery.isEmptyObject(paramSearch)) {
			$.each(paramSearch, function(key) {
				searchParams.push({"name" : key, "value" : paramSearch[key] });
			});
		}

		$("#formZoneRecherche").data("searchParams",JSON.stringify(searchParams));

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
				oSettings.sumField1 = response.sumField1;
				fnCallback(result);
			}
		});
	}

	var	getFiltreZone = function (tableId){
		var header = $(tableId+' thead');
		header.prepend('<tr class="filtres"></tr>');
		$(tableId+' thead th').each(function() {
			var filtre = $(tableId+' thead .filtres');
//			if(this.className=="actions"){
			if(~this.className.indexOf("actions")){
				filtre.append('<th>'+'</th>');
			}else 	if(this.className=="actions-checkbox"){
				filtre.append('<th><div class="input-group" style="width:100%" ><input type="checkbox" name="select_all" value="1" class="select-all"></div></th>');
			}else{
				filtre.append('<th>'+
						'<div class="input-group" style="width:100%" ><input style="width:100%" id="search_' + $(this).index() + '" type="text" class="form-control input-sm" " />'+
						'<span class="input-group-addon table-custom-search" data-index="'+ $(this).index() + '" style="width: 10px!important"> <span class="fa fa-search" ></span> </span>'
						+'</div></th>');
			}
		});
	};

	var getColumnProperty = function (table,columnIndex,propertieIndex){
		var propertie = null;
		if(!angular.isUndefined(table.columns().init().aoColumns[columnIndex][propertieIndex])){
			propertie = table.columns().init().aoColumns[columnIndex][propertieIndex];
		}
		return propertie;
	};


	var enableFiltreClick = function (tableId){
		$(tableId+'_wrapper .filtres .input-group').keypress(function (e) {
			if(e.which == 13) {
				$(this).find('.table-custom-search').click();
			}
		});

	};

	var methodes = {
			init : function(options,optionsGrid){
				$(this).data("options",options);
				var defaults = {};
				defaults.tableId = "#"+options.name;
				defaults.url = "";
				defaults.buttons = [];
				defaults.exportExcel = true;
				defaults.exportPDF = true;
				defaults.filtre = true;
				defaults.local = false;
				defaults.total = false;
				defaults.columnsVis = true;
				defaults.pagination = true;
				defaults.downloadExcel = options.downloadExcel;
//				defaults.fixedHeader = false;
//				defaults.autoWidth = false;
				var colonnes = [];
				var options = $.extend(defaults, options);
				for ( var i = 0; i < options.columns.length; i++) {
					var colonne = {};
					if (options.columns[i] != null) {
						colonnes[i] = colonne;
						colonnes[i].bSortable = true;

						if (options.columns[i].id) {
							colonnes[i].mDataProp = options.columns[i].id;
							if(options.columns[i].id=="id"){
								colonnes[i].visible = false;
								if(options.columns[i].visible==true){
									colonnes[i].visible = true;
								}
								colonnes[i].bSortable = false;
							}
						}

						if (options.columns[i].visible==false) {
							colonnes[i].visible = options.columns[i].visible;
							colonnes[i].bSortable = false;
						}

						if (options.columns[i].nombre) {
							colonnes[i].render = $.fn.dataTable.render.number(' ', '.', 2, '');
							colonnes[i].className =  "dt-right";
							colonnes[i].targets = "_all";
							colonnes[i].sType = "num";
						}else{
							colonnes[i].sType = "string";
						}
						if (options.columns[i].mRender) {
							colonnes[i].mRender = options.columns[i].mRender;
//							colonnes[i].orderable = false;
							colonnes[i].width = "8%";
						}
						if (options.columns[i].width) {
							colonnes[i].width = options.columns[i].width;
						}

					}
				}

				if(!options.ordre){
					options.ordre =  [[ 0, "DESC" ]];
				}

				
				/**
				 * Table buttons
				 */
				
//				options.buttons = [
//					{
//						extend: 'colvis',
//						columns: ':not(.noVis)'
//					},
//					{
//						text: '<i class="fa fa-file-excel-o"></i>',
//						className: options.local || !options.exportExcel ? 'hide' : '',
//								action: function ( e, dt, node, config, oSettings ) {
//									download(e, dt, oSettings);
//								}
//					},
//					{
//						text: '<i class="fa fa-file-pdf-o"></i>',
//						className: options.local || !options.exportPDF  ? 'hide' : '',
//								action: function ( e, dt, node, config, oSettings ) {
//									downloadPDF(e, dt, oSettings);
//								}
//					}
//					];
				
				if(options.columnsVis){
					options.buttons.push(
							{
								extend: 'colvis',
								columns: ':not(.noVis)'
							}
					);
				}
				
				options.buttons.push(
						{
							text: '<i class="fa fa-file-excel-o"></i>',
							className: options.local || !options.exportExcel ? 'hide' : '',
							action: function ( e, dt, node, config, oSettings ) {
								download(e, dt, oSettings);
							}
						}
				);
				
					
				/**
				 * Table Server default config
				 */
				var defaultConfig = {
						pageResize: true,
						select: true,
						fixedColumns: true,
						"bProcessing": true,
						"aoColumns" :  colonnes,
						"aoSearchCols": options.filtres,						
						"sAjaxDataProp" : 'data',
						"oLanguage" : language,
						dom: 'rtipl<B>',
						scroller:       true,
						scrollY:        '50vh',
						scrollCollapse: true,
						"sScrollX": "90%",
						"sScrollXInner": "100%",
						buttons: options.buttons,
						dom: '<B>rtipl',
						columnDefs: [
							{
								targets: 0,
								className: 'noVis'
							}
							],
								"order": options.ordre,
								"fnServerData" : prepareRestData,
								fnCreatedRow : function(nRow, aData, iDataIndex ){
									if(options.compile != undefined ) options.compile(nRow)(options.scope);
								},
								"initComplete": function(settings, json) {

								},
								"fnDrawCallback": function(settings, json) {

								},
								"footerCallback": function(settings, json) {
										if(options.total && options.totalCol!= null){
											var api = this.api(),
											intVal = function (i) {
												return typeof i === 'string' ?
														i.replace(/[, Rs]|(\.\d{2})/g,"")* 1 :
															typeof i === 'number' ?
																	i : 0;
											},
											total2 = api
											.column(options.totalCol)
											.data()
											.reduce(function (a, b) {
												return intVal(a) + intVal(b);
											}, 0);
											var totalServer = this.fnSettings().sumField1;
											total2 = totalServer != undefined ? totalServer : total2;
											$.fn.dataTable.render.number(' ', '.', 2, '');
											var total2 =  total2.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
											$(api.column(options.totalCol).footer()).html('  Total ' + total2 + ''
											);
										}
								}
//								footerCallback:options.footerCallback
				}

				var download = function(e, dt,dataFiltres){
					var columns = [];
					var elem = dt.context[0];
					dt.columns().every( function (index) {
						if(this.visible() && !angular.isNumber(elem.aoColumns[index].mData)){
							columns.push(elem.aoColumns[index].mData);
						}
					});
					var param = "[]";
					var joinParam = "[]";
					var sort = elem.aaSorting[0];
					if($("#formZoneRecherche").data("searchParams")){
						param = $("#formZoneRecherche").data("searchParams");
					}
//					if(options.customFiltres){
//					if(param === "[]"){
//					param = JSON.stringify(options.customFiltres);
//					}else {
//					param = param.replace("[",JSON.stringify(options.customFiltres).replace("]",","));
//					}
//					}
					if (options["downloadExcel"] !== 'undefined' && options["downloadExcel"] !== undefined) { 
						var dataFiltres = options.downloadExcel();
						if(dataFiltres){
							if(joinParam === "[]"){
								joinParam = JSON.stringify(dataFiltres);
							}else {
								joinParam = param.replace("[",JSON.stringify(dataFiltres).replace("]",","));
							}
						}
					}
					var marcheId = $("#formZoneRecherche").data("marcheId");
					if(marcheId != null){
						var paramJson = angular.fromJson(param);
						if(!paramJson.hasOwnProperty('marche')){
							var marche = {name:'marche',value:marcheId}
							paramJson.push(marche);
							if(param === "[]"){
								param = JSON.stringify(paramJson);
							}else {
								param = param.replace("[",JSON.stringify(paramJson).replace("]",","));
							}
						}
					}
					var restParams = "?columns="+columns.join(",");
					restParams += "&sort="+elem.aoColumns[sort[0]].mData;
					restParams += "&direction="+sort[1];
					restParams += "&search="+encodeURIComponent(param);
					restParams += "&joint="+encodeURIComponent(joinParam);
					window.open(context+ "/export/"+ options.idEntite + restParams , '_self');
				}

				var downloadPDF = function(e, dt,dataFiltres){
					var columns = [];
					var elem = dt.context[0];
					dt.columns().every( function (index) {
						if(this.visible() && !angular.isNumber(elem.aoColumns[index].mData)){
							columns.push(elem.aoColumns[index].mData);
						}
					});
					var param = "[]";
					var joinParam = "[]";
					var sort = elem.aaSorting[0];
					if($("#formZoneRecherche").data("searchParams")){
						param = $("#formZoneRecherche").data("searchParams");
					}
//					if(options.customFiltres){
//					if(param === "[]"){
//					param = JSON.stringify(options.customFiltres);
//					}else {
//					param = param.replace("[",JSON.stringify(options.customFiltres).replace("]",","));
//					}
//					}
					if (options["downloadExcel"] !== 'undefined' && options["downloadExcel"] !== undefined) { 
						var dataFiltres = options.downloadExcel();
						if(dataFiltres){
							if(joinParam === "[]"){
								joinParam = JSON.stringify(dataFiltres);
							}else {
								joinParam = param.replace("[",JSON.stringify(dataFiltres).replace("]",","));
							}
						}
					}
					var marcheId = $("#formZoneRecherche").data("marcheId");
					if(marcheId != null){
						var paramJson = angular.fromJson(param);
						if(!paramJson.hasOwnProperty('marche')){
							var marche = {name:'marche',value:marcheId}
							paramJson.push(marche);
							if(param === "[]"){
								param = JSON.stringify(paramJson);
							}else {
								param = param.replace("[",JSON.stringify(paramJson).replace("]",","));
							}
						}
					}
					var restParams = "?columns="+columns.join(",");
					restParams += "&sort="+elem.aoColumns[sort[0]].mData;
					restParams += "&direction="+sort[1];
					restParams += "&search="+encodeURIComponent(param);
					restParams += "&joint="+encodeURIComponent(joinParam);
					window.open(context+ "/export/pdf/"+ options.idEntite + restParams , '_self');
				}

				/**
				 * Table Server init config
				 */
				var configServer = {
						"bServerSide" : true,
						"sAjaxSource" : context + options.url
				};


				/**
				 * Table Local init config
				 */
				var configLocal = {
						"bProcessing": true,
						"bServerSide" : false,
						"fnServerData" : prepareRestData,
						"data": [],
				};
				
				if(!options.pagination){
					configLocal["paging"] = false;
				}
				
				if(options.filtre){
//					getFiltreZone(options.tableId);
				}

				if(options.local){
					var config = $.extend(defaultConfig, configLocal);
					if(options.search != false){
						getFiltreZone(options.tableId);
					}
				}else{
					var config = $.extend(defaultConfig, configServer);
					getFiltreZone(options.tableId);
				}

				var table = $(options.tableId).DataTable(config);

				if(options.local){
					$(options.tableId+'_wrapper .table-custom-search').on( 'click', function () {
						table.columns().eq( 0 ).each( function ( colIdx ) {
							//Disable Search for actions column
							var searchEnabled = getColumnProperty(table,colIdx,'bSortable');
							if(searchEnabled != null && searchEnabled !=false ){
								this.column( colIdx ).search($(options.tableId+'_wrapper #search_'+colIdx).val()).draw();
							}
						} );
					} );
				}else{
					$(options.tableId+'_wrapper .table-custom-search').on( 'click', function () {
						table.columns().eq( 0 ).each( function ( colIdx ) {
							this
							.column( colIdx )
							.search($(options.tableId+'_wrapper #search_'+colIdx).val());
						} );
						table.ajax.reload();
					} );
				}


				$(options.tableId+'_wrapper .filtres .input-group').keypress(function (e) {
					if(e.which == 13) {
						$(this).find('.table-custom-search').click();
					}
				});

				enableFiltreClick(options.tableId);

				$(options.tableId+'_wrapper .select-all').on('click', function(){
					// Get all rows with search applied
					var rows = table.rows({ 'search': 'applied' }).nodes();
					// Check/uncheck checkboxes for all rows in the table
					$('input[type="checkbox"]', rows).prop('checked', this.checked);
				});
				return table ;
			},
			findRowIndex : function (sSearch, iColumn ){
				var oSettings = $(this).dataTable().fnSettings();
				var i,iLen, j, jLen, val, aOut = [], aData,
				columns = oSettings.aoColumns;
				for ( i=0, iLen=oSettings.aoData.length ; i<iLen ; i++ ){
					aData = oSettings.aoData[i]._aData;
					if ( iColumn === undefined ){
						for ( j=0, jLen=columns.length ; j<jLen ; j++ ){
							val = $(this).dataTable().fnGetData(i, j);
							if ( val == sSearch ){
								aOut.push( i );
							}
						}
					}
					else if ($(this).dataTable().fnGetData(i, iColumn) == sSearch ){
						aOut.push( i );
					}
				}
				return aOut[0];
			},
			findRow : function (sSearch, iColumn ){
				var idTable = $(this).attr("id");
				var index = $("#"+idTable).mytable("findRowIndex",sSearch, iColumn);
				return this.DataTable().row(index).data();
			},
			addRow : function(data){
				this.DataTable().row.add(data).draw( false );
			},
			update : function(index,newData){
				var idTable = $(this).attr("id");
				this.DataTable().row(index).data( newData ).draw();
			},
			removeRow : function(index){
				this.DataTable().row(index).remove().draw( false );
			},
			getRows : function(){
				return this.DataTable().rows().data();
			}
	};


	$.fn.mytable = function(methode) {
		if (methodes[methode]) {
			return methodes[methode].apply(this, Array.prototype.slice
					.call(arguments, 1));
		} else if (typeof methode === 'object' || !methode) {
			return methodes.init.apply(this, arguments);
		} else {
			return $(this).jqGrid[methode].apply(this, arguments);
		}
	};



})(jQuery);
