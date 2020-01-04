import { NgModule } from '@angular/core'
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { OrderService } from 'app/order/order.service';

/*uma boa prática é criar todos os arquivos services nessa pasta tbm,
não foi feito apenas por praticidade, sendo que os arquivos estaam exportados em 
diversos outros arquivos*/ 

@NgModule({
    providers:[ShoppingCartService, RestaurantService, OrderService]
})
export class CoreModule{}