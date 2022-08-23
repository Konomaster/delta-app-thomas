import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Aluno } from '../Aluno';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-aluno-criar',
  templateUrl: './aluno-criar.component.html',
  styleUrls: ['./aluno-criar.component.css']
})
export class AlunoCriarComponent implements OnInit {

  alunoForm!: FormGroup
  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    this.alunoForm = new FormGroup({
      nome: new FormControl(''),
      endereco: new FormControl(''),
      imagem: new FormControl('')
    })
  }
  get imagem(){
    return this.alunoForm.get('imagem')!;
  }

  get nome(){
    return this.alunoForm.get('nome')!;
  }

  get endereco(){
    return this.alunoForm.get('endereco')!;
  }

  addAluno(nome: string,endereco:string):void{
    nome=nome.trim()
    endereco=endereco.trim()
    if (nome){
      this.alunoService.addAluno({nome,endereco} as Aluno).subscribe(aluno =>
        {
          if (aluno.id<=0){
            console.log("add falhou")
          }
        })
    }

  }
  onFileSelected(imageInput: any){
    const file: File = imageInput.files[0]
    this.alunoForm.patchValue({imagem:file})
  }

  submit(){
    if (this.alunoForm.invalid){
      return
    }
    let nome=this.alunoForm.value.nome
    
    let endereco= this.alunoForm.value.endereco
    

    if (this.alunoForm.value.imagem){
      this.getBase64(this.alunoForm.value.imagem).then((data)=>{
        if (data){
          let imagem: string=data as string
          this.alunoService.addAluno({nome,endereco,imagem} as Aluno).subscribe(aluno=>{
            if (aluno.id<=0){
              console.log("inserir falhou")
            }
          })
        }
      })
  
    }
    
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
