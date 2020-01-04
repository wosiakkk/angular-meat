import { CartItem } from "./cart-item.model"
import { MenuItem } from "../menu-item/menu-item.model"

export class ShoppingCartService{
    items: CartItem[] = []

    total(): number{ 
        /*trocando os objetos do array para os números correspondentes ao seus valores
        e somando os valores anteiores com os atuais usando o método reduce para  dar a soma total dos valores
        o número zero seta o valor incial da conta */
        return this.items.map(item=> item.value())
            .reduce((prev, value)=>prev+value, 0)
    }

    addItem(item:MenuItem){
        /*lógica para caso já exista o item no carrinho,a quantidade seja incrementada*/ 
        let foundItem = this.items.find((mItem)=> mItem.menuItem.id === item.id)
        if(foundItem){
            /*Incrementado a quantidade de um item no qual já existe no carrinho */
            foundItem.quantity = foundItem.quantity + 1
        }else{
            /*add o item ao carrinho*/
            this.items.push(new CartItem(item))
        }
    }

    removeItem(item:CartItem){
        this.items.splice(this.items.indexOf(item),1)
    }

    clear(){
        this.items = []
    }

    increaseQty(item: CartItem){
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CartItem){
        item.quantity = item.quantity -1
        if(item.quantity === 0){
            this.removeItem(item)
        }
    }
}