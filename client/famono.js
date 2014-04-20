Template.simple.rendered = function() {
  var mainContext = Engine.createContext();

  mainContext.setPerspective(200);

  var containerModifier = new Modifier({
    origin: [0.5, 0.5]
  });

  mainContext = mainContext.add(containerModifier);

  var square = new Surface({
    size: [200, 200],
    content: 'Hello.',
    properties: {
      backgroundColor: 'rgba(200, 200, 200, 0.5)',
      lineHeight: '200px',
      textAlign: 'center'
    }
  });

  mainContext.add(square);
};
