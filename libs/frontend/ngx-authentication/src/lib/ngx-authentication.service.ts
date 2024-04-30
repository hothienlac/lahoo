import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, map, of, shareReplay, switchMap } from 'rxjs';
import { API_AccessToken, API_User } from '@lahoo/api';

export const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'Lahoo:Ansuz:AccessToken';

@Injectable()
export class NgxAuthenticationService {
    localStorageAccessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    accessToken = of(this.localStorageAccessToken).pipe(shareReplay(1));
    user = this.accessToken.pipe(
        switchMap((accessToken) =>
            accessToken
                ? this.httpClient.get<API_User>('/api/authentication/me').pipe(
                      catchError((error) => {
                          if (error.status === 401) {
                              localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
                          }
                          return of(null);
                      }),
                      shareReplay(1),
                  )
                : of(null),
        ),
    );
    isLoggedIn = this.user.pipe(map((user) => !!user));

    constructor(
        private readonly httpClient: HttpClient,
        private readonly angularFireAuth: AngularFireAuth,
    ) {}

    logout(): void {
        localStorage.clear();
        sessionStorage.clear();
        location.href = '/login';
    }

    async loginGoogle(): Promise<void> {
        await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        const user = await this.angularFireAuth.currentUser;
        const idToken = await user?.getIdToken();
        if (!idToken) {
            throw new Error('No idToken');
        }
        await new Promise<void>((resolve, reject) =>
            this.httpClient
                .post<API_AccessToken>('/api/authentication/login', { idToken })
                .subscribe({
                    next: ({ accessToken }) => {
                        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
                        resolve();
                    },
                    error: (error) => reject(error),
                }),
        );
    }
}
