<template>
    <div class="upload-box">
        <label class="upload" for="formAddResumeUpload">
            <input
                class="upload__input"
                id="formAddResumeUpload"
                type="file"
                required
                :disabled="disabled"
                @change="
                    filesChange($event.target.name, $event.target.files);
                    fileCount = $event.target.files.length;
                "
                v-on:click="$emit('enlarge-text')"
                :accept="accept_type"
            >
            <span class="upload__label">
                <template v-if="disabled">{{ $t('file') }}: {{ file_name }}</template>
                <template v-else="disabled">{{ $t('select_file') }}</template>
            </span>
        </label>
        <div class="upload-box__error" v-if="error_type">
            {{ error }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                'accept_type': 'application/pdf, application/msword, text/plain',
                'disabled': false,
                'error': '',
                'error_type': false,
                'file_name': '',
            }
        },


        computed: {

        },


        methods: {
            reset() {
                // reset form to initial state
            },

            // Files change
            filesChange(fieldName, file) {
                let f = file[0];
                if ( this.checkTypes(f.type) ) {
                    this.disabled = true;
                    this.file_name = f.name;
                    this.$emit('fileUpload', file[0]);
                } else {
                    // this.error_type = true;
                    // this.error = 'Загрузіть правильний тип файлу';
                }
            },

            // Check types
            checkTypes(value, accept) {
                let arr =  this.accept_type.replace(/\s+/g, '').split(',');
                return arr.some(elem => {
                    return elem === value
                });
            }
        },
    }

</script>