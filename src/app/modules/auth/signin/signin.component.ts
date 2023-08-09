import { Component, OnInit } from '@angular/core';
import { UserLoginData } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsService } from '../../core/services/forms.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  hide = true;
  userData: UserLoginData = {
    username: '',
    password: '',
  };
  errorMessage = '';

  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    private authService: AuthService,
    private formsService: FormsService,
  ) {}

  get controls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm.controls.username.hasError('required');
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  onSignin() {
    this.authService.signin(this.userData).subscribe({
      next: (value) => {
        if (value.length === 0) {
          this.errorMessage = 'Podano nieprawidlowe dane do logowania.';
        }
      },
      error: () => {
        this.errorMessage = 'Wystąpił błąd.';
      },
    });
  }
}
