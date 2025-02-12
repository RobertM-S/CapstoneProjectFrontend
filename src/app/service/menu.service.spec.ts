import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MenuService],
    });
    service = TestBed.inject(MenuService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch price of food', async () => {
    const mockResponse = { restaurant: [{ price: 2.99 }] };
    const rid = '2';
    const fid = '1';

    const resp = await service.getPriceOfFood(rid, fid);
    expect(resp).toEqual(mockResponse);

    const req = httpMock.expectOne(`${service.url}/${rid}/${fid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});