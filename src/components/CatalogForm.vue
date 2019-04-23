<template>
    <b-form inline>
        <b-form-group label="Id">
            <b-form-input v-model="giataId" type="number" />
        </b-form-group>
        <b-form-group label="Tour operator code">
            <b-form-input v-model="tourOperatorCode" />
        </b-form-group>
        <b-form-group label="date">
            <b-form-input v-model="date" type="date" />
        </b-form-group>
        <b-form-group label="Language">
            <b-form-input v-model="lang" />
        </b-form-group>
        <b-form-group label="&nbsp;">
            <b-button size="sm" variant="primary" @click="onSubmit">Search</b-button>
        </b-form-group>
    </b-form>
</template>

<script>
    import moment from 'moment';
    export default {
        name: 'catalog-form',
        props: {
            formData: {
                type: Object
            }
        },
        data() {
            return {
                giataId: '',
                tourOperatorCode: '',
                date: new Date(),
                lang: ''
            };
        },
        methods: {
            onSubmit() {
                console.log('click');
                this.$emit('submit', {
                    giataId: parseInt(this.giataId),
                    tourOperatorCode: this.tourOperatorCode,
                    date: moment(this.date).format('YYYY-MM-DD'),
                    lang: this.lang
                });
            }
        },
        watch: {
            formData: {
                deep: true,
                handler(formData) {
                    this.giataId = formData.giataId;
                    this.tourOperatorCode = formData.tourOperatorCode;
                    this.date = formData.date;
                    this.lang = formData.lang;
                }
            }
        }
    };
</script>
