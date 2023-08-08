import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
})
export class RegisterComponent {
    registerUser(event: FormGroup<any>) {
        console.log(event.value);
    }
}