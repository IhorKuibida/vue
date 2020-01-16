<template>
    <div class="prj-project-mobile">

        <!-- Project content -->
        <div class="section-prj-main__content">

            <!-- Project title -->
            <transition
                enter-active-class="animated fadeInLeft"
                leave-active-class="animated animated--out fadeOutRight">

                <h2 class="section__title" :key="statusDay">{{ project.complex_name }}</h2>
            </transition>
            <!-- end Project title -->

            <!-- Project btn -->
            <div class="section__btn" v-if="!completed && !isTest">
                <transition
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated animated--out fadeOutRight"
                    mode="out-in">
                    <button
                        class="btn-bg btn-bg--sm btn-bg--monospace btn-bg--opacity"
                        :class="{'btn-bg--darker' : !statusDay}"
                        @click="openModal()"
                        :key="statusDay">{{ 'view_plans' | translate }}</button>
                </transition>
            </div>
            <!-- end Project btn -->

            <!-- Project sticker -->
            <transition enter-active-class="sticker--animated">

                <span
                    class="sticker"
                    :class="{'sticker--black' : statusDay}"
                    :key="statusDay"
                    v-if="completed">{{ 'completed' | translate }}</span>
            </transition>
            <!-- end Project sticker -->
        </div>
        <!-- end Project content -->


        <!-- Decoration (gradient) -->
        <transition
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated animated--out fadeOutRight">

            <!-- day -->
            <span class="prj-project-mobile__decor prj-project-mobile__decor--day" v-if="statusDay"></span>
        </transition>

        <transition
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated animated--out fadeOutRight">

            <!-- night -->
            <span class="prj-project-mobile__decor prj-project-mobile__decor--night" v-if="statusNight"></span>
        </transition>
        <!-- end Decoration (gradient) -->



        <!-- Project image -->
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated animated--out fadeOut">

            <!-- day image -->
            <div class="prj-project-mobile__img"
                v-bind:style="{ 'background-image': 'url(' + сorp.image_day + ')' }"
                v-if="statusDay"
                data-swiper-parallax-x="100"
                data-swiper-parallax-scale="1.3"
                data-swiper-parallax-duration="800"></div>
        </transition>

        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated animated--out fadeOut">

            <!-- night image -->
            <div class="prj-project-mobile__img"
                v-bind:style="{ 'background-image': 'url(' + сorp.image_night + ')' }"
                v-if="statusNight"
                data-swiper-parallax-x="-100"
                data-swiper-parallax-scale="1.3"
                data-swiper-parallax-duration="800"></div>
        </transition>
        <!-- end Project image -->
    </div>
</template>





<script>
export default {
    name: 'PrjProjectMobile',

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

        // open modal (open floor)
        openModal() {
            let indxSection = 0;
            let indxFloor = this.$store.getters.returnEnabledFloor(this.currentProject, indxSection);
            this.$store.commit('prjPushProject', this.currentProject);
            this.$store.commit('prjPushSection', indxSection);
            this.$store.commit('prjPushFloor', indxFloor);

            this.$store.commit('openModal');
            this.$store.commit('prjOpenFloor');
        },
    },

    // computed
    computed: {

        // check if project is completed
        completed() {
            return this.project.finish == "completed";
        },

        // check if project is test
        isTest() {
            return this.project.status == "testing";
        },

        // status day/night
        statusDay() {
            return this.$store.state.prjDayStyle;
        },
        statusNight() {
            return this.$store.state.prjNightStyle;
        },

        // get project
        project() {
            return this.$store.getters.getCurrentProject(this.currentProject);
        },


        // CORPS
        // get active corp index
        corpIndex() {
            return this.$store.state.prjCurrentCorp;
        },

        // get all corps
        corps() {
            return this.$store.getters.getCorps(this.currentProject);
        },

        // get active сorp
        сorp() {
            return this.corps[this.corpIndex];
        },
    },
}
</script>
