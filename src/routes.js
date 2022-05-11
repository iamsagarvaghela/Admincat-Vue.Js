// import Registration from "./components/CustomerAuth/Registration.vue";
// import Login from "./components/CustomerAuth/Login.vue";
// import ForgotPassword from "./components/CustomerAuth/ForgotPassword.vue"
// import Home from "./components/Home.vue"
// import CatProducts from "./components/CatProducts.vue"
// import ProductDetails from "./components/ProductDetails.vue"
// import Profile from "./components/Profile.vue"
// import Cart from "./components/Cart.vue"
// import TheNotFound from "./components/layouts/TheNotFound.vue"

import {
    createRouter,
    createWebHistory
} from "vue-router";

const routes = [{
        name: "Registration",
        component: () => import(/*webpackChunkName: "Registration" */ '@/components/CustomerAuth/Registration'),
        path: "/registration",
    },
    {
        name: "Login",
        component: () => import(/*webpackChunkName: "Login" */ '@/components/CustomerAuth/Login'),
        path: "/",
    },
    {
        name: "ForgotPassword",
        component: () => import(/*webpackChunkName: "ForgotPassword" */ '@/components/CustomerAuth/ForgotPassword'),
        path: "/forgotpassword",
    },
    {
        name: "Home",
        component: () => import(/*webpackChunkName: "Home" */ '@/components/Home'),
        path: "/home",
    },
    {
        name: "CatProducts",
        component: () => import(/*webpackChunkName: "CatProducts" */ '@/components/CatProducts'),
        path: "/catproducts/:cat_id"
    },
    {
        name: "ProductDetails",
        component: () => import(/*webpackChunkName: "ProductDetails" */ '@/components/ProductDetails'),
        path: "/productdetails",
        props: true
    },
    {
        name: "Profile",
        component: () => import(/*webpackChunkName: "Profile" */ '@/components/Profile'),
        path: "/profile/:cust_id"
    },
    {
        name: "Cart",
        component: () => import(/* webpackChunkName: "Cart" */ '@/components/Cart'),
        path: "/Cart"
    },
    {
        name: "OrderDetails",
        component: () => import( /* webpackChunkName: "OrderDetails" */ '@/components/OrderDetails'),
        path: "/orderdetails",
        props:true
    },
    {
        name: "MyOrder",
        component: () => import( /* webpackChunkName: "MyOrder" */ '@/components/MyOrder'),
        path: "/myorder"
    },
    {
        name: "TheNotFound",
        component: () => import(/* webpackChunkName: "TheNotFound" */ '@/components/layouts/TheNotFound'),
        path: "/:pathMatch(.*)*"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;