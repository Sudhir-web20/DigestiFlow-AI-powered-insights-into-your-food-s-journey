
export interface DigestionInfo {
  name: string;
  stomachTime: string;
  totalTime: string;
  category: 'Fruit' | 'Vegetable' | 'Meat' | 'Dairy' | 'Drink' | 'Carb' | 'Snack' | 'Other';
  nutrients: string[];
  description: string;
  funFact: string;
  imageUrl?: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
