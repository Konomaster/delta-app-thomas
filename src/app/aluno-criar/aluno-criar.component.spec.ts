import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoCriarComponent } from './aluno-criar.component';

describe('AlunoCriarComponent', () => {
  let component: AlunoCriarComponent;
  let fixture: ComponentFixture<AlunoCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
