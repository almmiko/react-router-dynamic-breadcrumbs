'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDefined = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isDefined = exports.isDefined = function isDefined(v) {
  return v !== undefined && v !== null && v !== false && String(v).length > 0;
};
var BreadcrumbsItem = function BreadcrumbsItem(props) {
  var match = props.match,
      name = props.name,
      mappedRoutes = props.mappedRoutes;
  var _props$parentProps = props.parentProps,
      ActiveLinkComponent = _props$parentProps.ActiveLinkComponent,
      LinkComponent = _props$parentProps.LinkComponent;

  var placeholderMatcher = /:[^\s/]+/g;

  var getPlaceholderVars = function getPlaceholderVars(url, key) {
    var placeholders = key.match(placeholderMatcher);
    if (!placeholders) return null;
    var routeMatcher = new RegExp('^' + key.replace(placeholderMatcher, '([\\w-]+)') + '$');
    var match = url.match(routeMatcher);
    if (!match) return null;
    return placeholders.reduce(function (memo, placeholder, index, array) {
      var _Object$assign;

      var value = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : match[index + 1] || null;
      return Object.assign(memo, (_Object$assign = {}, _defineProperty(_Object$assign, placeholder, value), _defineProperty(_Object$assign, placeholder.substring(1), value), _Object$assign));
    }, {});
  };

  var matchRouteName = function matchRouteName(url, routesCollection) {
    var fRouteName = '';

    var paths = Object.keys(routesCollection).sort(function (a, b) {
      var aTokenCount = (a.match(placeholderMatcher) || []).length;
      var bTokenCount = (b.match(placeholderMatcher) || []).length;
      switch (true) {
        case aTokenCount === bTokenCount:
          return a.length > b.length ? 1 : -1; //longest routes have the priority
        default:
          return aTokenCount < bTokenCount ? 1 : -1; //among dynamic routes the one with less placeholders take priority
      }
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = paths.filter(function (v) {
        return routesCollection.hasOwnProperty(v);
      })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var _routeName = routesCollection[key];
        if (key.indexOf(':') !== -1) {
          (function () {
            var match = getPlaceholderVars(url, key);
            if (match) {
              switch (true) {
                case !isDefined(_routeName):
                  fRouteName = null;
                  break;
                case _routeName instanceof Function:
                  fRouteName = _routeName(url, match);
                  break;
                default:
                  fRouteName = Object.keys(match).reduce(function (routeName, placeholder) {
                    return routeName.replace(placeholder, match[placeholder]);
                  }, _routeName);
              }
            }
          })();
        } else {
          if (key === url) {
            switch (true) {
              case !isDefined(_routeName):
                fRouteName = null;
                break;
              case _routeName instanceof Function:
                fRouteName = _routeName(url, null);
                break;
              default:
                fRouteName = _routeName;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return fRouteName;
  };

  var routeName = matchRouteName(match.url, mappedRoutes);
  if (routeName !== null) routeName = routeName || name;

  if (isDefined(routeName)) return match.isExact ? _react2.default.createElement(
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

  return null;
};

BreadcrumbsItem.propTypes = {
  match: _propTypes2.default.shape({}).isRequired,
  name: _propTypes2.default.string.isRequired,
  mappedRoutes: _propTypes2.default.shape({}).isRequired,
  parentProps: _propTypes2.default.shape({}).isRequired
};

exports.default = BreadcrumbsItem;