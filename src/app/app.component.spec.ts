import { TestBed, fakeAsync, ComponentFixture, tick} from '@angular/core/testing';
import { AppComponent, CalorieTrackerService } from './app.component';

describe('AppComponent', () => {

  let calorieTrackerServiceStub: any;
  let calorieTrackerService: CalorieTrackerService;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    calorieTrackerServiceStub = {

    }

    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [ { provide: CalorieTrackerService, useValue: calorieTrackerServiceStub } ],
    });

    calorieTrackerService = TestBed.inject(CalorieTrackerService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

  });

  it('should display My Daily Calorie Tracker', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain("My Daily Calorie Tracker");
  });

  it('should calculate today calorie consumed', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1#final_calorie_consumed_message').textContent).toBe('I, Consumed 0/1868 Cal Today');

    const breakfast_cowmilk_167 = fixture.nativeElement.querySelector('li#breakfast_cowmilk_167');
    breakfast_cowmilk_167.click()
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1#final_calorie_consumed_message').textContent).toBe('I, Consumed 167/1868 Cal Today');

    const morning_snack_weatchapati_146 = fixture.nativeElement.querySelector('li#morning_snack_weatchapati_146');
    morning_snack_weatchapati_146.click()
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1#final_calorie_consumed_message').textContent).toBe('I, Consumed 313/1868 Cal Today');

    const lunch_filtercoffee_53 = fixture.nativeElement.querySelector('li#lunch_filtercoffee_53');
    lunch_filtercoffee_53.click()
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1#final_calorie_consumed_message').textContent).toBe('I, Consumed 366/1868 Cal Today');

    const evening_snacks_idli_48 = fixture.nativeElement.querySelector('li#evening_snacks_idli_48');
    evening_snacks_idli_48.click()
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1#final_calorie_consumed_message').textContent).toBe('I, Consumed 414/1868 Cal Today');

    const dinner_alookaparantha_182 = fixture.nativeElement.querySelector('li#dinner_alookaparantha_182');
    dinner_alookaparantha_182.click()
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1#final_calorie_consumed_message').textContent).toBe('I, Consumed 596/1868 Cal Today');

  });

});
