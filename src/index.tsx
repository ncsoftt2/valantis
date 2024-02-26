import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {Provider} from "react-redux";
import {store} from "src/store";
import {BrowserRouter} from "react-router-dom";

import '@fontsource-variable/montserrat';
import './style/index.scss'
import {Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        <ToastContainer
            autoClose={2500}
            closeOnClick
            draggable={false}
            hideProgressBar={false}
            newestOnTop
            pauseOnFocusLoss={false}
            pauseOnHover
            position="bottom-center"
            rtl={false}
            theme="dark"
            transition={Bounce}
        />
    </Provider>
  </React.StrictMode>
)
