<template>
    <nav class="slider-nav-dots">

        <button
            v-for="(item, i) in valueLength"
            class="slider-nav-dots__bullet"
            :class="{ 'slider-nav-dots__bullet--active' : valueActive == i }"
            @click="valueActive = i, $emit('newValActive', i)">

            <span class="slider-nav-dots__text">
                <span v-if="dotValue[i] == 'parking'">{{ $t('parking') }}</span>
                <span v-else-if="dotValue[i] == 'comercial_btn'">{{ $t('comercial_btn') }}</span>
                <span v-else>
                    <strong v-if="!dotValue">{{ i + 1 }}</strong>
                    <strong v-else>{{ dotValue[i] }}</strong>
                    {{dotTitle | translate}}
                </span>
            </span>
        </button>

    </nav>
</template>





<script>
export default {
    name: 'NavDots',
    props: ['dotsArrTitle', 'dotsArrValue', 'valActive', 'valMin', 'valMax' ],


    // data
    data: function() {
        return {
            "dotTitle": this.dotsArrTitle,
            "dotValue": this.dotsArrValue,
            "valueActiveDefault": this.valActive,
            "valueMax": this.valMax,
            "valueMin": this.valMin,
        }
    },


    // mounted
    mounted() {

    },


    // watch
    watch: {
        valActive: function(val) {
            this.valueActive = val;
        }
    },


    // methods
    methods: {

    },


    // computed
    computed: {

        // value active
        valueActive: {
            get: function () {
                return this.valueActiveDefault;
            },
            set: function (val) {
                this.valueActiveDefault = val;
            }
        },

        // value length
        valueLength: {
            get: function () {
                return this.valueMax;
            },
            set: function (val) {

            }
        },
    },
}
</script>
