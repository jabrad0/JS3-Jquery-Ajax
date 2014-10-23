$(document).ready(function () {
    // Normally, JavaScript runs code at the time that the <script>
    // tags loads the JS. By putting this inside a jQuery $(document).ready()
    // function, this code only gets run when the document finishing loading.

    $("#message-form").submit(handleFormSubmit);
    getMessages();
});


/**
 * Handle submission of the form.
 */
function handleFormSubmit(evt) {
    console.log('click event!', evt)
    evt.preventDefault();

    var textArea = $("#message");
    var msg = textArea.val();
    console.log(msg);

    console.log("handleFormSubmit: ", msg);
    addMessage(msg);


    // Reset the message container to be empty
    textArea.val("");
    
}

function getMessages() {
    $.get("/api/wall/list", function (result) {
        var msgs = result['messages'];
        $("#message-container").empty(); 
        for (var n=0; n<msgs.length; n++) {
            $("#message-container").prepend("<li class='list-group-item'>" + msgs[n]['message'] + "</li>");
           
        }
    });
}


/**
 * Makes AJAX call to the server and the message to it.
 */
function addMessage(msg) {
    $.ajax({
          type: "POST",
          url: "/api/wall/add",
          data: { 'm': msg }
      })
      .done(function( msg ) {
            console.log("addMessage: ", msg);
            displayResultStatus(msg.result);
            getMessages();
      });

    // $.post(
    //     "/api/wall/add",
    //     {'m': msg},
    //     function (data) {
    //         console.log("addMessage: ", data);
    //         displayResultStatus(data.result);
    //         getMessages();
    //     }
    // );

}


/**
 * This is a helper function that does nothing but show a section of the
 * site (the message result) and then hide it a moment later.
 */
function displayResultStatus(resultMsg) {
    var notificationArea = $("#sent-result");
    notificationArea.text(resultMsg);
    notificationArea.slideDown(function () {
        // In JavaScript, "this" is a keyword that means "the object this
        // method or function is called on"; it is analogous to Python's
        // "self". In our case, "this" is the #sent-results element, which
        // is what slideDown was called on.
        //
        // However, when setTimeout is called, it won't be called on that
        // same #sent-results element--"this", for it, wouldn't be that
        // element. We could put inside of our setTimeout call the code
        // to re-find the #sent-results element, but that would be a bit
        // inelegant. Instead, we'll use a common JS idiom, to set a variable
        // to the *current* definition of self, here in this outer function,
        // so that the inner function can find it and where it will have the
        // same value. When stashing "this" into a new variable like that,
        // many JS programmers use the name "self"; some others use "that".
        var self = this;

        setTimeout(function () {
            $(self).slideUp();
        }, 2000);
    });
}

$('#message-reset').click(function() {
        $.get("/api/wall/delete", function(result) {
            getMessages();
        });
});
