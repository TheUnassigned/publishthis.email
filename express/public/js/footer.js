var expanded = false;

function expand(){
  document.getElementById('footer-expander').setAttribute('class', 'footer-content footer-content-expanded');
}

function collapse(){
  document.getElementById('footer-expander').setAttribute('class', 'footer-content');
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
