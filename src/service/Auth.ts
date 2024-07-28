import { IUserCredentials } from "../types";
import AyobaAPI from "./AyobaAPI";

const login = async (userCredentials: IUserCredentials) : Promise < any > => {
	try { // Making a GET request to the '/user' endpoint.
const {data} = await AyobaAPI().post<any>(`/v2/login`, userCredentials, {
			headers: {
				Accept: 'application/json'
			}
		});

		// Returning the response data.
		return data;
	} catch (error) { // Throwing an error if the request fails.
		throw new Error('Login API Error');
	}
};

export default {
login
}