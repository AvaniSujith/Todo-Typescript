import { ref } from "vue";

import { defineStore } from "pinia";

import type { Task } from "../type";

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref<Task[]>([]);
    const isLoading = ref<boolean>(false);
    const editingTaskId = ref<number>();
    const editingTaskTitle= ref<string>('');

    const getTasks = async () => {
        isLoading.value = true;
        try{
            const response = await fetch("http://localhost:3000/todos");
            const data = await response.json();
            tasks.value = data;
            console.log('data', data);
        }catch(error){
            console.error("Error in fetching data", error); 
        }
    };

    const updateTask = (id:number) => {
        const task = tasks.value.find((task) => task.id === id);
        if(task){
            task.completed = !task.completed;
        }
    }

    const deleteTask = (id:number) => {
        tasks.value = tasks.value.filter((task) => task.id !== id);
    }

    const addTask = (title: string) => {
        const newTask = {
            id : Math.floor(Math.random() * 1000),
            title,
            completed: false
        }
        tasks.value.unshift(newTask);
    }

    const EditTitle = (id: number, title:string) => {
        const task = tasks.value.find((task) => task.id === id);
        if(task){
            editingTaskId.value = id
            editingTaskTitle.value = title
        }
    }

    const saveTask = (id: number) => {
        const task = tasks.value.find(task => task.id === id);
        if(task && editingTaskTitle){
            task.title = editingTaskTitle.value;
            editingTaskId.value = undefined;
            editingTaskTitle.value = '';
        }
    }

    const EditTask = (task: Task) => {
        return editingTaskId.value !== task.id ? EditTitle(task.id, task.title) : saveTask(task.id)
    }

    return{
        tasks,
        editingTaskId,
        editingTaskTitle,
        getTasks,
        updateTask,
        deleteTask,
        addTask,
        EditTitle,
        saveTask,
        EditTask
    }
});