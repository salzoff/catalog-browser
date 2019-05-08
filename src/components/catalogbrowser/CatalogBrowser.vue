<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <template v-if="isLoading">Loading...</template>
                <template v-else-if="catalogEntries.length === 0">No result</template>
                <template v-else>

                    <tour-operator-selection
                        :tourOperators="tourOperators"
                        :selectedTourOperator="selectedTourOperator"
                        @tourOperatorSelected="onTourOperatorSelected"
                    />
                </template>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-9">
                    <entry v-if="selectedEntry" :entry="selectedEntry" />
                </div>
                <div class="col-md-3">
                    <catalog-selection
                        :entries="catalogEntries"
                        :selectedCatalogHotelId="selectedEntry ? selectedEntry.CatalogHotelId : null"
                        :selectedTourOperatorCode="selectedTourOperator"
                        @updateParams="$emit('updateParams', $event)"
                    />
                </div>
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
        parameters: {
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
            this.parameters.tourOperatorCode = tourOperatorCode;
            this.$emit('updateParams', { tourOperatorCode });
        }
    },
    watch: {
        parameters: {
            handler(parameters) {
                this.parameters = parameters;
                Object.keys(parameters).forEach((key) => (parameters[key] == false) && delete parameters[key]);
                console.log(parameters);
                this.$nbc.requestSearch({
                    giataId: parameters.giataId,
                    lang: parameters.lang,
                    show: 'gid,khid,vc,vl,cv,vn,katcode,kn,katid,ds,de,oc,kst'
                })
                    .then(response => {
                        this.catalogEntries = response.items;
                        console.log(response);
                        let tmpparameters = Object.assign({}, parameters);
                        if (tmpparameters.CatalogHotelId) {
                            delete tmpparameters.CatalogHotelId;
                        }

                        if (tmpparameters.giataId) {
                            console.log(tmpparameters);
                            if (!tmpparameters.tourOperatorCode) {
                                tmpparameters.tourOperatorCode = this.catalogEntries[0].TourOperatorCode;
                            }
                            this.$nbc.requestHotel(tmpparameters)
                                .then(response => {
                                    this.selectedEntry = response[0];
                                    this.selectedTourOperator = response[0].TourOperatorCode;
                                });
                        }
                    });
                
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
