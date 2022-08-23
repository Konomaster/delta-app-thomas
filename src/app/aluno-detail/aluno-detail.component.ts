import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from '../Aluno';
import { AlunoService } from '../services/aluno.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-aluno-detail',
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.css']
})
export class AlunoDetailComponent implements OnInit {
  aluno?: Aluno
  file?: File

  constructor(private alunoService: AlunoService,private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const id=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.alunoService.getAluno(id).subscribe((aluno)=>{this.aluno=aluno})
    
  }

  atualizarAluno(): void{
    if(this.aluno){
      this.alunoService.atualizarAluno(this.aluno).subscribe()
    }
  }

  voltar(): void{
    this.location.back()
  }

  onFileSelected(imageInput: any){
    let file:File = imageInput.files[0]
    this.getBase64(file).then((data)=>{
      if (data && this.aluno){
        this.aluno.imagem=data as string
      }
    })
  }

  getBase64(file: File){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
