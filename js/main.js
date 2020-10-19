(function($) {

  $('#register-form').submit(function( event ) {

    event.preventDefault();
    $("#error-messages").text("");

    $.ajax({
      url: "http://localhost:3310/users/signup",
      type: "POST",
      data: {
          firstname: $("#firstname").val(),
          lastname: $("#lastname").val(),
          email: $("#email").val(),
          password: $("#password").val(),
          confirmpassword: $("#confirmpassword").val(),
          address: $("#address").val(),
          state: $("#state").val(),
          city: $("#city").val(),
          phone: $("#phone").val(),
          zipcode: $("#zipcode").val(),
      },
      dataType: "JSON",
      success: function (jsonStr) {
          $("#success-messages").html(`User saved and email sent.
          <br />
          <pre>
          ${JSON.stringify(jsonStr)}
          </pre>
          `);
      },
      error: function(xhr, status, error) { 
        if(xhr.status == 400)
          $("#error-messages").text(xhr.responseText);
        else
          console.log(xhr, status, error)
      } 
    });

  });

})(jQuery);