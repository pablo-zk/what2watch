import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {
  AlertController,
  IonicModule,
  IonicRouteStrategy,
} from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ListsModule } from './lists/lists.module';
import { ActionsService } from './services/actions.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { iosTransitionAnimation } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      navAnimation: iosTransitionAnimation,
    }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    ListsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FormBuilder,
    ActionsService,
    AuthGuardService,
    AlertController,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
