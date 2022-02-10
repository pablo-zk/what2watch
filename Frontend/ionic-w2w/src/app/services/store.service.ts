import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private storage: Storage) {}

  set(key: string, value: any) {
    this.storage.set(key, value);
  }
  remove(key: string) {
    this.storage.remove(key);
  }
  get(key: string) {
    return this.storage.get(key);
  }
}
