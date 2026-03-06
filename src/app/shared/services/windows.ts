import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowsService {
  readonly actualWindow = signal<'list' | 'detail'>('list');
  readonly productId = signal<number>(100001);

  setActualWindow(actual: 'list' | 'detail') {
    this.actualWindow.set(actual);
  }
}
