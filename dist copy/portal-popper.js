'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _popper = require('popper.js');

var _popper2 = _interopRequireDefault(_popper);

var _popperUtils = require('popper.js/dist/popper-utils.js');

var _popperUtils2 = _interopRequireDefault(_popperUtils);

var _portal = require('./portal');

var _portal2 = _interopRequireDefault(_portal);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
};

var initialArrowProps = {
    left: 0,
    top: 0
};

var initialPopperProps = {
    left: 0,
    position: 'absolute',
    top: 0
};
_portal2.default.idNum = 0;

var PortalPopper = (_temp = _class = function (_Component) {
    _inherits(PortalPopper, _Component);

    function PortalPopper() {
        var _ref;

        _classCallCheck(this, PortalPopper);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = PortalPopper.__proto__ || Object.getPrototypeOf(PortalPopper)).call.apply(_ref, [this].concat(props)));

        _this.state = {
            arrowProps: initialArrowProps,
            popperProps: initialPopperProps
        };
        return _this;
    }

    _createClass(PortalPopper, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.portalId = _portal2.default.idNum++;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                placement = _props.placement,
                title = _props.title,
                wrapperClassName = _props.wrapperClassName;

            var prefix = _lodash2.default.last(className.split(' '));

            return _reactDom2.default.createPortal(_react2.default.createElement(
                'div',
                {
                    id: 'portal-' + this.portalId,
                    ref: 'popper',
                    className: className + ' ' + prefix + '-' + placement,
                    style: this._getPortalStyle()
                },
                _react2.default.createElement(
                    'div',
                    { ref: function ref(node) {
                            return _this2.domNode = node;
                        }, className: '' + className, style: this._getPopperStyle() },
                    _react2.default.createElement(
                        'span',
                        { className: wrapperClassName },
                        title
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            ref: 'arrow',
                            className: prefix + '-arrow',
                            style: this._getArrowStyle()
                        },
                        _react2.default.createElement(
                            'svg',
                            { xmlns: 'http://www.w3.org/2000/svg', version: '1.1' },
                            _react2.default.createElement('polygon', { points: '5,0 10,5 5,10 0,5' })
                        )
                    )
                )
            ), document.body);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            this.popper = new this.props.Popper(this.props.getTargetNode(), this.domNode, {
                content: this.props.title,
                placement: this.props.placement,
                modifiers: {
                    applyStyle: {
                        enabled: true,
                        fn: function fn(data, options) {
                            var styles = {
                                position: data.offsets.popper.position
                            };

                            var attributes = {
                                'x-placement': data.placement
                            };

                            var left = Math.round(data.offsets.popper.left);
                            var top = Math.round(data.offsets.popper.top);

                            var prefixedProperty = _popperUtils2.default.getSupportedPropertyName('transform');
                            if (options.gpuAcceleration && prefixedProperty) {
                                styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
                                if (_this3.props.ignoreScroll) {
                                    styles.top = window.scrollY * -1 + 'px';
                                    styles.left = window.scrollX * -1 + 'px';
                                } else {
                                    styles.top = 0;
                                    styles.left = 0;
                                }
                                styles.willChange = 'transform';
                            } else {
                                if (_this3.props.ignoreScroll) {
                                    styles.left = left - window.scrollX;
                                    styles.top = top - window.scrollY;
                                } else {
                                    styles.top = top;
                                    styles.left = left;
                                }
                                styles.willChange = 'top, left';
                            }

                            _popperUtils2.default.setStyles(data.instance.popper, _extends({}, styles, data.styles));
                            _popperUtils2.default.setAttributes(data.instance.popper, _extends({}, attributes, data.attributes));

                            if (data.offsets.arrow) {
                                _popperUtils2.default.setStyles(data.arrowElement, data.offsets.arrow);
                            }

                            return data;
                        }
                    },
                    arrow: { element: this.refs.arrow }
                }
            });

            this.popper.onUpdate = function (data) {
                if (_this3.isUnmounted) return;

                var newState = {};
                if (data.offsets.arrow) newState.arrowProps = data.offsets.arrow;
                if (data.offsets.popper) newState.popperProps = data.offsets.popper;
                _this3.setState(newState);
            };

            this.popper.update();
        }
    }, {
        key: '_getPopperStyle',
        value: function _getPopperStyle() {
            var left = Math.round(this.state.popperProps.left);
            var top = Math.round(this.state.popperProps.top);
            var transform = 'translate3d(' + left + 'px, ' + top + 'px, 0)';

            return {
                position: this.state.popperProps.position,
                transform: transform,
                WebkitTransform: transform
            };
        }
    }, {
        key: '_getPortalStyle',
        value: function _getPortalStyle() {
            return {
                backgroundColor: 'transparent',
                border: 'none'
            };
        }
    }, {
        key: '_getArrowStyle',
        value: function _getArrowStyle() {
            var left = _lodash2.default.isNumber(this.state.arrowProps.left) ? Math.round(this.state.arrowProps.left) : null;
            var top = _lodash2.default.isNumber(this.state.arrowProps.top) ? Math.round(this.state.arrowProps.top) : null;

            return {
                left: left,
                top: top
            };
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.isUnmounted = true;
            this.popper && this.popper.destroy();
        }
    }]);

    return PortalPopper;
}(_react.Component), _class.propTypes = {
    placement: _propTypes2.default.string.isRequired,
    getTargetNode: _propTypes2.default.func.isRequired,
    title: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    wrapperClassName: _propTypes2.default.string,
    ignoreScroll: _propTypes2.default.bool
}, _class.defaultProps = {
    Popper: _popper2.default,
    className: '',
    wrapperClassName: ''
}, _temp);
exports.default = PortalPopper;
module.exports = exports['default'];