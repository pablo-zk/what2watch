import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  constructor(private router: Router, private navCtrl: NavController) {}

  goDetails(content) {
    if (content.idContent == null) {
      this.router.navigate([`${content.media_type}/${content.id}`]);
    }else{
      this.router.navigate([`${content.media_type}/${content.idContent}`]);
    }
    
  }

  goBack() {
    this.navCtrl.back();
  }
}
