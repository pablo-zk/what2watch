import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListData } from './list-data';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ListService } from './list.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    //InMemoryWebApiModule.forRoot(ListData),
  ],
  providers: [ListService],
})
export class CoreModule {}
