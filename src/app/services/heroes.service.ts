import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Heroe } from "src/app/interfaces/heroe.interface";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  heroesURL: string= "https://heroesapp-bc56e.firebaseio.com/heroes.json";
  heroeURL: string = "https://heroesapp-bc56e.firebaseio.com/heroes/"
  constructor(private http:Http) { }

  nuevoHeroe(heroe:Heroe){
    let body = JSON.stringify(heroe);
    let headers = new Headers ({'Content-Type':'application/json'});

    return this.http.post(this.heroesURL, body, {headers})
    .pipe(map((res:any) => {
      console.log(res.json());
    return res.json();
  }));
  }


  actualizarHeroe(heroe: Heroe, key$: string){
    let body = JSON.stringify(heroe);
    let headers = new Headers ({'Content-Type':'application/json'});
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.put(url,body,{headers})
    .pipe(map((res :any)=> {
      console.log(res.json());
      return res.json();
  }));
}

  getHeroe(key$: string){
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.get(url)
    .pipe(map((res:any) => res.json()));
    }
  
  getHeroes(){
    return this.http.get(this.heroesURL)
    .pipe(map((res:any)=>res.json()));
  }

  borrarHeroe(key$:string){
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.delete(url)
    .pipe(map((res:any)=>res.json()));
  }
}
