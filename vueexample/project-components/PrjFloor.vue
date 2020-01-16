<template>
    <div class="prj-floor prj-modal__inner-box" id="prjFloor">

        <!-- Prev floor -->
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated animated--out fadeOut">

            <button
                class="prj-modal__nav-btn prj-modal__nav-btn--prev slider-nav-btn slider-nav-btn--prev slider-nav-btn--has-text"
                @click="prevFloor()"
                v-if="floorIndex > 0 && checkFloor(floorIndex - 1)">

                <span class="slider-nav-btn__text"><strong>{{ currentFloorTitle - 1 }}</strong>&nbsp;{{ 'floor' | translate }}</span>
            </button>
        </transition>
        <!-- end Prev floor -->

        <!-- Next floor -->
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated animated--out fadeOut">

            <button
                class="prj-modal__nav-btn prj-modal__nav-btn--next slider-nav-btn slider-nav-btn--next slider-nav-btn--has-text"
                @click="nextFloor()"
                v-if="floorIndex < floors.length - 1 && checkFloor(floorIndex + 1)">

                <span class="slider-nav-btn__text"><strong>{{ currentFloorTitle + 1 }}</strong>&nbsp;{{ 'floor' | translate }}</span>
            </button>
        </transition>
        <!-- end Next floor -->


        <!-- Section navigation -->
        <template v-if="sections.length > 1">

            <!-- Section dots -->
            <nav-dots
                v-if="sections.length < 5 && !isDesktop || isDesktop"
                :class="'prj-modal__nav-dots'"
                v-bind:dotsArrTitle="isPseudoCorp ? 'corp' : 'section'"
                v-bind:dotsArrValue="sectionsTitles"
                v-bind:valMin="0"
                v-bind:valMax="sections.length"
                v-bind:valActive="sectionIndex"
                v-on:newValActive="changeSection($event)"
            ></nav-dots>
            <!-- end Section dots -->

            <!-- Dialog section list -->
            <template v-else>
                <button class="prj-floor__open-section-list btn btn--md" @click="dialogSectionList = true">
                    {{ 'select_section' | translate }}
                </button>

                <transition
                    v-on:enter="listAnimation('.prj-btns-list__btn')"
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated animated--out zoomOut">

                    <nav class="prj-dialog" v-if="dialogSectionList">
                        <button class="prj-dialog__close btn-circle btn-circle--t-close btn-circle--bg" @click="dialogSectionList = false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20">
                                <path fill-rule="evenodd" d="M20.274 18.66l-.879.879-8.881-8.881-9.334 9.334-.891-.892 9.333-9.333L.742.886l.879-.879 8.881 8.88L19.205.184l.891.892-8.703 8.703 8.881 8.881z" />
                            </svg>
                            <span class="visually-hidden">{{ 'close' | translate }}</span>
                        </button>

                        <ul class="prj-btns-list">
                            <li class="prj-btns-list__item" v-for="(sectionTitle, index) in sectionsTitles">
                                <button
                                    class="prj-btns-list__btn"
                                    :class="{ 'prj-btns-list__btn--current' : index == sectionIndex}"
                                    @click="changeSection(index), dialogSectionList = false">
                                    {{ sectionTitle == '' ? $t('parking') : sectionTitle + ' - ' + $t('section') }}
                                </button>
                            </li>
                        </ul>
                    </nav>
                 </transition>
            </template>
            <!-- end Section list -->

        </template>
        <!-- end Section navigation -->


        <!-- Nav multilevel -->
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated animated--out fadeOut">

            <nav-up-down
                v-if="floorTypeMultilevel"
                :class="'prj-floor__nav-multilevel'"
                v-bind:small="true"
                v-bind:valTitle="flrMltCurrentLevel + 1"
                v-bind:valCaption="'level'"
                v-bind:valDefault="flrMltCurrentLevel"
                v-bind:valMin="0"
                v-bind:valMax="flrMltLength"
                v-bind:btnUpTitle="'next_level'"
                v-bind:btnDownTitle="'previous_level'"
                v-bind:handlerStatus="false"
                v-on:newValue="changeMultilevel($event)"
            ></nav-up-down>
        </transition>
        <!-- end Nav multilevel -->



        <!-- Floor box -->
        <div class="prj-floor__box">

            <!-- Project name (btn) -->
            <button
                class="prj-modal__prj-name btn"
                @click="closeModal()">{{ project.complex_name }}</button>
            <!-- end Project name (btn) -->

            <!-- Floor title -->
            <h2 class="prj-modal__title">
                <transition
                    enter-active-class="animated flipInX"
                    leave-active-class="animated animated--out fadeOut"
                    mode="out-in">
                    <template v-if="!checkIfFloorParking()">
                        <span class="prj-modal__title-nbr" :key="animation">{{ floor.title }}</span>
                    </template>
                </transition>
                <template v-if="checkIfFloorParking()">
                    {{ 'parking' | translate }}
                </template>
                <template v-else>
                    {{ 'floor' | translate }}
                </template>
            </h2>
            <!-- end Floor title -->

            <!-- Floor subtitle -->
            <h3 class="prj-modal__subtitle" v-if="(sections.length > 1 && !isDesktop) || checkIfFloorComercial()">
                <template v-if="checkIfFloorComercial()">
                    {{ 'comercial' | translate }}
                </template>
                <template v-if="sections.length > 1 && !isDesktop">
                    <template v-if="checkIfFloorComercial()">, </template>
                    <template v-if="checkIfFloorParking()"></template>
                    <template v-else>
                        {{ 'section' | translate }} - {{ sections[sectionIndex].section_title }}
                    </template>
                </template>
            </h3>
            <!-- end Floor subtitle -->

            <!-- Floor plan -->
            <div class="prj-floor__plan" v-if="checkFloor(floorIndex)">

                <!-- Tooltip wrapper -->
                <div
                    class="prj-tooltip-wrapper"
                    v-for="(flat, index) in floors[floorIndex].flats"
                    :data-tooltip-index="index"
                    v-if="flat.flat_coords && isDesktop">

                    <!-- Tooltip -->
                    <transition
                        v-on:before-enter="beforeEnterTooltip"
                        enter-active-class="animated"
                        leave-active-class="animated animated--out">

                        <div 
                            :class="{
                                'prj-tooltip prj-tooltip--dark': true,
                                'prj-tooltip--parking': checkIfFloorParking() == true
                            }"
                            v-show="index == activeIndexTooltip"
                        >
                            <template v-if="checkIfFloorParking()">
                                <h3 class="prj-tooltip__heading">
                                    {{ flat.status ? 'sold-out' : 'no-sold-out' | translate }}
                                </h3>
                            </template>
                            <template v-else>
                                <h3 class="prj-tooltip__heading">
                                    <span class="prj-tooltip__heading-nbr">{{ flat.title }}</span>
                                    {{ 'type' | translate }}
                                </h3>

                                <dl class="prj-tooltip__list">
                                    <dt class="prj-tooltip__title" v-if="flat.area">{{ 'area' | translate }}</dt>
                                    <dd class="prj-tooltip__value prj-tooltip__value--lg" v-if="flat.area"><span>{{ flat.area }}{{ 'm' | translate }}<sup>2</sup></span></dd>
                                </dl>
                            </template>
                        </div>
                    </transition>
                    <!-- end Tooltip -->

                </div>
                <!-- end Tooltip wrapper -->


                <!-- Polygon title -->
                <!-- <div
                    v-for="(flat, index) in floors[currentFloor].flats"
                    :data-polygon-title="index"
                    v-if="flat.flat_coords">

                    <transition
                        enter-active-class="animated fadeIn"
                        leave-active-class="animated animated--out fadeOut"> -->

                        <!-- <span
                            class="prj-polygon-title prj-polygon-title--active"
                            v-if="index == activeIndexTooltip || !isDesktop"
                            @click="openApartment( index )">{{ "free" | translate }}</span> -->

                        <!-- <span
                            class="prj-polygon-title"
                            v-else="flat.status=='sold-out'">{{ $t(flat.status) | translate }}</span>
                    </transition>
                </div> -->
                <!-- end Polygon title -->



                <!-- Floor plan (svg) -->
                <transition
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated animated--out fadeOut">

                    <svg
                        class="prj-floor-plan"
                        :class="{ 'prj-floor-plan--full-height' : isFullFloorPlan }"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1000 1000"
                        width="1000" height="1000"
                        preserveAspectRatio="xMidYMid meet"
                        :key="animation">

                        <!-- Image -->
                        <image
                            class="prj-floor-plan__img"
                            width="100%" height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            v-bind="{'xlink:href' : floorImage}"
                            :alt="$t('floor_plan') + ' - ' + currentFloorTitle" />
                        <!-- end Image -->

                        <!-- Polygon -->
                        <g
                            class="pprj-floor-plan__group"
                            v-for="(flat, index) in floors[floorIndex].flats"
                            v-if="flat.flat_coords">

                            <polygon
                                class="prj-polygon"
                                :class="{
                                    'prj-polygon--reserved': flat.status=='reserved',
                                    'prj-polygon--sold-out': flat.status=='sold-out'
                                }"
                                :points="flat.special_option ? flat.flat_coords[flrMltCurrentLevel] : flat.flat_coords"
                                :data-polygon-index="index"
                                @click="openApartment( index )"
                                @mouseover="openTooltip(index)"
                                @mouseleave="closeTooltip(index)"/>
                        </g>
                        <!-- end Polygon -->
                    </svg>
                </transition>
                <!-- end Floor plan (svg) -->

            </div>

            <!-- Compass -->
            <prj-compass v-bind:degree="sections[sectionIndex].north_degree"></prj-compass>
            <!-- end Compass -->

        </div>
        <!-- end Floor box -->

    </div>
