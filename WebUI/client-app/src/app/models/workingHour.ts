export interface IWorkingHour {
  id: number;
  day: number;
  openTime: string;
  closeTime: string;
  sportObjectId: number;
}

export interface IWorkingHoursFormValues {
  sportObjectId: number;
  workingHours: IWorkingHour[];
}
