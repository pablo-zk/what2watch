import { Component, OnInit } from '@angular/core';
import { ListService } from './../core/list.service';
import { List } from './../shared/list';

@Component({
  selector: 'app-tab-user',
  templateUrl: './tab-user.page.html',
  styleUrls: ['./tab-user.page.scss'],
})
export class TabUserPage implements OnInit {
  lists: List[] = [];
  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.listService.getLists().subscribe((data: List[]) => {
      this.lists = data;
    });
    console.log('hola' + this.lists);
  }
  ionViewDidEnter() {
    this.listService.getLists().subscribe((data: List[]) => {
      this.lists = data;
    });
  }
}
