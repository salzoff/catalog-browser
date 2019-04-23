<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <template v-if="isLoading">Loading...</template>
                <template v-else-if="!selectedEntry">No selection</template>
                <template v-else>

                    <tour-operator-selection
                        :tourOperators="tourOperators"
                        :selectedTourOperator="formData.tourOperatorCode"
                        @tourOperatorSelected="onTourOperatorSelected"
                    />
                </template>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9">
                <entry v-if="selectedEntry" :entry="selectedEntry" />
            </div>
            <div class="col-md-3">
                <catalog-selection
                    :entries="catalogEntries"
                    :selectedTourOperatorCode="formData.tourOperatorCode"
                    @updateParams="$emit('updateParams', $event)"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TourOperatorSelection from './TourOperatorSelection';
import Entry from './Entry';
import CatalogSelection from './CatalogSelection';
export default {
    name: 'catalog-browser',
    components: { TourOperatorSelection, Entry, CatalogSelection },
    props: {
        formData: {
            type: Object,
            required: true
        }
    },
    computed: {
        tourOperators() {
            return this.catalogEntries.reduce((result, entry) => {
                if (!result[entry.TourOperatorCode]) {
                    result[entry.TourOperatorCode] = {
                        tourOperatorCode: entry.TourOperatorCode,
                        tourOperatorName: entry.TourOperatorName,
                        tourOperatorLogo: entry.TourOperatorLogo.XLarge
                    }
                }
                return result;
            }, {});
        }
    },
    data() {
        return {
            catalogEntries: [],
            selectedTourOperator: null,
            isLoading: false,
            selectedEntry: null
        };
    },
    methods: {
        onTourOperatorSelected(tourOperatorCode) {
            this.formData.tourOperatorCode = tourOperatorCode;
            this.$emit('updateParams', { tourOperatorCode });
        }
    },
    watch: {
        formData: {
            handler(formData) {
                this.formData = formData;
                Object.keys(formData).forEach((key) => (formData[key] == false) && delete formData[key]);
                console.log(formData);
                this.$nbc.requestSearch({
                    giataId: formData.giataId,
                    lang: this.formData.lang,
                    show: 'gid,khid,vc,vl,cv,vn,katcode,kn,katid,ds,de,oc,kst'
                })
                    .then(response => {
                        this.catalogEntries = response.items;
                        console.log(response);
                    });
                let tmpFormData = Object.assign({}, formData);
                if (tmpFormData.CatalogHotelId) {
                    delete tmpFormData.CatalogHotelId;
                }
                if (tmpFormData.giataId && tmpFormData.tourOperatorCode) {
                    this.$nbc.requestHotel(tmpFormData)
                        .then(response => {
                            this.selectedEntry = response[0];
                        });
                }
            },
            deep: true
        }
    }
};
</script>

<style>
    ul {
        list-style: none;
    }
    ul li {
        display: inline-block;
    }
</style>
