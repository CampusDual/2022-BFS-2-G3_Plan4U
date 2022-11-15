import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyPublicationsComponent } from './edit-my-publications.component';

describe('EditMyPublicationsComponent', () => {
  let component: EditMyPublicationsComponent;
  let fixture: ComponentFixture<EditMyPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyPublicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMyPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
