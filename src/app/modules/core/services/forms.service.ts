import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Musisz podać wartość';
    }

    if (control.hasError('minlength')) {
      return 'Przekazałeś za mało znaków';
    }

    if (control.hasError('maxlength')) {
      return 'Przekazałeś za duzo znaków';
    }

    if (control.hasError('email')) {
      return 'Nieprawidłowy adres email';
    }

    return;
  }
}
