import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Constructor } from 'type-fest';
import { applicationName, port } from '@lahoo/system-environment';
import { addRequiredModules } from './add-required-modules';
import { setupApplication } from './setup-application';

const logger = new Logger('Bootstrap');

export async function bootstrap(appModule: Constructor<unknown>): Promise<INestApplication> {
    logger.log(`Starting Application ${applicationName}...`);
    const fullyFeaturedAppModule = addRequiredModules(appModule);
    const app = await NestFactory.create(fullyFeaturedAppModule);
    setupApplication(app);
    await app.listen(port);
    logger.log(`Application ${applicationName} Started on port ${port} 🚀`);
    return app;
}
