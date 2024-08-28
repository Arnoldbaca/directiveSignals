import { JsonPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule,SharedModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})

export class ProductPageComponent {

  //  constructor(private fb: FormBuilder ){ }

  private fb = inject(FormBuilder)

  public  color:string='green'

  public myForm:FormGroup = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(6), Validators.email]]
    })

  changeColor():void {
    // const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16))
    this.color='#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16))
  }


}
