import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/core/list.service';
import { List } from 'src/app/shared/list';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.page.html',
  styleUrls: ['./list-add.page.scss'],
})
export class ListAddPage implements OnInit {
  errorMessage: string;
  listFrm: FormGroup;

  listId: number = 0;
  //Porque hay que inicializarlo todo el rato??
  list: List = {
    id: 0,
    title: '',
    icon: '',
    films: '',
  };
  title: string;
  icon: string;

  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private listService: ListService
  ) {}

  ngOnInit() {
    // this.listFrm = this.fb.group({
    //   title: '',
    //   icon: '',
    //   films: '',
    // });
    //this.listId = parseInt(this.activatedroute.snapshot.params['id']);
    //console.log(this.listId);
  }

  saveList(): void {
    this.list.title = this.title;
    this.list.icon = this.icon;
    this.list.films = '';

    this.listService.createList(this.list).subscribe(
      (data) => this.onSaveComplete(),
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  onSaveComplete(): void {
    this.router.navigate(['/tabs/tab-user']);
  }
}
