$(document).ready(function(){

    // Step show event
    $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
       //alert("You are on step "+stepNumber+" now");
       if(stepPosition === 'first'){
           $("#prev-btn").addClass('disabled');
       }else if(stepPosition === 'final'){
           $("#next-btn").addClass('disabled');
       }else{
           $("#prev-btn").removeClass('disabled');
           $("#next-btn").removeClass('disabled');
       }
    });

    // Toolbar extra buttons
    var btnFinish = $('<button type="button"></button>').text('Finish')
                                     .addClass('btn btn-info')
                                     .on('click', function(){ alert('Finish Clicked'); });
    var btnCancel = $('<button></button>').text('Cancel')
                                     .addClass('btn btn-danger')
                                     .on('click', function(){ $('#smartwizard').smartWizard("reset"); });

    // Smart Wizard 1
    $('#smartwizard').smartWizard({
            selected: 0,
            theme: 'dots',
            transitionEffect:'fade',
            showStepURLhash: false,
            keyNavigation: false,
            autoAdjustHeight: false,
            lang: {next: 'Suivant', 
            	   previous: 'Précédent'
            },
            toolbarSettings: {toolbarPosition: 'none',
//                              toolbarExtraButtons: [btnFinish, btnCancel]
            },
            anchorSettings: {
            	anchorClickable: false
            }
    });

});