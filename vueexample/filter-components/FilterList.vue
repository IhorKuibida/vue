<template>
    <div class="row" id="fllterList">
        <div class="filters-col col-xs-12 col-lg-3" v-bind:class="{ 'filters-col--open': showMobileFilter }">

            <div class="filters-col__head hidden-lg">
                <button type="button" class="btn btn--yellow-d" aria-hidden="true" @click="switchMobileModal(false)">{{ 'filter_submit' | translate }}</button>

                <span>({{flats.length}} {{ 'apartments' | translate }})</span>
            </div>

            <div class="filters">
                <div class="filter-box">
                    <h5 class="filter-box__title">{{ filterSelect.prjRegion.options.label }}</h5>
                    <div class="filter-btn-list">
                        <label class="fltr-btn" v-for="(data, index) in filterSelect.prjRegion.items">
                            <input
                                type="checkbox"
                                v-model="data.checked"
                                v-on:change="filter1()"
                                :disabled="ifDisabled(index,filterSelect.prjName.items)">
                            <span class="fltr-btn__label">{{data.label}}</span>
                        </label>
                    </div>
                </div>

                <div class="filter-box">
                    <h5 class="filter-box__title">{{ filterSelect.prjName.options.label }}</h5>
                    <div class="filter-btn-list">
                        <label class="fltr-btn" v-for="(data, index) in filterSelect.prjName.items">
                            <input
                                type="checkbox"
                                v-model="data.checked"
                                v-on:change="filter1()"
                                :disabled="ifDisabled(index,filterSelect.prjRegion.items)">
                            <span class="fltr-btn__label">{{data.label}}</span>
                        </label>
                    </div>
                </div>
                <div class="filter-box">
                    <h5 class="filter-box__title">{{ filterSelect.type.options.label }}</h5>
                    <div class="filter-btn-list">
                        <label class="fltr-btn" v-for="data in filterSelect.type.items">
                            <input type="checkbox" v-model="data.checked" v-on:change="filter1()">
                            <span class="fltr-btn__label">{{data.label}}</span>

                        </label>
                    </div>
                </div>
                <div class="filter-box">
                    <h5 class="filter-box__title">{{ filterSelect.prjFinish.options.label }}</h5>
                    <div class="filter-btn-list">
                        <label class="fltr-btn" v-for="data in filterSelect.prjFinish.items">
                            <input type="checkbox" v-model="data.checked" v-on:change="filter1()">
                            <span class="fltr-btn__label">{{data.label}}</span>
                        </label>
                    </div>
                </div>

                <div class="filter-box">
                    <h5 class="filter-box__title">{{ filterSelect.area.options.label }}</h5>
                    <div class="filter-box">
                        <div class="fltr-range">
                            <span class="fltr-range__value fltr-range__value--min" id="fltr-range__value--min">{{filterSelect.area.items.min.value}} {{filterSelect.area.items.min.label}}<sup>2</sup></span>
                            <span class="fltr-range__value fltr-range__value--max" id="fltr-range__value--max">{{filterSelect.area.items.max.value}} {{filterSelect.area.items.max.label}} <sup>2</sup></span>
                            <div class="fltr-range__line" id="range-7"></div>
                        </div>
                    </div>
                </div>

