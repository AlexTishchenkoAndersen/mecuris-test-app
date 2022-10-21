import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GltfModelComponent } from './gltf-model.component';

describe('ThreeModelComponent', () => {
  let component: GltfModelComponent;
  let fixture: ComponentFixture<GltfModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GltfModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GltfModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
