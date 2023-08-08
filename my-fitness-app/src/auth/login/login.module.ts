import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";

export const ROUTES: Routes = [
    { path:'', component: LoginComponent }
]

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [LoginComponent],
})
export class LoginModule {}