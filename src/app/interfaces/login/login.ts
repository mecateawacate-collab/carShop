import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '../../servicios/supabase';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  verPassword = false;
  errorMessage = '';

  constructor(private supabaseService: Supabase, private router: Router) {}

  async iniciarSesion() {
    try {
      const { error } = await this.supabaseService.client.auth.signInWithPassword({
        email: this.email,
        password: this.password
      });

      if (error) throw error;
      localStorage.removeItem('invitado');

      const { data: perfil } = await this.supabaseService.client
        .from('profiles')
        .select('role')
        .eq('email', this.email)
        .maybeSingle();

      if (perfil?.role === 'admin') {
        this.router.navigate(['/adminPanel']);
      } else {
        this.router.navigate(['/tienda']);
      }

    } catch (error: any) {
      this.errorMessage = error.message || 'Error al iniciar sesión';
    }
  }

  async continuarComoInvitado() {
    await this.supabaseService.client.auth.signOut();
    localStorage.setItem('invitado', 'true');
    this.router.navigate(['/tienda']);
  }

  alternarPassword() {
    this.verPassword = !this.verPassword;
  }
}