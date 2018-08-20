'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = DragDropContext;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _dragDropReducer = require('../store/dragDropReducer');

var _dragDropReducer2 = _interopRequireDefault(_dragDropReducer);

var _actionCreators = require('../store/actionCreators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function DragDropContext(Component) {
  var dragDropContext = function (_React$Component) {
    _inherits(dragDropContext, _React$Component);

    function dragDropContext() {
      _classCallCheck(this, dragDropContext);

      var store, dragSource;

      var _this = _possibleConstructorReturn(this, (dragDropContext.__proto__ || Object.getPrototypeOf(dragDropContext)).call(this));

      _this.connect = _this.connect.bind(_this);
      _this.dragCancel = _this.dragCancel.bind(_this);
      _this.dragEnd = _this.dragEnd.bind(_this);
      _this.dragMove = _this.dragMove.bind(_this);

      _this.store = store = (0, _redux.createStore)(_dragDropReducer2.default);
      _this.unsubscribe = store.subscribe(function () {
        var state = store.getState();

        if (dragSource !== state.dragSource) {
          dragSource = state.dragSource;

          if (dragSource) {
            store.dispatch((0, _actionCreators.setDropTargets)(state.dropTargets.filter(function (t) {
              return t.config.canDrop.call(t.target.component, dragSource, state.dragKey);
            })));
          }
        }
      });

      dragSource = store.getState().dragSource;
      return _this;
    }

    _createClass(dragDropContext, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unsubscribe();
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          __dragDropStore: this.store
        };
      }
    }, {
      key: 'connect',
      value: function connect(node) {
        var props;

        if (typeof node.type !== 'string') {
          throw new Error('DragDropContext node must be a ReactDOMComponent');
        }

        props = _extends({}, node.props, {
          onMouseLeave: this.dragCancel,
          onMouseMove: this.dragMove,
          onMouseUp: this.dragEnd,
          onTouchCancel: this.dragCancel,
          onTouchEnd: this.dragEnd,
          onTouchMove: this.dragMove
        });

        return _react2.default.cloneElement(node, props, node.props.children);
      }
    }, {
      key: 'dragCancel',
      value: function dragCancel() {
        var store = this.store,
            state = store.getState();

        if (state.dragSource) {
          store.dispatch((0, _actionCreators.dragCancelAction)());
        }
      }
    }, {
      key: 'dragEnd',
      value: function dragEnd() {
        var store = this.store,
            state = store.getState(),
            source = state.dragSource,
            dropTarget;

        if (source) {
          dropTarget = state.dropTarget;
          if (dropTarget) {
            dropTarget.config.drop.call(dropTarget.target.component, source, state.dragKey, state.dropKey);
          }

          store.dispatch((0, _actionCreators.dragEndAction)());
        }
      }
    }, {
      key: 'dragMove',
      value: function dragMove(e) {
        var store = this.store,
            state = store.getState(),
            target = null,
            key = null,
            x,
            y,
            touch;

        if (state.dragSource) {
          if (e.touches) {
            touch = e.touches.item(0);
            x = touch.clientX;
            y = touch.clientY;
          } else {
            x = e.clientX;
            y = e.clientY;
          }

          state.currentTargets.forEach(function (t) {
            t.target.targets.forEach(function (tt) {
              var rect = tt.element.getBoundingClientRect();

              if (rect.left < x && rect.right > x && rect.top < y && rect.bottom > y) {
                target = t;
                key = tt.key;
              }
            });
          });

          store.dispatch((0, _actionCreators.dragMoveAction)(target, key, x, y));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(Component, _extends({}, this.props, { connectDragDropContext: this.connect }));
      }
    }]);

    return dragDropContext;
  }(_react2.default.Component);

  _extends(dragDropContext, {
    childContextTypes: {
      __dragDropStore: _propTypes2.default.object.isRequired
    },
    displayName: 'DragDropContext(' + (Component.displayName || 'Component') + ')'
  });

  return dragDropContext;
}