// The simplest Famous example: a centered square.

Template.simple.rendered = function() {
  // Adds the `.famous-container` div to the <body> element, sets the
  // fpsCap to 60, and starts the render loop.
  // You can pass options to change any/all of these.
  var mainContext = Engine.createContext();

  // Surfaces are the basic "divs" of the Famous rendering engine.
  // They take a size array, a content string, a CSS classes array
  // and a CSS properties object.
  // All optional, and redefinable (`setContent` et al).
  // Surfaces do not know or care about their opacity, position, or rotation.
  // That's the job of Modifiers.
  var square = new Surface({
    size: [200, 200],
    content: 'Hello.',
    properties: {
      lineHeight: '200px',
      textAlign: 'center'
    },
    classes: ['secondary-bg']
  });

  // Modifiers are sets of visual changes that get applied to Surfaces.
  // When you add a Modifier to the render tree, all the surfaces underneath
  // will be affected by the Modifier's properties.
  // Setting an origin of [0.5, 0.5] will center every surface underneath both
  // vertically and horizontally.
  var originMod = new Modifier({
    origin: [0.5, 0.5]
  });

  // When you add a Modifier, what gets returned is a new renderNode starting
  // right underneath that Modifier. You can add other Modifiers underneath,
  // or a Surface.
  mainContext.add(originMod).add(square);
  
  // Read more about the Render Tree here: https://famo.us/guides/dev/render-tree.html
};
