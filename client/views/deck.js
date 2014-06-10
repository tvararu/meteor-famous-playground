// This is a nearly unmodified copy of the Famous "Deck" example.
// The difference is that the deck will close/open whenever any
// client clicks on it. Which looks really cool in practice.

Template.deck.rendered = function() {
  var mainContext = Engine.createContext();

  var originMod = new Modifier({
    origin: [0.5, 0.5]
  });

  mainContext = mainContext.add(originMod);

  var surfaces = [];
  var myLayout = new Deck({
    itemSpacing: 10,
    transition: {
      method: 'spring',
      period: 300,
      dampingRatio: 0.5
    },
    stackRotation: 0.1
  });

  myLayout.sequenceFrom(surfaces);

  for (var i = 0; i < 5; i++) {
    var temp = new Surface({
      // 'undefined' causes the surface to stretch over the
      // entire available length.
      size: [300, 100],
      classes: ['test'],
      properties: {
        backgroundColor: 'hsla(' + ((i*5 + i) * 10 % 360) + ', 60%, 55%, 0.8)',
        color: 'white',
        lineHeight: '100px',
        textAlign: 'center'
      },
      content: i + 1
    });

    // On click, do something with the collection. Doesn't really matter what.
    temp.on('click', function() {
      var clickCounter = Clicks.findOne();

      Clicks.update(clickCounter._id, { number: clickCounter.number + 1 });
    });
    surfaces.push(temp);
  }

  mainContext.add(myLayout);

  // Trigger the layout whenever the collection updates in any way.
  Clicks.find().observe({
    changed: function() {
      myLayout.toggle();
    }
  });
};