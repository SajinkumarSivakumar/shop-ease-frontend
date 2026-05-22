import { Routes } from '@angular/router';
import {Login} from "./auth/login/login";
import {Register} from "./auth/register/register";
import {Categories} from "./category/categories/categories";
import {ProductsUpload} from "./products/products-upload/products-upload";
import {List} from "./products/list/list";
import {CartList} from "./cart/cart-list/cart-list";
import {Order} from "./myOrder/order/order";
import {RoleGuard} from "./guards/role-guard";
import {Settings} from "./settings/settings";

export const routes: Routes = [

    {
        path: '',
        component: Login,
    },
    {
        path: 'register',
        component: Register,
    },

    {
        path:'category',
        component:Categories
    },

    {
        path:'products/upload',
        component:ProductsUpload,
        canActivate:[RoleGuard]
    },
    {
        path:'products/List',
        component:List
    },
    {
        path:'cart/List',
        component:CartList
    },
    {
        path:'order/List',
        component:Order
    },
    {
        path:'settings',
        component:Settings,
        canActivate:[RoleGuard]
    }
];
