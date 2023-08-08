import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const ROUTES: Routes = [
    {
        path: 'auth',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', loadChildren: () => import('./login/login.module').then(x => x.LoginModule) },
            { path: 'register', loadChildren: () => import('./register/register.module').then(x => x.RegisterModule) },
        ]
    }
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class AuthModule {}