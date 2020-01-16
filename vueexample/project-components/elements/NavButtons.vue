<template>
    <!-- Corps buttons -->
    <nav class="nav-buttons">

        <!-- Prev corps -->
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated animated--out fadeOut">
            <button
                class="btn-circle btn-circle--bg btn-circle--title-inside nav-buttons__btn nav-buttons__btn--prev"
                @click="prev()"
                v-if="value > valueMin"
            >
                <svg class="btn-circle__b" xmlns="http://www.w3.org/2000/svg" width="10.5" height="19.5" viewBox="0 0 10.5 19.5">
                    <path class="btn-circle__i" fill="none" d="M9.5 1.35l-7 8 7 7.98"/>
                </svg>

                <span class="btn-circle__t"
                    :class="{ 'btn-circle__t--sm' : isPlural(buttonPrevTitle) }"
                >
                    <template v-if="isPlural(buttonPrevTitle)">
                        <span v-if="buttonPrevTitle === 'parking'">{{'parking' | translate}}</span>
                        <span v-else-if="buttonPrevTitle === 'comercial_btn'">{{'comercial_btn' | translate}}</span>
                        <span v-else>
                            {{ buttonPrevTitle }}
                            {{ valueСaptionPlural | translate }}
                        </span>
                    </template>
                    <template v-else>
                        {{ buttonPrevTitle }}&nbsp;{{ valueСaption | translate }}
                    </template>
                </span>
            </button>
        </transition>
        <!-- end Prev corps -->

        <!-- Next corps -->
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated animated--out fadeOut">
            <button
                class="btn-circle btn-circle--bg btn-circle--title-inside nav-buttons__btn nav-buttons__btn--next"
                @click="next()"
                v-if="value < valueMax"
            >
                <svg class="btn-circle__b" xmlns="http://www.w3.org/2000/svg" width="10.5" height="19.5" viewBox="0 0 10.5 19.5">
                    <path class="btn-circle__i" fill="none" d="M1.5 1.35l7 8-7 7.98"/>
                </svg>

                <span class="btn-circle__t"
                    :class="{ 'btn-circle__t--sm' : isPlural(buttonNextTitle) }"
                >
                    <template v-if="isPlural(buttonNextTitle)">
                        <span v-if="buttonNextTitle === 'parking'">{{'parking' | translate}}</span>
                        <span v-else-if="buttonNextTitle === 'comercial_btn'">{{'comercial_btn' | translate}}</span>
                        <span v-else>
                            {{ buttonNextTitle }}
                            {{ valueСaptionPlural | translate }}
                        </span>
                    </template>
                    <template v-else>
                        {{ buttonNextTitle }}&nbsp;{{ valueСaption | translate }}
                    </template>
                </span>
            </button>
        </transition>
        <!-- end Next corps -->

    </nav>
    <!-- end Corps buttons -->
</template>





<script>
export default {
    name: 'NavButtons',
    props:  [ 'valDefault', 'valCaption', 'valCaptionPlural', 'valMin', 'valMax', 'btnPrevTitle', 'btnNextTitle'],


    // data
    data: function() {
        return {
            "valueDefault": this.valDefault,
            "valueСaption": this.valCaption,
            "valueСaptionPlural": this.valCaptionPlural,
            "valueMin": this.valMin,
            "valueMax": this.valMax,
            "buttonPrevTitle": this.btnPrevTitle,
            "buttonNextTitle": this.btnNextTitle,
        }
    },


    // mounted
    mounted() {
        // console.log(this.btnPrevTitle);
        // console.log(this.btnNextTitle);
    },


    // watch
    watch: {

        // watch prev
        btnPrevTitle: function(val) {
            this.getBtnPrevTitle = val;
            // console.log(val);
        },

        // watch prev
        btnNextTitle: function(val) {
            this.getBtnNextTitle = val;
            // console.log(val);
        }
    },


    // methods
    methods: {

        // prev
        prev: function() {
            this.value = -1;
            this.$emit('newValue', this.value);
        },

        // next
        next: function() {
            this.value = +1;
            this.$emit('newValue', this.value);
        },

        //
        isPlural: function(val) {
            return (val.length > 1);
        }
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

                if (newValue >= this.valueMin && newValue <= this.valueMax) {
                    this.valueDefault = newValue;
                }
            }
        },

        // buttonPrevTitle title
        getBtnPrevTitle: {
            get: function () {
                return this.btnPrevTitle;
            },
            set: function (val) {
                this.buttonPrevTitle = val;
            }
        },

        // buttonPrevTitle title
        getBtnNextTitle: {
            get: function () {
                return this.btnNextTitle;
            },
            set: function (val) {
                this.buttonNextTitle = val;
            }
        }
    },
}
</script>
