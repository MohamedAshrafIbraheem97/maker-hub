import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginData } from '../../types/user.type';

import { email, form, Field, FormField, minLength, required } from '@angular/forms/signals';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, FormField, TranslocoPipe, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  showPassword = signal(false);
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (form) => {
    required(form.email, { message: 'errors.email.required' });
    email(form.email, { message: 'errors.email.email' });
    required(form.password, { message: 'errors.password.required' });
    minLength(form.password, 6, { message: 'errors.password.minLength' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().touched() && this.loginForm().valid()) {
      console.log(this.loginModel());
    }
  }
}
