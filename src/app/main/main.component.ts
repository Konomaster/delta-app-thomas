import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isShowing: Boolean = false
  h2:string = "Bem vindo(a)!"

  constructor(private router: Router,private location: Location) { }

  ngOnInit(): void {
        //aqui tambem eh onde muda propriedade que fala qual tela ta
        this.router.events.subscribe(() => {    
          if (this.location.path()===''){
          this.isShowing=true
          this.h2='Você está na página principal'
        }else{
          this.isShowing=false
        }
        if (this.location.path()==='/criar'){
          this.h2='Pagina de inserção de aluno'
        }
        else if(this.location.path()==='/alunos'){
          this.h2='Página de listagem de alunos'
        }
        else if (this.location.path().includes('/detail')){
          this.h2='Você está na página de detalhes de aluno'
        }
      })
  }

}
