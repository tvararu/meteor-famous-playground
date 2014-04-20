// Drag a surface, and have it return to its initial position with a transition.

// Relevant StackOverflow question:
// https://stackoverflow.com/questions/23129805/drag-a-famous-surface-and-have-it-transition-back-to-origin-on-mouseup

Template.drag.rendered = function() {
  var mainContext = Engine.createContext();

  var originMod = new Modifier({
    origin: [0.5, 0.5]
  });

  mainContext = mainContext.add(originMod);

  var surface = new Surface({
    size: [100, 100],
    content: 'Drag.',
    properties: {
      lineHeight: '100px',
      textAlign: 'center'
    },
    classes: ['secondary-bg']
  });

  // Initialize a draggable canvas, the size of the entire available window,
  // minus half the height/width of our surface.
  var draggable = new Draggable({
    xRange: [- (window.innerWidth / 2) + 50, (window.innerWidth / 2) - 50],
    yRange: [- (window.innerHeight / 2) + 50, (window.innerHeight / 2) - 50]
  });

  // Pipe all events on the square to the draggable canvas.
  surface.pipe(draggable);

  var resetPosition = function () {
    // Calculate a velocity that is based on the difference between the
    // resting position and the current position.
    var velo = _.reduce(draggable.getPosition(), function(memo, num) {
      return memo + Math.abs(num);
    }, 0);
    
    velo = (velo / 100) * 0.01;
    
    draggable.setPosition([0, 0, 0], {
      method: 'snap',
      period: 300,
      dampingRatio: 0.3,
      velocity: velo
    });
  };

  // Reset the position of the square when you let go.
  // TODO: should tie in with mouseleave (or similar).
  surface.on('mouseup', resetPosition);
  surface.on('touchend', resetPosition);

  mainContext.add(draggable).add(surface);
};