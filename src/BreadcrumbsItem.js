import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BreadcrumbsItem = (props) => {
  const { match, name, mappedRoutes } = props;
  const { ActiveLinkComponent, LinkComponent } = props.parentProps;

  const findRouteName = url => mappedRoutes[url];

  const routeName = findRouteName(match.url) || name;

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