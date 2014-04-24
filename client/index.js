Template.home.rendered = function() {
  // Probably erroneous way to clear the previous Famous canvas.
  // But it works.
  var mainContext = Engine.createContext();

  var contentView = new Scrollview();

  var content = new Surface({
    size: [undefined, undefined],
    content: UI.render(Template.homecontent).render().toHTML()
  });

  content.pipe(contentView);
  contentView.sequenceFrom([content]);

  mainContext.add(contentView);

  // size: [undefined, true] is borked in ScrollViews,
  // so we have to hack around it a bit.
  content.on('deploy', function() {
    var h = $('.famous-container .container')[0].scrollHeight + 72;
    content.setSize([undefined, h]);
  });
};