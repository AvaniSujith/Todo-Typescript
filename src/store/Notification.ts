import { ref } from "vue";

import { defineStore } from "pinia";

type ToastType = "update" | "add" | "delete"
interface Toast{
    id: number;
    label: string;
    type: ToastType;
}

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref<Toast[]>([]);

    function addToast(label:string, type: ToastType){
        const id = Math.floor(Math.random()* 1000);
        notifications.value.push({id, label, type});
        setTimeout(() => {
            removeToast(id)
        }, 3000)
    }

    function removeToast(id: number){
        notifications.value = notifications.value.filter(toast => toast.id !== id);
    }

    return{
        notifications,
        addToast,
        removeToast
    }
});