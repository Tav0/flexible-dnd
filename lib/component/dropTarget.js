'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = DropTarget;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actionCreators = require('../store/actionCreators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function DropTarget(Component, config) {
  if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') throw new Error('"config" must be an object');
  if (typeof config.canDrop !== 'function') throw new Error('"config.canDrop" must be a function');
  if (typeof config.drop !== 'function') throw new Error('"config.drop" must be a function');

  var dropTarget = function (_React$Component) {
    _inherits(dropTarget, _React$Component);

    function dropTarget() {
      _classCallCheck(this, dropTarget);

      var _this = _possibleConstructorReturn(this, (dropTarget.__proto__ || Object.getPrototypeOf(dropTarget)).call(this));

      _this.connect = _this.connect.bind(_this);

      _this.state = {
        isHovering: false,
        dropKey: null
      };
      return _this;
    }

    _createClass(dropTarget, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        var store = this.context.__dragDropStore;

        store.dispatch((0, _actionCreators.registerDropTarget)(this, config));
        this.unsubscribe = store.subscribe(function () {
          var state = store.getState(),
              isHovering = !!state.dropTarget && _this2 === state.dropTarget.target;

          if (isHovering) {
            _this2.setState({
              isHovering: isHovering,
              dropKey: state.dropKey
            });
          } else if (_this2.state.isHovering) {
            _this2.setState({
              isHovering: isHovering,
              dropKey: null
            });
          }
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var store = this.context.__dragDropStore;

        this.unsubscribe();
        this.targets = null;
        store.dispatch((0, _actionCreators.unregisterDropTarget)(this));
      }
    }, {
      key: 'connect',
      value: function connect(node) {
        var _this3 = this;

        var props;

        if (typeof node.type !== 'string') {
          throw new Error('DropTarget node must be a ReactDOMComponent');
        }

        props = _extends({}, node.props, {
          ref: function ref(t) {
            if (!t || !_this3.targets) {
              return;
            }

            _this3.targets.push({
              element: t,
              key: node.key
            });
          }
        });

        return _react2.default.cloneElement(node, props, node.props.children);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var isHovering = this.state.isHovering,
            props;


        props = {
          connectDropTarget: this.connect,
          isHovering: isHovering
        };

        if (isHovering) {
          props.dropKey = this.state.dropKey;
        }

        this.targets = [];

        return _react2.default.createElement(Component, _extends({}, this.props, props, { ref: function ref(c) {
            return _this4.component = c;
          } }));
      }
    }]);

    return dropTarget;
  }(_react2.default.Component);

  _extends(dropTarget, {
    contextTypes: {
      __dragDropStore: _propTypes2.default.object.isRequired
    },
    displayName: 'DragSource(' + (Component.displayName || 'Component') + ')'
  });

  return dropTarget;
}