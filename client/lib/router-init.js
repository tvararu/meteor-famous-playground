Router.map(function() {
  this.route('home', { path: '/' });
  this.route('simple');
  this.route('snapspring');
  this.route('color');
  this.route('collection');
  this.route('deck');
  this.route('drag');
  this.route('clear');

// FIXME. I have no idea how to clean the famous container.
// So I'll just do this.
Router.onRun(function() {
  $('.famous-container').remove();
});
