import Registration from "./components/CustomerAuth/Registration.vue";
import Login from "./components/CustomerAuth/Login.vue";
import ForgotPassword from "./components/CustomerAuth/ForgotPassword.vue"
import Home from "./components/Home.vue"
import CatProducts from "./components/CatProducts.vue"
import ProductDetails from "./components/ProductDetails.vue"
import Profile from "./components/Profile.vue"
import Cart from "./components/Cart.vue"

import {
    createRouter,
    createWebHistory
} from "vue-router";

const routes = [{
        name: "Registration",
        component: Registration,
        path: "/registration",
    },
    {
        name: "Login",
        component: Login,
        path: "/",
    },
    {
        name: "ForgotPassword",
        component: ForgotPassword,
        path: "/forgotpassword",
    },
    {
        name: "Home",
        component: Home,
        path: "/home",
    },
    {
        name: "CatProducts",
        component: CatProducts,
        path: "/catproducts/:cat_id"
    },
    {
        name: "ProductDetails",
        component: ProductDetails,
        path: "/productdetails",
        props: true
    },
    {
        name: "Profile",
        component: Profile,
        path: "/profile/:cust_id"
    },
     {
         name: "Cart",
         component: Cart,
         path: "/Cart"
     }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;