<template>
    <div id="app">
        <b-navbar class="bg-info text-white container-fluid nbc-nav">
            <strong class="app-title">NBC Viewer</strong>
            <catalog-form @submit="onSubmit" :parameters="parameters" />
        </b-navbar>
        <div>
            <catalog-browser
                :parameters="parameters"
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
            parameters: {}
        };
    },
    methods: {
        onSubmit(data) {
            this.parameters = Object.assign({}, this.parameters, data);
        },
        onUpdateParams(params) {
            this.parameters = Object.assign({}, this.parameters, params);
        }
    }
};
</script>

<style lang="scss" scoped>
    .app-title {
        font-size: 2em;
        flex: 1;
    }
</style>