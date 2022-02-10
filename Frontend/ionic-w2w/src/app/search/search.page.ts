import { Component, OnInit, ViewChild } from '@angular/core';
import { Config, IonSearchbar } from '@ionic/angular';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;
  searchTerm: string;
  storageKey: string = 'recent_searches';
  recentSearches: any = [];

  constructor() {}

  ngOnInit() {}

  submit(term?: string) {}
}
