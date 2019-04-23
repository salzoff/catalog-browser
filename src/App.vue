<template>
    <div id="app">
        <header>
            <h1>NBC Catalog</h1>
        </header>
        <div class="container">
            <catalog-form @submit="onSubmit" :form-data="formData" />
        </div>
        <div>
            <catalog-browser
                :form-data="formData"
                @updateParams="onUpdateParams"
            />
        </div>
    </div>
</template>

<script>
import CatalogForm from './components/CatalogForm';
import CatalogBrowser from './components/catalogbrowser/CatalogBrowser';

export default {
    name: 'app',
    components: { CatalogBrowser, CatalogForm },
    data: function() {
        return {
            formData: {}
        };
    },
    methods: {
        onSubmit(data) {
            this.formData = Object.assign({}, this.formData, data);
        },
        onUpdateParams(params) {
            this.formData = Object.assign({}, this.formData, params);
        }
    }
};
</script>
