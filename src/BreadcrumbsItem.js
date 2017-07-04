import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BreadcrumbsItem = (props) => {
  const { match, name, mappedRoutes } = props;
  const { ActiveLinkComponent, LinkComponent } = props.parentProps;
  
  const findRouteName = url => mappedRoutes[url];

  const matchRouteName = (url, routesCollection) => {
    let fRouteName = null;

    for (const key in routesCollection) {
      if (routesCollection.hasOwnProperty(key)) {
        const routeMatcher = new RegExp(key.replace(/:[^\s/]+/g, '([\\w-]+)'));

        if (url.match(routeMatcher) && key.indexOf(':') !== -1) {
          fRouteName = routesCollection[key];
        }
      }
    }

    return fRouteName;
  };

  const routeName = matchRouteName(match.url, mappedRoutes) || (findRouteName(match.url) || name);

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
