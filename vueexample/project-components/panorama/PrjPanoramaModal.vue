<template>
    <cmp-dialog
        dialogStyle="dark"
        v-on:btnCloseСlicked="closeModal()" >

        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <iframe class="_iframe" :src="iframeSrc" frameborder="0"></iframe>
        </transition>

    </cmp-dialog>
</template>





<script>
import CmpDialog from '../elements/Dialog.vue';

export default {
    name: 'PrjPanoramaModal',
    components: { CmpDialog },


    // data
    data: function() {
        return {
            "iframeSrc": this.$store.state.prjPanoramaIframeUrl,
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
            this.$store.commit('closePanoramaModal');
        },

        // handler function
        handler: function() {

            // keyup "esc"
            if (event.keyCode === 27) {
                this.closeModal();
            }
        },
    },
}
</script>





<style>
    ._iframe {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 0;

        width: 100%;
        height: 100%;

        border: none;
        margin: 0;
        padding: 0;
    }

    ._iframe.animated {
        animation-delay: .5s;
    }
</style>