import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  orderTicketsForm = this.orderTicketsFormGroup()

  constructor(private formBuilder: NonNullableFormBuilder){
    this.orderTicketsForm.valueChanges.subscribe(console.log)
  }

  private orderTicketsFormGroup(){
     return this.formBuilder.group({
    name: this.formBuilder.control('',{
      validators:[Validators.required]
    }),
    surname: this.formBuilder.control('',{
      validators:[Validators.required]
    }),
    phoneNumber: this.formBuilder.control('',{
      validators:[Validators.required]
    }),
    email: this.formBuilder.control('',{
      validators:[Validators.required]
    }),
    emailRepeat: this.formBuilder.control('',{
      validators:[]
    }),
    newsletterToggler: this.formBuilder.control(false,{
      validators:[]
    }),
    promo: this.formBuilder.control('',{
      validators:[]
    }),
  }
     )
  }

}
