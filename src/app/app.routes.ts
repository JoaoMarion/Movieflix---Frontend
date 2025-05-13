import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { VerifyComponent } from './components/verify/verify.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
     { path: 'register', component: CadastroComponent },
     { path: 'login', component: LoginComponent },
     { path: 'verify', component: VerifyComponent },
     { path: 'home', component: HomeComponent, canActivate: [authGuard] }

];