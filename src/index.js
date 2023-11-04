import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/fonts/font.css';
import GlobalStyles from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import ListPage from './pages/ListPage';
import PostPage from './pages/PostPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/list',
        element: <ListPage />,
      },
      {
        path: '/post',
        element: <PostPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <RouterProvider router={router} />
  </ThemeProvider>
);
