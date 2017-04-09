function loadMore(timeAdded, collectionId){
  $('.load-more').hide();
  $('.load-more-loader').show();
  $.get('/c/' + collectionId + '/more/' + timeAdded, function(data){
    $('.load-more-container').replaceWith(data);
  });
}
