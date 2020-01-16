<template>
    <nav
        class="nav-up-down"
        :class="{'nav-up-down--xs' : smallStyle}">

        <!-- Up btn -->
        <transition
            enter-active-class="animated fadeInUp"
            leave-active-class="animated animated--out fadeOutDown">

            <button
                class="nav-up-down__btn nav-up-down__btn--up"
                @click="up()"
                v-if="(value + 1) < valueMax">

                <svg class="nav-up-down__btn-arr" xmlns="http://www.w3.org/2000/svg" width="18.5" height="9.5" viewBox="0 0 18.5 9.5">
                    <path fill="none" d="M1.35 7.5L9.342.507 17.334 7.5"/>
                </svg>
                <span class="visually-hidden">{{ buttonUpTitle | translate }}</span>
            </button>
        </transition>
        <!-- end Up btn -->


        <!-- Value -->
        <div class="nav-up-down__value">
            <transition
                enter-active-class="animated fadeInRight"
                leave-active-class="animated animated--out fadeOutLeft"
                mode="out-in">

                <span
                    class="nav-up-down__value-nmbr"
                    :class="{'nav-up-down__value-nmbr--xs' : valueTitle.length > 3}"
                    :key="value">{{ valueTitle }}</span>
            </transition>
            <span class="nav-up-down__value-txt">{{ valueСaption | translate }}</span>
        </div>
        <!-- end Value -->


        <!-- Down btn -->
        <transition
            enter-active-class="animated fadeInDown"
            leave-active-class="animated animated--out fadeOutUp">

            <button
                class="nav-up-down__btn nav-up-down__btn--down"
                @click="down()"
                v-if="value > valueMin">

                <svg
                    class="nav-up-down__btn-arr" xmlns="http://www.w3.org/2000/svg" width="17.5" height="9.5">
                    <path fill="none" d="M16.494 1.274L8.502 8.493.51 1.274"/>
                </svg>
                <span class="visually-hidden">{{ buttonDownTitle | translate }}</span>
            </button>
        </transition>
        <!-- end Down btn -->
    </nav>
</template>





<script>
export default {
    name: 'NavUpDown',
    props: ['small', 'valTitle', 'valCaption', 'valDefault', 'valMin', 'valMax', 'btnUpTitle', 'btnDownTitle', 'handlerStatus' ],


    // data
    data: function() {
        return {
            "smallStyle": this.small,
            "valueTitleDefault": this.valTitle,
            "valueСaption": this.valCaption,
            "valueDefault": this.valDefault,
            "valueMin": this.valMin,
            "valueMax": this.valMax,
            "buttonUpTitle": this.btnUpTitle,
            "buttonDownTitle": this.btnDownTitle,
        }
    },


    // mounted
    mounted() {
        if (this.handlerStatus) {
            window.addEventListener('keyup', this.handler);
        }
    },


    // destroyed
    destroyed() {
        if (this.handlerStatus) {
            window.removeEventListener('keyup', this.handler);
        }
    },


    // watch
    watch: {

        valTitle: function(val) {
            this.valueTitle = val;
        }
    },


    // methods
    methods: {

        // up
        up: function() {
            this.value = +1;
            this.$emit('newValue', this.value);
        },

        // down
        down: function() {
            this.value = -1;
            this.$emit('newValue', this.value);
        },

        // handler function
        handler: function() {

            // keyup "up"
            if (event.keyCode === 38) {
                this.up();
            }

            // keyup "down"
            if (event.keyCode === 40) {
                this.down();
            }
        },
    },


    // computed
    computed: {

        // value
        value: {
            get: function () {
                return this.valueDefault;
            },
            set: function (val) {
                let newValue = this.valueDefault + val;

                if (newValue >= this.valueMin && newValue < this.valueMax) {
                    this.valueDefault = newValue;
                }
            }
        },

        // value title
        valueTitle: {
            get: function () {
                return this.valueTitleDefault;
            },
            set: function (val) {
                this.valueTitleDefault = val;
            }
        }
    },
}
</script>
