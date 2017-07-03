// listen for scroll event
window.addEventListener("scroll", scroll);
// on scroll
function scroll(){
  // check for bottom
  var footerOffset = 0;
  if((window.innerHeight + window.scrollY + footerOffset) >= getDocHeight()){
    document.getElementById('footer-expander').setAttribute('class', 'footer-content footer-content-expanded');
  }else{
    document.getElementById('footer-expander').setAttribute('class', 'footer-content');
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
