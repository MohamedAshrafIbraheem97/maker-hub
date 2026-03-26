import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginData } from '../../types/user.type';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { TranslocoPipe } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormField,
    TranslocoPipe,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  showPassword = signal(false);
  loginModel = signal<LoginData>({ email: '', password: '' });

  loginForm = form(this.loginModel, (form) => {
    required(form.email, { message: 'errors.email.required' });
    email(form.email, { message: 'errors.email.email' });
    required(form.password, { message: 'errors.password.required' });
    minLength(form.password, 6, { message: 'errors.password.minLength' });
  });

  emailMatcher: ErrorStateMatcher = {
    isErrorState: () => this.loginForm.email().touched() && !!this.loginForm.email().errors()?.length,
  };

  passwordMatcher: ErrorStateMatcher = {
    isErrorState: () => this.loginForm.password().touched() && !!this.loginForm.password().errors()?.length,
  };

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().touched() && this.loginForm().valid()) {
      console.log(this.loginModel());
    }
  }
}
