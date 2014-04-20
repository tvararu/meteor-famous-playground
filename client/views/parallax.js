Template.parallax.rendered = function() {
  var mainContext = Engine.createContext();

  mainContext.setPerspective(200);

  var contentView = new Scrollview();
  var surfaces = [];

  contentView.sequenceFrom(surfaces);

  var addSurface = function(content) {
    var view = new View();

    var container = new ContainerSurface({
      size: [undefined, 350],
      properties: {
        borderBottom: '1px solid black'
      }
    });

    var originMod = new StateModifier({
      origin: [0.5, 0.5]
    });

    var skewMod = new StateModifier({
      transform: Transform.skew(0, 0, - (Math.PI / 4))
    });

    var rotateMod = new StateModifier({
      transform: Transform.rotateZ(- (Math.PI / 4))
    });

    var viewport = new ContainerSurface({
      size: [200, 300],
      classes: ['secondary-bg'],
      properties: {
        overflow: 'hidden'
      }
    });

    var oppositeSkewMod = new StateModifier({
      transform: Transform.skew(0, 0, (Math.PI / 4))
    });
    
    var oppositeSkew2Mod = new StateModifier({
      transform: Transform.skew(0, 0, - (Math.PI / 4.7))
    });

    var oppositeRotateMod = new StateModifier({
      transform: Transform.translate(-130, 0, 0)
    });

    var image = new ImageSurface({
      content: 'http://placehold.it/392x200',
      size: [392, 300]
    });

    viewport.add(oppositeSkewMod).add(oppositeSkew2Mod).add(oppositeRotateMod).add(image);
    container.add(originMod).add(skewMod).add(rotateMod).add(viewport);
    view.add(container);

    container.pipe(contentView);

    // contentView.sync.on('update', function() {
    //   var pos = contentView.getPosition() / 10;
    //   oppositeRotateMod.setTransform(Transform.translate(-130, pos, 0));
    // });

    surfaces.push(view);
  };

  for (var i = 0; i < 10; i++) {
    addSurface('Surface ' + i);
  }

  mainContext.add(contentView);
};