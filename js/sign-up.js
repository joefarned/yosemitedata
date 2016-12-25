

// Variable to hold request
var request;

window.onload = function() {
	$(".sign-up-section").toggle("slow");
}

// Bind to the submit event of our form
$("#user_email").submit(function(event){

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input");

    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });

    //check email isn't empty
    if (values["email"] == '') {
    	// Prevent default posting of form
    	event.preventDefault();
    	return; 
    }
    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = 	$.get("https://script.google.com/macros/s/AKfycbwV94B55P9mS6oaHbGUzyH2qS_9pUQiQY-_x8UlPQqHNRiFNKc/exec",
	 	serializedData
	 );

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
        // console.log(response);
        // console.log(textStatus);
        // console.log(jqXHR);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        // console.error(
        //     "The following error occurred: "+
        //     textStatus, errorThrown
        // );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    // Prevent default posting of form
    event.preventDefault();
    successMessage();
});

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function successMessage() {
	await sleep(500);
	$(".sign-up-prompt").toggle("slow", function() {
		$(".sign-up-thanks").toggle("slow");
	});
}