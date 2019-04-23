<template>
    <div>
        <h3>{{ entry.HotelName }} {{ entry.CatalogHotelId }}</h3>
        <div class="image-container clearfix">
            <b-carousel  :indicators="true" background="#e4e4e4">
                <b-carousel-slide
                    v-for="(image, index) in entry.Images.Large"
                >
                    <img slot="img" :src="image.Url" class="img img-responsive" />
                </b-carousel-slide>
            </b-carousel>
        </div>
        <div class="mt-2" v-html="entry.Description"></div>
    </div>
</template>

<script>
    import Climate from './Climate';
    export default {
        components: {Climate},
        props: {
            entry: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .image-container, .carousel-item {
        width: 800px;
        text-align: center;
        height: 533px;
        img {
            max-height: 100%;
        }
    }
</style>