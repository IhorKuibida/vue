<template>
    <form
        class="form"
        id="formAddResume"
        enctype="multipart/form-data"
        method="post"
        @submit.prevent="submitForm()"
    >
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
        >
            <div class="form__body" v-if="!success">
                <div class="frm-group">
                    <label class="label frm-group__label" for="formAddResumeName">{{ $t('name') }}</label>
                    <input class="input frm-group__input" id="formAddResumeName" name="formAddResumeName" type="text" required>
                </div>

                <div class="frm-group">
                    <label class="label frm-group__label" for="formAddResumeEmail">{{ $t('email') }}</label>
                    <input class="input frm-group__input" id="formAddResumeEmail" name="formAddResumeEmail" type="email" required>
                </div>

                <div class="frm-group">
                    <label class="label frm-group__label" for="formAddResumePhone">{{ $t('phone') }}</label>
                    <input class="input frm-group__input" id="formAddResumePhone" name="formAddResumePhone" type="tel" required>
                </div>

                <div class="form__group">
                    <span class="label" for="formAddResumeUpload">{{ $t('download_resume') }}</span>
                    <file-upload
                        v-on:fileUpload="uploadedFile($event)"
                    ></file-upload>
                </div>

                <div class="frm-group">
                    <label class="label frm-group__label" for="formAddResumeMessage">{{ $t('message') }}</label>
                    <textarea class="input frm-group__input" id="formAddResumeMessage"  name="formAddResumeMessage" type="text"></textarea>
                </div>

                <div class="form__btn">
                    <button class="btn-bg btn-bg--monospace">{{ $t('send') }}</button>
                </div>
            </div>

            <p
                class="h5"
                v-else
            >
                {{ $t('success_message') }}
            </p>
        </transition>
    </form>
</template>





<script>
import formGroup from '../helpers/_form-group.js';
import phoneMask from '../helpers/_phone-mask.js';
import FileUpload from './FileUpload/App.vue';
import axios from 'axios';

export default {
    name: 'FormAddResume',
    components: {
        FileUpload
    },
    props: ['position'],

    data: function() {
        return {
            'vacancyName': this.position,
            'file': '',
            'success': false
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

    // methods
    methods: {

        // uploaded file
        uploadedFile(data) {
            this.file = data;
        },

        // submit kl
        submitForm() {
            let formData = new FormData();
            let data = {};
            data.vacancy = this.vacancyName,
            data.name = formAddResumeName.value;
            data.email = formAddResumeEmail.value;
            data.phone = formAddResumePhone.value;
            data.message = formAddResumeMessage.value ? formAddResumeMessage.value : '-';
            data.headers = {'Content-Type': 'multipart/form-data'};
            formData.append('data', JSON.stringify(data));
            formData.append('file', this.file);

            let that = this;

            axios.post( '../vacancies.php',
                    formData
                )
                .then(function(response){
                    that.success = true;
                })
                .catch(function(response){
                    //
                });
        }
    },
}
</script>
