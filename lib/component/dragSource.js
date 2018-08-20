'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = DragSource;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actionCreators = require('../store/actionCreators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function DragSource(Component) {
  var dragSource = function (_React$Component) {
    _inherits(dragSource, _React$Component);

    function dragSource() {
      _classCallCheck(this, dragSource);

      var _this = _possibleConstructorReturn(this, (dragSource.__proto__ || Object.getPrototypeOf(dragSource)).call(this));

      _this.connect = _this.connect.bind(_this);
      _this.dragStart = _this.dragStart.bind(_this);

      _this.state = {
        isDragging: false,
        dragKey: null,
        dragDeltaX: null,
        dragDeltaY: null
      };
      return _this;
    }

    _createClass(dragSource, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        var store = this.context.__dragDropStore;

        this.unsubscribe = store.subscribe(function () {
          var state = store.getState(),
              isDragging = _this2 === state.dragSource;

          if (isDragging) {
            _this2.setState({
              isDragging: isDragging,
              dragKey: state.dragKey,
              dragDeltaX: state.end.x - state.start.x,
              dragDeltaY: state.end.y - state.start.y
            });
          } else if (_this2.state.isDragging) {
            _this2.setState({
              isDragging: isDragging,
              dragKey: null,
              dragDeltaX: null,
              dragDeltaY: null
            });
          }
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unsubscribe();
      }
    }, {
      key: 'connect',
      value: function connect(node) {
        var _this3 = this;

        var handler, props;

        if (typeof node.type !== 'string') {
          throw new Error('DragSource node must be a ReactDOMComponent');
        }

        handler = function handler(e) {
          _this3.dragStart(node, e);
        };

        props = _extends({}, node.props, {
          onMouseDown: handler,
          onTouchStart: handler
        });

        return _react2.default.cloneElement(node, props, node.props.children);
      }
    }, {
      key: 'dragStart',
      value: function dragStart(node, e) {
        var x, y, touch;

        if (e.touches) {
          touch = e.touches.item(0);
          x = touch.clientX;
          y = touch.clientY;
        } else {
          x = e.clientX;
          y = e.clientY;
        }

        this.context.__dragDropStore.dispatch((0, _actionCreators.dragStartAction)(this, node.key, x, y));
      }
    }, {
      key: 'render',
      value: function render() {
        var isDragging = this.state.isDragging,
            props;


        props = {
          connectDragSource: this.connect,
          isDragging: isDragging
        };

        if (isDragging) {
          props.dragDeltaX = this.state.dragDeltaX;
          props.dragDeltaY = this.state.dragDeltaY;
          props.dragKey = this.state.dragKey;
        }

        return _react2.default.createElement(Component, _extends({}, this.props, props));
      }
    }]);

    return dragSource;
  }(_react2.default.Component);

  _extends(dragSource, {
    contextTypes: {
      __dragDropStore: _propTypes2.default.object.isRequired
    },
    displayName: 'DragSource(' + (Component.displayName || 'Component') + ')'
  });

  return dragSource;
}