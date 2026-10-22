import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-compras.html',
  styleUrl: './carrito-compras.css'
})
export class CarritoCompras implements OnInit {
  itemsCarrito: any[] = [];
  precioTotal: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.itemsCarrito = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calcularTotal();
  }

  quitarItem(indice: number) {
    this.itemsCarrito.splice(indice, 1);
    localStorage.setItem('cart', JSON.stringify(this.itemsCarrito));
    this.calcularTotal();
  }

  calcularTotal() {
    this.precioTotal = this.itemsCarrito.reduce((acc, item) => acc + Number(item.precio), 0);
  }

  irAlPago() {
    if (this.itemsCarrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    localStorage.setItem('cartTotal', this.precioTotal.toString());
    this.router.navigate(['/pagarProductos']);
  }

  irALaTienda() {
    this.router.navigate(['/tienda']);
  }
}