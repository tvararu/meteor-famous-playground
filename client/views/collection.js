// The first example that actually uses Meteor for anything.
// Monitor a collection, and update the content of a surface reactively.
// View this example in two browser windows for it to make actual sense.

Template.collection.rendered = function() {
  var mainContext = Engine.createContext();

  var originMod = new Modifier({
    origin: [0.5, 0.5]
  });

  mainContext = mainContext.add(originMod);

  var square = new Surface({
    size: [200, 200],
    properties: {
      lineHeight: '200px',
      textAlign: 'center'
    },
    classes: ['secondary-bg']
  });

  Clicks.find().observe({
    added: function(clickCounter) {
      square.setContent(clickCounter.number);
    },
    
    changed: function(clickCounter) {
      square.setContent(clickCounter.number);
    }
  });

  square.on('click', function() {
    var clickCounter = Clicks.findOne();

    Clicks.update(clickCounter._id, { number: clickCounter.number + 1 });
  });

  mainContext.add(square);
};