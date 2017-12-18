import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Breadcrumbs from './Breadcrumbs';

const BreadcrumbsWrapper = (props) => {
  return (
    <Route path="/:path"
           render={rest => <Breadcrumbs
             mappedRoutes={props.mappedRoutes}
             WrapperComponent={props.WrapperComponent}
             ActiveLinkComponent={props.ActiveLinkComponent}
             LinkComponent={props.LinkComponent}
             rootName={props.rootName}
             {...rest}
           />}
    />
  );
};


BreadcrumbsWrapper.defaultProps = {
  WrapperComponent: (props) => <ol className="breadcrumb" >{props.children}</ol>,
  ActiveLinkComponent: (props) => <li className="active" >{props.children}</li>,
  LinkComponent: (props) => <li>{props.children}</li>,
  rootName:''
};

BreadcrumbsWrapper.propTypes = {
  mappedRoutes: PropTypes.shape({}).isRequired,
  WrapperComponent: PropTypes.func,
  ActiveLinkComponent: PropTypes.func,
  LinkComponent: PropTypes.func,
  rootName: PropTypes.oneOfType([PropTypes.string,PropTypes.func])
};

export default BreadcrumbsWrapper;
