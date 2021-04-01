import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends {id: number}> {

  entityName: string = '';
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  error$: Subject<string> = new Subject();

  baseUrl: string = 'http://localhost:3000';

  constructor(
    public http: HttpClient,
    @Inject('entityName') entityName: string,
  ) {
    this.entityName = entityName;
  }

  getAll(): void {
    this.http.get<T[]>(`${this.baseUrl}/${this.entityName}`)
      .subscribe(
        list => this.list$.next(list),
        err => console.error(err)
      )
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.entityName}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.entityName}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${this.entityName}/${entity.id}`, entity);
  }

  remove(entity: T): void {
    this.http.delete(`${this.baseUrl}/${this.entityName}/${entity.id}`).pipe(
      tap( e => this.getAll() )
    ).subscribe(
      () => {},
      err => this.error$.next(err)
    );
  }

}
