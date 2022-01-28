import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/core/list.service';
import { List } from 'src/app/shared/list';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.page.html',
  styleUrls: ['./list-add.page.scss'],
})
export class ListAddPage implements OnInit {
  errorMessage: string = '';
  listFrm: any;
  titulo: string = '';
  listId: number = 0;
  list: List = {
    id: 0,
    title: '',
    icon: '',
    films: [],
  };
  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.listFrm = this.fb.group({
      id: 0,
      title: '',
      icon: '',
      films: [],
    });

    this.listId = parseInt(this.activatedroute.snapshot.params['id']);
    console.log(this.listId);
  }

  saveList(): void {
    this.list = this.listFrm.value;
    this.list.id = this.listId;
    this.list.title = this.titulo;
    this.listService.createList(this.list).subscribe(
      () => this.onSaveComplete(),
      (error: any) => (this.errorMessage = <any>error)
    );

    // if (this.listFrm.valid) {
    //   if (this.listFrm.dirty) {
    //     this.list = this.listFrm.value;
    //     this.list.id = this.listId;
    //     this.listService.createList(this.list).subscribe(
    //       () => this.onSaveComplete(),
    //       (error: any) => (this.errorMessage = <any>error)
    //     );
    //   } else {
    //     this.onSaveComplete();
    //   }
    // } else {
    //   this.errorMessage = 'Please correct the validation errors.';
    // }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.listFrm.reset();
    this.router.navigate(['/tabs/tab-user']);
  }
}
