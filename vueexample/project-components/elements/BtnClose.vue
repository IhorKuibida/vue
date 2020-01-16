<template>
    <button
        class="btn-circle btn-circle--bg btn-circle--t-close"
        @click="$emit('btnСlicked')">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20">
            <path d="M20.274 18.66l-.879.879-8.881-8.881-9.334 9.334-.891-.892 9.333-9.333L.742.886l.879-.879 8.881 8.88L19.205.184l.891.892-8.703 8.703 8.881 8.881z" />
        </svg>
        <span class="visually-hidden">{{ title | translate }}</span>
    </button>
</template>





<script>
export default {
    name: 'BtnClose',
    props: ['btnTitle'],


    // data
    data: function() {
        return {
            "defaultTitle": "Close",
        }
    },


    // computed
    computed: {

        // title (check and return)
        title: function() {
            const getTitle = this.btnTitle;

            // btn title is undefined
            if(typeof getTitle === 'undefined') {
                return this.defaultTitle;
            }

            // btn title is not a string
            else if(typeof getTitle !== 'string') {
                return this.defaultNorthDegree;
            }

            // return btn title
            else {
                return getTitle;
            }
        }
    },
}
</script>
