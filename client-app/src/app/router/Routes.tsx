import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import LoginForm from "../../features/users/LoginForm";
import TestErrors from "../../features/Errors/TestError";
import NotFound from "../../features/Errors/NotFound";
import ServerError from "../../features/Errors/ServerError";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/activities', element: <ActivityDashboard /> },
            { path: '/createActivity', element: <ActivityForm key={'create'} /> },
            { path: '/activities/:id', element: <ActivityDetails /> },
            { path: '/manage/:id', element: <ActivityForm key={'form'} /> },
            { path: '/login', element: <LoginForm/> },
            { path: '/erros', element: <TestErrors/> },
            { path: '/not-found', element: <NotFound/> },
            { path: '/server-error', element: <ServerError/> },
            { path: '*', element: <Navigate replace to="/not-found"/> },
        ]
    }
];

export const router = createBrowserRouter(routes);
