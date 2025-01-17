import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DarkLightToggleComponent } from "@portfolio/shared/components/elements/dark-light-toggle/dark-light-toggle.component";

describe('DarkLightToggleComponent', () => {
  let component: DarkLightToggleComponent;
  let fixture: ComponentFixture<DarkLightToggleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DarkLightToggleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarkLightToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
