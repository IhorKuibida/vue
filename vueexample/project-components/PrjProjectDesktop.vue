<template>
    <div class="prj-project">

        <!-- Project content -->
        <div class="section-prj-main__content">

            <!-- Project title -->
            <transition
                enter-active-class="animated fadeInLeft"
                leave-active-class="animated animated--out fadeOutRight">
                <h1 class="section__title" :key="statusDay">
                    {{ project.complex_name }}
                </h1>
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
                        @click="openModal('default', 0, true)"
                        :key="statusDay">{{ 'view_plans' | translate }}</button>
                </transition>
            </div>
            <!-- end Project btn -->

            <!-- Project sticker -->
            <transition enter-active-class="sticker--animated">
                <span
                    class="sticker sticker--lg"
                    :class="{'sticker--black' : statusDay}"
                    :key="statusDay"
                    v-if="completed">{{ 'completed' | translate }}</span>
            </transition>
            <!-- end Project sticker -->

        </div>
        <!-- end Project content -->


        <div class="prj-project__nav-corps" v-if="!completed && corps.length > 1">

            <!-- Corps(черга) navigation -->
            <nav-buttons
                v-if="!statusPanorama"
                v-bind:valDefault="corpIndex + 1"
                v-bind:valCaption="'corp'"
                v-bind:valCaptionPlural="'corps'"
                v-bind:valMin="1"
                v-bind:valMax="corps.length"
                v-bind:btnPrevTitle="(corpIndex > 0) ? corps[corpIndex - 1].title_corps : ''"
                v-bind:btnNextTitle="(corpIndex < corps.length - 1) ? corps[corpIndex + 1].title_corps : ''"
                v-on:newValue="changeCorps($event)"
            ></nav-buttons>
            <!-- end Corps(черга) navigation -->

            <!-- Corps btn -->
            <button
                v-for="c in сorp.corp"
                :key="'corp_' + c.title"
                v-if="isDesktop"
                class="btn btn--lg btn--black"
                @focus="visibleCorpPoligon( 'corp_' + c.title )"
                @blur="hiddenCorpPoligon( 'corp_' + c.title )"
                @mouseover="visibleCorpPoligon( 'corp_' + c.title )"
                @mouseleave="hiddenCorpPoligon( 'corp_' + c.title )"
            >{{ c.title }}&nbsp;{{ 'corp' | translate }}</button>
            <!-- end Corps btn -->
        </div>


        <!-- Tooltip wrapper -->
        <template
            v-for="section in currentSectionsCorps"
            v-if="!completed && isDesktop"
        >
            <div
                class="prj-tooltip-wrapper"
                v-for="(floor, index_floor) in section.floors"
                :key="'tooltip-' + section.section_title + '-' + index_floor"
                :data-tooltip-index="section.section_title + '-' + index_floor"
                v-if="floor.floor_coords && floor.flats && floor.status !== 'disabled' && floor.type != 'parking'">

                <!-- Tooltip -->
                <transition
                    v-on:before-enter="beforeEnterTooltip"
                    enter-active-class="animated"
                    leave-active-class="animated animated--out">

                    <div
                        class="prj-tooltip"
                        v-show="(section.section_title + '-' + index_floor) == activeIndexTooltip">

                        <h3 class="prj-tooltip__heading">
                            <span class="prj-tooltip__heading-nbr">{{ floor.title }}</span>
                            {{ 'floor' | translate }}
                        </h3>

                        <h4 class="prj-tooltip__sub-heading" v-if="currentSectionsCorps.length > 1 || corps.length > 1">
                            <template v-if="isPseudoCorp">{{ 'corp' | translate }}</template>
                            <template v-else>{{ 'section' | translate }}</template>
                            {{ section.section_title }}
                        </h4>

                        <dl class="prj-tooltip__list">
                            <!-- <dt class="prj-tooltip__title">{{ 'apartments_for_sale' | translate }}</dt> -->

                            <template v-for="(value, key) in tooltipsInfo">
                                <dd class="prj-tooltip__value" v-if="key=='comercial' || key=='penthouse'">{{ $t(key) | translate }} - {{ value }}</dd>
                                <dd class="prj-tooltip__value" v-else>{{ key }}-{{ '-rooms' | translate }} - {{ value }}</dd>
                            </template>
                        </dl>
                    </div>
                </transition>
                <!-- end Tooltip -->

            </div>
        </template>
        <!-- end Tooltip wrapper -->


        <!-- Project render -->
        <div class="prj-projects-render" >

            <!-- Image day -->
            <transition
                enter-active-class="animated fadeIn"
                leave-active-class="animated animated--out fadeOut" >

                <picture
                    :class="'prj-projects-render__picture prj-projects-render__picture--' + сorpImgPosition.toLowerCase()"
                    v-if="statusDay" :key="corpIndex" >
                    <!-- <source
                        :srcset="сorp.image_day + '--lg.webp'"
                        type="image/webp"
                        media="(min-width: 1024px)" > -->

                    <!-- <source
                        :srcset="сorp.image_day + '--lg.jpg'"
                        media="(min-width: 1024px)" > -->

                    <!-- <source
                        :srcset="сorp.image_day + '--lp.webp'"
                        type="image/webp"
                        media="(min-width: 768px)" > -->

                    <!-- <source
                        :srcset="сorp.image_day + '--lp.jpg'"
                        media="(min-width: 768px)" > -->

                    <source
                        :srcset="сorp.image_day + '--lg.webp'"
                        type="image/webp"
                    >
                    <img
                        :src="сorp.image_day + '--lg.jpg'"
                        :alt="project.complex_name"
                    >
                </picture>
            </transition>
            <!-- end Image day -->

            <!-- Image night -->
            <transition
                enter-active-class="animated fadeIn"
                leave-active-class="animated animated--out fadeOut">

                <picture
                    :class="'prj-projects-render__picture prj-projects-render__picture--' + сorpImgPosition.toLowerCase()" v-if="statusNight"
                    :key="corpIndex" >
                    <!-- <source
                        :srcset="сorp.image_night + '--lg.webp'"
                        type="image/webp"
                        media="(min-width: 1024px)" > -->

                    <!-- <source
                        :srcset="сorp.image_night + '--lg.jpg'"
                        media="(min-width: 1024px)" > -->

                    <!-- <source
                        :srcset="сorp.image_night + '--lp.webp'"
                        type="image/webp"
                        media="(min-width: 768px)" > -->

                    <!-- <source
                        :srcset="сorp.image_night + '--lp.jpg'"
                        media="(min-width: 768px)" > -->

                    <source
                        :srcset="сorp.image_night + '--lg.webp'"
                        type="image/webp"
                    >
                    <img
                        :src="сorp.image_night + '--lg.jpg'"
                        :alt="project.complex_name"
                    >
                </picture>
            </transition>
            <!-- end Image night -->


            <svg
                class="prj-projects-render__svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1900 1069"
                v-bind:preserveAspectRatio="сorpImgPosition + ' slice'"
                v-if="isDesktop" >

                <!-- Gradient -->
                <defs>
                    <linearGradient
                        class="prj-projects-render__gradient"
                        :class="{
                            'prj-projects-render__gradient--day': statusDay,
                            'prj-projects-render__gradient--night': statusNight
                        }"
                        id="grad"
                        x1="0%" y1="0%" x2="100%" y2="0%"
                        gradientUnits="userSpaceOnUse">

                        <stop offset="10%" v-bind:style="{ stopOpacity: '1' }" />
                        <stop offset="50%" v-bind:style="{ stopOpacity: '0' }" />
                    </linearGradient>
                </defs>
                <!-- end Gradient -->

                <!-- Gradient rect -->
                <rect x="-5px" y="0" width="50%" height="100%" fill="url(#grad)"></rect>

                <!-- Polygon group -->
                <g
                    class="prj-projects-render__group"
                    v-for="section in currentSectionsCorps"
                    :key="'group-' + section.section_title"
                    v-if="!completed">

                    <!-- Polygon -->
                    <template
                        v-for="(floor, index_floor) in section.floors"
                        v-if="floor.floor_coords && floor.flats && floor.status !== 'disabled'">
                        <polygon
                            class="prj-polygon"
                            :key="'polygon-' + section.section_title + '-' + index_floor"
                            :points="floor.floor_coords"
                            :data-polygon-index="section.section_title + '-' + index_floor"
                            @click="openModal(section.section_title, index_floor)"
                            @mouseover="openTooltip(section.section_title, index_floor)"
                            @mouseleave="closeTooltip(section.section_title, index_floor)"/>
                    </template>
                    <!-- end Polygon -->

                </g>
                <!-- end Polygon group -->

                <!-- Polygon corps group -->
                <g v-if="!completed && corps.length > 1">
                    <polygon
                        v-for="c in сorp.corp"
                        :key="'corp_polygon_' + c.title"
                        class="prj-polygon prj-polygon--brown prj-polygon--disabled"
                        :points="c.corp_coords"
                        :data-corp-index="'corp_' + c.title"
                    />
                </g>
                <!-- end Polygon corps group -->
            </svg>
        </div>
        <!-- end Project render -->


        <!-- Decoration (gradient) -->
        <transition
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated animated--out fadeOutRight">

            <!-- day -->
            <span class="prj-project__decor prj-project__decor--day" v-if="statusDay"></span>
        </transition>

        <transition
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated animated--out fadeOutRight">

            <!-- night -->
            <span class="prj-project__decor prj-project__decor--night" v-if="statusNight"></span>
        </transition>
        <!-- end Decoration (gradient) -->

    </div>
