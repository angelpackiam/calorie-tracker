import { Component } from '@angular/core';
import data from './data';

interface Meal {
  name: string
  cal: any
}

export class CalorieTrackerService {
  get_meals(user_id){
    if (user_id === 499105){
      return data;
    }
    return [];
  }

  submit(meals, mealType){
    console.log('success');
    return true;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CalorieTrackerService]
})
export class AppComponent {
  meals: Meal;

  public breakfast_cal_limit: number = 498;
  public morning_snack_cal_limit: number = 187;
  public lunch_cal_limit: number = 498;
  public evening_snack_cal_limit: number = 187;
  public dinner_cal_limit: number = 498;

  api: CalorieTrackerService;

  //your code here
  userId: number = 499105;
  totalCalorie: number;
  calorieConsumed: number = 0;
  mealsList: Meal[] = [];
  mealSections: MealSection[] = [];
  sectionList: string[] = ['Breakfast', 'Morning Snack', 'Lunch', 'Evening Snack', 'Dinner'];
  constructor(private readonly service: CalorieTrackerService) {
    this.api = new CalorieTrackerService();
  }
  ngOnInit() {
    this.totalCalorie = this.calculateTotalCalorie();
    this.mealsList = this.api.get_meals(this.userId);
    this.getDisplayData();
  }
  calculateTotalCalorie(): number {
    return this.breakfast_cal_limit + this.morning_snack_cal_limit + this.lunch_cal_limit
    + this.evening_snack_cal_limit + this.dinner_cal_limit;
  }
  getDisplayData() {
    this.mealSections = this.sectionList.map((sectionName: string) => {
      const limit = `${sectionName.toLowerCase().replace(' ', '_')}_cal_limit`;
      return {
        mealSectionName: sectionName,
        mealCalorieLimit: +this[limit],
        calorieConsumed: 0,
        mealList: this.mealsList.map((mealDetail: Meal) => {
          const listId = `${sectionName.toLowerCase().replace(' ', '_')}_${mealDetail.name.toLowerCase().replace(' ', '')}_${mealDetail.cal}`;
          return {
            name: mealDetail.name,
            cal: +mealDetail.cal,
            id: listId
          };
        })
      }
    });
  }
  selectedMeal(sectionIndex: number, selectedMeal: MealData, mealIndex: number) {
    this.calorieConsumed += selectedMeal.cal;
    this.mealSections[sectionIndex].calorieConsumed += selectedMeal.cal;
    this.mealSections[sectionIndex].mealList.splice(mealIndex, 1);
    const data = this.mealSections[sectionIndex].mealList;
    for(let i = 0; i < data.length; i++) {
      let calorieConsumed = this.mealSections[sectionIndex].calorieConsumed;
      if ((calorieConsumed += data[i].cal) > this.mealSections[sectionIndex].mealCalorieLimit) {
        this.mealSections[sectionIndex].mealList.splice(i, 1);
        i--;
      }
    }
  }
}
interface MealData {
  name: string;
  cal: number;
  id: string;
}
interface MealSection {
  mealSectionName: string;
  mealCalorieLimit: number;
  calorieConsumed: number;
  mealList: MealData[];
}
