// src/app/components/clases/clases.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ⬅️ IMPORTANTE

import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent], // ⬅️ IMPORTAR AQUÍ
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent {}
