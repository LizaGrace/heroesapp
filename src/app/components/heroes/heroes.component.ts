import { Component, OnInit } from '@angular/core';
import { HeroesService } from "src/app/services/heroes.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any[]=[];
  loading:boolean = true;

  constructor(private _heroesService: HeroesService) {
      this._heroesService.getHeroes()
      .subscribe(datos=>
        {
          setTimeout(() => {
            this.loading=false;
          this.heroes = datos;
          
          }, 1500);
        });

   }

  ngOnInit() {
  }

  clickMethod(key$:string) {
    if(confirm("Are you sure to delete " + key$)) {
      this.borraHeroe(key$);
    }
  }

  borraHeroe(key$:string)
  {
      this._heroesService.borrarHeroe(key$)
      .subscribe(respuesta=>{
        if(respuesta){
          console.error(respuesta);
        }
        else{
          delete this.heroes[key$];        }
      })
  }

}
