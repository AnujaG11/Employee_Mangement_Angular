import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salutation'
})
export class SalutationPipe implements PipeTransform {

  transform(value: any, gender: string): string {
    if (!value || !gender) {
      return value;
    }

    let salutation = '';

    switch(gender.toLowerCase()) {
      case 'male':
        salutation = 'Mr. ';
        break;
      case 'female':
        salutation = 'Ms. ';
        break;
      default:
        salutation = '';
    }

    return salutation + value;
  }

}
