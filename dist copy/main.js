'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _tooltip = require('./tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Design = function Design() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        _tooltip2.default,
        { title: 'The tooltip text', visible: true, placement: 'top' },
        _react2.default.createElement(
          'span',
          null,
          'top'
        )
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        _tooltip2.default,
        { title: 'The tooltip text', visible: true, placement: 'right' },
        _react2.default.createElement(
          'span',
          null,
          'right'
        )
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        _tooltip2.default,
        { title: 'The tooltip text', visible: true, placement: 'bottom' },
        _react2.default.createElement(
          'span',
          null,
          'bottom'
        )
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        _tooltip2.default,
        { title: 'The tooltip text', visible: true, placement: 'left' },
        _react2.default.createElement(
          'span',
          null,
          'left'
        )
      )
    )
  );
};

(0, _reactDom.render)(_react2.default.createElement(Design, null), document.getElementById('app'));