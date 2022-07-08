import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appFood]'
})
export class FoodDirective {

  // @Input('heading') heading;
  // @Input('isShow') isShow;
  constructor(public temp: TemplateRef<any>) { }

}
