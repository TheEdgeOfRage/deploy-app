/*
 * container.api.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Axios from 'axios';

export default class ContainerApi {
	static execCommands(id, commands) {
		return Axios.post(`/containers/${id}/exec`, commands);
	}

	static getLogs(id) {
		return Axios.get(`/containers/${id}/logs`);
	}
}
