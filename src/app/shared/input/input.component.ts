import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() input: any
  @Input() label: string
  @Input() errorMessage: string

/*declaraçao para o angular poder injetar uma referência da diretiva ngmodel*/ 
  @ContentChild(NgModel) model:NgModel

  constructor() { }

  ngOnInit() {
  }
  /**chamado após o conteúdo for definido(ngcontent)*/
  ngAfterContentInit() {
    this.input = this.model
    if(this.input===undefined){
      throw new Error('Essse componente precisa ser usado com uma diretiva ngModel')
    }
  }

  hasSuccess():boolean{
    return this.input.valid && (this.input.dirty || this.input.touched)
  }
  hasError():boolean{
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }
}
