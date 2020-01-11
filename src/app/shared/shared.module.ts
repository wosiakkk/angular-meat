import { NgModule, ModuleWithProviders } from '@angular/core'
import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'
import { RatingComponent } from './rating/rating.component'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './messages/snackbar/snackbar.component'
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { OrderService } from 'app/order/order.service';
import { NotificationService } from './messages/notification.service'

@NgModule({
    declarations:[InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports:[CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent,
              CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent]
})
export class SharedModule{
    /*forma de substituir o módulo core, tendo a possibilidade de importar o 
    módulo shared com ou sem os providers, deixando o módulo core obsoleto*/ 
    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService, RestaurantService, OrderService, NotificationService]
        }
    }

}