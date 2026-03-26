import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { email, form, minLength, required, validate, FormField } from '@angular/forms/signals';
import { TranslocoPipe } from '@jsverse/transloco';
import { RegisterData } from '../../types/user.type';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslocoPipe,
    FormField,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})
export class RegisterComponent {
  showPassword = signal(false);
  registerModel = signal<RegisterData>({ email: '', password: '', name: '', confirmPassword: '' });

  registerForm = form(this.registerModel, (form) => {
    required(form.name, { message: 'errors.name.required' });
    required(form.email, { message: 'errors.email.required' });
    email(form.email, { message: 'errors.email.email' });
    required(form.password, { message: 'errors.password.required' });
    minLength(form.password, 6, { message: 'errors.password.minLength' });
    required(form.confirmPassword, { message: 'errors.password.confirmPassword.required' });
    validate(form.confirmPassword, ({ value }) => {
      if (value() === this.registerForm.password().value()) {
        return { kind: 'misMatch', message: 'errors.password.confirmPassword.match' };
      }
      return null;
    });
  });

  nameMatcher: ErrorStateMatcher = {
    isErrorState: () => this.registerForm.name().touched() && !!this.registerForm.name().errors()?.length,
  };

  emailMatcher: ErrorStateMatcher = {
    isErrorState: () => this.registerForm.email().touched() && !!this.registerForm.email().errors()?.length,
  };

  passwordMatcher: ErrorStateMatcher = {
    isErrorState: () => this.registerForm.password().touched() && !!this.registerForm.password().errors()?.length,
  };

  confirmPasswordMatcher: ErrorStateMatcher = {
    isErrorState: () =>
      this.registerForm.confirmPassword().touched() && !!this.registerForm.confirmPassword().errors()?.length,
  };

  onSubmit(event: Event) {
    event.preventDefault();
  }
}
