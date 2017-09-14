'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BreadcrumbsItem = function BreadcrumbsItem(props) {
  var match = props.match,
      name = props.name,
      mappedRoutes = props.mappedRoutes;
  var _props$parentProps = props.parentProps,
      ActiveLinkComponent = _props$parentProps.ActiveLinkComponent,
      LinkComponent = _props$parentProps.LinkComponent;


  var getPlaceholderVars = function getPlaceholderVars(url, key) {
    var placeholderMatcher = /:[^\s/]+/g;
    var placeholders = key.match(placeholderMatcher);
    if (!placeholders) return null;
    var routeMatcher = new RegExp(key.replace(placeholderMatcher, '([\\w-]+)'));
    var match = url.match(routeMatcher);
    if (!match) return null;
    return placeholders.reduce(function (memo, placeholder, index) {
      return Object.assign(memo, _defineProperty({}, placeholder, match[index + 1] || null));
    }, {});
  };

  var findRouteName = function findRouteName(url) {
    return mappedRoutes[url];
  };

  var matchRouteName = function matchRouteName(url, routesCollection) {
    var fRouteName = null;

    for (var key in routesCollection) {
      if (routesCollection.hasOwnProperty(key)) {
        var _routeName = routesCollection[key];
        if (key.indexOf(':') !== -1) {
          (function () {
            var match = getPlaceholderVars(url, key);
            if (match) {
              if (_routeName instanceof Function) fRouteName = _routeName(match);else {
                fRouteName = Object.keys(match).reduce(function (routeName, placeholder) {
                  return routeName.replace(placeholder, match[placeholder]);
                }, _routeName);
              }
            }
          })();
        } else {
          if (key === url) {
            if (_routeName instanceof Function) return _routeName(key);
            return _routeName;
          }
        }
      }
    }

    return fRouteName;
  };

  var routeName = matchRouteName(match.url, mappedRoutes) || name;

  if (routeName) {
    return match.isExact ? _react2.default.createElement(
      ActiveLinkComponent,
      null,
      routeName
    ) : _react2.default.createElement(
      LinkComponent,
      null,
      _react2.default.createElement(
        _reactRouterDom.Link,
        { to: match.url || '' },
        routeName
      )
    );
  }
  return null;
};

BreadcrumbsItem.propTypes = {
  match: _propTypes2.default.shape({}).isRequired,
  name: _propTypes2.default.string.isRequired,
  mappedRoutes: _propTypes2.default.shape({}).isRequired,
  parentProps: _propTypes2.default.shape({}).isRequired
};

exports.default = BreadcrumbsItem;