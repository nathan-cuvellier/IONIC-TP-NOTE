import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditerPage } from './editer.page';

describe('EditerPage', () => {
  let component: EditerPage;
  let fixture: ComponentFixture<EditerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
