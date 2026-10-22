import { Routes } from '@angular/router';
import { Login } from './interfaces/login/login';
import { Tienda } from './interfaces/tienda/tienda';
import { CarritoCompras } from './interfaces/carrito-compras/carrito-compras';
import { PagarProductos } from './interfaces/pagar-productos/pagar-productos';
import { AdminPanel } from './interfaces/admin-panel/admin-panel';


export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: Login },
    { path: 'tienda', component: Tienda },
    { path: 'carritoCompras', component: CarritoCompras },
    { path: 'pagarProductos', component: PagarProductos },
    { path: 'adminPanel', component: AdminPanel },
    
    { path: '**', redirectTo: 'login' }

];