<!--                 <div class="filter-box">
   <h5 class="filter-box__title">{{ filterSelect.prjPlaces.options.label }}</h5>
   <div class="filter-btn-list">
       <label class="fltr-btn" v-for="data in filterSelect.prjPlaces.items">
           <input type="checkbox" v-model="data.checked" v-on:change="filter1()">
           <span class="fltr-btn__label">{{data.label}}</span>
       </label>
   </div>
               </div> -->

                <div class="filter-box">
                   <h5 class="filter-box__title">{{ filterSelect.flat_parameters.options.label }}</h5>
                   <div class="filter-btn-list">
                       <label class="fltr-btn" v-for="data in filterSelect.prjPlaces.items">
                           <input type="checkbox" v-model="data.checked" v-on:change="filter1()">
                           <span class="fltr-btn__label">{{data.label}}</span>
                       </label>
                       <label class="fltr-btn" v-for="data in filterSelect.flat_parameters.items">
                           <input type="checkbox" v-model="data.checked" v-on:change="filter1()">
                           <span class="fltr-btn__label">{{data.label}}</span>
                       </label>
                   </div>
               </div>

                <div class="filters__footer">
                    <button class="btn btn--yellow-d btn--multiline" @click="openOrderForm()">
                        <span class="btn__txt">{{ 'filter_consult_message' | translate }}</span>
                    </button>
                </div>

                <button class='btn btn--yellow-d' @click="cleanFilter()">{{ 'filters__clean' | translate }}</button>

                <button type="button" class="btn-circle btn-circle--bg btn-circle--t-close btn-circle--sm section-flats__close hidden-lg" aria-hidden="true" @click="switchMobileModal(false)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"><path fill-rule="evenodd" d="M20.274 18.66l-.879.879-8.881-8.881-9.334 9.334-.891-.892 9.333-9.333L.742.886l.879-.879 8.881 8.88L19.205.184l.891.892-8.703 8.703 8.881 8.881z"/></svg>
                </button>
            </div>
        </div>

        <div class="flats-list-col col-xs-12 col-lg-9">
            <h2 class="heading-flats h1" id="headingFlats">{{ 'picked' | translate }} <span class="heading-flats__highlight"><span>{{flats.length}}</span> {{ 'apartments' | translate }}</span></h2>

            <div class="table table-flats" id="tableFlats">
                <div class="table__heading">
                    <button class="btn btn--md btn--yellow-d section-flats__btn-open-filters" @click="switchMobileModal(true)">{{ 'filter_select_mob' | translate }}</button>

                    <div class="table__tr">
                        <span class="table__td table-flats__col-1">
                            {{ 'complex' | translate }}
                        </span>

                        <span class="table__td table-flats__col-2">
                            <span class="visible-lp">{{ 'rooms' | translate }}</span>
                            <span class="hidden-lp">{{ 'rooms_short' | translate }}</span>
                        </span>

                        <span class="table__td table-flats__col-3">
                            <span class="visible-lp">{{ 'section' | translate }}</span>
                            <span class="hidden-lp">{{ 'section_short' | translate }}</span>
                        </span>

                        <span class="table__td table-flats__col-4">
                            <span class="visible-lp">{{ 'floor' | translate }}</span>
                            <span class="hidden-lp">{{ 'floor_short' | translate }}</span>
                        </span>

                        <span class="table__td table-flats__col-5">
                            {{ 'area' | translate }}
                        </span>

                        <span class="table__td table-flats__col-6"></span>
                    </div>
                </div>

                <div class="table__body">
                    <div class="table__tr" v-for="(item, index) in flats" v-if="index <= listCount">
                        <span class="table__td table-flats__col-1">{{item.prjName}}</span>

                        <span class="table__td table-flats__col-2">
                            <template v-if="item.type=='comercial'">
                                <span class="visible-lg">{{ $t(item.type) | translate }}</span>
                                <span class="hidden-lg">{{ 'comercial_short' | translate }}*</span>
                            </template>
                            <template v-else-if="item.type=='penthouse'">
                                <span class="visible-lg">{{ $t(item.type) | translate }}</span>
                                <span class="hidden-lg">{{ 'penthouse_short' | translate }}**</span>
                            </template>
                            <template v-else>
                                {{ item.type }}
                            </template>
                        </span>

                        <span class="table__td table-flats__col-3">{{item.prjSection}}</span>
                        <span class="table__td table-flats__col-4">{{item.prjFloor}}</span>
                        <span class="table__td table-flats__col-5">{{item.area}}&nbsp;{{ 'm' | translate }}<sup>2</sup></span>
                        <span class="table__td table-flats__col-6">
                            <a class="btn btn--yellow-d" :href="getFlatLink(item)" @click="toPrjPage()">{{ 'more' | translate }}</a>
                        </span>
                    </div>
                </div>

                <div class="table__footer">
                    <button class="btn btn--md btn--yellow-d" @click="addItemToList()" v-if="flats.length > listCount">{{ 'filter_more' | translate }}</button>

                    <p class="hidden-lg">
                        <span>{{ 'comercial_short' | translate }}* - {{ 'comercial' | translate }}</span><br>
                        <span>{{ 'penthouse_short' | translate }}** - {{ 'penthouse' | translate }}</span><br>
                    </p>
                </div>
            </div>
        </div>

        <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
            <filter-form v-if="orderFormStatus()"></filter-form>
        </transition>
    </div>

</template>



<script>
import filterPrj from '../helpers/_goFilter.js';
import getFilterData from '../store/FilterData.js';
import filterForm from './filterForm.vue';

