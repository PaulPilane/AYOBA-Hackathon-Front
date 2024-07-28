import {useToast, ToastPosition} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


const toast = useToast();
interface ToastConfig {
	message: string;
	type?: 'success' | 'info' | 'warning' | 'error' | 'default';
	position?: 'top' | 'bottom' | 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
	duration?: number;
	dismissible?: boolean;
	onClick?: () => void;
	onDismiss?: () => void;
	queue?: boolean;
	pauseOnHover?: boolean;
}


const showToast = (message : string, type : string = 'default', duration : number = 3000, position : ToastPosition = 'top', onClick? : () => void) => {

	try {
		toast.open({
			message: message,
			type: type,
			duration: duration,
			position: position as ToastPosition,
			onClick: onClick
		})
	} catch (error) {
		console.error("Error in Toast:", error);
	}


};

const showToastObject = (config : ToastConfig) => {
	const {
		message,
		type = 'default',
		position = 'top',
		duration = 3000,
		dismissible = true,
		onClick,
		onDismiss,
		queue = false,
		pauseOnHover = false
	} = config;

	try {
		toast.open({
			message,
			type,
			duration,
			position: position as ToastPosition,
			dismissible,
			onClick,
			onDismiss,
			queue,
			pauseOnHover
		});
	} catch (error) {
		console.error("Error in Toast:", error);
	}
};


export default {showToast, showToastObject}
