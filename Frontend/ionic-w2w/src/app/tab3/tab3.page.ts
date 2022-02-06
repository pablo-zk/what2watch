import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonInfiniteScroll, NavController } from '@ionic/angular';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  query: any = [];
  filter: string;
  page: number = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private movieService: MovieService,
    public navCtrl: NavController,
    private router: Router
  ) {}

  goOut() {
    this.router.navigate(['/tabs/tab1']);
  }

  loadData() {
    this.movieService.getPopularList(this.page).subscribe((s: any[]) => {
      console.log(s);
      this.query = s;
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  search(event) {
    console.log(event);
  }

  loadMoreData(event) {
    setTimeout(() => {
      if (this.page > 1000) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      this.page++;
      this.loadData();
      this.content.scrollToTop();
      event.target.complete();
    }, 1000);
  }

  segmentChanged(event) {}
}
