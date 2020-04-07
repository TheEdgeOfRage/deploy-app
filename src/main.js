import Vue from 'vue';
import Axios from 'axios';

import './plugins/vuetify';
import App from './components/app.vue';
import AuthController from './controllers/auth.controller';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const configureHttp = () => {
	Axios.defaults.headers.Accept = 'application/json';
	Axios.interceptors.request.use((config) => {
		return new Promise((resolve, reject) => {
			switch (config.url) {
				case '/refresh':
				case '/login':
				case '/signup':
					resolve(config);
					return;
				default:
					break;
			}

			if (!AuthController.checkToken()) {
				AuthController.refreshToken().then((response) => {
					config.headers.Authorization = `Bearer ${response.data.access_token}`;
					resolve(config);
				}).catch(() => {
					router.push({ name: 'logout' });
					reject(config);
				});
				return;
			}

			resolve(config);
		});
	});

	Axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response && error.response.status === 401) {
				router.push({ name: 'logout' });
				return Promise.reject(error);
			}

			return Promise.reject(error);
		}
	);
};

AuthController.authorize();
configureHttp();

new Vue({
	router,
	store,
	render (h) {
		return h(App);
	},
}).$mount('#app');
