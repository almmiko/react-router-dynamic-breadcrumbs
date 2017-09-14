import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BreadcrumbsItem = (props) => {
  const { match, name, mappedRoutes } = props;
  const { ActiveLinkComponent, LinkComponent } = props.parentProps;

  const getPlaceholderVars = (url, key) => {
    const placeholderMatcher = /:[^\s/]+/g;
    const placeholders = key.match(placeholderMatcher);
    if (!placeholders)
      return null;
    const routeMatcher = new RegExp(key.replace(placeholderMatcher, '([\\w-]+)'));
    const match = url.match(routeMatcher);
    if (!match)
      return null;
    return placeholders.reduce((memo, placeholder, index) => Object.assign(memo, {
      [placeholder]: match[ index + 1 ] || null
    }), {});
  };

  const findRouteName = url => mappedRoutes[ url ];

  const matchRouteName = (url, routesCollection) => {
    let fRouteName = null;

    for (const key in routesCollection) {
      if (routesCollection.hasOwnProperty(key)) {
        let routeName = routesCollection[ key ];
        if (key.indexOf(':') !== -1) {
          const match = getPlaceholderVars(url, key);
          if (match) {
            if (routeName instanceof Function)
              fRouteName = routeName(match);
            else {
              fRouteName = Object.keys(match)
                                 .reduce((routeName, placeholder) => routeName.replace(placeholder, match[ placeholder ]), routeName);
            }
          }
        }
        else {
          if (key === url) {
            if (routeName instanceof Function)
              return routeName(key);
            return routeName;
          }
        }
      }
    }

    return fRouteName;
  };

  const routeName = matchRouteName(match.url, mappedRoutes) || name;

  if (routeName) {
    return match.isExact
      ? <ActiveLinkComponent>{routeName}</ActiveLinkComponent>
      : <LinkComponent>
        <Link to={match.url || ''}>
          {routeName}
        </Link>
      </LinkComponent>;
  }
  return null;
};


BreadcrumbsItem.propTypes = {
  match: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  mappedRoutes: PropTypes.shape({}).isRequired,
  parentProps: PropTypes.shape({}).isRequired,
};

export default BreadcrumbsItem;
