<template>
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
        <section class="prj-modal" id="prjModal">
            <div class="prj-modal__container container">
                <div class="prj-modal__box">

                    <transition appear appear-active-class="animated bounceIn">
                        <btn-close
                            :class="'prj-modal__nav-close'"
                            btnTitle="Close"
                            v-on:btnСlicked="closeModal()">
                        </btn-close>
                    </transition>

                    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                        <prj-floor v-if="statusFloor"></prj-floor>
                    </transition>

                    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                        <prj-apartment v-if="statusApartment"></prj-apartment>
                    </transition>

                </div>
            </div>
        </section>
    </transition>
</template>



<script>
import PrjApartment from './PrjApartment.vue'
import PrjFloor from './PrjFloor.vue'
import BtnClose from './elements/BtnClose.vue';

export default {
    name: 'PrjModal',
    components: { PrjFloor, PrjApartment, BtnClose },


    // data
    data: function() {
        return {

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


    // methods
    methods: {

        // close modal
        closeModal() {
            this.$store.commit('closeModal');

            // if transition from filters page
            if (this.$store.state.prjFromFltrStatus) {
                // save status "From Project"
                this.$root.$options.storage.setFromPrj();

                let getLang = document.querySelector('html').getAttribute('lang');
                let lang = (getLang !== 'ua') ? getLang + '/' : '';
                window.location.href = lang + 'projects.html';
            }
        },

        // handler function
        handler: function() {

            // keyup "esc"
            if (event.keyCode === 27) {
                this.closeModal();
            }
        },
    },


    // computed
    computed: {
        statusFloor() {
            return this.$store.state.prjFloorStatus;
        },
        statusApartment() {
            return this.$store.state.prjApartmentStatus;
        },
    },
}
</script>
