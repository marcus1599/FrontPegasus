import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { of } from 'rxjs';
import { AuthService } from './services/auth.service';

class MockAuthService {
  isAuthenticated() {
    return true;  // ou false, dependendo do que você deseja testar
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: MockAuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },  // Mockando o AuthService
        Router
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true); // Simula o retorno de autenticação

    // Simula uma rota de ativação com parâmetros fictícios
    expect(guard.canActivate({} as any, {} as any)).toBe(true);  // Pode também usar Observables ou Promises
  });

  it('should prevent navigation if not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);

    // Simula que o usuário não está autenticado
    expect(guard.canActivate({} as any, {} as any)).toBe(false);
  });
});
