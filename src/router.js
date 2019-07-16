import Vue from 'vue';
import Router from 'vue-router';

import AuthController from '@/controllers/auth.controller.js';
import StackView from '@/views/stack.view.vue';
import LoginView from '@/views/login.view.vue';
import SignupView from '@/views/signup.view.vue';
import store from '@/store';

Vue.use(Router);

// component () { return import([> webpackChunkName: "about" <] './views/About.vue'); },

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'index',
			component: StackView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
			meta: {
				guest: true,
			},
		},
		{
			path: '/signup',
			name: 'signup',
			component: SignupView,
		},
		{
			path: '/logout',
			name: 'logout',
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.name === 'logout' || (!to.meta.guest && !store.getters.authStatus)) {
		AuthController.logout();
		return next({ name: 'login' });
	}

	return next();
});

export default router;

