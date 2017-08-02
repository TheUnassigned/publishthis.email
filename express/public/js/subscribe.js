function subscribe(){
  var email = document.getElementById('email').value;
  if(validEmail(email)){
    // Subscribe
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://d4sirptbj7.execute-api.us-east-1.amazonaws.com/dev/list/subscribe?listId=' + listId + '5&subscriberEmail=' + email;

    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText);
        // finished loading
          if(result.success){
            // Display comfirmation
            document.getElementById('subscribe').className = 'subscribe-hidden';
            document.getElementById('confirm').className = '';
          }else{
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
