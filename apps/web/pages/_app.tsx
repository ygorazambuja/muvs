import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import store, { persistor } from '../store';

import { PersistGate } from 'redux-persist/integration/react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to web!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="app">
        <ToastContainer />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </main>
    </>
  );
}

export default CustomApp;
