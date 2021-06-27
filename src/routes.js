import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import Company from "src/pages/Company";
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import EnergySource from "src/pages/EnergySource";
import PublicInstitution from "src/pages/PublicInstitution";
import PublicSector from './pages/PublicSector';
import RenewalEnergy from './pages/RenewalEnergy';
import Privileges from './pages/Privileges';
import Roles from "./pages/Roles";
const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "account", element: <Account /> },
      { path: "roles", element: <Roles /> },
      { path: "publicInstitution", element: <PublicInstitution /> },
      { path: "privileges", element: <Privileges /> },
      { path: "renewalEnergy", element: <RenewalEnergy /> },
      { path: "publicSector", element: <PublicSector /> },
      { path: "company", element: <Company /> },
      { path: "energySource", element: <EnergySource /> },
      { path: "customers", element: <CustomerList /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <ProductList /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "404", element: <NotFound /> },
      { path: "/", element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
