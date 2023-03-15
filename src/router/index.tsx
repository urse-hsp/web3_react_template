import React, { lazy, Suspense } from 'react';
import { useRoutes, type RouteObject } from 'react-router-dom';
import { LoadingElement } from '@/components/loading';
import Layout from '@/Layout';
import AppPage from '@/styles/app';

const Home = lazy(
  async () => await import(/* webpackChunkName: "home" */ '@/pages/home'),
);
const My = lazy(
  async () => await import(/* webpackChunkName: "my" */ '@/pages/my/index'),
);

interface Item {
  path: string;
  exact?: boolean;
  component: any;
  children?: Item[];
}
export interface RouteConfig extends Item {
  children?: Item[];
}

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // {
      //   path: '/My',
      //   element: <My />,
      // },
    ],
  },
  {
    path: '/My2',
    element: <My />,
  },
];

const AppRouter = () => {
  const element = useRoutes(routeConfig);
  return (
    <Suspense fallback={LoadingElement}>
      <AppPage>{element}</AppPage>
    </Suspense>
  );
};
export default AppRouter;