</template>





<script>
import PrjCompass from './elements/PrjCompass.vue';
import NavUpDown from './elements/NavUpDown.vue';
import NavDots from './elements/NavDots.vue';

export default {
    name: 'PrjFloor',
    components: { PrjCompass, NavUpDown, NavDots },


    // data
    data: function() {
        return {
            "activeIndexTooltip": null,
            "bp": this.$root.$options.breakpoint.value,
            "currentProject": this.$store.state.prjCurrentProject,
            "dialogSectionList": false,
            "animation": true,
        }
    },


    // mounted
    mounted() {
        this.addTooltipsPosition();
        window.addEventListener('keyup', this.handler);
        window.addEventListener('resize', this.handleResize);
        this.checkIfFloorParking() ? false : this.animationList()
    },


    // destroyed
    destroyed() {
        window.removeEventListener('keyup', this.handler);
        window.removeEventListener('resize', this.handleResize);
    },


    // watch
    watch: {
        floorIndex: function () {
            // this.animationList();
            this.animationTrigger();

            let _this = this;
            setTimeout(function() {
                _this.addTooltipsPosition();
            }, 500);
        },
        sectionIndex: function () {
            this.checkIfFloorParking() ? false : this.animationList()
            this.animationTrigger();

            let _this = this;
            setTimeout(function() {
                _this.addTooltipsPosition();
            }, 500);
        },
        flrMltCurrentLevel: function () {
            this.animationTrigger();

            let _this = this;
            setTimeout(function() {
                _this.addTooltipsPosition();
            }, 500);
        },
    },


    // methods
    methods: {

        // FLOOR
        // prev floor
        prevFloor() {
            let prevFloor = this.floorIndex - 1;

            if (prevFloor >= 0 && this.checkFloor(prevFloor)) {
                this.$store.commit('prjPushFloor', prevFloor);
            }
        },

        // next floor
        nextFloor() {
            let nextFloor = this.floorIndex + 1;

            if (nextFloor < this.floors.length && this.checkFloor(nextFloor)) {
                this.$store.commit('prjPushFloor',  nextFloor);
            }
        },

        // check floor
        checkFloor(floor) {
            return this.$store.getters.checkFloor(this.currentProject, this.sectionIndex, floor);
        },

        // check if floor has type comercial
        checkIfFloorComercial: function() {
            return this.$root.$options.methods.checkFloorComercial(this.floor);
        },

        // check if floor has type parking
        checkIfFloorParking: function() {
            return this.$root.$options.methods.checkFloorParking(this.floor);
        },

        // change multilevel
        changeMultilevel(nmbr) {
            this.$store.commit('prjPushMultilevel', nmbr);
        },


        // SECTION
        // change section
        changeSection(nmbr) {
            if (nmbr < this.sections.length && nmbr >= 0) {
                this.$store.commit('prjPushSection', nmbr);
                let getEnabledFloorIndex = this.$store.getters.returnEnabledFloor(this.currentProject, nmbr);
                this.$store.commit('prjPushFloor', getEnabledFloorIndex);
            }
        },


        // APARTMENT
        // open apartment
        openApartment(nmbr) {
            if (!this.checkIfFloorParking()) {
                this.$store.commit('prjOpenApartment');
                this.$store.commit('prjPushApartment', nmbr);
            }
        },


        // TOOLTIPS
        // add tooltips position
        addTooltipsPosition() {
            if (this.isDesktop) {
                let tooltips = this.$el.querySelectorAll("[data-tooltip-index]"); // get all tooltip elements
                let polygons = this.$el.querySelectorAll("[data-polygon-index]"); // get all area(polygon) elements
                // const polygonTitle = this.$el.querySelectorAll("[data-polygon-title]"); // get all title elements

                let rootSection = document.querySelector(".prj-modal"); // get root modal el
                let rootSectionWidth = rootSection.getBoundingClientRect().width;

                let rootBlock = this.$el.querySelector(".prj-floor__plan"); // get root el block (parent block relative)
                let rootBlockWidth = rootBlock.getBoundingClientRect().width;
                let rootBlockHeight = rootBlock.getBoundingClientRect().height;
                let rootBlockBottomOffset = rootBlock.getBoundingClientRect().bottom;


                let getLftMrg = (rootSectionWidth - rootBlockWidth) / 2;
                let getTopMrg = rootBlockBottomOffset - rootBlockHeight;

                let additionalIndent = 30; // additional indent


                Array.prototype.forEach.call(polygons, (polygon, i) => {
                    let polygonWidth = polygon.getBoundingClientRect().width;
                    let polygonHeight = polygon.getBoundingClientRect().height;

                    let polygonTopOffset = polygon.getBoundingClientRect().top;
                    let polygonLeftOffset = polygon.getBoundingClientRect().left;
                    let polygonRightOffset = polygon.getBoundingClientRect().right;

                    if (tooltips[i].classList.contains('prj-tooltip-wrapper--left')) {
                        tooltips[i].classList.remove("prj-tooltip-wrapper--left");
                    }

                    if (tooltips[i].classList.contains('prj-tooltip-wrapper--right')) {
                        tooltips[i].classList.remove("prj-tooltip-wrapper--right");
                    }

                    tooltips[i].style.top = polygonTopOffset - getTopMrg + polygonHeight / 2 + "px";

                    if (rootSectionWidth/2 > (polygonLeftOffset + polygonWidth/2)) {
                        // tooltip in left
                        tooltips[i].style.left = polygonLeftOffset - getLftMrg - additionalIndent + "px";
                        tooltips[i].classList.add("prj-tooltip-wrapper--left");
                    }
                    else {
                        // tooltip in right
                        tooltips[i].style.left = polygonRightOffset - getLftMrg + additionalIndent + "px";
                        tooltips[i].classList.add("prj-tooltip-wrapper--right");
                    }

                    // polygonTitle[i].style.left = polygonLeftOffset - getLftMrg + polygonWidth/2 + "px";
                    // polygonTitle[i].style.top = polygonTopOffset - getTopMrg + polygonHeight/2 + "px";
                });
            }
        },

        // before enter tooltip
        beforeEnterTooltip: function(el) {
            if (el.parentNode.classList.contains('prj-tooltip-wrapper--left')) {
                el.classList.add("prj-tooltip--arr-right");
            }
            else if (el.parentNode.classList.contains('prj-tooltip-wrapper--right')) {
                el.classList.add("prj-tooltip--arr-left");
            }
        },

        // open tooltip
        openTooltip: function(index) {
            if (this.isDesktop) {
                const getPolygonEl = this.$el.querySelector("[data-polygon-index='" + index + "']");
                const getTooltipWrEl = this.$el.querySelector("[data-tooltip-index='" + index + "']");
                const getPolygonElIndex = getPolygonEl.dataset.polygonIndex;
                getPolygonEl.classList.add("prj-polygon--hover");
                this.activeIndexTooltip = getPolygonElIndex;
            }
        },

        // close tooltip
        closeTooltip: function(index) {
            if (this.isDesktop) {
                const getPolygonEl = this.$el.querySelector("[data-polygon-index='" + index + "']");
                const getPolygonTitleEl = this.$el.querySelector("[data-polygon-title='" + index + "']:hover");
                if (getPolygonTitleEl === null) {
                    getPolygonEl.classList.remove("prj-polygon--hover");
                    this.activeIndexTooltip = null;
                }
            }
        },


        // ANIMATION
        // animation list
        animationList: function() {
            let delayAnimationList = 1000;
            let _this = this;
            var timer;

            clearTimeout(timer);
            timer = setTimeout(function(){
                const polygons = _this.$el.querySelectorAll(".prj-polygon");
                // console.log(polygons);
                Array.prototype.forEach.call(polygons, (polygon, i) => {
                    polygon.classList.add("prj-polygon--flesh-dark");
                });

                _this.$root.$options.anime({
                    targets: polygons,
                    loop: 1,
                    opacity: [
                        {value: '0'},
                        {value: '1'},
                        {value: '0'}
                    ],
                    duration: 500,
                    easing: 'easeInSine',
                    delay: function(el, i, l) {
                        return i * 50;
                    },

                    complete: function(anim) {
                        Array.prototype.forEach.call(polygons, (polygon, i) => {
                            polygon.classList.remove("prj-polygon--flesh-dark");
                            setTimeout(function() {
                                polygon.removeAttribute("style");
                            }, 500);
                        });
                    }
                });
            }, delayAnimationList);
        },

        // list animation
        listAnimation: function(el) {
            let items = this.$el.querySelectorAll(el);

            Array.prototype.forEach.call(items, (item, index) => {
                item.style.opacity = "0";
                item.style.transform = "scale(1.1)";
            });

            this.$root.$options.anime({
                targets: items,
                loop: 1,
                opacity: '1',
                scale: 1,
                duration: 800,
                easing: 'easeInCubic',
                delay: function(el, i, l) {
                    return i * 50;
                },
            });
        },

        // animation trigger
        animationTrigger: function() {
            this.animation = !this.animation;
        },


        // OTHERS
        // close modal
        closeModal() {
            this.$store.commit('closeModal');
        },

        // handler function
        handler: function() {

            // keyup "left" / prev floor
            if (event.keyCode === 37) {
                this.prevFloor();
            }

            // keyup "right" / next floor
            if (event.keyCode === 39) {
                this.nextFloor();
            }

            // keyup "down" / prev section
            if (event.keyCode === 40) {
                this.changeSection(this.sectionIndex - 1);
            }

            // keyup "up" / next section
            if (event.keyCode === 38) {
                this.changeSection(this.sectionIndex + 1);
            }
        },

        // handler resize function
        handleResize: function() {
            this.bp = this.$root.$options.breakpoint.value;
            this.addTooltipsPosition();
        },
    },


    // computed
    computed: {

        // if is desktop
        isDesktop() {
            return this.bp == 'desktop';
        },

        // if prj has full floor plan style
        isFullFloorPlan() {
            let getPrjStyle = this.$store.getters.getCurrentProjectStyle(this.currentProject);
            return getPrjStyle.full_floor_plan;
        },

        // is pseudo corp (change only title ("section" => "corp"))
        isPseudoCorp() {
            if (this.project.hasOwnProperty('settings') && this.project["settings"].hasOwnProperty('pseudo-corp') && this.project['settings']['pseudo-corp'] === true) {
                return true;
            } else {
                return false;
            }
        },


        // PROJECT
        // get active project
        project() {
            return this.$store.getters.getCurrentProject(this.currentProject);
        },


        // SECTION
        // get active section index
        sectionIndex() {
            return this.$store.state.prjCurrentSection;
        },

        // get all active sections
        sections() {
            return this.$store.getters.getSections(this.currentProject);
        },

        // get active section
        section() {
            return this.sections[this.sectionIndex];
        },

        // get all sections titles
        sectionsTitles() {
            let arrTitles = [];
            Array.prototype.forEach.call(this.sections, (section, index) => {
                arrTitles.push(section.section_title);
            });
            return arrTitles;
        },


        // FLOOR
        // get active floor index
        floorIndex() {
            return this.$store.state.prjCurrentFloor;
        },

        // get all active floors
        floors() {
            return this.$store.getters.getFloors(this.currentProject, this.sectionIndex);
        },

        // get active floor
        floor() {
            return this.floors[this.floorIndex];
        },

        // get current floor + 1
        currentFloorTitle() {
            return this.$store.state.prjCurrentFloor + 1;
        },

        // floor image
        floorImage: function() {
            let floorImage;

            // if floor has type multilevel
            if(this.$root.$options.methods.checkFloorMultilevel(this.floor)) {
                let levelIndex = this.flrMltCurrentLevel;
                floorImage = this.floor.floor_image[levelIndex];
            }

            // if floor has image
            else if(this.floor.floor_image) {
                floorImage = this.floor.floor_image;
            }

            // if floor has not image return false
            else {
                floorImage = false;
            }

            return floorImage;
        },


        // FLOOR MULTILEVEL
        // floor has type multilevel
        floorTypeMultilevel: function() {
            return this.$root.$options.methods.checkFloorMultilevel(this.floor);
        },

        // multilevel length
        flrMltLength: function() {
            return this.floor.floor_image.length;
        },

        // multilevel current level
        flrMltCurrentLevel: function() {
            return this.$store.state.prjCurrentMultilevel;
        },
    },
}
</script>
