import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {isDefined, default as BreadcrumbsItem} from './BreadcrumbsItem';

const getPaths = (pathname, rootName = null) => {
  const paths = [
    {
      name: isDefined(rootName) ? ((typeof rootName === 'string') ? rootName : '/') : '',
      path: '/',
    },
  ];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr) => {
    const currPath = `${prev}/${curr}`;

    paths.push({
      name: curr,
      path: currPath,
    });

    return currPath;
  });

  return paths;
};

const Breadcrumbs = (props) => {
  const {location, mappedRoutes, WrapperComponent, rootName} = props;
  const path = location.pathname;

  if (isDefined(rootName))
    mappedRoutes['/'] = (url, match) => ((typeof rootName === 'function') ? rootName(path, match) : rootName);

  const paths = getPaths(path);
  return (
    <WrapperComponent>
      {paths.map((p, idx) => (
        <Route
          key={idx}
          path={p.path}
          render={rest => <BreadcrumbsItem
            parentProps={props}
            mappedRoutes={mappedRoutes}
            name={p.name} {...rest}
          />}
        />
      ))}
    </WrapperComponent>
  );
};

Breadcrumbs.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Breadcrumbs;