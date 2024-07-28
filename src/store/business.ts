import { acceptHMRUpdate, defineStore } from "pinia";
import Business from "../service/Business";
import { IMessageRequest } from "../types";
import Info from "../service/Info";
import { ref } from "vue";

const implementation = () => {

    const messages = ref<any[]>([]);
    const businesses = ref<any[]>([]);

    const sendTextMessage = async (postMessage: IMessageRequest) => {
        try {
                const result = await Business.sendTextMessage(postMessage);
                const object = {
                    id: 1,
                    msisdns: postMessage.msisdns,
                    text: postMessage.message.text,
                    type: postMessage.message.type
                }
                await Business.createMessage(object);
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

    const getAllBusinesses = async () => {
        try {
            const result = await Business.getAllBusinesses();
            businesses.value = result;
            return result;
        } catch (error) {
            Info.showToastObject({message: `${error}`, type: 'error'});
        }
    }

    const createBusiness = async (business: any) => {
        try {
            const result = await Business.createBusiness(business);
            return result;
        } catch (error) {
            Info.showToastObject({message: `${error}`, type: 'error'});
        }

    }

    const addSubscription = async () => {
        try {
            const result = await Business.addSubscription();
            return result;
        } catch (error) {
            Info.showToastObject({message: `${error}`, type: 'error'});
        }

    }

    const listSubscriptions = () => {
        try {
            const result = Business.listSubscriptions();
            return result;
        } catch (error) {
            Info.showToastObject({message: `${error}`, type: 'error'});
        }
    }

    const getAllMessages = async () => {
        try {
            const result = await Business.getAllMessages();
            // messages.value = result;
            return result;
        } catch (error) {
            Info.showToastObject({message: `${error}`, type: 'error'});
    }

    }
     return  {
        messages,
        businesses,
        sendTextMessage,
        getTextMessages,
        getAllBusinesses,
        createBusiness,
        addSubscription,
        listSubscriptions,
        getAllMessages
    }

}
export const useBusinessStore = defineStore('business', implementation)

if (import.meta.hot) 
	import.meta.hot.accept(acceptHMRUpdate(useBusinessStore, import.meta.hot));

