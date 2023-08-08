import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { SharedModule } from "./shared/shared.module";
import { FirebaseOptions } from "@firebase/app-types";


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

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyDELbreern10t3JUW9PPK1OYTdYkxjG3Ig",
    authDomain: "fitness-app-bbb56.firebaseapp.com",
    databaseURL: "https://fitness-app-bbb56-default-rtdb.firebaseio.com",
    projectId: "fitness-app-bbb56",
    storageBucket: "fitness-app-bbb56.appspot.com",
    messagingSenderId: "659103425752",
    appId: "1:659103425752:web:f1da93840817f0d3b023ad",
    measurementId: "G-RX8H1FHVZE"
};

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot(),
    ]
})
export class AuthModule {}