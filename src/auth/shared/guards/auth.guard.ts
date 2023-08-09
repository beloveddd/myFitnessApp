import { Injectable, inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";

import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthGuard {
    constructor(
        private router: Router, 
        private authService: AuthService
    ) {}

    canActivate() {
        return this.authService.authState
            .pipe(
                map((user) => {
                    if (!user) {
                        this.router.navigate(['/auth/login']);
                    }

                    return !!user;
            }));
    }
}

export const IsAuthGuard: CanActivateFn = () => {
    return inject(AuthGuard).canActivate();
}