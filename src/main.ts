import {createApp} from 'vue'
import App from './App.vue'
import 'vuetify/styles';
import {createVuetify, ThemeDefinition} from 'vuetify';
import * as components from 'vuetify/components';
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives';
import {createRouter, createWebHistory} from 'vue-router';
import HomeVue from './components/Home.vue';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Login from './components/Login.vue';
import '@mdi/font/css/materialdesignicons.css';
import ChatWindow from './components/ChatWindow.vue';


const routes = [
	{
		name: 'home',
		path: '/',
		component: HomeVue
	}, {
		name: 'login',
		path: '/login',
		component: Login
	}, {
		name: 'chat',
		path: '/chat',
		component: ChatWindow
	}

]


const router = createRouter({history: createWebHistory(), routes});

const lightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: '#054c9e'
	}
};
const darkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		primary: '#054c9e'
	}

}

// Importing Pinia, a state management library.
import {createPinia} from 'pinia';


// Creating a Vuetify instance with the defined theme, components, and directives.
const vuetify = createVuetify({
	theme: {
		defaultTheme: 'lightTheme',
		themes: {
			lightTheme,
			darkTheme
		}
	},
	components: {
		...components,
		...labsComponents
	},
	directives
});


createApp(App).use(createPinia()).use(vuetify).use(router).use(ToastPlugin).mount('#app')
