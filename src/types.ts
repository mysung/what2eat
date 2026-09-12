export type FlavorOption = 'spicy' | 'mild';
export type CarbOption = 'rice' | 'noodle_bread';

export interface MenuItem {
  id: string;
  name: string;
  flavor: FlavorOption;
  carb: CarbOption;
  reason: string;
  category: string;
  emoji: string;
  tip?: string;
  tags: string[];
}

export interface SelectionState {
  flavor: FlavorOption | null;
  carb: CarbOption | null;
}