export default {
    name: 'FllterList',
    components: { filterForm },
    data: function() {
        return {
            flats: this.$store.getters.getAllApartments,
            show: show_filter,
            langPrefix: this.getCurrentLang(),
            showMobileFilter: false,
            minArea: null,
            maxArea: null,
            listCountStep: 10,
            listCount: 10,
            consultationFormData: {
                url: '',
                str: ''
            },
            filterSelect: getFilterData(this.$t)
        }
    },

    mounted() {
        let min_max = this.$store.getters.getAllApartments.map(sum => sum.area);
        this.maxArea = Math.max.apply(null, min_max.filter(n => !isNaN(n)));
        this.minArea = Math.min.apply(null, min_max.filter(n => !isNaN(n)));

        this.preInitFilters();

        this.slider(this.$parent.$options, this);
    },

    destroyed() {

    },

    methods: {

        filter1: function() {
            let dataAllApartments = this.$store.getters.getAllApartments;
            this.flats = filterPrj(this.filterSelect, dataAllApartments, this.$router, this.$t, this.consultationFormData, this.activeFilters);
            this.listCount = this.listCountStep;

            // list animation
            this.listAnimation('.table__body .table__tr');
        },

        cleanFilter: function() {
            this.$router.push({ path: '/'});

            var all = this.filterSelect;
             for (var item in all) {
                var it = all[item].items;
                let isArea = item == "area" ? true : false;
                for (var item2 in it) {
                    it[item2].checked = 0;

                    if (isArea && item2 == "min") {
                        it[item2].value = this.minArea;

                    }
                    if (isArea && item2 == "max") {
                        it[item2].value = this.maxArea;
                    }
                };
            };
            var keypressSlider = document.getElementById('range-7');
            keypressSlider.noUiSlider.updateOptions(
                {start: [ +this.filterSelect.area.items.min.value, +this.filterSelect.area.items.max.value ]}
            );

            this.filter1();

        },

        ifDisabled: function(index, filterObject) {

            let isChecked = 0,
                enableItems = [];

            for (let item in filterObject) {

                if(filterObject[item].checked){
                    isChecked++;

                    if( Array.isArray(filterObject[item].region) ){
                        enableItems = enableItems.concat(filterObject[item].region);
                    }else{
                        enableItems.push(filterObject[item].region);
                    }
                }
            }

            if (!isChecked) {
                return false;
            }
            return !enableItems.in_array(index);
        },

        slider: function(parentMethod, mainObj) {
            var keypressSlider = document.getElementById('range-7');
            var input0 = document.getElementById('fltr-range__value--min');
            var input1 = document.getElementById('fltr-range__value--max');
            var inputs = [input0, input1];

            parentMethod.noUiSlider.create(keypressSlider, {
                start: [ +this.filterSelect.area.items.min.value, +this.filterSelect.area.items.max.value ],
                behaviour: 'drag',
                connect: true,
                range: {
                    'min': this.minArea,
                    'max': this.maxArea
                },
                cssPrefix: 'range-',
                format: parentMethod.wnumb({
                    decimals: 2,
                    // thousand: '.',
                    // suffix: ' м2',
                })
            });

            keypressSlider.noUiSlider.on('update', function( values, handle ) {
                mainObj.filterSelect.area.items.min.value = +values[0];
                mainObj.filterSelect.area.items.max.value = +values[1];
                inputs[handle].value = values[handle];
            });
            keypressSlider.noUiSlider.on('end', function( values, handle ) {
                mainObj.filter1();
            });

            this.listCount = this.listCountStep;
        },


        addItemToList: function() {
            this.listCount = this.listCount + this.listCountStep;
        },

        getFlatLink: function (item) {
            let pageLink = projectUrl[item.prjName];
            let queryArr = {
                "section": +item.prjSection,
                "floor": +item.prjFloorIndex + 1,
                "apartment": +item.prjApartment,
            };
            let queryString = Object.keys(queryArr).map(key => key + '=' + queryArr[key]).join('&');
            let fullLink =  this.langPrefix + pageLink + '?' + queryString;
            return fullLink;
        },

        preInitFilters: function () {
            let queryParams;

            // return from project page
            if (this.$root.$options.storage.getFromPrj()) {
                queryParams = this.$root.$options.storage.getFilterQuery();
                this.$root.$options.storage.removeFromPrj();
            }
            else {
                queryParams = this.$route.query;
            }

            let queryParamsLength = Object.keys(queryParams).length;

            if (queryParamsLength > 0) {
                for (var item in queryParams) {
                    let selectedFilterParams = queryParams[item].split(',');
                    for (let filterItem in selectedFilterParams) {

                        let selectedFilterItem = selectedFilterParams[filterItem];
                        if (typeof this.filterSelect[item].items[selectedFilterItem] !== 'undefined') {
                            this.filterSelect[item].items[selectedFilterItem].checked = 1;
                        }
                    }
                }
                let area = queryParams.area.split(',');
                this.filterSelect.area.items.min.value = area[0];
                this.filterSelect.area.items.max.value = area[1];

                this.filter1();
            } else{
                this.filterSelect.area.items.min.value = this.minArea;
                this.filterSelect.area.items.max.value = this.maxArea;
            }
        },

        orderFormStatus() {
            return this.$store.state.prjOrderForm;
        },
        openOrderForm() {
            this.$store.commit('prjOpenOrderForm');
        },

        switchMobileModal(show) {
            this.showMobileFilter = show;
        },
        getCurrentLang(){
            let lang = document.querySelector('html').getAttribute('lang');
            if(lang!== 'ua'){
                return '/' + lang;
            }
            return '';
        },


        // list animation
        listAnimation: function(el) {
            let items = this.$el.querySelectorAll(el);

            Array.prototype.forEach.call(items, (item, index) => {
                item.style.opacity = "0";
                item.style.transform = "scale(1.15)";
            });

            this.$root.$options.anime({
                targets: items,
                loop: 1,
                opacity: '1',
                scale: 1,
                duration: 500,
                easing: 'easeInQuad',
                delay: function(el, i, l) {
                    return i * 50;
                },
            });
        },

        // save status "From Filter" + save query filter
        toPrjPage: function() {
            this.$root.$options.storage.setFromFltr();
            this.$root.$options.storage.setFilterQuery(this.$route.query);
        }
    },

    computed: {

    },
}
</script>