import { Route, Routes } from 'react-router-dom';
import { routes } from './routes/routes';
import { Suspense, lazy } from 'react';
import MainLayout from './layouts/main-layout';
import Spinner from './components/spinner';

const Home = lazy(() => import('./pages/home'));
const Companies = lazy(() => import('./pages/companies'));
const Login = lazy(() => import('./pages/login'));

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.companies} element={<Companies />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
