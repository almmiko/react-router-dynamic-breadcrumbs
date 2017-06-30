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

var BreadcrumbsItem = function BreadcrumbsItem(props) {
  var match = props.match,
      name = props.name,
      mappedRoutes = props.mappedRoutes;
  var _props$parentProps = props.parentProps,
      ActiveLinkComponent = _props$parentProps.ActiveLinkComponent,
      LinkComponent = _props$parentProps.LinkComponent;


  var findRouteName = function findRouteName(url) {
    return mappedRoutes[url];
  };

  var routeName = findRouteName(match.url) || name;

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