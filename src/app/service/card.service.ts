import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CardModel } from '../model/card-model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { }

  getCards():Observable<CardModel[]>{
    return  this.httpClient.get<CardModel[]>('http://localhost:8080/api/v1/card'+'/list').pipe(map(response => response));
    
  }

  saveCard(request: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/card'+'/save', request).pipe(map(response => response));
  }

  updateCard(request: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/card'+'/update', request).pipe(map(response => response));
  }

  deleteCard(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/v1/card'+'/delete/'+id).pipe(map(response => response));
  }

}
