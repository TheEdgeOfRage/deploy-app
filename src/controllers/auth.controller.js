/*
 * auth.controller.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Axios from 'axios';

import AuthApi from '@/api/auth.api';
import router from '@/router';
import store from '@/store';

export default class AuthController {
	static setLocalStorageToken(url, access_token, refresh_token) {
		if (url) {
			localStorage.setItem('url', url);
		}
		if (access_token) {
			localStorage.setItem('access_token', access_token);
		}
		if (refresh_token) {
			localStorage.setItem('refresh_token', refresh_token);
		}
	}

	static clearLocalStorageToken() {
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('access_token');
		localStorage.removeItem('url');
	}

	static getLocalStorageToken() {
		return {
			url: localStorage.getItem('url'),
			access_token: localStorage.getItem('access_token'),
			refresh_token: localStorage.getItem('refresh_token'),
		};
	}

	static authorize() {
		const data = AuthController.getLocalStorageToken();
		if (data.access_token) {
			Axios.defaults.baseURL = `${data.url}/api`;
			AuthApi.setAuthHeader(data.access_token);
			store.commit('login');
		}
	}

	static login(data) {
		Axios.defaults.baseURL = `${data.url}/api`;
		return AuthApi.login(data).then((response) => {
			AuthController.setLocalStorageToken(data.url, response.data.access_token, response.data.refresh_token);
			AuthController.authorize();
			router.push({ name: 'index' });
		});
	}

	static logout() {
		AuthController.clearLocalStorageToken();
		AuthApi.setAuthHeader(null);
		store.commit('logout');
	}

	static signup(data) {
		Axios.defaults.baseURL = `${data.url}/api`;
		return AuthApi.signup(data);
	}

	static changePassword(data) {
		return AuthApi.changePassword(data);
	}

	static refreshToken() {
		const refresh_token = AuthController.getLocalStorageToken().refresh_token;
		const url = AuthController.getLocalStorageToken().url;
		if (!refresh_token) {
			return Promise.reject(new Error('No token'));
		}

		return AuthApi.refreshToken(refresh_token).then((response) => {
			AuthController.setLocalStorageToken(url, response.data.access_token, null);
			AuthController.authorize();
			return response;
		});
	}

	static parseToken(token) {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	}

	static checkToken() {
		const token = AuthController.getLocalStorageToken().access_token;
		if (token === null) {
			router.push('logout');
			return null;
		}

		const exp = AuthController.parseToken(token).exp;
		const time = Math.ceil(Date.now() / 1000);
		return exp - time >= 5;
	}

	static getAuthStatus() {
		const token = AuthController.getLocalStorageToken().access_token;
		return Boolean(token);
	}
}

