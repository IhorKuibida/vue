<template>
    <div class="prj-projects" id="prjProjects">

        <!-- <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"> -->
            <prj-project-desktop></prj-project-desktop>
            <!-- <prj-project-desktop v-if="isDesktop"></prj-project-desktop>
            <prj-project-mobile v-if="!isDesktop"></prj-project-mobile> -->
        <!-- </transition> -->

    </div>
</template>





<script>
import PrjProjectDesktop from './PrjProjectDesktop.vue';
// import PrjProjectMobile from './PrjProjectMobile.vue';

export default {
    name: 'PrjProjects',
    components: { PrjProjectDesktop },


    // data
    data: function() {
        return {
            "currentProject": this.$store.state.prjCurrentProject,
            "bp": this.$root.$options.breakpoint.value,
            "mouseOutsideDoc": false,
        }
    },


    // mounted
    mounted() {
        this.checkQueryString();
        this.checkFromFilter();
        window.addEventListener('resize', this.handleResize);

        let _this = this;
        // user's mouse is inside the page.
        document.onmouseover = function() {
            if (_this.mouseOutsideDoc) {
                _this.mouseOutsideDoc = false;
            }
        }
        // user's mouse is outside the page.
        document.onmouseleave = function() {
            _this.mouseOutsideDoc = true;
        }
    },


    // destroyed
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },


    // watch
    watch: {
        '$route.query': function () {
            if (this.mouseOutsideDoc) {
                this.checkQueryString();
            }
        },

        '$store.state.prjModal': function () {
            this.replaceRoute();
        },

        '$store.state.prjApartmentStatus': function () {
            this.replaceRoute();
        },

        '$store.state.prjCurrentSection': function () {
            this.replaceRoute();
        },

        '$store.state.prjCurrentFloor': function () {
            this.replaceRoute();
        },

        '$store.state.prjCurrentApartment': function () {
            this.replaceRoute();
        },
    },


    // methods
    methods: {

        // replace route
        replaceRoute() {
            let queryParam = {};

            if (this.$store.state.prjModal) {
                queryParam["section"] = this.section["section_title"];
                queryParam["floor"] = this.floorIndex + 1;

                if (this.$store.state.prjApartmentStatus) {
                    queryParam["apartment"] = this.apartment["title"];
                }
            }

            this.$router.push({ path: '?', query: queryParam });
        },

        // check query string => open apartment
        checkQueryString: function() {
            let query = this.$route.query;
            var getSection = false,
                getFloor = false,
                getApartment = false;

            // check section
            if ('section' in query) {
                getSection = query.section;
            }

            // check floor
            if ('floor' in query) {
                getFloor = query.floor;
            }

            // check apartment
            if ('apartment' in query) {
                getApartment = query.apartment;
            }

            // check
            if (getSection !== false && getFloor !== false) {
                this.openApartment(getSection, (getFloor - 1), getApartment);
            }

            // else not query
            else {
                let statusModal = this.$store.state.prjModal;

                // if modal open => close modal
                if (statusModal) {
                    this.$store.commit('closeModal');
                }
            }
        },

        // open apartment
        openApartment(titlSection, indxFloor, titlApartment) {
            let indxSection = this.$store.getters.getSectionIndexFromTitle(this.currentProject, titlSection);

            this.$store.commit('prjPushSection', indxSection);
            this.$store.commit('prjPushFloor', indxFloor);

            this.$store.commit('openModal'); // open modal

            if (titlApartment !== false) {
                let indxApartment = this.$store.getters.getApartmentIndexFromTitle(this.currentProject, indxSection, indxFloor, titlApartment);
                this.$store.commit('prjPushApartment', indxApartment);
                this.$store.commit('prjOpenApartment');
            }
            else {
                this.$store.commit('prjOpenFloor');
            }
        },

        // handler resize function
        handleResize: function() {
            this.bp = this.$root.$options.breakpoint.value;
        },

        // check if transition from filters page
        checkFromFilter: function() {
            if (this.$root.$options.storage.getFromFltr()) {
                this.$store.commit('prjFromFltr');
                this.$root.$options.storage.removeFromFltr();
            }
        }
    },


    // computed
    computed: {

        // if is desktop
        isDesktop() {
            return this.bp == 'desktop';
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


        // APARTMENT
        // get active apartment index
        apartmentIndex() {
            return this.$store.state.prjCurrentApartment;
        },

        // get all active apartments
        apartments() {
            return this.$store.getters.getApartments(this.currentProject, this.sectionIndex, this.floorIndex);
        },

        // get active apartment
        apartment() {
            return this.apartments[this.apartmentIndex];
        },
    },
}
</script>
