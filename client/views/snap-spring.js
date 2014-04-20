Template.snapspring.rendered = function() {
  var mainContext = Engine.createContext();

  var originMod = new Modifier({
    origin: [0.5, 0.5]
  });

  mainContext = mainContext.add(originMod);

  var square1 = new Surface({
    size: [200, 200],
    content: 'Snap Transition.',
    properties: {
      lineHeight: '200px',
      textAlign: 'center'
    },
    classes: ['secondary-bg']
  });

  var square2 = new Surface({
    size: [200, 200],
    content: 'Spring Transition.',
    properties: {
      lineHeight: '200px',
      textAlign: 'center'
    },
    classes: ['secondary-bg']
  });

  // Initialize square1 position.
  var move1 = new Modifier({
    transform: Transform.translate(-200, -200, 0)
  });

  mainContext.add(move1).add(square1);

  // Initialize square2 position.
  var move2 = new Modifier({
    transform: Transform.translate(200, -200, 0)
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
  var tick = true;
  Engine.on('click', function() {
    if (tick) {
      move1.setTransform(Transform.translate(-200, 200, 0), trans1);
      move2.setTransform(Transform.translate(200, 200, 0), trans2);
      tick = false;
    } else {
      move1.setTransform(Transform.translate(-200, -200, 0), trans1);
      move2.setTransform(Transform.translate(200, -200, 0), trans2);
      tick = true;
    }
  });
};
