import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { tap } from "rxjs";

import { Store } from "src/app/store";

export interface User {
    email: string,
    uid: string,
    authenticated: boolean,
}

@Injectable()
export class AuthService {

    auth$ = this.afAuth.authState.pipe(
        tap(next => {
            if (!next) {
               this.store.set('user', null);

               return;
            }

            const user: User = {
                email: next?.email!,
                uid: next?.uid!,
                authenticated: true
            }

            this.store.set('user', user);
        })
    );

    constructor(
        private store: Store,
        private afAuth: AngularFireAuth,
    ) {}

    get authState() {
        return this.afAuth.authState;
    }

    createUser(email: string, password: string) {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }

    loginUser(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    logoutUser() {
        return this.afAuth.signOut();
    }
}