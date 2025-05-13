import { Component } from '@angular/core';
import { User } from '../../entities/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  title = 'Login Movieflix';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router:Router) {
    this.loginForm = this.fb.group({
      id: [],
      email: ['', [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
  



  loginObject(): User {
      return{
        email: this.loginForm.get('email')?.value!,
        password: this.loginForm.get('password')?.value!
      }
  }

  makeLogin() {
  const user = this.loginObject();

  this.loginService.login(user).subscribe({
    next: (res) => {
      const jwt = res.token;
      const refreshToken = res.refreshToken;

      if (jwt && refreshToken) {
        localStorage.setItem("token", jwt);
        localStorage.setItem("refresh_token", refreshToken);

        this.router.navigate(['/home']); 
      }
    },
    error: error => {
      console.error(error);
      alert('Login falhou: ' + error.error);
    }
  });
}

  goToRegister(){
    this.router.navigate(['/register']);
  }

}
