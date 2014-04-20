// An example Color transition.
// The reason this is interesting is because it's accomplished not by
// animating the CSS property, but by overlaying two Surfaces and
// opacitating them.

Template.color.rendered = function() {
  var mainContext = Engine.createContext();

  var originMod = new Modifier({
    origin: [0.5, 0.5]
  });

  mainContext = mainContext.add(originMod);

  var transition = {
    method: "snap",
    period: 1000,
    dampingRatio: 0.3,
    velocity: 0
  };

  // The easiest way to toggle between showing/hiding certain surfaces is
  // by using a `renderController`.
  var renderController = new RenderController({
    inTransition: transition,
    outTransition: transition
  });

  var surfaces = [];
  var counter = 0;

  surfaces.push(new Surface({
    content: 'Square.',
    size: [200, 200],
    properties: {
      backgroundColor: 'rgba(200, 200, 200, 0.5)',
      lineHeight: '200px',
      textAlign: 'center'
    }
  }));

  surfaces.push(new Surface({
    content: 'Square.',
    size: [200, 200],
    properties: {
      backgroundColor: 'rgba(200, 255, 200, 0.5)',
      lineHeight: '200px',
      textAlign: 'center'
    }
  }));

  renderController.show(surfaces[0]);

  Engine.on("click", function() {
    var next = (counter++ + 1) % surfaces.length;
    this.show(surfaces[next]);
  }.bind(renderController));

  mainContext.add(renderController);
};