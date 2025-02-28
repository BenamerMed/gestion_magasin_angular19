import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Home';
  currentPath:any;
  constructor(private router: Router) {
  }
  goTo(path:string) {
    this.currentPath=path;
    this.router.navigateByUrl(path)
  }



}
