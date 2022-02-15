import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, IonSegment, NavController } from '@ionic/angular';
import { ActionsService } from '../services/actions.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  content: any = [];
  load: any = [];
  page: number = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSegment) segment: IonSegment;
  segmentValue: string = 'movie';
  segmentChange: boolean = false;

  constructor(
    private movieService: MovieService,
    public navCtrl: NavController,
    private router: Router
  ) {}

  goSearch() {
    this.router.navigate(['search']);
  }

  /* goDetails(c) {
    this.action.goDetails(c);
  } */

  goDetails(c) {
    this.router.navigate([`${this.segmentValue}/${c.id}`]);
  }

  loadData() {
    this.movieService
      .getPopularList(this.segmentValue, this.page)
      .subscribe((s: any[]) => {
        this.load = s;
        console.log(this.load);
        this.load.results.forEach((movie) => {
          this.content.push(movie);
        });
        console.log(this.content);
      });
  }

  /* loadData() {
    this.movieService
      .getPopularList(this.segmentValue, this.page)
      .subscribe((content) => {
        this.content = content;
        console.log(this.content);
      });
  } */

  ngOnInit(): void {
    this.loadData();
    console.log(this.segmentValue);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
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
      event.target.complete();
    }, 1000);
  }

  segmentChanged(e) {
    this.content.splice(0, this.content.length);
    this.segmentChange = true;
    console.log(e.detail.value);
    this.segmentValue = e.detail.value;
    this.loadData();
  }
}
