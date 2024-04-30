import { parseEnvironment } from '@lahoo/system-environment';
import { z } from 'zod';
import { Logger } from '@nestjs/common';

const logger = new Logger('Firebase Environment');

export const firebaseEnvironmentSchema = z.object({
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_CLIENT_EMAIL: z.string(),
    FIREBASE_PRIVATE_KEY: z.string(),
});

export type FirebaseEnvironment = z.infer<typeof firebaseEnvironmentSchema>;

export const firebaseEnvironment = parseEnvironment(firebaseEnvironmentSchema);

export const firebaseProjectId = firebaseEnvironment.FIREBASE_PROJECT_ID;
export const firebaseClientEmail = firebaseEnvironment.FIREBASE_CLIENT_EMAIL;
export const firebasePrivateKey = firebaseEnvironment.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

const logHeader = '[SystemFirebaseEnvironment]';
logger.warn(`${logHeader} Firebase Project Id: ${firebaseProjectId}`);
logger.warn(`${logHeader} Firebase Client Email: ${firebaseClientEmail}`);
