/*
 * vue.config.js
 * Copyright (C) 2019 Vivify Ideas
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

module.exports = {
	devServer: {
		disableHostCheck: true,
		public: 'deploy.localhost',
		port: 8000,
	},
};
