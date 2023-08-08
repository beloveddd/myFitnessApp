import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { AuthService } from './../../../shared/services/auth/auth.service';
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
})
export class LoginComponent {
    error: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    async loginUser(event: FormGroup<any>) {
        const { email, password } = event.value;

        try {
            await this.authService.loginUser(email, password);

            this.router.navigate(['/']);
        } catch(err: any) {
            this.error = err.message as string;
        }
    }
}