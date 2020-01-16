<template>
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
        <section class="dialog dialog--bg-photo" id="prjOrderForm">

            <div class="dialog__inner container" role="dialog">

                <button class="dialog__nav-close btn-circle btn-circle--bg btn-circle--t-close" @click="closeOrderForm()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20">
                        <path fill-rule="evenodd" d="M20.274 18.66l-.879.879-8.881-8.881-9.334 9.334-.891-.892 9.333-9.333L.742.886l.879-.879 8.881 8.88L19.205.184l.891.892-8.703 8.703 8.881 8.881z" />
                    </svg>
                    <span class="visually-hidden">{{ 'close' | translate }}</span>
                </button>

                <div class="dialog__content dialog__content--fix-w" role="document">
                    <p class="modal-form__sending" style="display:none; text-align: center;">{{ 'message_after_sending' | translate }}</p>

                    <form class="modal-form form" id="orderForm" method="post">
                        <input name="orderFormApartment" :value="'Квартира: ' + apartmentName" type="hidden">
                        <input name="orderFormFloor" :value="'Поверх: ' + floorName" type="hidden">
                        <input name="orderFormSection" :value="'Секція: ' + sectionName" type="hidden">
                        <input name="orderFormProject" :value="'ЖК: ' + projectName" type="hidden">

                        <div class="frm-group">
                            <label class="label frm-group__label" for="orderFormName">{{ 'name' | translate }}</label>
                            <input class="input frm-group__input" id="orderFormName" name="orderFormName" type="text" required>
                        </div>

                        <div class="frm-group">
                            <label class="label frm-group__label" for="orderFormEmail">{{ 'email' | translate }}</label>
                            <input class="input frm-group__input" id="orderFormEmail" name="orderFormEmail" type="email" required>
                        </div>

                        <div class="frm-group">
                            <label class="label frm-group__label" for="orderFormPhone">{{ 'phone' | translate }}</label>
                            <input class="input frm-group__input" id="orderFormPhone" name="orderFormPhone" type="tel" required>
                        </div>

                        <div class="frm-group">
                            <label class="label frm-group__label" for="orderFormMessage">{{ 'message' | translate }}</label>
                            <textarea class="input frm-group__input" id="orderFormMessage" name="orderFormMessage" type="text"></textarea>
                        </div>

                        <div class="form__btn">
                            <button class="btn btn--md" type="submit" @click="buttonClicked()">{{ 'send' | translate }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </transition>
</template>





<script>
import formGroup from '../helpers/_form-group.js';
import phoneMask from '../helpers/_phone-mask.js';

export default {
    name: 'PrjOrderForm',


    // data
    data: function() {
        return {
            "project": this.$store.state.prjCurrentProject,
            "section": this.$store.state.prjCurrentSection,
            "floor": this.$store.state.prjCurrentFloor,
            "apartment": this.$store.state.prjCurrentApartment,
        }
    },


    // mounted
    mounted() {
        let getId = this.$el.id;
        this.$nextTick(function () {
            formGroup("#" + getId);
            phoneMask("#" + getId);
        });
    },


    // destroyed
    destroyed() {

    },


    // methods
    methods: {
        buttonClicked: function(){
            var orderForm = document.getElementById("orderForm");

            orderForm.addEventListener("submit", function(event){
                var formData = new FormData(orderForm);
                var xhr = new XMLHttpRequest();

                xhr.open("POST", "../project_callback.php");
                event.preventDefault();
                xhr.send(formData);
                orderForm.remove();
                document.querySelector('.modal-form__sending').style.display="block";

            });
        },

        // close order form
        closeOrderForm() {
            this.$store.commit('prjCloseOrderForm');
        },
    },


    // computed
    computed: {

        // get order forms status
        orderFormStatus() {
            return this.$store.state.prjOrderForm;
        },

        // get project name
        projectName() {
            return this.$store.getters.getProjectTitle(this.project);
        },

        // get section name
        sectionName() {
            return this.$store.getters.getSectionTitle(this.project, this.section);
        },

        // get floor name
        floorName() {
            return this.floor + 1;
        },

        // get apartment name
        apartmentName() {
            return this.$store.getters.getApartmentTitle(this.project, this.section, this.floor, this.apartment);
        },
    },
}
</script>
