export interface Task {
  id: number;
  title: string;
  completed: boolean;
}
export interface UpdateTask {
  id: number;
  title?: string;
  completed?: boolean;
}
