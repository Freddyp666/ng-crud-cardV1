import { Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TestComponent } from './test/test.component';


export const routes: Routes = [
    {path:'', redirectTo: '/auth/login', pathMatch: 'full'},
    {
        path: 'auth', component: AuthComponent, 
        children: [
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent}
    ]
    },
    {path: 'home', component: CardComponent},
    { path: 'test', component: TestComponent },

];
