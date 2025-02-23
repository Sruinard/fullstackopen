interface SharedDairyEntry {
    date: string;
    weather: string;
    comment: string;
    visibility: string;
}

export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  
  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
  }
  
interface DiaryEntry extends SharedDairyEntry {
    id: number;
}

type NewDiaryEntry = Omit<DiaryEntry, "id">;
export type { DiaryEntry, NewDiaryEntry };