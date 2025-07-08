
		filterSelection('all');
		
		function clearActive() {
			 var btnContainer = document.getElementById("filter-btns");
			 var elems = btnContainer.querySelectorAll(".active");
			 if(elems.length > 0){
				 [].forEach.call(elems, function(el) {
					   el.classList.remove("active");
					 }); 
			 }
		}
		
		function filterSelection(c) {
//		  clearActive();
		  var x, i;
		  x = document.getElementsByClassName("item");
		  if (c == "all") c = "";
		  for (i = 0; i < x.length; i++) {
		    removeClass(x[i], "show");
		    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
		  }
		}

		function addClass(element, name) {
		  var i, arr1, arr2;
		  arr1 = element.className.split(" ");
		  arr2 = name.split(" ");
		  for (i = 0; i < arr2.length; i++) {
		    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
		  }
		}

		function removeClass(element, name) {
		  var i, arr1, arr2;
		  arr1 = element.className.split(" ");
		  arr2 = name.split(" ");
		  for (i = 0; i < arr2.length; i++) {
		    while (arr1.indexOf(arr2[i]) > -1) {
		      arr1.splice(arr1.indexOf(arr2[i]), 1);     
		    }
		  }
		  element.className = arr1.join(" ");
		}

		var btnContainer = document.getElementById("filter-btns");
		
		if (btnContainer !== null) {
			
			var btns = btnContainer.getElementsByClassName("filter-btn");
			
			for (var i = 0; i < btns.length; i++) {
				  btns[i].addEventListener("click", function(){
//				    var current = document.getElementsByClassName("active");
//				    current[0].className = current[0].className.replace(" active", "");
					  clearActive();
					  this.className += " active";
				  });
				}
		}
