<template>
    <b-form inline style="flex: 3">
        <b-form-group label="Id">
            <b-form-input v-model="giataId" type="number" />
        </b-form-group>
        <b-form-group label="Tour operator code">
            <b-form-input v-model="tourOperatorCode" />
        </b-form-group>
        <b-form-group label="Date">
            <b-form-input v-model="date" type="date" />
        </b-form-group>
        <b-form-group label="Language">
            <b-form-input v-model="lang" />
        </b-form-group>
        <b-form-group label="&nbsp;">
            <b-button size="md" variant="light" @click="onSubmit">Search</b-button>
        </b-form-group>
    </b-form>
</template>

<script>
    import moment from 'moment';
    export default {
        name: 'catalog-form',
        props: {
            parameters: {
                type: Object
            }
        },
        data() {
            return {
                giataId: '',
                tourOperatorCode: '',
                date: null,
                lang: ''
            };
        },
        methods: {
            onSubmit() {
                this.$emit('submit', {
                    giataId: parseInt(this.giataId),
                    tourOperatorCode: this.tourOperatorCode,
                    date: this.date ? moment(this.date).format('YYYY-MM-DD') : '',
                    lang: this.lang
                });
            }
        },
        watch: {
            parameters: {
                deep: true,
                handler(parameters) {
                    this.giataId = parameters.giataId;
                    this.tourOperatorCode = parameters.tourOperatorCode;
                    this.date = parameters.date;
                    this.lang = parameters.lang;
                }
            }
        }
    };
</script>
