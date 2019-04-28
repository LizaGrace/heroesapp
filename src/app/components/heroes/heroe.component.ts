import { Component, OnInit } from '@angular/core';
import{NgForm} from '@angular/forms';
import { Heroe } from "src/app/interfaces/heroe.interface";
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {


  private heroe: Heroe={
    nombre:"",
    clase:"Marvel",
    sinopsis:""
  }

  nuevo: boolean = false;
  id: string;

  constructor(private _heroesService: HeroesService, private router: Router, private route: ActivatedRoute) 
  {
    this.route.params
    .subscribe(parametros=>{
      this.id = parametros['id']
      if(this.id != "nuevo")
      {
        this._heroesService.getHeroe(this.id).subscribe(heroe=>this.heroe=heroe)
      }
    });
   }

  ngOnInit() {
  }

  guardar(){
    console.log(this.heroe);
    if(this.id=="nuevo")
    {
      this._heroesService.nuevoHeroe(this.heroe).subscribe(datos=>{
        this.router.navigate(['/heroe', datos.name])
      }, error=>console.error(error));
    }
    else{
      if(confirm("Seguro que quieres modificar?")){this._heroesService.actualizarHeroe(this.heroe, this.id)
        .subscribe(datos=>{console.log(datos);},error=>console.error(error));}
      
      }
    }
    agregarNuevo(forma:NgForm)
    {
      this.router.navigate(['/heroe', 'nuevo']);
      forma.reset({
        clase:"Marvel"}
      );
    }
  }
