import { Component  } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [MatListModule,RouterLink],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.css',
})
export class SlidebarComponent {

}
