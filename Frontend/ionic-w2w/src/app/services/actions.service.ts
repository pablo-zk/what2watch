import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  constructor(private router: Router) {}

  goDetails(content) {
    this.router.navigate([`tabs/tab1/${content.media_type}/${content.id}`]);
  }
}
