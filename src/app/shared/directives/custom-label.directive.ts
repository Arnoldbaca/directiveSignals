import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit, OnChanges{


  private htmlElement?:ElementRef<HTMLElement>
  private _color:string='red'
  private _errors?: ValidationErrors | null

  @Input() set color(value:string) {
    this._color=value
  }


  @Input() set errors(value : ValidationErrors| null | undefined) {
    this._errors=value
    this.setErrorMessage()
  }

  constructor(private el:ElementRef<HTMLElement>) {
    // console.log('Constructor de la directiva')
    // console.log(el)
    this.htmlElement=el

   }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.htmlElement) return
    this.htmlElement.nativeElement.style.color=this._color
  }
  ngOnInit(): void {
    this.setStyle()

  }

   setStyle():void {
    if (!this.htmlElement) return
    this.htmlElement.nativeElement.style.color=this._color
   }

   setErrorMessage():void {
    if (!this.htmlElement) return
    if (!this._errors){
      this.htmlElement.nativeElement.innerHTML='No hay error'
      return
    }

    const errors = Object.keys(this._errors)

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML='Este campo es requerido'
      return
    }
    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength']
      const current = this._errors!['minlength']['actualLength']
      this.htmlElement.nativeElement.innerHTML=`Este campo de mínimo ${min} caracteres y tiene ${current} `
      return
    }
    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerHTML='Este campo de email'
      return
    }


   }
}