</template>





<script>
import NavButtons from './elements/NavButtons.vue';

export default {
    name: 'PrjProjectDesktop',
    components: { NavButtons },


    // data
    data: function() {
        return {
            "activeIndexTooltip": null,
            "tooltipsInfo": null,
            "currentProject": this.$store.state.prjCurrentProject,
            "bp": this.$root.$options.breakpoint.value,
        }
    },


    // mounted
    mounted() {
        this.addTooltipsPosition();
        this.animationList();
        window.addEventListener('resize', this.handleResize);
    },


    // watch
    watch: {
        corpIndex: function () {
            this.animationList();

            let _this = this;
            setTimeout(function(){
                _this.addTooltipsPosition();
            }, 1100);
        },
    },


    // destroyed
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },


    // methods
    methods: {

        // CORPS
        // change Corps
        changeCorps(nmbr) {
            this.$store.commit('prjPushCorp', (nmbr - 1));

            // get first section in corps array
            let getFrstSection = this.currentSectionsCorps[0].section_title;

            // find by section_title section index in global array sections
            let getIndexSection = this.$store.getters.getSectionIndexFromTitle(this.currentProject, getFrstSection);

            // push to state
            this.$store.commit('prjPushSection',  getIndexSection);
        },

        // open modal (open floor)
        openModal(indxSection, indxFloor, first = false) {
            let getSectionIndex;
            let getFloorIndex;

            // open first enebled floor
            if (first) {
                // if indxSection has default => get index section from state
                if (indxSection === 'default') {
                    getSectionIndex = this.$store.state.prjCurrentSection;
                } else {
                    getSectionIndex = indxSection;
                }

                getFloorIndex = this.$store.getters.returnEnabledFloor(this.currentProject, getSectionIndex);
            }

            // open concret floor
            else {
                getSectionIndex = this.$store.getters.getSectionIndexFromTitle(this.currentProject, indxSection);
                getFloorIndex = indxFloor;
            }

            this.$store.commit('prjPushProject', this.currentProject);
            this.$store.commit('prjPushSection', getSectionIndex);
            this.$store.commit('prjPushFloor', getFloorIndex);

            this.$store.commit('openModal');
            this.$store.commit('prjOpenFloor');
        },

        // add tooltips position
        addTooltipsPosition() {
            const tooltips = this.$el.querySelectorAll("[data-tooltip-index]"); // get all tooltip elements
            const polygons = this.$el.querySelectorAll("[data-polygon-index]"); // get all area(polygon) elements

            const rootSection = document.querySelector(".wrapper"); // get root modal el
            const rootSectionWidth = rootSection.getBoundingClientRect().width;
            const rootSectionHeight = rootSection.getBoundingClientRect().height;

            const rootBlock = this.$el; // get root el block (parent block relative)
            const rootBlockWidth = rootBlock.getBoundingClientRect().width;
            const rootBlockHeight = rootBlock.getBoundingClientRect().height;
            const rootBlockBottomOffset = rootBlock.getBoundingClientRect().bottom;

            const getLftMrg = (rootSectionWidth - rootBlockWidth) / 2;
            const getTopMrg = rootBlockBottomOffset - rootBlockHeight;

            const additionalIndent = 30; // additional indent

            Array.prototype.forEach.call(polygons, (polygon, i) => {
                const polygonWidth = polygon.getBoundingClientRect().width;
                const polygonHeight = polygon.getBoundingClientRect().height;

                const polygonTopOffset = polygon.getBoundingClientRect().top;
                const polygonLeftOffset = polygon.getBoundingClientRect().left;
                const polygonRightOffset = polygon.getBoundingClientRect().right;

                // Left value
                if (rootSectionWidth/2 > (polygonLeftOffset + polygonWidth/2)) {
                    // tooltip in left
                    let leftVal = Math.round(polygonRightOffset - getLftMrg + additionalIndent);
                    tooltips[i].style.left = leftVal + "px";
                    tooltips[i].classList.add("prj-tooltip-wrapper--right");
                }
                else {
                    // tooltip in right
                    let leftVal = Math.round(polygonLeftOffset - getLftMrg - additionalIndent);
                    tooltips[i].style.left =  leftVal + "px";
                    tooltips[i].classList.add("prj-tooltip-wrapper--left");
                }

                // Top value
                let topVal = Math.round(polygonTopOffset - getTopMrg + polygonHeight/2);
                tooltips[i].style.top = topVal + "px";
                if(topVal > rootBlockHeight - 150) {
                    tooltips[i].classList.add("prj-tooltip-wrapper--bottom");
                }
                else if(topVal < 150) {
                    tooltips[i].classList.add("prj-tooltip-wrapper--top");
                }
            });
        },

        beforeEnterTooltip: function(el) {
            if (el.parentNode.classList.contains('prj-tooltip-wrapper--left')) {
                el.classList.add("prj-tooltip--arr-right");
            }
            else if (el.parentNode.classList.contains('prj-tooltip-wrapper--right')) {
                el.classList.add("prj-tooltip--arr-left");
            }

            if (el.parentNode.classList.contains('prj-tooltip-wrapper--top')) {
                el.classList.add("prj-tooltip--arr-top");
            }
            else if (el.parentNode.classList.contains('prj-tooltip-wrapper--bottom')) {
                el.classList.add("prj-tooltip--arr-bottom");
            }
        },

        // open tooltip
        openTooltip: function(indxSection, indxFloor) {
            const getPolygonEl = this.$el.querySelector("[data-polygon-index='" + indxSection + "-" + indxFloor + "']");
            const getTooltipWrEl = this.$el.querySelector("[data-tooltip-index='" + indxSection + "-" + indxFloor + "']");
            const getPolygonElIndex = getPolygonEl.dataset.polygonIndex;
            getPolygonEl.classList.add("prj-polygon--hover");
            this.activeIndexTooltip = getPolygonElIndex;

            let getSectionIndex = this.$store.getters.getSectionIndexFromTitle(this.currentProject, indxSection);
            this.tooltipsInfo = this.$store.getters.getCountRooms(this.currentProject, getSectionIndex, indxFloor);
        },

        // close tooltip
        closeTooltip: function(indxSection, indxFloor) {
            const getPolygonEl = this.$el.querySelector("[data-polygon-index='" + indxSection + "-" + indxFloor + "']");
            getPolygonEl.classList.remove("prj-polygon--hover");
            this.activeIndexTooltip = null;
        },

        // handler resize function
        handleResize: function() {
            this.addTooltipsPosition();
            this.bp = this.$root.$options.breakpoint.value;
        },

        // animation list
        animationList: function() {
            let delayAnimationList = 3000;
            let _this = this;
            let timer;

            clearTimeout(timer);
            timer = setTimeout(function(){
                const polygons = _this.$el.querySelectorAll(".prj-projects-render__group .prj-polygon");

                Array.prototype.forEach.call(polygons, (polygon, i) => {
                    polygon.classList.add("prj-polygon--flesh");
                });

                _this.$root.$options.anime({
                    targets: polygons,
                    direction: 'alternate',
                    loop: 1,
                    opacity: [
                        {value: '0'},
                        {value: '1'},
                        {value: '0'},
                    ],
                    easing: 'easeInSine',
                    duration: function(el, i, l) {
                        return 200 + (i * 10);
                    },
                    delay: function(target, index) {
                        return index * 10;
                    },
                    elasticity: function(target, index, totalTargets) {
                        return 500 + ((totalTargets - index) * 50);
                    },

                    complete: function(anim) {
                        Array.prototype.forEach.call(polygons, (polygon, i) => {
                            polygon.classList.remove("prj-polygon--flesh");
                            setTimeout(function() {
                                polygon.removeAttribute("style");
                            }, 500);
                        });
                    }
                });
            }, delayAnimationList);
        },



        // visible corp poligon
        visibleCorpPoligon: function(index) {
            let svg = this.$el.querySelector('.prj-projects-render__svg');
            let polygon = svg.querySelector('[data-corp-index=' + index + ']');
            polygon.classList.remove('prj-polygon--disabled');
        },

        // hidden corp poligon
        hiddenCorpPoligon: function(index) {
            let svg = this.$el.querySelector('.prj-projects-render__svg');
            let polygon = svg.querySelector('[data-corp-index=' + index + ']');
            polygon.classList.add('prj-polygon--disabled');
        }
    },


    // computed
    computed: {

        // if is desktop
        isDesktop() {
            return this.bp == 'desktop';
        },

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

        // status panorama
        statusPanorama() {
            return this.$store.state.prjPanorama;
        },
        // get project
        project() {
            return this.$store.getters.getCurrentProject(this.currentProject);
        },

        // is pseudo corp (change only title ("section" => "corp"))
        isPseudoCorp() {
            if (this.project.hasOwnProperty('settings') && this.project["settings"].hasOwnProperty('pseudo-corp') && this.project['settings']['pseudo-corp'] === true) {
                return true;
            } else {
                return false;
            }
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

        // get image position
        сorpImgPosition() {
            let position, x, y;
            let сorp = this.сorp;

            // x
            if (сorp.hasOwnProperty('pocition_x')) {
                let getX = сorp['pocition_x'];
                switch (getX) {
                    case 'left':
                        x = 'Min';
                        break;

                    case 'right':
                        x = 'Max';
                        break;

                    default:
                        x = 'Mid';
                }
            } else {
                x = 'Mid';
            }

            // y
            if (сorp.hasOwnProperty('pocition_y')) {
                let getY = сorp['pocition_y'];
                switch (getY) {
                    case 'top':
                        y = 'Min';
                        break;

                    case 'bottom':
                        y = 'Max';
                        break;

                    default:
                        y = 'Mid';
                }
            } else {
                y = 'Mid';
            }

            position = 'x' + x + 'Y' + y; // example - xMidYMid (svg)
            return position;
        },

        // get current sections in one corps
        currentSectionsCorps() {
            return this.$store.getters.getSectionsCorp(this.currentProject, this.corpIndex);
        },
    },
}
</script>
