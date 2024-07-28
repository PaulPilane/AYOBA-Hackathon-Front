import {acceptHMRUpdate, defineStore} from 'pinia'
import {IUserCredentials} from '../types'
import Auth from '../service/Auth'
import Info from '../service/Info'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

const implementation = () => {

	const login = async (userCredentials : IUserCredentials) => {
		try {
			const result = await Auth.login(userCredentials);
			localStorage.setItem('accessToken', result.access_token);
			localStorage.setItem('expire', result.expire);
			Info.showToastObject({message: 'Logged in successfully', type: 'success'})
		} catch (error) {
			Info.showToastObject({message: `${error}`, type: 'error'})
		}
	}

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expire');

    }

	return {
        login, 
        logout
    }
}
export const useAuthStore = defineStore('auth', implementation)

if (import.meta.hot) 
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));

