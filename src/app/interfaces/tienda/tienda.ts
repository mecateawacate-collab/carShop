import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '../../servicios/supabase';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css'
})
export class Tienda implements OnInit {
  autos: any[] = [];
  autosFiltrados: any[] = [];
  terminoBusqueda: string = '';
  autoSeleccionado: any = null;

  constructor(
    private supabaseService: Supabase, private router: Router  ) {}

  async ngOnInit() {
    await this.cargarAutos();
  }

  async cargarAutos() {
    const { data, error } = await this.supabaseService.client
      .from('cars')
      .select('*');

    if (error) {
      console.error('Error al cargar autos:', error);
    } else {
      this.autos = data || [];
      this.autosFiltrados = this.autos;
    }
  }

  buscarAutos() {
    const termino = this.terminoBusqueda.toLowerCase();
    this.autosFiltrados = this.autos.filter(auto => 
      auto.nombre.toLowerCase().includes(termino) || 
      auto.marca.toLowerCase().includes(termino)
    );
  }

  verDetalles(auto: any) {
    this.autoSeleccionado = auto;
  }

  cerrarDetalles() {
    this.autoSeleccionado = null;
  }

  agregarAlCarrito(auto: any) {
    const carrito = JSON.parse(localStorage.getItem('cart') || '[]');
    carrito.push(auto);
    localStorage.setItem('cart', JSON.stringify(carrito));
    alert(`¡${auto.nombre} agregado al carrito con éxito!`);
  }

  async abrirCarrito() {
    const { data: { session } } = await this.supabaseService.client.auth.getSession();
    const esInvitado = localStorage.getItem('invitado') === 'true';

    if (!session || esInvitado) {
      alert('Debes iniciar sesión para acceder al carrito');
      this.router.navigate(['/login']);
      return;
    }
    

    this.router.navigate(['/carritoCompras']);
  }

  obtenerUrlImagen(url: string): string {
    if (!url) return '';
    const matchDrive = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (matchDrive && matchDrive[1]) {
      return `https://lh3.googleusercontent.com/d/${matchDrive[1]}`;
    }
    return url;
  }
}