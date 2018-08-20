'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unregisterDropTarget = exports.registerDropTarget = exports.setDropTargets = exports.dragStartAction = exports.dragMoveAction = exports.dragEndAction = exports.dragCancelAction = undefined;

var _constants = require('../constants/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dragCancelAction = exports.dragCancelAction = function dragCancelAction() {
  return {
    type: _constants2.default.ACTIONS.DRAG_DROP.DRAG_CANCEL
  };
};

var dragEndAction = exports.dragEndAction = function dragEndAction() {
  return {
    type: _constants2.default.ACTIONS.DRAG_DROP.DRAG_END
  };
};

var dragMoveAction = exports.dragMoveAction = function dragMoveAction(target, key, x, y) {
  return {
    type: _constants2.default.ACTIONS.DRAG_DROP.DRAG_MOVE,
    target: target,
    key: key,
    x: x,
    y: y
  };
};

var dragStartAction = exports.dragStartAction = function dragStartAction(source, key, x, y) {
  return {
    type: _constants2.default.ACTIONS.DRAG_DROP.DRAG_START,
    source: source,
    key: key,
    x: x,
    y: y
  };
};

var setDropTargets = exports.setDropTargets = function setDropTargets(targets) {
  return {
    type: _constants2.default.ACTIONS.DRAG_DROP.DROP_TARGETS,
    targets: targets
  };
};

var registerDropTarget = exports.registerDropTarget = function registerDropTarget(target, config) {
  return {
    type: _constants2.default.ACTIONS.REGISTER.DROP_TARGET,
    target: target,
    config: config
  };
};

var unregisterDropTarget = exports.unregisterDropTarget = function unregisterDropTarget(target) {
  return {
    type: _constants2.default.ACTIONS.UNREGISTER.DROP_TARGET,
    target: target
  };
};