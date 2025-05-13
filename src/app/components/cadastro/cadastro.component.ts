import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { UserRegister } from '../../entities/userRegister';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

title = 'Cadastro de Usuário';
registerForm!: FormGroup;

constructor(private fb: FormBuilder, private router: Router, private registerService: RegisterService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  goBackToLogin() {
    this.router.navigate(['/login']);
  }
  
   submitRegister() {
    if (this.registerForm.valid) {
      const user: UserRegister = this.registerForm.value;

      this.registerService.register(user).subscribe({
        next: () => {
          alert('Usuário cadastrado com sucesso. Email de Verificação Enviado');
          this.router.navigate(['/verify']);
        },
        error: (err) => {
          alert('Login falhou: ' + err.error);
        }
      });
    }
  }
   
      

  

}
