import { ref } from "vue";

import { defineStore } from "pinia";

interface Task{
    id: number;
    title: string;
    completed: boolean;
}

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref<Task[]>([]);
    const isLoading = ref<boolean>(false);

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

    return{
        getTasks,
        addTask,
    }
});