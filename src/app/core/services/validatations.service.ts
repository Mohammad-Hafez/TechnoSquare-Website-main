import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  static compareValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      // if (matchingControl.errors && matchingControl.errors['mustMatch']) {
      //   return null;
      // }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }

  static dateOfBirthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      const minAgeDate = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());

      if (selectedDate > today) {
        return { futureDate: true };
      } else if (selectedDate > minAgeDate) {
        return { minAge: true };
      } else {
        return null;
      }
    };
  }
}
