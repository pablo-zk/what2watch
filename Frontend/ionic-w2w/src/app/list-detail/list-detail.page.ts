import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/shared/list';
import { Content } from 'src/app/shared/content';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/core/list.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {
  list: List = {
    id: 0,
    title: '',
    icon: '',
    films: [],
  };
  listId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.listId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.listService
      .getListById(this.listId)
      .subscribe((data: List) => (this.list = data));
  }
  goEdit(): void {
    this.route.navigate(['/tabs/tab-user/list', this.listId, 'edit']);
  }
  onBack(): void {
    this.route.navigate(['']);
  }
}
