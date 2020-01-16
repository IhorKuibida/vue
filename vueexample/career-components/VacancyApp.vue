<template>
    <div class="vacancy">
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
        >
            <div v-if="!statusForm">
                <h1 class="vacancy__heading h3">{{ $t('description_vacancy') }} <span>{{ position }}</span></h1>
                <vacancy-list
                    v-bind:list="characteristics"
                ></vacancy-list>
                <button
                    class="vacancy__btn btn-bg btn-bg--monospace"
                    v-on:click="openForm()"
                >{{ $t('send_resume') }} </button>
            </div>

            <form-add-resume
                v-bind:position="position"
                v-else
            ></form-add-resume>
        </transition>
    </div>
</template>





<script>
import VacancyList from './VacancyList.vue';
import FormAddResume from './FormAddResume.vue';
export default {
    name: 'VacancyApp',
    components: {
        VacancyList,
        FormAddResume
    },
    props: ['vacancy'],

    data: function() {
        return {
            'statusForm': false,
            'id': this.vacancy.id,
            'position': this.vacancy.position,
            'url': this.vacancy.url,
            'characteristics': this.vacancy.characteristics,
        }
    },

    // mounted
    mounted() {

    },

    // methods
    methods: {
        openForm() {
            this.statusForm = true;
        }
    },

    computed: {

    }
}
</script>
