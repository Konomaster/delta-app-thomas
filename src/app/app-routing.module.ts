import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoCriarComponent } from './aluno-criar/aluno-criar.component';
import { AlunoDetailComponent } from './aluno-detail/aluno-detail.component';
import { AlunoComponent } from './aluno/aluno.component';

const routes: Routes = [
  {path:'criar',component:AlunoCriarComponent},
  {path:'alunos',component:AlunoComponent},
  {path:'detalhe/:id',component:AlunoDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
