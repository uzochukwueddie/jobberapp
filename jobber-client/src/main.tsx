import './index.scss';

import { init } from '@elastic/apm-rum';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Persistor, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import { store } from './store/store.ts';

const persistor: Persistor = persistStore(store);

init({
  serviceName: 'Jobber Client App',
  serverUrl: import.meta.env.VITE_ELASTIC_APM_SERVER,
  serviceVersion: '0.0.1',
  active: true
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
