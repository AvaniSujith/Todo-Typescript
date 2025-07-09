export interface Task {
  id: string;
  title: string;
  completed: boolean;
}
export interface UpdateTask {
  id: string;
  title?: string;
  completed?: boolean;
}

export interface NewTask {
  title: string;
  completed: boolean;
}
