'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
        var _ret = function () {
          var routeName = routesCollection[key];
          if (key.indexOf(':') !== -1) {
            var _match = getPlaceholderVars(url, key);
            if (_match) {
              if (routeName instanceof Function) fRouteName = routeName(_match);else Object.keys(_match).forEach(function (placeholder) {
                return fRouteName = routeName.replace(placeholder, _match[placeholder]);
              });
            }
          } else {
            if (key === url) {
              if (routeName instanceof Function) return {
                  v: routeName(key)
                };
              return {
                v: routeName
              };
            }
          }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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