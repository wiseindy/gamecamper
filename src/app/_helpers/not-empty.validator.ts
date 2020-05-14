import { FormGroup } from '@angular/forms';

export function NotEmpty(field: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[field];

    if (control.errors && !control.errors.notEmpty) {
      // return if another validator has already found an error on the controlB
      return;
    }

    // set error on controlB if validation fails
    if (!control.value.trim()) {
      control.setErrors({ notEmpty: true });
    } else {
      control.setErrors(null);
    }
  };
}
