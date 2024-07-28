// Importing Axios, a popular library for making HTTP requests
import axios from 'axios';

// Exporting a configuration object for the Davra API. Initially, the baseURL is an empty string.
export const AyobaAPI = {
	baseURL: 'https://api.ayoba.me'

} as any;

// Exporting a function to create a new Axios instance.
// This function optionally accepts a `defaultUrl` parameter.
export default(defaultUrl = '') => { // Creating a new Axios instance.
	const axiosInstance = axios.create({

		... AyobaAPI,
		baseURL: defaultUrl || AyobaAPI.baseURL
	});

	// Returning the newly created Axios instance.
	return axiosInstance;
};
