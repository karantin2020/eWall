import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Don't import the whole css import only needed components
import 'semantic-ui-css/semantic.min.css';

// import 'semantic-ui-css/components/button.css'
// import 'semantic-ui-css/components/container.css'
// import 'semantic-ui-css/components/dimmer.css'
// import 'semantic-ui-css/components/divider.css'
// import 'semantic-ui-css/components/grid.css'
// import 'semantic-ui-css/components/header.css'
// import 'semantic-ui-css/components/form.css'
// import 'semantic-ui-css/components/icon.css'
// import 'semantic-ui-css/components/image.css'
// import 'semantic-ui-css/components/input.css'
// import 'semantic-ui-css/components/menu.css'
// import 'semantic-ui-css/components/label.css'
// import 'semantic-ui-css/components/list.css'
// import 'semantic-ui-css/components/loader.css'
// import 'semantic-ui-css/components/reset.css'
// import 'semantic-ui-css/components/sidebar.css'
// import 'semantic-ui-css/components/site.css'

import store from './store.js';
import './index.css';
import getLocalData from './i18n/index.js';

getLocalData('ru');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
