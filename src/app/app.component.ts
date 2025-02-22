import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./components/card/card.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'  
})
export class AppComponent {
  title = 'ng-crud-card';


}
