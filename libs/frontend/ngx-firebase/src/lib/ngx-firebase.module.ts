import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
    imports: [
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyAPUUKl6H3Xu3kMARJYXFLhB8-OuQHhA7w',
            authDomain: 'lahosa-4bc43.firebaseapp.com',
            projectId: 'lahosa-4bc43',
            storageBucket: 'lahosa-4bc43.appspot.com',
            messagingSenderId: '1025950570430',
            appId: '1:1025950570430:web:9107012744b599917a8bef',
            measurementId: 'G-9VS6GW2S99',
        }),
        AngularFireAuthModule,
    ],
})
export class NgxFirebaseModule {}
