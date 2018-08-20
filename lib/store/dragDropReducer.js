'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initState = {
  dragSource: null,
  dragKey: null,
  dropTarget: null,
  dropKey: null,
  dropTargets: [],
  currentTargets: [],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 }
};

function removeTarget(array, target) {
  var result = [],
      i,
      len,
      item;

  for (i = 0, len = array.length; i < len; i++) {
    item = array[i];
    if (item.target !== target) {
      result.push(item);
    }
  }

  return result;
}

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _constants2.default.ACTIONS.DRAG_DROP.DRAG_CANCEL:
    case _constants2.default.ACTIONS.DRAG_DROP.DRAG_END:
      return _extends({}, initState, {
        dropTargets: state.dropTargets
      });
    case _constants2.default.ACTIONS.DRAG_DROP.DRAG_MOVE:
      return _extends({}, state, {
        dropTarget: action.target,
        dropKey: action.key,
        end: { x: action.x, y: action.y }
      });
    case _constants2.default.ACTIONS.DRAG_DROP.DRAG_START:
      return _extends({}, state, {
        dragSource: action.source,
        dragKey: action.key,
        start: { x: action.x, y: action.y },
        end: { x: action.x, y: action.y }
      });
    case _constants2.default.ACTIONS.DRAG_DROP.DROP_TARGETS:
      return _extends({}, state, {
        currentTargets: action.targets
      });
    case _constants2.default.ACTIONS.REGISTER.DROP_TARGET:
      return _extends({}, state, {
        dropTargets: [].concat(_toConsumableArray(state.dropTargets), [{
          target: action.target,
          config: action.config
        }])
      });
    case _constants2.default.ACTIONS.UNREGISTER.DROP_TARGET:
      return _extends({}, state, {
        dropTargets: removeTarget(state.dropTargets, action.target)
      });
    default:
      return state;
  }
};