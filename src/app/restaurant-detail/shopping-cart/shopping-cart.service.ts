import { CartItem } from "./cart-item.model"
import { MenuItem } from "../menu-item/menu-item.model"
import { Injectable } from "@angular/core"
import { NotificationService } from "app/shared/messages/notification.service"

/*todo serviço que vai receber algo precisa ser marcado com o injectable*/
@Injectable()
export class ShoppingCartService{

    constructor(private notificationService: NotificationService){}

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
        /*Emitindo a notificação*/
        this.notificationService.notify(`Você adicionou o item ${item.name}`)
    }

    removeItem(item:CartItem){
        this.items.splice(this.items.indexOf(item),1)
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
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