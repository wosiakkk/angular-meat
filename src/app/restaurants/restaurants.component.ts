import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime' //da um delay entre eventos, ignoranto enquanto o tempo definido não é atingido
import 'rxjs/add/operator/distinctUntilChanged' //se o evento atual for igual ao ultimo ele ignora
import 'rxjs/add/operator/catch' //sera usado para n quebrar o obsevable da query da busca quando houver erro no backend
import 'rxjs/add/observable/from' //para retornar um array vazio quando houver erro
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantService: RestaurantService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm => 
      this.restaurantService
        .retaurants(searchTerm)
        .catch(error=> Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantService.retaurants()
    .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden'? 'visible' : 'hidden'
  }
}
