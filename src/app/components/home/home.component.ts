import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private loginService: LoginService){}

  logout():void{

    
    this.loginService.logout();
  }

}
