export interface IUserCredentials {
    username: string;
    password: string;
}

export interface IMessageRequest {
	msisdns: string[],
	message: {
		type: string,
		text: string
	}
}
