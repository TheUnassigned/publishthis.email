var removed = false;

var trackLink = function(url) {
   ga('send', 'event', 'footer', 'click', url, {
     'transport': 'beacon',
     'hitCallback': function(){document.location = url;}
   });
}

function removeFooter(){
  removed = true;
  var footer = document.getElementById('footer-expander');
  footer.parentNode.removeChild(footer);
  ga('send', 'event', 'footer', 'removed')
}

function expand(){
  if(!removed){
      document.getElementById('footer-expander').setAttribute('class', 'footer-content footer-content-expanded');
  }else{
    window.location = 'http://www.publishthis.email';
  }
  ga('send', 'event', 'footer', 'expanded')
  console.log('event')
}

function collapse(){
  if(!removed){
    document.getElementById('footer-expander').setAttribute('class', 'footer-content');
  }
}

// listen for scroll event
window.addEventListener("scroll", scroll);
// on scroll
function scroll(){
  // check for bottom
  var footerOffset = 0;
  if((window.innerHeight + window.scrollY + footerOffset) >= getDocHeight()){
    expand()
  }else{
    collapse()
  }
}

// get document height
function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight, D.documentElement.scrollHeight,
    D.body.offsetHeight, D.documentElement.offsetHeight,
    D.body.clientHeight, D.documentElement.clientHeight
  );
}
