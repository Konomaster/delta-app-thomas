import { Injectable } from '@angular/core';
import { Aluno } from '../Aluno';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl="http://localhost:3001/alunos"

  httpOptions={
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<Aluno[]>{
    return this.http.get<Aluno[]>(this.apiUrl).pipe(
      catchError(this.handleError<Aluno[]>('getAlunos',[]))
    );
  }

  getAluno(id: number): Observable<Aluno>{
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Aluno>(`getAluno id=${id}`))
    );
  }

  deletarAluno(id: Number): Observable<Aluno>{
    return this.http.delete<Aluno>(`${this.apiUrl}/${id}`,this.httpOptions).pipe(
      catchError(this.handleError<Aluno>('deletarAluno'))
    );
  }

  atualizarAluno(aluno: Aluno): Observable<any>{
    return this.http.put(`${this.apiUrl}/${aluno.id}`,aluno,this.httpOptions).
    pipe(
      catchError(this.handleError<any>(`atualizarAluno id=${aluno.id}`))
    )
  }

  addAluno(aluno: Aluno): Observable<Aluno>{
    return this.http.post<Aluno>(this.apiUrl,aluno,this.httpOptions).pipe(
      catchError(this.handleError<Aluno>('addAluno'))
    );
  }


  private handleError<T>(operation='operation',result?:T){
    return (error: any): Observable<T> =>{
      console.log(error);

      //this.log
      return of (result as T);
    };
  }
}
