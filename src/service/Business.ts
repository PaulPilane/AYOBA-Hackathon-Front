import { IMessageRequest } from "../types";
import AyobaAPI from "./AyobaAPI";


const sendTextMessage = async (postMessage : IMessageRequest) => {

    try {
const {data} = await AyobaAPI().post('/v1/business/message', postMessage, {
        headers: {
            Accept: 'application/json'
        }
    });
    return data;
    } catch (error) {
        throw new Error('Failed to Send a message')
    }
}

const getTextMessages = async() => {
try {
	const {data} = await AyobaAPI().get('/v1/business/message', {
		headers: {
			Accept: 'application/json'
		}
	});
	return data;
} catch (error) {
	throw new Error('Failed to Retrieve Message')
}}

const getAllBusinesses = async() => {
    try {
        const {data} = await AyobaAPI('https://localhost:7203').get('/Business/GetAllBusinesses', {
            headers: {
                Accept: 'application/json'
            }
        });
        return data;
    } catch (error) {
        throw new Error('Failed to Retrieve Businesses')
    }
}

const createBusiness = async(business: any) => {
    try {
        const {data} = await AyobaAPI('https://localhost:7203').post('/Business/CreateBusiness', business, {
            headers: {
                Accept: 'application/json'
            }
        });
        return data;
    } catch (error) {
        throw new Error('Failed to register  a Businesses')
    }   
}
const createMessage = async(message: any) => {
    try {
        const {data} = await AyobaAPI('https://localhost:7203').post('/Message/CreateMessage', message,  {
            headers: {
                Accept: 'application/json'
            }
        });
        return data;
    } catch (error) {
        throw new Error('Failed to register  a Businesses')
    }   
}
const addSubscription = async() => {
    try {
        const {data} = await AyobaAPI('https://localhost:7203').get('/Subscription/AddSubscription', {
            headers: {
                Accept: 'application/json'
            }
        });
        return data;
    } catch (error) {
        throw new Error('Failed to subsribe');
    }
}
const listSubscriptions = async() => {
    try {
        const {data} = await AyobaAPI('https://localhost:7203').get('/Subscription/AddSubscription', {
            headers: {
                '*': "*"
            }
        });
        return data;
    } catch (error) {
        throw new Error('Failed to retrieve subscriptions')
    }
}

const getAllMessages = async() => {
    try {
        const {data} = await AyobaAPI('https://localhost:7203').get('/Message/GetAllMessages', {
            headers: {
                Accept: 'application/json'
            }
        });
        return data;
    } catch (error) {
        throw new Error('Failed to retrieve messages')
    }
}
export default {
    sendTextMessage,
    getTextMessages,
    getAllBusinesses,
    createBusiness,
    addSubscription,
    listSubscriptions,
    createMessage,
    getAllMessages
}