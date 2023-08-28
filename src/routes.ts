import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Unauthorized from "pages/Unauthorized";
import Missing from "pages/Missing";
import Vendor from "pages/Vendor";
import Search from "pages/Search";
import Profile from "pages/Profile";
import ProfileLogo from "pages/ProfileLogo";
import ProfilePhoto from "pages/ProfilePhoto";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    protected?: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: '404-route',
        title: '404',
        path: '*',
        enabled: true,
        component: Missing
    },
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'login-route',
        title: 'Login',
        path: '/login',
        enabled: true,
        component: Login
    },
    {
        key: 'register-route',
        title: 'Register',
        path: '/register',
        enabled: true,
        component: Register
    },
    {
        key: 'register-route',
        title: 'Register',
        path: '/register',
        enabled: true,
        component: Register
    },
    {
        key: 'unauthorized-route',
        title: 'Unauthorized',
        path: '/unauthorized',
        enabled: true,
        component: Unauthorized
    },
    {
        key: 'vendor-route',
        title: 'Vendor',
        path: '/vendor/*',
        enabled: true,
        protected: true,
        component: Vendor
    },
    {
        key: 'profile-route',
        title: 'Profile',
        path: '/profile',
        enabled: true,
        protected: true,
        component: Profile
    },
    {
        key: 'profilePhoto-route',
        title: 'Profile Photo',
        path: '/profile/profile-photo',
        enabled: true,
        protected: true,
        component: ProfilePhoto
    },
    {
        key: 'profileLogo-route',
        title: 'Profile Logo',
        path: '/profile/profile-logo',
        enabled: true,
        protected: true,
        component: ProfileLogo
    },
    {
        key: 'search-route',
        title: 'Search',
        path: '/search',
        enabled: true,
        protected: true,
        component: Search
    }
]
