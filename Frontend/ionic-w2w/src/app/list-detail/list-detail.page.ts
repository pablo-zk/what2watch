import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/shared/list';
import { Content } from 'src/app/shared/content';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/core/list.service';
import { AuthService } from '../services/auth.service';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {
  query: any = [];
  list: List = {
    id: 0,
    title: '',
    icon: '',
    films: '',
  };
  cont: Content = {
    id: 0,
    idContent: 0,
    title: '',
    cover: '',
  };
  listId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private listService: ListService,
    private contentService: ContentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getState().subscribe((data) => {
      if (data != 1) {
        alert('Cuenta no validada');
        this.authService.logout();
        this.route.navigate(['login']);
      }
    });

    this.listId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.listService.getListById(this.listId).subscribe((data) => {
      this.list = data[0];
    });
    this.contentService.getContentByList(this.listId).subscribe((data: any) => {
      data[0].forEach((movie) => {
        this.query.push(movie);
      });
    });
  }
  goEdit(): void {
    this.route.navigate(['/tabs/tab-user/list', this.listId, 'edit']);
  }
  goDelete(): void {
    this.listService
      .deleteList(this.listId)
      .subscribe((data) => this.route.navigate(['/tabs/tab-user']));
  }
  onBack(): void {
    this.route.navigate(['']);
  }
}
