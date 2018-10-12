'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Breadcrumbs = require('./Breadcrumbs');

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreadcrumbsWrapper = function BreadcrumbsWrapper(props) {
  return _react2.default.createElement(_reactRouterDom.Route, { path: '/:path',
    render: function render(rest) {
      return _react2.default.createElement(_Breadcrumbs2.default, _extends({
        mappedRoutes: props.mappedRoutes,
        WrapperComponent: props.WrapperComponent,
        ActiveLinkComponent: props.ActiveLinkComponent,
        LinkComponent: props.LinkComponent,
        rootName: props.rootName
      }, rest));
    }
  });
};

BreadcrumbsWrapper.defaultProps = {
  WrapperComponent: function WrapperComponent(props) {
    return _react2.default.createElement(
      'ol',
      { className: 'breadcrumb' },
      props.children
    );
  },
  ActiveLinkComponent: function ActiveLinkComponent(props) {
    return _react2.default.createElement(
      'li',
      { className: 'breadcrumb-item active' },
      props.children
    );
  },
  LinkComponent: function LinkComponent(props) {
    return _react2.default.createElement(
      'li',
      { className: 'breadcrumb-item' },
      props.children
    );
  },
  rootName: ''
};

BreadcrumbsWrapper.propTypes = {
  mappedRoutes: _propTypes2.default.shape({}).isRequired,
  WrapperComponent: _propTypes2.default.func,
  ActiveLinkComponent: _propTypes2.default.func,
  LinkComponent: _propTypes2.default.func,
  rootName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
};

exports.default = BreadcrumbsWrapper;