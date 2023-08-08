import { LoginModule } from './../login/login.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";

export const ROUTES: Routes = [
    { path:'', component: RegisterComponent }
]

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [RegisterComponent],
})
export class RegisterModule {}