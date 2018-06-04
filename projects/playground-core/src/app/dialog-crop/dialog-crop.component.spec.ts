import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCropComponent } from './dialog-crop.component';

describe('DialogCropComponent', () => {
  let component: DialogCropComponent;
  let fixture: ComponentFixture<DialogCropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
