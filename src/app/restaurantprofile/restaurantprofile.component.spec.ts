import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantprofileComponent } from './restaurantprofile.component';
import { HeaderComponent } from '../header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RestaurantprofileComponent', () => {
  let component: RestaurantprofileComponent;
  let fixture: ComponentFixture<RestaurantprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RestaurantprofileComponent, HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
