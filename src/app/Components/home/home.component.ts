import { Component } from '@angular/core';
import { SliderComponent } from './slider/slider.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imageUrls: string[] = [
    '/assets/Images/tottenham.jpg',
    '/assets/Images/realmadrid.jpeg',
    '/assets/Images/liverpool.jpeg',
    'assets/Images/mancity.jpg',
    '/assets/Images/tottenham.jpg',
    '/assets/Images/shoe6.jpeg',
    '/assets/Images/gerard.jpg',
    'assets/Images/mancity.jpg',
    // Add more image URLs here
  ];
}
