import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

const bootstrap = () => bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        importProvidersFrom(ServerModule),
        ...config.providers

    ]
});

export default bootstrap;
