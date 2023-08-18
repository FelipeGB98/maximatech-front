import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //url da api
  private url:string = 'http://localhost:8080';
  private baseUrl:string = 'http://localhost:8080';

  constructor(private http:HttpClient) { }


  //metodo para filtrar os clientes
  selecionar(filtroNome: string, filtroCnpj: string): Observable<Cliente[]> {
    let params = new HttpParams();
    if (filtroNome) {
      params = params.set('nome', filtroNome);
    }
    if (filtroCnpj) {
      params = params.set('cnpj', filtroCnpj);
    }
    return this.http.get<Cliente[]>(this.baseUrl, { params });
  }

   //metodo para selecionar os clientes
   selecionarClicando():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  //metodo para cadastrar cliente
  cadastrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, obj);
  }

  //metodo para alterar dados do cliente
  alterar(obj:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url, obj);
  }

  //metodo para remover clientes
  remover(codigo:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + codigo);
  }

}
