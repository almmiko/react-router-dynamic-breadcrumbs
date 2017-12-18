import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export const isDefined = v => (v !== undefined && v !== null && v !== false && String(v).length > 0);
const BreadcrumbsItem = (props) => {
  const {match, name, mappedRoutes} = props;
  const {ActiveLinkComponent, LinkComponent} = props.parentProps;
  const placeholderMatcher = /:[^\s/]+/g;

  const getPlaceholderVars = (url, key) => {
    const placeholders = key.match(placeholderMatcher);
    if (!placeholders)
      return null;
    const routeMatcher = new RegExp('^' + key.replace(placeholderMatcher, '([\\w-]+)') + '$');
    const match = url.match(routeMatcher);
    if (!match)
      return null;
    return placeholders.reduce((memo, placeholder, index, array, value = match[index + 1] || null) => Object.assign(memo, {
      [placeholder]: value,
      [placeholder.substring(1)]: value
    }), {});
  };

  const matchRouteName = (url, routesCollection) => {
    let fRouteName = '';

    let paths = Object.keys(routesCollection).sort((a, b) => {
      let aTokenCount = (a.match(placeholderMatcher) || []).length;
      let bTokenCount = (b.match(placeholderMatcher) || []).length;
      switch (true) {
        case aTokenCount === bTokenCount:
          return a.length > b.length ? 1 : -1; //longest routes have the priority
        default:
          return aTokenCount < bTokenCount ? 1 : -1; //among dynamic routes the one with less placeholders take priority
      }
    });
    for (let key of paths.filter(v => routesCollection.hasOwnProperty(v))) {
      let routeName = routesCollection[key];
      if (key.indexOf(':') !== -1) {
        const match = getPlaceholderVars(url, key);
        if (match) {
          switch (true) {
            case (!isDefined(routeName)):
              fRouteName = null;
              break;
            case  (routeName instanceof Function):
              fRouteName = routeName(url, match);
              break;
            default:
              fRouteName = Object.keys(match)
                .reduce((routeName, placeholder) => routeName.replace(placeholder, match[placeholder]), routeName);
          }
        }
      }
      else {
        if (key === url) {
          switch (true) {
            case (!isDefined(routeName)):
              fRouteName = null;
              break;
            case  (routeName instanceof Function):
              fRouteName = routeName(url, null);
              break;
            default:
              fRouteName = routeName;
          }
        }
      }
    }
    return fRouteName;
  };

  let routeName = matchRouteName(match.url, mappedRoutes);
  if (routeName !== null)
    routeName = routeName || name;

  if (isDefined(routeName))
    return match.isExact
      ? <ActiveLinkComponent>{routeName}</ActiveLinkComponent>
      : <LinkComponent>
        <Link to={match.url || ''}>
          {routeName}
        </Link>
      </LinkComponent>;

  return null;
};


BreadcrumbsItem.propTypes = {
  match: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  mappedRoutes: PropTypes.shape({}).isRequired,
  parentProps: PropTypes.shape({}).isRequired,
};

export default BreadcrumbsItem;
