import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '../../servicios/supabase';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel implements OnInit {
  autos: any[] = [];
  
  nuevoAuto = {
    nombre: '',
    marca: '',
    precio: 0,
    descripcion: '',
    imagen: ''
  };

  mensajeError = '';
  mensajeExito = '';
  
  autoEditandoId: number | null = null;

  constructor(private supabaseService: Supabase, private router: Router) {}

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
    }
  }

  async guardarAuto() {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.nuevoAuto.nombre || !this.nuevoAuto.marca || !this.nuevoAuto.precio) {
      this.mensajeError = 'Por favor completa al menos nombre, marca y precio.';
      return;
    }

    if (this.autoEditandoId !== null) {
      const { error } = await this.supabaseService.client
        .from('cars')
        .update(this.nuevoAuto)
        .eq('id', this.autoEditandoId);

      if (error) {
        this.mensajeError = error.message;
      } else {
        this.mensajeExito = '¡Auto actualizado con éxito!';
        this.limpiarFormulario();
        await this.cargarAutos();
      }
    } else {
      const { error } = await this.supabaseService.client
        .from('cars')
        .insert([this.nuevoAuto]);

      if (error) {
        this.mensajeError = error.message;
      } else {
        this.mensajeExito = '¡Auto creado con éxito!';
        this.limpiarFormulario();
        await this.cargarAutos();
      }
    }
  }

  limpiarFormulario() {
    this.nuevoAuto = { nombre: '', marca: '', precio: 0, descripcion: '', imagen: '' };
    this.autoEditandoId = null;
  }

  async editarAuto(id: number) {
    const autoAEditar = this.autos.find(a => a.id === id);
    if (!autoAEditar) return;

    this.nuevoAuto = { 
      nombre: autoAEditar.nombre, 
      marca: autoAEditar.marca, 
      precio: autoAEditar.precio, 
      descripcion: autoAEditar.descripcion, 
      imagen: autoAEditar.imagen 
    };

    this.autoEditandoId = id;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async eliminarAuto(id: number) {
    if (!confirm('¿Estás seguro de eliminar este auto del catálogo?')) return;

    const { error } = await this.supabaseService.client
      .from('cars')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error al eliminar: ' + error.message);
    } else {
      alert('Auto eliminado correctamente.');
      await this.cargarAutos();
    }
  }

  irALaTienda() {
    this.router.navigate(['/tienda']);
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