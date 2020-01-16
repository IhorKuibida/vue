import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Vuex from 'vuex';
Vue.use(Vuex);


// store
import store from './store/store.js';
import translate from './store/translate.js';
import * as storage from './store/session-storage.js';

// plugins
import wnumb from 'wnumb';
import noUiSlider from 'nouislider';
import anime from 'animejs';

// components
import FilterList from './filter-components/FilterList.vue';

var router = new VueRouter({
    routes: [
    ]
})


Vue.use(wnumb);
Vue.use(noUiSlider);


new Vue({
    el: '#filter',
    components: { FilterList },
    store,
    translate,
    storage,
    wnumb,
    noUiSlider,
    router,
    anime
});