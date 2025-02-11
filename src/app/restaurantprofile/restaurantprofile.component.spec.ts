import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantprofileComponent } from './restaurantprofile.component';

describe('RestaurantprofileComponent', () => {
  let component: RestaurantprofileComponent;
  let fixture: ComponentFixture<RestaurantprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantprofileComponent]
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
