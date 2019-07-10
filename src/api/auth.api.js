/*
 * auth.api.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Axios from 'axios';

const ENDPOINTS = {
	LOGIN: '/login',
	SIGNUP: '/signup',
	REFRESH: '/refresh',
};

export default class AuthApi {
	static setAuthHeader(token) {
		if (!token) {
			Reflect.deleteProperty(Axios.defaults.headers.common, 'Authorization');
			return;
		}

		Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	}

	static login(data) {
		return Axios.post(ENDPOINTS.LOGIN, data);
	}

	static signup(data) {
		return Axios.post(ENDPOINTS.SIGNUP, data);
	}

	static changePassword(data) {
		return Axios.patch(ENDPOINTS.USER, data);
	}

	static refreshToken(refresh_token) {
		return Axios.post(ENDPOINTS.REFRESH, {}, { headers: { 'Authorization': `Bearer ${refresh_token}` } });
	}
}

