![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://opensource.org/licenses/MIT)


[![npm badge][npm-badge-png]][package-url]

[npm-badge-png]: https://nodei.co/npm/react-router-dynamic-breadcrumbs.png?mini=true
[package-url]: https://npmjs.com/package/react-router-dynamic-breadcrumbs

# React router breadcrumbs

Breadcrumbs react component for react-router-v4 with dynamic routing parameters

### Installing

```
npm install react-router-dynamic-breadcrumbs 
```

or

```
yarn add react-router-dynamic-breadcrumbs
```

## Usage example

By default react-router-dynamic-breadcrumbs use bootstrap.css breadcrumbs html markup. You need add bootstrap.css to your project for apply styling.

```javascript

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
     
import Breadcrumbs  from 'react-router-dynamic-breadcrumbs';   
  
/**
*  Create routes mapping
*  
*  All dynamic params will display automatically.
*  not that even though '/users/:id' route is not in configuration file, 
*  it's corresponding link it will be displayed as the value of ':id'
*/
const routes = {
  '/': 'Home',
  '/blog': 'Blog', 
  '/users': 'Users',
  '/users/:id/info': 'User Info',
  '/users/:id/posts/:p_id': 'Post :p_id by :id', // backreferences will be replaced by correspoding parts of url
  
/* 
  You can provide a callback of (url, match)=>string signature
  match will contain pattern values both prefixed and isolated
  for instance the following pattern will result in callback with
   
  ('/users/dummy/posts/4', {
   'id':'dummy', ':id':'dummy', 
   'page':'4',   ':page':'4'
  })
  
  while link will contain smth like "Page 4 of 10".
*/
  '/users/:id/posts/:page': (url, match) => `Page ${match[':page']} of ${Pagination.total()}`,
  
   
/*
  For static routes 'match' argument is always null
  
  NOTE: Services or stores will not be automatically injected into resolver function, 
  you should either inject your services to your config, like in previous example (bad pattern), 
  .bind context to your resolvers,  or even totally relay the resolution to a store-aware service
*/
  '/settings': MyBreadcrumbsResolver.resolve, // will receive ('/settings',null)
  
/*
*  NULLs, FALSEs and empty strings (if listed explicitly) will be skipped from breadcrumb chain. 
*  Otherwise if url is matched but not provided in mapping, the corresponding url part will be displayed as crumb title
*  
*  If callback returns NULL, FALSE or an empty string, the breadcrumb is hidden from chain
*/
    
//  will skip this link from breadcrumbs. Without this line the crumb title for url will be "posts"
   '/users/:id/posts': null, 
   
//  will skip this link from breadcrumbs conditionally
   '/users/:id/friends/': (url,match) => match.id==User.getId()?null:match.id, 
   
};
  
  
class App extends Component {
  render() {
    return (
      <Router>
          <Breadcrumbs mappedRoutes={routes} />
      </Router>
    );
  }
}

```

## Match precedence order

The routes definition object is not traversed in default object iteration order. Instead there's a stable sort applied to routes based on several considerations:
* Routes without any placeholders like "**:id**" will always have top priority when resolving link name
* Routes with placeholders are sorted by amount of placeholders in the route, so the route with less placeholders will have priority over more "dynamic" route when resolving. For example, if you have both "**/user/new**" and "**/user/:id**" routes, the first one with always be resolved correctly despite in which order you put them into the definition object
* Routes having the same number of placeholders will be sorted by length, so that shorter routes will take precedence over longer routes.

The basic idea to understand about the order in which routes are resolved to link names is to think that, if current url can be resolved to several routes, the least ambiguous definition will always be used. A constant is always prefered to a wildcard, and less wildcards are prefered to more of them.


## Custom html markup

``` javascript
class App extends Component {
  render() {
    return (
      <Router>
          <Breadcrumbs 
              WrapperComponent={(props) => <ol className="breadcrumb" >{props.children}</ol>}
              ActiveLinkComponent={(props) => <li className="active" >{props.children}</li>}
              LinkComponent={(props) => <li>{props.children}</li>} // Don't create link tag or <Link />. Component will wrapp props.children with <Link />
              mappedRoutes={routes}
              routeMatcherRegex="([\w-]+)" />
      </Router>
    );
  }
}

```

##### Properties

| Property | Type | Description
:---|:---|:---
| `mappedRoutes` | object *(required)*| Plain javascript object with routes paths and names/resolver callbacks. Expected signature: `(Object): PropTypes.shape({}).isRequired` |
| `WrapperComponent` | function | Function responsible for creating wrapper html structure. Expected signature: `(props) => <JSX>{props.children}</JSX> PropTypes.func` |
| `ActiveLinkComponent` | function | Function responsible for creating active link html structure. Expected signature: `(props) => <JSX>{props.children}</JSX> PropTypes.func` |
| `LinkComponent` | function | Function responsible for creating link html structure. Expected signature: `(props) => <JSX>{props.children}</JSX> PropTypes.func` |
| `rootName` | string &#124; function | If set, root breadcrumb will always be displayed with given caption.<br/>If function is provided, it's resolved at display time, as with any other breadcrumbs, but it receives a full location path as `url` and `null` as `match`<br/>Empty string, `false` or `null` will hide it  (**default**) |
| `routeMatcherRegex` | string | Customize routeMatcher by regular expression. <br/>e.g. If you want to accept the pipe character "&#124;", you can pass in <code>"([\\w-&#124;]+)"</code> <br/> By default routeMatcherRegex is set to `'([\\w-]+)'`



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
