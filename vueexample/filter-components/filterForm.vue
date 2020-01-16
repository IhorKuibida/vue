<template>
    <section class="dialog dialog--bg-photo dialog-filter-form" id="filterForm">

        <div class="dialog__inner container" role="dialog">
            <button class="dialog__nav-close btn-circle btn-circle--bg btn-circle--t-close" @click="closeOrderForm()">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20">
                    <path fill-rule="evenodd" d="M20.274 18.66l-.879.879-8.881-8.881-9.334 9.334-.891-.892 9.333-9.333L.742.886l.879-.879 8.881 8.88L19.205.184l.891.892-8.703 8.703 8.881 8.881z" />
                </svg>
                <span class="visually-hidden">{{ 'close' | translate }}</span>
            </button>

            <div class="dialog__content dialog__content--fix-w" role="document">
                <p class="modal-form__sending" style="display:none; text-align: center;">{{ 'message_after_sending' | translate }}</p>
                <form class="modal-form form" id="filterCallback" method="post">
                    <textarea style="display:none" :value="saveData()" name="criteria"></textarea>
                    <div class="frm-group">
                        <label class="label frm-group__label" for="filterFormName">{{ 'name' | translate }}</label>
                        <input class="input frm-group__input" id="filterFormName" name="filterFormName" type="text" required>
                    </div>

                    <div class="frm-group">
                        <label class="label frm-group__label" for="filterFormEmail">{{ 'email' | translate }}</label>
                        <input class="input frm-group__input" id="filterFormEmail" name="filterFormEmail" type="email" required>
                    </div>

                    <div class="frm-group">
                        <label class="label frm-group__label" for="filterFormPhone">{{ 'phone' | translate }}</label>
                        <input class="input frm-group__input" id="filterFormPhone" name="filterFormPhone" type="tel" required>
                    </div>

                    <div class="frm-group">
                        <label class="label frm-group__label" for="filterFormMessage">{{ 'message' | translate }}</label>
                        <textarea class="input frm-group__input" id="filterFormMessage" name="filterFormMessage" type="text"></textarea>
                    </div>

                    <div class="form__btn">
                        <input class="btn btn--md" :value="'send' | translate" type="submit" @click="buttonClick()">
                    </div>
                </form>

            </div>
        </div>
    </section>
</template>

<script>
import filterPrj from '../helpers/_goFilter.js';
import formGroup from '../helpers/_form-group.js';
import phoneMask from '../helpers/_phone-mask.js';

export default {
    name: 'filterForm',


    // data
    data: function() {
        return {

        }
    },


    // mounted
    mounted() {
        let getId = this.$el.id;
        this.$nextTick(function () {
            formGroup("#" + getId);
            phoneMask("#" + getId);
        })
    },


    // destroyed
    destroyed() {

    },


    // methods
    methods: {
        buttonClick: function(){
            document.getElementById("filterCallback").addEventListener("submit", function(event){
                var form = document.forms.filterCallback;
                var formData = new FormData(form);
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "../filter_callback.php");
                event.preventDefault();
                xhr.send(formData);
                form.remove();
                document.querySelector('.modal-form__sending').style.display="block";
            });
        },

        saveData() {
            return this.$parent.consultationFormData.str;
        },

        // close order form
        closeOrderForm() {
            this.$store.commit('prjCloseOrderForm');
        },
    },

    computed: {

        // get order forms status
        orderFormStatus() {
            return this.$store.state.prjOrderForm;
        },
    },
}
</script>
