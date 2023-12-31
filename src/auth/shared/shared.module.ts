
import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { AuthService } from "./services/auth/auth.service";
import { AuthGuard } from "./guards/auth.guard";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [AuthFormComponent],
    exports: [AuthFormComponent]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                AuthService,
                AuthGuard
            ]
        }
    }
}