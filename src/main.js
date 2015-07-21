import React from 'react';
import Api   from './services/Api';
import App   from './components/App';

import './styles/main.less';

var API_HOST = 'http://busbud-napi-prod.global.ssl.fastly.net';
var api = new Api({host: API_HOST});
api.connect();

React.render(<App api={api}/>, document.getElementById('app'));
