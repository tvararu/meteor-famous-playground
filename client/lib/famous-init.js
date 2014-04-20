Meteor.startup(function() {
  // Add polyfills.
  require("famous-polyfills");

  // Add the default CSS file.
  require("famous/core/famous");

  // Add everything to window for simplicity's sake.
  window.Engine = require('famous/core/Engine');

  window.View = require('famous/core/View');
  window.Deck = require('famous/views/Deck');
  window.Surface = require('famous/core/Surface');
  window.Modifier = require('famous/core/Modifier');
  window.Transform = require('famous/core/Transform');
  window.Draggable = require('famous/modifiers/Draggable');
  window.StateModifier = require('famous/modifiers/StateModifier');
  window.RenderController = require("famous/views/RenderController");

  window.Scrollview = require('famous/views/Scrollview');
  window.HeaderFooterLayout = require("famous/views/HeaderFooterLayout");

  window.Easing = require('famous/transitions/Easing');
  window.Transitionable = require('famous/transitions/Transitionable');
  window.SnapTransition = require('famous/transitions/SnapTransition');
  window.SpringTransition = require('famous/transitions/SpringTransition');

  // Initialize two basic transitions.
  Transitionable.registerMethod('snap', SnapTransition);
  Transitionable.registerMethod('spring', SpringTransition);
});
