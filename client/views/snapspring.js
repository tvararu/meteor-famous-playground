// A visual comparison of the Snap and Spring transitions.

Template.snapspring.rendered = function() {
  var mainContext = Engine.createContext();

  var originMod = new Modifier({
    origin: [0.5, 0.5]
  });

  mainContext = mainContext.add(originMod);

  var s = 200;

  if (window.innerWidth < 600) {
    // Screen is too tiny.
    s = 100;
  }

  var square1 = new Surface({
    size: [s, s],
    content: 'Snap.',
    properties: {
      lineHeight: s + 'px',
      textAlign: 'center'
    },
    classes: ['secondary-bg']
  });

  var square2 = new Surface({
    size: [s, s],
    content: 'Spring.',
    properties: {
      lineHeight: s + 'px',
      textAlign: 'center'
    },
    classes: ['secondary-bg']
  });

  // Initialize square1 position.
  var move1 = new Modifier({
    transform: Transform.translate(-s, -s, 0)
  });

  mainContext.add(move1).add(square1);

  // Initialize square2 position.
  var move2 = new Modifier({
    transform: Transform.translate(s, -s, 0)
  });

  mainContext.add(move2).add(square2);

  var trans1 = {
    method: 'snap',
    period: 300,
    dampingRatio: 0.3,
    velocity: 0
  };

  var trans2 = {
    method: 'spring',
    period: 300,
    dampingRatio: 0.3,
    velocity: 0
  };

  // Toggle between different positions, using the appropriate transitions.
  var toggle = true;
  Engine.on('click', function() {
    if (toggle) {
      move1.setTransform(Transform.translate(-s, s, 0), trans1);
      move2.setTransform(Transform.translate(s, s, 0), trans2);
      toggle = false;
    } else {
      move1.setTransform(Transform.translate(-s, -s, 0), trans1);
      move2.setTransform(Transform.translate(s, -s, 0), trans2);
      toggle = true;
    }
  });
};
