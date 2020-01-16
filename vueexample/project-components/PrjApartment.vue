<template>
    <div class="prj-apartment prj-modal__inner-box" id="prjApartment">

        <!-- Prev apartment -->
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated animated--out fadeOut">

            <button
                class="prj-modal__nav-btn prj-modal__nav-btn--prev slider-nav-btn slider-nav-btn--prev slider-nav-btn--has-text"
                @click="prevApartment()"
                v-if="apartmentIndex != 0">
                <span class="slider-nav-btn__text">
                    <template v-if="apartments[apartmentIndex].type == 'comercial'">{{ 'previous_comercial' | translate }}</template>
                    <template v-else>{{ 'previous_apartment' | translate }}</template>
                </span>
            </button>
        </transition>
        <!-- end Prev apartment -->

        <!-- Next apartment -->
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated animated--out fadeOut">

            <button
                class="prj-modal__nav-btn prj-modal__nav-btn--next slider-nav-btn slider-nav-btn--next slider-nav-btn--has-text"
                @click="nextApartment()"
                v-if="apartmentIndex != apartments.length - 1">
                <span class="slider-nav-btn__text">
                    <template v-if="apartments[apartmentIndex].type == 'comercial'">{{ 'next_comercial' | translate }}</template>
                    <template v-else>{{ 'next_apartment' | translate }}</template>
                </span>
            </button>
        </transition>
        <!-- end Next apartment -->



        <!-- Floors navigation -->
        <nav-up-down
            :class="'prj-modal__nav-floors'"
            v-bind:valTitle="floor.title"
            v-bind:valCaption="'floor'"
            v-bind:valDefault="floorIndex"
            v-bind:valMin="floorMin"
            v-bind:valMax="floors.length"
            v-bind:btnUpTitle="'next_floor'"
            v-bind:btnDownTitle="'previous_floor'"
            v-bind:handlerStatus="true"
            v-on:newValue="changeFloor($event)"
        ></nav-up-down>
        <!-- end Floors navigation -->



        <!-- Apartment box -->
        <div class="prj-apartment__box">

            <!-- Project name (btn) -->
            <button
                class="prj-modal__prj-name btn"
                @click="closeModal()">{{ project.complex_name }}</button>
            <!-- end Project name (btn) -->

            <!-- Apartment title -->
            <h2
                class="prj-modal__title prj-modal__title--sticky"
                v-if="apartments[apartmentIndex].title">{{ 'type' | translate }}

                <transition
                    enter-active-class="animated flipInX"
                    leave-active-class="animated animated--out fadeOut"
                    mode="out-in">
                        <span class="prj-modal__title-nbr" :key="animation">{{apartments[apartmentIndex].title}}</span>
                </transition>
            </h2>
            <!-- end Apartment title -->

            <!-- Apartment subtitle -->
            <h3
                class="prj-modal__subtitle"
                v-if="apartments[apartmentIndex].type">

                <template v-if="apartments[apartmentIndex].type == 'comercial' || apartments[apartmentIndex].type == 'penthouse'">{{ $t(apartments[apartmentIndex].type) | translate}}</template>
                <template v-else>{{ apartments[apartmentIndex].type }} - {{ '-room' | translate }}</template>
            </h3>
            <!-- end Apartment subtitle -->



            <!-- Apartment content -->
            <div class="prj-apartment__row row">

                <!-- Main col -->
                <div class="prj-apartment__main-col col-xs-12 col-lg-7">

                    <!-- Apartment plan -->
                    <div class="prj-apartment-plan">

                        <!-- Main image -->
                        <div
                            class="prj-apartment-plan__main-img"
                            :class="{ 'prj-apartment-plan__main-img--has-nav' : apartmentHasOptionMultilevel }">

                            <!-- Main image wrap -->
                            <div class="prj-apartment-plan__img-wrap">
                                <transition
                                    enter-active-class="animated fadeInRight"
                                    leave-active-class="animated animated--out fadeOutLeft"
                                    mode="out-in">

                                    <img
                                        :src="apartmentImage"
                                        :key="animation"
                                        :alt="$t('apartment_plan') + ' - ' + apartments[apartmentIndex].title"></img>
                                </transition>
                            </div>
                            <!-- end Main image wrap -->

                            <!-- Nav dots -->
                            <transition
                                enter-active-class="animated fadeIn"
                                leave-active-class="animated animated--out fadeOut">

                                <nav-dots
                                    v-if="apartmentHasOptionMultilevel"
                                    :class="'prj-apartment-plan__nav-levels'"
                                    v-bind:dotsArrTitle="'level'"
                                    v-bind:dotsArrValue="false"
                                    v-bind:valMin="0"
                                    v-bind:valMax="aprtMltLength"
                                    v-bind:valActive="aprtMltCurrentLevel"
                                    v-on:newValActive="changeMultilevel($event)"
                                ></nav-dots>
                            </transition>
                            <!-- end Nav dots -->

                            <!-- Compass -->
                            <prj-compass v-bind:degree="currentSectionNorthDegree"></prj-compass>
                        </div>
                        <!-- end Main image -->



                        <!-- Mini image floor -->
                        <div
                            class="prj-apartment-plan__floor-img"
                            v-if="apartments[apartmentIndex].flat_coords_mini">

                            <transition
                                enter-active-class="animated pulse"
                                mode="out-in">

                                <svg
                                    class="prj-plan-mini"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 300 300"
                                    width="300" height="300"
                                    preserveAspectRatio="xMidYMid meet"
                                    :key="animation">

                                    <polygon
                                        class="prj-polygon"
                                        v-for="(flat, index) in floors[floorIndex].flats"
                                        :class="[apartments[apartmentIndex] == flat ? 'prj-polygon--active' : 'prj-polygon--gray']"
                                        v-if="flat.flat_coords_mini"
                                        :points="flat.special_option ? flat.flat_coords_mini[aprtMltCurrentLevel] : flat.flat_coords_mini"
                                        @click="openApartment( index )"
                                    />
                                </svg>
                            </transition>
                        </div>
                        <!-- end Mini image floor -->

                        <!-- Button back -->
                        <div class="prj-apartment__btn-back">
                            <button class="btn-decor" @click="backToFloor()">{{ 'general_planning' | translate }}</button>
                        </div>
                        <!-- end Button back -->
                    </div>
                    <!-- end Apartment plan -->

                </div>
                <!-- Main col -->



                <!-- Left col -->
                <div class="prj-apartment__left-col col-xs-12 col-lg-5">

                    <!-- Apartment info -->
                    <ul
                        class="prj-apartment-info"
                        :class="{
                            'prj-apartment-info--mini' : apartments[apartmentIndex].flat_parameters && apartments[apartmentIndex].flat_parameters.length > 8
                        }"
                        v-if="apartments[apartmentIndex].flat_parameters || apartments[apartmentIndex].area">

                        <li class="prj-apartment-info__item" v-if="apartments[apartmentIndex].area">
                            <span class="prj-apartment-info__title">{{ 'area' | translate }}</span>
                            <span class="prj-apartment-info__value">{{ apartments[apartmentIndex].area }} {{ 'm' | translate }}<sup>2</sup></span>
                        </li>

                        <template v-for="(param, i) in apartments[apartmentIndex].flat_parameters">
                            <li class="prj-apartment-info__item" v-if="param && i % 2 === 0">
                                <span class="prj-apartment-info__title">{{ $t(param) }}</span>
                                <span class="prj-apartment-info__value">{{ apartments[apartmentIndex].flat_parameters[i + 1] }} {{ 'm' | translate }}<sup>2</sup></span>
                            </li>
                        </template>
                    </ul>
                    <!-- end Apartment info -->

                    <!-- Apartment btn -->
                    <button class="prj-apartment-btn btn-bg btn-bg--lg btn-bg--darker" @click="openOrderForm()">{{ 'send_request' | translate }}</button>
                </div>
                <!-- end Left col -->

            </div>
            <!-- end Apartment content -->

        </div>
        <!-- end Apartment box -->



        <!-- Order form -->
        <prj-order-form v-if="orderFormStatus"></prj-order-form>
    </div>
