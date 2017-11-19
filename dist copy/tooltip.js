'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _portalPopper = require('./portal-popper');

var _portalPopper2 = _interopRequireDefault(_portalPopper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = (_temp = _class = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip() {
    var _ref;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(props)));

    _this.state = {
      shouldShow: false
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var actionProps = this.props.visible == null ? {
        onMouseOver: function onMouseOver() {
          return _this2.setState({ shouldShow: true });
        },
        onMouseOut: function onMouseOut() {
          return _this2.setState({ shouldShow: false });
        },
        onWheel: function onWheel() {
          return _this2.setState({ shouldShow: false });
        }
      } : {};

      return _react2.default.createElement(
        'span',
        null,
        (0, _react.cloneElement)(_react.Children.only(this.props.children), _extends({
          ref: 'target'
        }, actionProps)),
        this._popper()
      );
    }
  }, {
    key: '_popper',
    value: function _popper() {
      var _this3 = this;

      if (this.props.visible !== true && (!this.state.shouldShow || this.props.visible === false)) return null;

      return _react2.default.createElement(_portalPopper2.default, {
        getTargetNode: function getTargetNode() {
          return _this3.refs.target;
        },
        title: this.props.title,
        placement: this.props.placement,
        className: this.props.className,
        wrapperClassName: this.props.wrapperClassName,
        ignoreScroll: this.props.ignoreScroll
      });
    }
  }]);

  return Tooltip;
}(_react.Component), _class.propTypes = {
  placement: _propTypes2.default.string,
  title: _propTypes2.default.string.isRequired,
  visible: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  wrapperClassName: _propTypes2.default.string,
  ignoreScroll: _propTypes2.default.bool
}, _class.defaultProps = {
  placement: 'top',
  className: 'tooltip',
  wrapperClassName: '',
  ignoreScroll: false
}, _temp);
exports.default = Tooltip;
module.exports = exports['default'];