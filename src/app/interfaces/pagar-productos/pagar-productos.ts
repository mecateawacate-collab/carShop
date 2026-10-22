import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagar-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagar-productos.html',
  styleUrl: './pagar-productos.css'
})
export class PagarProductos implements OnInit {
  montoTotal: number = 0;
  
  numeroTarjeta = '4242 1234 1234 4242';
  expiracionTarjeta = '12/28';
  cvcTarjeta = '123';
  titularTarjeta = 'Yersy Eddú';

  cargando = false;
  mensajeExito = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const totalGuardado = localStorage.getItem('cartTotal');
    this.montoTotal = totalGuardado ? Number(totalGuardado) : 0;

    if (this.montoTotal === 0) {
      alert('No hay productos pendientes de pago.');
      this.router.navigate(['/tienda']);
    }
  }

  confirmarPago() {
    this.cargando = true;
    
    setTimeout(() => {
      this.cargando = false;
      this.mensajeExito = '¡Pago procesado con éxito por Stripe (Modo Test)!';
      
      localStorage.removeItem('cart');
      localStorage.removeItem('cartTotal');

      setTimeout(() => {
        this.router.navigate(['/tienda']);
      }, 3000);
    }, 2000);
  }

  cancelarPago() {
    if (confirm('¿Estás seguro de cancelar el pago? Serás devuelto al carrito.')) {
      this.router.navigate(['/carritoCompras']);
    }
  }
}