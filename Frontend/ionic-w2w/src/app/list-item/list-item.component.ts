import { Component, ContentChild, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ListService } from 'src/app/core/list.service';
import { Content } from 'src/app/shared/content';
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
    films: [],
  };

  listId: any;

  constructor(private listService: ListService, private router: Router) {}

  ngOnInit() {}

  // TODO El metodo .getMaxListId() no devuelve el Id, devulve undefined, no abre list-new.
  newList() {
    this.listService
      .getMaxListId()
      .subscribe((data) => (this.listId = data + 1));
    console.log('el id es: ' + this.listId);
    this.router.navigate(['/tabs/tab-user/list', this.listId, 'new']); // Falla en el this.listId ya que es undefined
  }
}
