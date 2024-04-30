import { Module } from '@nestjs/common';
import { SystemFirebaseService } from './system-firebase.service';

@Module({
    providers: [SystemFirebaseService],
    exports: [SystemFirebaseService],
})
export class SystemFirebaseModule {}
