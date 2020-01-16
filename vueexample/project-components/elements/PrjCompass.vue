<template>
    <div class="prj-compass">
        <div class="prj-compass__box">

            <!-- Compass title -->
            <span class="prj-compass__title">{{ 'north' | translate }}</span>

            <!-- Compass icon -->
            <svg
                class="prj-compass__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="100" height="128"
                viewBox="0 0 100 128">
                <defs><clipPath id="a"><path d="M0 841.9h595.3V0H0z"/></clipPath></defs>
                <g clip-path="url(#a)" transform="matrix(.24085 0 0 -.24607 -23 152.5)">
                    <path d="M423.3 366.3H511l-93 29.5a120.3 120.3 0 0 1-107 83.9l-.1-24a96.3 96.3 0 0 0 88.5-88.4v-.9h2.7zM310.4 264h-.6l-.4-164 29.8 145.3c46.5 14.6 81 56.7 84 107.2h-24a96.3 96.3 0 0 0-88.8-88.5m-13.6 191.9l.5 164-29.9-145.4a120.3 120.3 0 0 1-83.9-107.1l24-.1a96.3 96.3 0 0 0 89.3 88.6m-89.3-102.6h-.2v.2l-111.6.2 93.1-29.7A120.3 120.3 0 0 1 296 240l.1 24a96.3 96.3 0 0 0-88.5 89.3M334 358l26.2-.1-27.7-7.4a30.8 30.8 0 0 0-27.5-21.2v6c12 1 21.8 10.5 22.8 22.5v.2h.7zm-28.7 26.4h-.1l.2 32.4 7.3-27.6a30.8 30.8 0 0 0 21.3-27.6h-6.1a24.6 24.6 0 0 1-22.6 22.8m-3.9-49l-.1-32.4-7.4 27.7a30.8 30.8 0 0 0-21.3 27.6h6.2c.8-12.2 10.5-22 22.6-22.9m-22.6 26.4l-32.4.2 27.7 7.4a30.8 30.8 0 0 0 27.6 21.2v-6.1a24.6 24.6 0 0 1-23-22.7m24.3-10a9.3 9.3 0 1 0 0 18.7 9.3 9.3 0 0 0 0-18.7"/>
                </g>
            </svg>

        </div>
    </div>
</template>





<script>
export default {
    name: 'PrjCompass',
    props: ['degree'],


    // data
    data: function() {
        return {
            "defaultNorthDegree": 0,
        }
    },


    // mounted
    mounted() {
        this.rotateCompass();
    },


    // watch
    watch: {
        degree: function() {
            this.rotateCompass();
        }
    },


    // methods
    methods: {

        // rotate compass
        rotateCompass: function() {
            const compass = this.$el.querySelector('.prj-compass__box');
            const title = this.$el.querySelector('.prj-compass__title');

            // get degree
            let degree = (this.northDegree < 180) ? this.northDegree : - (360 - this.northDegree);

            // animation options
            const options = {
                "duration": 1500,
                "delay": 500,
                "elasticity": 500
            }

            // rotate icon
            this.$root.$options.anime({
                targets: compass,
                loop: 1,
                rotate: degree,
                duration: options.duration,
                delay: options.delay,
                elasticity: options.elasticity,
                easing: 'easeOutBack'
            });

            // rotate title
            this.$root.$options.anime({
                targets: title,
                loop: 1,
                rotate: - degree,
                duration: options.duration,
                delay: options.delay,
                elasticity: options.elasticity,
                easing: 'easeOutBack'
            });
        },
    },


    // computed
    computed: {

        // north degree (check and return)
        northDegree: function() {
            let val = this.degree;

            // north degree is undefined
            if(typeof val === 'undefined') {
                console.log('north degree is undefined');
                return this.defaultNorthDegree;
            }

            // north degree is not a number
            else if(typeof val !== 'number') {
                console.log('north degree is not a number');
                return this.defaultNorthDegree;
            }

            // north degree is more than 360 or degree is < 0
            else if(val > 360 && val < 0) {
                console.log('north degree is more than 360 or degree is < 0');
                return this.defaultNorthDegree;
            }

            // return val
            else {
                return val;
            }
        }
    },
}
</script>
