import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const us : UserService = inject(UserService);
  const router:Router = inject(Router);

  if(us.isAuthenticated()){
    return true;
  }
  alert('Please Login');
  router.navigate(['login'])
  return false;
};
