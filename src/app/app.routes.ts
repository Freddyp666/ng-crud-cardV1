import { Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { AuthComponent } from './pages/auth/auth.component';


export const routes: Routes = [
    {path: '', component: CardComponent},
    {path: 'auth', component: AuthComponent}
];
