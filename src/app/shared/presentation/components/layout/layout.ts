import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {FooterContent} from '../footer-content/footer-content';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,
    RouterLink, RouterLinkActive,
    MatSidenavModule, MatButtonModule,
    MatIconModule,
    MatListModule,
    FooterContent,
    MatToolbarModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  readonly collapsed = signal(false);
  readonly options = [
    {link: '/home', label: 'Home', icon: 'home'},
    {link: '/about', label: 'About', icon: 'info'},
    {link: '/aquatic-centers/reservations', label: 'New Reservation', icon: 'AquaticCenter'},
    //{link: '/learning/courses', label: 'Courses', icon: 'school'}
  ];

  toggleMenu(): void {
    this.collapsed.update(value => !value);
  }
}
