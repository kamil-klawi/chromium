import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUser } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { FormsService } from '../../core/services/forms.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.minLength(5),
        Validators.required,
      ],
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formsService: FormsService,
  ) {}

  get controls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.registerForm.controls.email.hasError('email');
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  onRegister() {
    const userData: PostUser = this.registerForm.getRawValue();
    this.authService.signup(userData).subscribe({
      next: () => {
        this.router.navigate(['/logowanie']);
      },
      error: () => {
        this.errorMessage = 'Wystąpił błąd';
      },
    });
  }
}
