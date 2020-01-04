import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service'

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  /*Método para mostrar os items*/ 
  items():any[]{
    return this.shoppingCartService.items
  }
  /*método para retornar o valor total dos itens inseridos no carrinho
   */
  total():number{
    return this.shoppingCartService.total()
  }

  clear(){
    this.shoppingCartService.clear
  }

  removeItem(item: any){
    this.shoppingCartService.removeItem(item)
  }

  addItem(item: any){
    this.shoppingCartService.addItem(item)
  }
}
