import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodComponent } from './food.component';
import { MenuService } from '../service/menu.service';
import { BasketService } from '../service/basket.service';
import { of } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FoodComponent', () => {
  let component: FoodComponent;
  let fixture: ComponentFixture<FoodComponent>;
  let menuService: MenuService;
  let basketService: BasketService;

  beforeEach(async () => {
    const menuServiceMock = {
      getPriceOfFood: jest.fn().mockReturnValue(of({ restaurant: [{ price: 10 }] })),
    };

    const basketServiceMock = {
      addToBasket: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FoodComponent, HeaderComponent],
      providers: [
        { provide: MenuService, useValue: menuServiceMock },
        { provide: BasketService, useValue: basketServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodComponent);
    component = fixture.componentInstance;
    menuService = TestBed.inject(MenuService);
    basketService = TestBed.inject(BasketService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update total price and add to basket', async () => {
    component.food = {
      foodid: '1',
      foodname: 'test',
      description: 'test',
      price: 10,
      image: 'test',
     };
    component.quantity = 2;
    component.restaurantid = '1';
    await component.onBasket();
    expect(component.basket.totalprice).toBe(20);
    expect(basketService.addToBasket).toHaveBeenCalledWith(component.basket);
  });
});