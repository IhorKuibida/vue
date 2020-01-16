import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// store
import store from './store/store.js';
import translate from './store/translate.js';
import * as storage from './store/session-storage.js';

// plugins
import breakpoint from './helpers/_css-breakpoints.js';
import anime from 'animejs';

// components
import PrjModal from './project-components/PrjModal.vue';
import PrjProject from './project-components/PrjProject.vue';
import PrjSwitch from './project-components/PrjSwitch.vue';
import PrjPanorama from './project-components/PrjPanorama.vue';

import PrjVirtualModal from './project-components/virtual/PrjVirtualModal.vue';
import PrjInteractivePlanModal from './project-components/interactive-plan/PrjInteractivePlanModal.vue';
import PrjPanoramaModal from './project-components/panorama/PrjPanoramaModal.vue';

// router
var router = new VueRouter({
    mode: 'history',
    routes: [
    ]
});




// Plan Modal
new Vue({
    el: '#prjModalApp',
    components: { PrjModal, PrjPanoramaModal, PrjVirtualModal, PrjInteractivePlanModal },

    // data
    data: function() {
        return {
            "currentProject": this.$store.state.prjCurrentProject,
        }
    },

    // mounted
    mounted() {

    },

    // destroyed
    destroyed() {

    },

    // methods
    methods: {

        // CHECK FLOOR
        // check if floor has type "comercial"
        checkFloorComercial: function(floor) {
            let comercial = floor.type && floor.type == "comercial";
            return comercial ? true : false;
        },

        // check if floor has type "parking"
        checkFloorParking: function(floor) {
            let parking = floor.type && floor.type == "parking";
            return parking ? true : false;
        },
        // check if floor has type "penthouse"
        checkFloorPenthouse: function(floor) {
            let multilevel = floor.type && floor.type == "penthouse";
            return multilevel ? true : false;
        },

        // check if floor has special type "multilevel"
        checkFloorMultilevel: function(floor) {
            let multilevel = floor.special_type && floor.special_type == "multilevel";
            return multilevel ? true : false;
        },
    },

    // computed
    computed: {

        // Project modal
        modalStatus() {
            return store.state.prjModal;
        },

        // Panorama modal
        modalPanoramaStatus() {
            return store.state.prjPanoramaModalStatus;
        },

        // Virtual modal
        modalVirtualStatus() {
            return store.state.prjVirtualModalStatus;
        },

        // Interactive plan modal
        modalInteractivePlanStatus() {
            return store.state.prjInteractivePlanStatus;
        },
    },

    router,
    store,
    translate,
    storage,
    anime,
    breakpoint
});




// Project
new Vue({
    el: '#prjProjectsApp',
    components: { PrjProject, PrjSwitch, PrjPanorama },

    // mounted
    mounted() {

    },

    // computed
    computed: {

        // panorama status
        panoramaStatus() {
            return store.state.prjPanorama;
        },

        // day/night status
        dayNightStatus() {
            let prjIndx = this.$store.state.prjCurrentProject;
            let prj = this.$store.getters.getCurrentProject(prjIndx)
            let corpIndx = this.$store.state.prjCurrentCorp;
            let day = prj.corps[corpIndx]['image_day'];
            let night = prj.corps[corpIndx]['image_night'];
            return day && night;
        },
    },

    router,
    store,
    translate,
    storage,
    anime,
    breakpoint
});




// Panorama
const panoramaAppId =  'prjPanoramaApp';
const panoramaApp =  document.getElementById(panoramaAppId);
if (typeof(panoramaApp) != 'undefined' && panoramaApp != null) {

    new Vue({
        el: '#' + panoramaAppId,

        // methods
        methods: {
            openModal(url) {
                store.commit('openPanoramaModal', url);
            }
        },

        store,
        translate
    });
}


// Virtual
const virtualAppId =  'prjVirtualApp';
const virtualApp =  document.getElementById(virtualAppId);
if (typeof(virtualApp) != 'undefined' && virtualApp != null) {

    new Vue({
        el: '#' + virtualAppId,

        // methods
        methods: {
            openModal(url) {
                store.commit('openVirtualModal', url);
            }
        },

        store,
        translate
    });
}


// Interactive Plan
const interactivePlanAppId =  'prjInteractivePlanApp';
const interactivePlanApp =  document.getElementById(interactivePlanAppId);
if (typeof(interactivePlanApp) != 'undefined' && interactivePlanApp != null) {

    new Vue({
        el: '#' + interactivePlanAppId,

        // methods
        methods: {
            openModal(url) {
                store.commit('openInteractivePlanModal', url);
            }
        },

        store,
        translate
    });
}