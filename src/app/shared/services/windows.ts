import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowsService {
  readonly actualWindow = signal<'list' | 'detail'>('list');

  setActualWindow(actual: 'list' | 'detail') {
    this.actualWindow.set(actual);
  }
}
