import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import {
    firebaseProjectId,
    firebaseClientEmail,
    firebasePrivateKey,
} from './system-firebase.environment';

@Injectable()
export class SystemFirebaseService {
    private readonly logger = new Logger(SystemFirebaseService.name);

    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: firebaseProjectId,
                clientEmail: firebaseClientEmail,
                privateKey: firebasePrivateKey,
            }),
        });
    }

    async checkIdToken(idToken: string): Promise<DecodedIdToken> {
        try {
            const decodedIdToken = await admin.auth().verifyIdToken(idToken);
            return decodedIdToken;
        } catch (error) {
            this.logger.error(error);
            throw new UnauthorizedException('Invalid Firebase idToken');
        }
    }
}
