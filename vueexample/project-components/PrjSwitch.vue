<template>
    <nav class="prj-switch" id="prjSwitch">

        <transition
            enter-active-class="animated bounceIn"
            leave-active-class="animated animated--out bounceOut"
            mode="out-in">

            <button
                class="prj-switch__link"
                :class="{ 'prj-switch__link--active': statusDay }"
                @click="onDay()"
                v-if="!statusPanorama" >

                <svg class="prj-switch__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                    <path d="M20.4 31.3c-6.1 0-11-5-11-11.2s5-11.2 11-11.2 11 5 11 11.2-4.9 11.2-11 11.2zM20.9 0h-.6v5.9h.6V0zm0 34.1h-.6V40h.6v-5.9zM5.8 20H0v.6h5.8V20zM40 20h-5.8v.6H40V20zm-30-9.8l-2.9-3-.5.4 2.9 3 .5-.4zm23.8 22.9l-2.9-3-.4.4 2.9 3 .4-.4zm-23.2-2.7l-.4-.4-2.9 3 .4.4 2.9-3zM33.8 6.9l-.4-.4-2.9 3 .4.4 2.9-3z"/>
                </svg>
                <span class="visually-hidden">{{ 'view_day' | translate }}</span>
            </button>
        </transition>


        <transition
            enter-active-class="animated bounceIn"
            leave-active-class="animated animated--out bounceOut" >

            <button
                class="prj-switch__link"
                :class="{ 'prj-switch__link--active': statusNight}"
                @click="onNight()"
                v-if="!statusPanorama" >

                <svg class="prj-switch__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 40" width="34" height="40">
                    <path d="M17 40C7.6 40 0 32.4 0 23.1S7.6 6.2 17 6.2c.5 0 1.1 0 1.7.1v.8C12.1 7.8 7.2 13.3 7.2 20c0 7.1 5.8 12.9 13 12.9 6.7 0 12.2-4.9 12.9-11.5h.8c.1.6.1 1.2.1 1.7C34 32.4 26.4 40 17 40zM30.3 8.1l-1.2-1.3c-.5-.6-1.4-1.4-1.8-1.4-.4 0-1.3.8-1.8 1.4l-1.2 1.3.9-1.6c.4-.6.8-1.7.7-2-.1-.3-.9-.8-1.5-1.1L23 2.8l1.5.3s.7.1 1.3.1c.4 0 .6-.1.6-.1.3-.2.5-1.2.7-1.8l.3-1.3.2 1.3c.1.7.3 1.7.6 1.8 0 0 .2.1.7.1.6 0 1.4-.1 1.4-.1l1.5-.3-1.4.6c-.6.3-1.4.8-1.5 1.1-.1.3.4 1.3.7 2l.7 1.6z"/>
                    <path d="M26.2 21.5L25 20.1c-.2-.2-.4-.4-.5-.4-.1 0-.3.2-.5.4l-1.2 1.3.9-1.6c.1-.2.2-.5.2-.6 0 0-.2-.2-.4-.3l-1.5-.5 1.5.3h.5s.1-.3.2-.5l.2-1.3.2 1.3c0 .2.1.5.1.5h.6l1.5-.3-1.2.6c-.2.1-.4.2-.5.3 0 .1.1.3.2.6l.9 1.6zm5.3-6.7l.5-.8c.1-.1.1-.3.1-.3s-.1-.1-.3-.2l-.7-.3.8.1h.3s.1-.2.1-.3l.1-.6.1.6c0 .1.1.3.1.3h.4l.7-.1-.7.3c-.1.1-.3.1-.3.2 0 0 .1.2.1.3l.4.8-.6-.7-.3-.3s-.2.1-.3.3l-.5.7z"/>
                </svg>
                <span class="visually-hidden">{{ 'view_night' | translate }}</span>
            </button>
        </transition>


        <transition
            enter-active-class="animated bounceIn"
            leave-active-class="animated animated--out bounceOut" >

            <button
                class="prj-switch__link prj-switch__link--panorama"
                :class="{ 'prj-switch__link--active': statusPanorama }"
                @click="statusPanorama ? offPanorama() : onPanorama()"
                v-if="project.project_image_panorama && !statusPanorama" >

                <svg class="prj-switch__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 23" width="40" height="23">
                    <path d="M2 10.9c0-4.5 8-8.4 17.4-8.4 1.9 0 3.8.2 5.5.4l-1.7.9 2.5.6c1 .3 2 .5 2.9.7 2.2.6 4.3 1.2 6.3 1.9L38 8.1l-2-2.6c-.3-.3-.5-.6-.7-.9-1.2-1.5-2.5-2.8-4-4.2l-.5-.4-.6.2c-.9.3-1.7.7-2.5 1.1-2.6-.6-5.4-1-8.3-1C8.5.5 0 5.1 0 10.9h2zm36 1.6c0 4.5-8 8.3-17.5 8.3-1.9 0-3.8-.2-5.5-.4l1.7-.9-2.5-.6c-1-.3-2-.5-2.9-.7C9.1 17.6 7 17 5 16.3l-3-1.1 2 2.6c.3.3.5.6.7.9 1.2 1.5 2.5 2.8 4 4.2l.5.4.6-.2c.9-.3 1.7-.7 2.5-1.1 2.6.6 5.4 1 8.3 1C31.4 23 40 18.5 40 12.7h-2v-.2z"/>
                    <path d="M11.9 11h.8c.5 0 .9-.2 1.2-.5s.4-.7.4-1.3c0-1.2-.5-1.8-1.4-1.8-.4 0-.8.2-1 .5-.3.3-.4.7-.4 1.3h-1.2c0-.8.2-1.5.7-2 .5-.5 1.1-.8 1.9-.8.8 0 1.4.3 1.9.8s.7 1.2.7 2.1c0 .5-.1.9-.4 1.3s-.6.7-1 .9c1 .4 1.4 1.1 1.4 2.4 0 .9-.3 1.6-.8 2.2-.5.5-1.2.8-2 .8s-1.5-.3-2-.8-.7-1.2-.7-2.1h1.2c0 .5.1 1 .4 1.3.3.3.6.5 1.1.5.5 0 .8-.2 1.1-.5.3-.3.4-.8.4-1.4 0-1.2-.6-1.8-1.8-1.8h-.7V11zm9.8-4.4v1.1h-.2c-.8 0-1.5.3-1.9.8-.6.5-.8 1.3-.9 2.4.5-.6 1-.9 1.7-.9s1.3.3 1.8.9.7 1.4.7 2.4c0 1.1-.2 1.9-.7 2.5-.5.6-1.1.9-2 .9-.8 0-1.5-.4-2-1.1-.5-.7-.8-1.7-.8-2.9v-.5c0-1.4.2-2.5.5-3.3.3-.8.7-1.4 1.3-1.8.6-.4 1.3-.6 2.2-.6h.3zm-1.5 4.5c-.3 0-.6.1-.9.4s-.5.6-.6 1v.5c0 .8.1 1.5.4 2 .3.5.6.8 1.1.8.5 0 .8-.2 1.1-.6.3-.4.4-1 .4-1.7s-.1-1.3-.4-1.7c-.3-.4-.6-.7-1.1-.7zm9.6 1.3c0 1.5-.2 2.6-.7 3.4S28 16.9 27 16.9c-.9 0-1.6-.4-2-1.1-.4-.7-.7-1.8-.7-3.2v-1.7c0-1.5.2-2.6.7-3.3s1.1-1.1 2.1-1.1c.9 0 1.6.3 2 1s.7 1.7.7 3.1v1.8zm-1.2-1.8c0-1.1-.1-1.9-.4-2.4s-.6-.8-1.1-.8c-.5 0-.9.3-1.1.8-.2.5-.4 1.3-.4 2.3v2.1c0 1.1.1 1.9.4 2.4.2.5.6.8 1.1.8.5 0 .9-.3 1.1-.8.2-.5.4-1.3.4-2.3v-2.1z"/>
                </svg>
                <span class="visually-hidden">{{ 'view_panorama' | translate }}</span>
            </button>
        </transition>
    </nav>
</template>





<script>
const rootSection = document.querySelector(".section-prj-main");

export default {
    name: 'PrjSwitch',

    data: function() {
        return {
            "currentProject": this.$store.state.prjCurrentProject,
        }
    },

    methods: {
        onDay() {
            this.$store.commit('onDayStyle');
            rootSection.classList.add("section--extra-white");
            rootSection.classList.remove("section--dark");
        },
        onNight() {
            this.$store.commit('onNightStyle');
            rootSection.classList.remove("section--extra-white");
            rootSection.classList.add("section--dark");
        },
        onPanorama() {
            this.$store.commit('onPanorama');
        },
        offPanorama() {
            this.$store.commit('offPanorama');
        },
    },

    computed: {

        // status day/night
        statusDay() {
            return this.$store.state.prjDayStyle;
        },
        statusNight() {
            return this.$store.state.prjNightStyle;
        },

        // status panorama
        statusPanorama() {
            return this.$store.state.prjPanorama;
        },

        // get project
        project() {
            return this.$store.getters.getCurrentProject(this.currentProject);
        },
    },
}
</script>
