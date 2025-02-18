import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:5000/send-email'; // Укажи реальный backend URL

  constructor(private http: HttpClient) {}

  sendEmail(data: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
