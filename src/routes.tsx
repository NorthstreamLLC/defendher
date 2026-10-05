import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import NotFoundPage from './pages/_404';
import ProductPage from './pages/product';
import TestimonialsPage from './pages/testimonials';
import TeamPage from './pages/team';

const ShopPage = lazy(() => import('./pages/shop'));
const ArticlesIndexPage = lazy(() => import('./pages/articles/index'));
const ArticlePage = lazy(() => import('./pages/articles/[slug]'));
const SitemapPage = lazy(() => import('./pages/sitemap'));
const AboutPage = lazy(() => import('./pages/about'));
const ContactPage = lazy(() => import('./pages/contact'));
const VideosPage = lazy(() => import('./pages/videos'));
const WomensWednesdayPage = lazy(() => import('./pages/womens-wednesday/index'));
const WomensWednesdayPostPage = lazy(() => import('./pages/womens-wednesday/[slug]'));

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
    path: '/team',
    element: <TeamPage />,
  },
  {
    path: '/testimonials',
    element: <TestimonialsPage />,
  },
  {
    path: '/product',
    element: <ProductPage />,
  },
  {
    path: '/product/:id',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/cart',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/checkout',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/order-confirmation',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/account',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/account/orders',
    element: <Navigate to="/" replace />,
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
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/videos',
    element: <VideosPage />,
  },
  {
    path: '/womens-wednesday',
    element: <WomensWednesdayPage />,
  },
  {
    path: '/womens-wednesday/:slug',
    element: <WomensWednesdayPostPage />,
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
