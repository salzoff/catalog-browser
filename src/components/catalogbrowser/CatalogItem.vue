<template>
    <div class="catalog-item" @click="$emit('click')">
        <h6 class="mb-2">{{ catalog.CatalogName }}</h6>
        <img class="float-left mr-2" :src="catalog.CatalogCover.Small" />
        <div class="catalog-text">
            Productcode: {{ catalog.ProductCode }}<br />
            Season type: {{ catalog.SeasonType }}<br />
            Valid: {{ formatDate(catalog.StartDate) }} - {{ formatDate(catalog.EndDate) }}<br />
            <span v-if="catalog.CatalogCode">Catalog code: {{ catalog.CatalogCode }}</span><br />
            Catalog Id: {{ catalog.CatalogId }}
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: 'catalog-browser-catalog-item',
        props: {
            catalog: {
                type: Object,
                required: true
            }
        },
        methods: {
            formatDate(date) {
                return moment(date).format('L');
            }
        }
    };
</script>

<style lang="scss" scoped>

    .catalog-item {
        width: 100%;
        display: block;
        cursor: pointer;
    }
</style>
