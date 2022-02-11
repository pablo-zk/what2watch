import { Component, OnInit, ViewChild } from '@angular/core';
import { Config, IonSearchbar } from '@ionic/angular';
import { ActionsService } from '../services/actions.service';
import { MovieService } from '../services/movie.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;
  searchTerm: string;
  content: any = [];

  constructor(
    private movieService: MovieService,
    private action: ActionsService
  ) {}

  ngOnInit() {}

  goDetails(item) {
    this.action.goDetails(item);
  }

  submit(item) {
    this.movieService.getSearchList(item).subscribe((content) => {
      this.content = content;
      console.log(this.content);
    });
  }
}
