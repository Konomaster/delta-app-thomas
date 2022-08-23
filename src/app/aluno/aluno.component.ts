import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators'

import { Aluno } from '../Aluno';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {
  alunos:Aluno[]=[]
  private searchTerms=new Subject<string>();

  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    this.getAlunos()
  }

  getAlunos(){
    this.alunoService.getAlunos().subscribe((alunos)=>this.alunos=alunos)
  }

  deletarAluno(aluno: Aluno){
    this.alunoService.deletarAluno(aluno.id).subscribe(() => {
      this.alunos=this.alunos.filter(a => a !== aluno)
    })
  }

  search(term: string){
    this.alunoService.getAlunos().subscribe((alunos)=>{
      this.alunos=alunos
      this.alunos=this.alunos.filter(a => a.nome.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
    })
  }
}
