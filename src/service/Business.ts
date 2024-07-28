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

export default {
    sendTextMessage,
    getTextMessages
}