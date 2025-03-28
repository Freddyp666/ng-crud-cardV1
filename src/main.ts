import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes'; // Importa las rutas desde app.routes.ts

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes), provideHttpClient()
    ],
}).catch((err) => console.error(err));