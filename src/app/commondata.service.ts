import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommondataService {
  x: any;
  constructor() {
    this.x = [1, 2, 3]
  }
  getd(x) {
    x = x + 5;
    return x;
  }
}
