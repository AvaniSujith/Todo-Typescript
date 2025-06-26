import { ref } from "vue";

import axios from "axios";

import { defineStore } from "pinia";

interface Task{
    id: number;
    title: string;
    completed: {
        type: boolean,
        default: false
    };
}

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref<Task[]>([]);
    const isLoading = ref<boolean>(false);

    const getTasks = async () => {
        isLoading.value = true;
        try{
            const response = await axios.get("http://localhost:3000/todos");
            tasks.value = response.data;
        }catch(error){
            console.error("Error in fetching data", error);
        }
    };

    return{
        getTasks
    }
})