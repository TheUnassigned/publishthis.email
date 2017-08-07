function subscribe(){
  var email = document.getElementById('email').value;
  if(validEmail(email)){
    // show loader
    document.getElementById('loader').className = 'subscribe-loader';
    document.getElementById('subscribe').className = 'subscribe-blur';

    // Subscribe
    var xmlhttp = new XMLHttpRequest();
    var url = API_URL + 'list/subscribe?listId=' + listId + '&subscriberEmail=' + email;

    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText);
        // finished loading
          if(result.success){
            // hide loader
            document.getElementById('loader').className = 'subscribe-loader-hidden';
            // Display comfirmation
            document.getElementById('subscribe').className = 'subscribe-hidden';
            document.getElementById('confirm').className = '';
          }else{
            // hide loader
            document.getElementById('subscribe').className = '';
            document.getElementById('loader').className = 'subscribe-loader-hidden';
            // display error
            document.getElementById('error').className = 'subscribe-error';
            document.getElementById('error').innerHTML = result.msg;
            document.getElementById('email').className = 'input-error';
          }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    // loading

  }else{
    // Error
    document.getElementById('error').className = 'subscribe-error';
    document.getElementById('error').innerHTML = 'Oops, it looks like there is a problem with your email address.';
    document.getElementById('email').className = 'input-error';
  }
}

function validEmail(email){
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)
}
