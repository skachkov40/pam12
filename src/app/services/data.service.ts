import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private subject = new Subject<any>();

  sendData(p1: string, p2: string, p3: string, ev1:string, ev2:string): void {
    this.subject.next({ "name1": p1, "name2": p2, "name3": p3, "name4": ev1, "name5": ev2 });
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  clearData(): void {
    this.subject.next();
}


}
