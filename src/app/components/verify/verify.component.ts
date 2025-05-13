import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VerifyCodeService } from '../../services/verify-code/verify-code.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
   title = 'Verificação de Código';

  verifyForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private verifyService: VerifyCodeService) {
    this.verifyForm = this.fb.group({
      code: ['', Validators.required]
    });
  }

  submitCode() {
    const code = this.verifyForm.get('code')?.value;
    
    this.verifyService.verifyCode(code).subscribe({
    next: () => {
      alert('Código verificado com sucesso!');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      alert('Erro ao verificar código:' + err.error);
    }
  });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
