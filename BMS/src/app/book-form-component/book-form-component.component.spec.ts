import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormComponent} from './book-form-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFormComponent ],
      imports: [ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
