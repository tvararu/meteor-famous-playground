Template.clear.rendered = function() {
  var mainContext = Engine.createContext();

  mainContext.setPerspective(200);

  var layout = new HeaderFooterLayout({
    headerSize: 50,
    footerSize: 50
  });

  var contentView = new Scrollview({
    paginated: true
  });
  var surfaces = [];

  contentView.sequenceFrom(surfaces);

  var addSurface = function(content) {
    var tempView = new View();

    var originMod = new StateModifier({
      origin: [0.5, 1.0]
    });

    var sizeMod = new StateModifier({
      size: [undefined, 50]
    });

    var transMod = new StateModifier({
      transform: Transform.rotateX(Math.PI / 2)
    });

    var node = tempView.add(sizeMod).add(originMod).add(transMod);

    var tickMod = new StateModifier({
      origin: [0.0, 0.0]
    });

    var crossMod = new StateModifier({
      origin: [1.0, 0.0]
    });

    var tick = new Surface({
      size: [50, 50],
      content: 'T',
      properties: {
        lineHeight: '50px',
        textAlign: 'center'
      },
      classes: ['success-bg']
    });

    var cross = new Surface({
      size: [50, 50],
      content: 'X',
      properties: {
        lineHeight: '50px',
        textAlign: 'center'
      },
      classes: ['primary-bg']
    });

    node.add(tickMod).add(tick);
    node.add(crossMod).add(cross);
    tickMod.setOpacity(0.0);
    crossMod.setOpacity(0.0);

    var surface = new Surface({
      content: content,
      size: [undefined, 50],
      classes: ['secondary-bg'],
      properties: {
        lineHeight: '50px',
        textAlign: 'center'
      }
    });

    var draggable = new Draggable({
      xRange: [-50, 50],
      yRange: [0, 0],
      scale: 0.5
    });

    var resetPosition = function () {
      var pos = draggable.getPosition();
      
      if (pos[0] === -50) {
        tempView.clearLeft();
      } else if (pos[0] === 50) {
        tempView.clearRight();
      }
      
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

    draggable.on('end', resetPosition);

    var draggableMove = function() {
      var pos = draggable.getPosition()[0];
      
      if (pos > 0) {
        pos = (pos * 2) / 100;
        tickMod.setOpacity(pos);
      } else {
        pos = (Math.abs(pos) * 2) / 100;
        crossMod.setOpacity(pos);
      }
    };

    draggable.on('update', draggableMove);

    surface.pipe(draggable);

    node.add(draggable).add(surface);

    tempView.show = function(callback) {
      transMod.setTransform(
        Transform.rotateX(0),
        {
          duration: 300
        },
        callback
      );
    };

    tempView.clearLeft = function(callback) {
      transMod.setTransform(
        Transform.translate(- window.innerWidth, 0, 0),
        {
          method: 'snap',
          period: 500,
          dampingRatio: 0.6,
          velocity: 0.0
        },
        callback
      );
    };

    tempView.clearRight = function(callback) {
      transMod.setTransform(
        Transform.translate(window.innerWidth, 0, 0),
        {
          method: 'snap',
          period: 500,
          dampingRatio: 0.6,
          velocity: 0.0
        },
        callback
      );
    };

    surface.pipe(contentView);
    surfaces.push(tempView);

    tempView.show();
  };

  var removeSurface = function() {
    surfaces[surfaces.length - 1].clearRight(function() {
      surfaces.pop();
    });
  };

  var headerView = new Surface({
    size: [undefined, 50],
    content: 'Add surface',
    classes: ['primary-bg'],
    properties: {
      lineHeight: '50px',
      textAlign: 'center'
    }
  });

  var footerView = new Surface({
    size: [undefined, 50],
    content: 'Remove surface',
    classes: ['primary-bg'],
    properties: {
      lineHeight: '50px',
      textAlign: 'center'
    }
  });

  headerView.on('click', function() {
    addSurface('Surface');
  });

  footerView.on('click', function() {
    removeSurface();
  });

  // Content first, so it appears underneath the Header and Footer.
  layout.content.add(contentView);

  layout.header.add(headerView);

  layout.footer.add(footerView);

  mainContext.add(layout);
};