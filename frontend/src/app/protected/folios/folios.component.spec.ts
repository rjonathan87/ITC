import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoliosComponent } from './folios.component';

describe('FoliosComponent', () => {
  let component: FoliosComponent;
  let fixture: ComponentFixture<FoliosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoliosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
