import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, CardModule],
  templateUrl: './registro.component.html',
  providers: [UserserviceService],
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private Userservice: UserserviceService) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      cedula: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
    });
  };

  realizar_registro(): void {
    if (this.registroForm.invalid) {
      console.log("Formulario inválido");
      return;
    }

    const { username, cedula, codigo } = this.registroForm.value;

    // Llamada al servicio para registrar al usuario
    this.Userservice.register(username, cedula, codigo).subscribe({
      next: (response) => {
        console.log("Información enviada Exitosamente", response);
        // Puedes redirigir o hacer otras acciones después del registro
      },
      error: (error) => {
        console.log("Error al enviar información", error);
      },
      complete: () => {
        console.log("Envío de información completado");
        this.registroForm.reset(); // Limpiar el formulario después del registro
      },
    });
  }
}
