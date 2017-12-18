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

var _BreadcrumbsItem = require('./BreadcrumbsItem');

var _BreadcrumbsItem2 = _interopRequireDefault(_BreadcrumbsItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPaths = function getPaths(pathname) {
  var rootName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var paths = [{
    name: (0, _BreadcrumbsItem.isDefined)(rootName) ? typeof rootName === 'string' ? rootName : '/' : '',
    path: '/'
  }];

  if (pathname === '/') return paths;

  pathname.split('/').reduce(function (prev, curr) {
    var currPath = prev + '/' + curr;

    paths.push({
      name: curr,
      path: currPath
    });

    return currPath;
  });

  return paths;
};

var Breadcrumbs = function Breadcrumbs(props) {
  var location = props.location,
      mappedRoutes = props.mappedRoutes,
      WrapperComponent = props.WrapperComponent,
      rootName = props.rootName;

  var path = location.pathname;

  if ((0, _BreadcrumbsItem.isDefined)(rootName)) mappedRoutes['/'] = function (url, match) {
    return typeof rootName === 'function' ? rootName(path, match) : rootName;
  };

  var paths = getPaths(path);
  return _react2.default.createElement(
    WrapperComponent,
    null,
    paths.map(function (p, idx) {
      return _react2.default.createElement(_reactRouterDom.Route, {
        key: idx,
        path: p.path,
        render: function render(rest) {
          return _react2.default.createElement(_BreadcrumbsItem2.default, _extends({
            parentProps: props,
            mappedRoutes: mappedRoutes,
            name: p.name }, rest));
        }
      });
    })
  );
};

Breadcrumbs.propTypes = {
  location: _propTypes2.default.shape({}).isRequired
};

exports.default = Breadcrumbs;