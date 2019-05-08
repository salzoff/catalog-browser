<template>
    <div>
        <strong class="touropname" v-if="cataloges.length > 0">{{ cataloges[0].TourOperatorName }}</strong>
        <ul>
            <li  v-for="(catalog, index) in cataloges" :key="`catalog-${index} in cataloges`" class="row mt-2" :class="{ selected: catalog.CatalogHotelId === selectedCatalogHotelId }">
                <catalog-item :catalog="catalog" @click="onClick(catalog)" />
            </li>
        </ul>
    </div>
</template>

<script>
    import CatalogItem from './CatalogItem';
    export default {
        name: 'catalog-browser-catalog-selection',
        components: { CatalogItem },
        props: {
            entries: {
                type: Array,
                default: []
            },
            selectedTourOperatorCode: {
                type:String,
                default: ''
            },
            selectedCatalogHotelId: {
                type:String,
                default: ''
            }
        },
        computed: {
            cataloges() {
                if (this.selectedTourOperatorCode) {
                    return this.entries.filter(entry => entry.TourOperatorCode === this.selectedTourOperatorCode);
                }
                return this.entries;
            }
        },
        methods: {
            onClick(catalog) {
                this.$emit('updateParams', {
                    tourOperatorCode: catalog.TourOperatorCode,
                    catalogHotelId: parseInt(catalog.CatalogHotelId)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        padding: 0;
        list-style-type: none;
    }
    li {
        width: 100%;
    }
    li.selected {
        border-right: 8px solid #999;
    }
    .touropname {
        font-size: 1.4em;
    }
</style>
