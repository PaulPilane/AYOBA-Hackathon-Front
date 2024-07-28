import { acceptHMRUpdate, defineStore } from "pinia";
import Business from "../service/Business";
import { IMessageRequest } from "../types";
import Info from "../service/Info";
import { ref } from "vue";

const implementation = () => {

    const messages = ref<any[]>([])

    const sendTextMessage = async (postMessage: IMessageRequest) => {
        try {
                const result = await Business.sendTextMessage(postMessage);
                return result;
        } catch (error) {
            Info.showToastObject({message: `${error}`, type: 'error'});
        }
    }

    const getTextMessages = async () => {
        try {
                const result = await Business.getTextMessages();
                messages.value = result
                return result;
            } catch (error) {
                Info.showToastObject({message: `${error}`, type: 'error'});
            }   
    }

     return  {
        messages,
        sendTextMessage,
        getTextMessages
    }

}
export const useBusinessStore = defineStore('business', implementation)

if (import.meta.hot) 
	import.meta.hot.accept(acceptHMRUpdate(useBusinessStore, import.meta.hot));

