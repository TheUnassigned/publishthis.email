function subscribe(){
  var email = document.getElementById('email').value;
  if(validEmail(email)){
    // Subscribe

    // Display comfirmation
    document.getElementById('subscribe').className = 'subscribe-hidden';
    document.getElementById('confirm').className = '';
  }else{
    // Error
    document.getElementById('error').className = 'subscribe-error';
    document.getElementById('email').className = 'input-error';
  }
}

function validEmail(email){
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)
}
