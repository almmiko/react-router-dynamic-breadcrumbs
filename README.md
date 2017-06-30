![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://opensource.org/licenses/MIT)

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

// Create routes mapping

const routes = {
  '/': 'Home',
  '/blog': 'Blog',
  '/users': 'Users'
  // you don't need declare /users/:id. All dynamic params will display automatically.
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
              mappedRoutes={routes} />
      </Router>
    );
  }
}

```

##### Properties

| Property | Type | Description
:---|:---|:---
| `mappedRoutes` | object | Plain javascript object with routes paths and names. Expected signature: `(Object): PropTypes.shape({}).isRequired` |
| `WrapperComponent` | function | Function responsible for creating wrapper html structure. Expected signature: `(props) => <JSX>{props.children}</JSX> PropTypes.func` |
| `ActiveLinkComponent` | function | Function responsible for creating active link html structure. Expected signature: `(props) => <JSX>{props.children}</JSX> PropTypes.func` |
| `LinkComponent` | function | Function responsible for creating link html structure. Expected signature: `(props) => <JSX>{props.children}</JSX> PropTypes.func` |



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
