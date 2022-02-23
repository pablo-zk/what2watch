import { Component, ContentChild, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { ListService } from 'src/app/core/list.service';
import { List } from 'src/app/shared/list';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() list: List = {
    id: 0,
    title: '',
    icon: '',
    films: '',
  };

  listId: any;

  constructor(
    private listService: ListService,
    private router: Router,
    private truncate: TruncateModule
  ) {}

  ngOnInit() {}
}
