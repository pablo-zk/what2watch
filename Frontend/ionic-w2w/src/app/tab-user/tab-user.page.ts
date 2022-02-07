import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../core/list.service';
import { List } from './../shared/list';

@Component({
  selector: 'app-tab-user',
  templateUrl: './tab-user.page.html',
  styleUrls: ['./tab-user.page.scss'],
})
export class TabUserPage implements OnInit {
  lists: List[] = [];
  listById: List;
  constructor(private listService: ListService, private router: Router) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.listService.getLists().subscribe((data: List[]) => {
      this.lists = data;
    });
  }
  newList() {
    /*this.listService
      .getMaxListId()
      .subscribe((data) => (this.listId = data + 1));
    console.log('el id es: ' + this.listId);*/
    this.router.navigate(['/tabs/tab-user/lists/new']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  // ionViewDidEnter() {
  //   this.listService.getListById(1).subscribe((data: List) => {
  //     this.listById = data;
  //   });
  // }
}
