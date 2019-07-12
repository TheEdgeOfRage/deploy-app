/*
 * index.js
 * Copyright (C) 2019 Vivify Ideas
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
  },
};

export default new Vuex.Store(storeData);


