/*
 * service.api.js
 * Copyright (C) 2019 Vivify Ideas
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Axios from 'axios';

export default class ServiceApi {
	static getServices() {
		return Axios.get('/services');
	}

	static addService(data) {
		return Axios.post('/services', data);
	}

	static deleteService(name) {
		return Axios.delete(`/services/${name}`);
	}
}
