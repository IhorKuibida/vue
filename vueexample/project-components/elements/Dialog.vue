<template>
    <transition
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutUp">

        <section
            class="dialog"
            :class="{ 'dialog--dark' : style == 'dark' }" >

            <div class="dialog__inner container" role="dialog">

                <transition appear appear-active-class="animated bounceIn">
                    <btn-close
                        :class="'dialog__nav-close'"
                        btnTitle="Close"
                        v-on:btnСlicked="$emit('btnCloseСlicked')" >
                    </btn-close>
                </transition>

                <div class="dialog__content" role="document">
                    <slot></slot>
                </div>
            </div>
        </section>
    </transition>
</template>





<script>
import BtnClose from './BtnClose.vue';

export default {
    name: 'Dialog',
    props: ['dialogStyle'],
    components: { BtnClose },


    // data
    data: function() {
        return {
            "style": this.dialogStyle,
        }
    },


    // methods
    methods: {

    },
}
</script>
