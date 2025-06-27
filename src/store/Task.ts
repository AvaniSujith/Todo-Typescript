import { ref } from "vue";

import { defineStore } from "pinia";

import type { Task } from "../types";

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref<Task[]>([]);
    const isLoading = ref<boolean>(false);
    const tempId = ref<number>();
    const tempTitle = ref<string>('');

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
            tempId.value = id
            tempTitle.value = title
        }
        
    }

    const saveTask = (id: number) => {
        const task = tasks.value.find(task => task.id === id);
        if(task && tempTitle){
            task.title = tempTitle.value;
            tempId.value = undefined;
            tempTitle.value = '';
        }
        getTasks();
    }

    const EditTask = (task: Task) => {
        return tempId.value !== task.id ? EditTitle(task.id, task.title) : saveTask(task.id)
    }

    return{
        tasks,
        tempId,
        tempTitle,
        getTasks,
        addTask,
        EditTitle,
        saveTask,
        EditTask
    }
});