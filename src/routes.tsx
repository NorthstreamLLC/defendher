import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = import.meta.env.DEV
  ? lazy(() => import('../dev-tools/src/PageNotFound'))
  : ProdNotFoundPage;

const ShopPage = lazy(() => import('./pages/shop'));
const ProductDetailPage = lazy(() => import('./pages/product/[id]'));
const CartPage = lazy(() => import('./pages/cart'));
const CheckoutPage = lazy(() => import('./pages/checkout'));
const OrderConfirmationPage = lazy(() => import('./pages/order-confirmation'));
const AccountPage = lazy(() => import('./pages/account/index'));
const OrdersPage = lazy(() => import('./pages/account/orders'));
const ArticlesIndexPage = lazy(() => import('./pages/articles/index'));
const ArticlePage = lazy(() => import('./pages/articles/[slug]'));
const SitemapPage = lazy(() => import('./pages/sitemap'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/shop',
    element: <ShopPage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/order-confirmation',
    element: <OrderConfirmationPage />,
  },
  {
    path: '/account',
    element: <AccountPage />,
  },
  {
    path: '/account/orders',
    element: <OrdersPage />,
  },
  {
    path: '/articles',
    element: <ArticlesIndexPage />,
  },
  {
    path: '/articles/:slug',
    element: <ArticlePage />,
  },
  {
    path: '/sitemap',
    element: <SitemapPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export type Path =
  | '/'
  | '/shop'
  | '/product/:id'
  | '/cart'
  | '/checkout'
  | '/order-confirmation'
  | '/account'
  | '/account/orders'
  | '/articles'
  | '/articles/:slug'
  | '/sitemap';

export type Params = Record<string, string | undefined>;
