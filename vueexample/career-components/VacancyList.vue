<template>
    <dl class="characteristics-list">
        <template v-for="item in characteristics" v-if="item.title && item.value[0] !== ''">
            <dt class="characteristics-list__title" v-if="item.title">{{ item.title }}</dt>
            <dd class="characteristics-list__val" v-for="i in item.value">{{ i }}</dd>
        </template>
    </dl>
</template>





<script>
export default {
    name: 'VacancyList',
    props: ['list'],

    data: function() {
        return {
            'characteristics': this.list
        }
    },

    // mounted
    mounted() {
        // console.log(this.list);
    },
}
</script>
