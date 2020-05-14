import { FormGroup } from '@angular/forms';

export function MustMatch(fieldA: string, fieldB: string) {
  return (formGroup: FormGroup) => {
    const controlA = formGroup.controls[fieldA];
    const controlB = formGroup.controls[fieldB];

    if (controlB.errors && !controlB.errors.mustMatch) {
      // return if another validator has already found an error on the controlB
      return;
    }

    // set error on controlB if validation fails
    if (controlA.value !== controlB.value) {
      controlB.setErrors({ mustMatch: true });
    } else {
      controlB.setErrors(null);
    }
  };
}
