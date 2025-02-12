import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { addressService } from './address.service'; 

describe('AddressService', () => {
  let service: addressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [addressService] 
    });
    service = TestBed.inject(addressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});