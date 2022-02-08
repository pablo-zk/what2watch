import { Component, OnInit, ViewChild } from '@angular/core';
import { Config, IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;

  ionViewDidLoad() {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 150);
  }

  constructor() {}

  ngOnInit() {}
}