</template>





<script>
import PrjOrderForm from './PrjOrderForm.vue';
import PrjCompass from './elements/PrjCompass.vue';
import NavDots from './elements/NavDots.vue';
import NavUpDown from './elements/NavUpDown.vue';

export default {
    name: 'PrjApartment',
    components: { PrjOrderForm, PrjCompass, NavDots, NavUpDown },


    // data
    data: function() {
        return {
            "fullImage": false,
            "currentProject": this.$store.state.prjCurrentProject,
            "currentSection": this.$store.state.prjCurrentSection,
            "animation": true,
        }
    },


    // mounted
    mounted() {
        window.addEventListener('keyup', this.handler);
    },


    // destroyed
    destroyed() {
        window.removeEventListener('keyup', this.handler);
    },


    // watch
    watch: {
        apartmentIndex: function () {
            this.animationTrigger();
        },
        floorIndex: function () {
            this.animationTrigger();
        },
        aprtMltCurrentLevel: function () {
            // this.animationTrigger();
        },
    },


    // methods
    methods: {

        // APARTMENT
        // prev apartment
        prevApartment() {
            let currentApartment = this.apartmentIndex;
            if (currentApartment !== 0) {
                this.$store.commit('prjPushApartment', currentApartment - 1);
            }
        },

        // next apartment
        nextApartment() {
            let currentApartment = this.apartmentIndex;
            if (this.apartments.length - 1 !== currentApartment) {
                this.$store.commit('prjPushApartment', currentApartment + 1);
            }
        },

        // open apartment
        openApartment(nmbr) {
            this.$store.commit('prjPushApartment', nmbr);
        },

        // check if apartment has type multilevel
        checkApartmentMultilevel: function() {
            let multilevel = this.apartment.special_option && this.apartment.special_option == "multilevel";
            return multilevel ? true : false;
        },

        // change multilevel
        changeMultilevel(nmbr) {
            this.$store.commit('prjPushMultilevel', nmbr);
        },



        // FLOOR
        // change floor
        changeFloor(nmbr) {
            this.$store.commit('prjPushFloor', nmbr);

            // if prev floor is comercial => open floor
            if (this.$root.$options.methods.checkFloorComercial(this.floors[nmbr])) {
                this.$store.commit('prjOpenFloor');
            }

            // if prev floor is penthouse => open floor
            else if (this.$root.$options.methods.checkFloorPenthouse(this.floors[nmbr])) {
                this.$store.commit('prjOpenFloor');
            }

            // if prev floor don't has current apartment => last apartment on floor
            else if (!this.apartments[this.apartmentIndex]) {
                this.$store.commit('prjPushApartment', this.apartments.length - 1);
            }

            else {

            }
        },

        // check floor
        checkFloor(floor) {
            return this.$store.getters.checkFloor(this.currentProject, this.currentSection, floor);
        },

        // back to floor
        backToFloor() {
            this.$store.commit('prjOpenFloor');
        },



        // OTHERS
        // close modal
        closeModal() {
            this.$store.commit('closeModal');
        },

        // open order form
        openOrderForm() {
            this.$store.commit('prjOpenOrderForm');
        },

        // handler function
        handler: function() {
            // keyup "left" / prev apartment
            if (event.keyCode === 37) {
                this.prevApartment();
            }

            // keyup "right" / next apartment
            if (event.keyCode === 39) {
                this.nextApartment();
            }
        },

        // animation trigger
        animationTrigger: function() {
            this.animation = !this.animation;
        }
    },


    // computed
    computed: {

        // PROJECT
        // get active project
        project() {
            return this.$store.getters.getCurrentProject(this.currentProject);
        },


        // FLOOR
        // get active floor index
        floorIndex() {
            return this.$store.state.prjCurrentFloor;
        },

        // get all active floors
        floors() {
            return this.$store.getters.getFloors(this.currentProject, this.currentSection);
        },

        // get active floor
        floor() {
            return this.floors[this.floorIndex];
        },

        // min enabled floor
        floorMin() {
            return this.$store.getters.returnEnabledFloor(this.currentProject, this.currentSection);
        },


        // APARTMENT
        // get active apartment index
        apartmentIndex() {
            return this.$store.state.prjCurrentApartment;
        },

        // get all active apartments
        apartments() {
            return this.$store.getters.getApartments(this.currentProject, this.currentSection, this.floorIndex);
        },

        // get active apartment
        apartment() {
            return this.apartments[this.apartmentIndex];
        },

        // apartment image
        apartmentImage: function() {
            let apartmentImage;

            // if floor has type multilevel
            if(this.checkApartmentMultilevel()) {
                let levelIndex = this.aprtMltCurrentLevel;
                apartmentImage = this.apartment.flat_image[levelIndex];
            }

            // if floor has image
            else if(this.apartment.flat_image) {
                apartmentImage = this.apartment.flat_image;
            }

            // if floor has not image return false
            else {
                apartmentImage = false;
            }

            return apartmentImage;
        },


        // APARTMENT MULTILEVEL
        // apartment has option multilevel
        apartmentHasOptionMultilevel: function() {
            return this.checkApartmentMultilevel();
        },

        // multilevel length
        aprtMltLength: function() {
            return this.apartment.flat_image.length;
        },

        // multilevel current level
        aprtMltCurrentLevel: function() {
            return this.$store.state.prjCurrentMultilevel;
        },


        // OTHERS
        // get order forms status
        orderFormStatus() {
            return this.$store.state.prjOrderForm;
        },

        // get current section north degree
        currentSectionNorthDegree() {
            let section = this.$store.getters.getCurrentSection(this.currentProject, this.currentSection);
            return section.north_degree;
        },
    }
}
</script>
