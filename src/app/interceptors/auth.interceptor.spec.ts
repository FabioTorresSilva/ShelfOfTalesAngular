import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { TokenService } from '../Services/token.service';
import { AuthService } from '../Services/auth.service';
import { of } from 'rxjs';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;
  let authService: AuthService;

  // Mock the TokenService and AuthService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule
      providers: [
        authInterceptor, // Provide the interceptor
        { provide: TokenService, useClass: TokenService }, // Mock TokenService
        { provide: AuthService, useClass: AuthService } // Mock AuthService
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
    authService = TestBed.inject(AuthService);
  });

  it('should add Authorization header to the request', () => {
    // Mock token
    spyOn(tokenService, 'getToken').and.returnValue('mock-token');
    
    // Make an HTTP request
    httpClient.get('/test').subscribe(response => {
      expect(response).toBeTruthy();
    });

    // Assert that the request was intercepted and the Authorization header was added
    const req = httpTestingController.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toEqual('Bearer mock-token');
    httpTestingController.verify();
  });

  it('should call logout on 401 error', () => {
    // Mock token
    spyOn(tokenService, 'getToken').and.returnValue('mock-token');
    spyOn(authService, 'logout'); // Spy on the logout method

    // Make a request that will return a 401 error
    httpClient.get('/test').subscribe({
      next: () => {},
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    // Simulate 401 Unauthorized error
    const req = httpTestingController.expectOne('/test');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    // Ensure that logout is called
    expect(authService.logout).toHaveBeenCalled();
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
