import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: { users },
 });

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Twitter</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
