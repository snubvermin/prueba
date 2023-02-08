import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const ENDPOINT_PREFIX_SERV = environment.apiRoot;
@Injectable({
    providedIn: 'root'
})
export class Service {

    constructor(private http: HttpClient){

    }

    getAllCards(): Observable<void> {
        return this.get(ENDPOINT_PREFIX_SERV + "card/v1.0")
            .pipe(retry(1), catchError(this.handleError));
    }
    
    getAllTransactions(): Observable<void> {
        return this.get(ENDPOINT_PREFIX_SERV + "/transaction/v1.0/allTransaction")
            .pipe(retry(1), catchError(this.handleError));
    }

    getTransactions(numberCard: string, id: string): Observable<void> {
        return this.get(ENDPOINT_PREFIX_SERV + "/transaction/v1.0/oneTransaction/"+numberCard+"/"+id)
            .pipe(retry(1), catchError(this.handleError));
    }

    get<T = any>(endpoint: string, options?: Object): Observable<T> {
        return this.http.get<T>(`${endpoint}`, options);
    }

    handleError(error: any) {
        return throwError('there was an error while calling api ' + JSON.stringify(error));
      }

}