<template>
    <div class="tour-operator-list">
        <div class="row">
            <ul>
                <li v-for="(item, key) in tourOperators" :key="`tourop-${key}`" :class="{ 'item-selected': item.tourOperatorCode === selectedTourOperator }">
                    <img @click="onClick(item)" :src="item.tourOperatorLogo" alt="">
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    name: 'tour-operator-selection',
    props: {
        tourOperators: {
            type: Object,
            required: true
        },
        selectedTourOperator: {
            type: String,
            required: true
        }
    },
    methods: {
        onClick(item) {
            this.$emit('tourOperatorSelected', item.tourOperatorCode);
        }
    }
};
</script>

<style scoped lang="scss">
    .tour-operator-list {
        overflow-x: scroll;
        white-space:nowrap;
        width: 100%;
        margin: 10px auto;
    }
    img {
        max-width: 180px;
        padding: 5px;
        cursor: pointer;
    }
    .item-selected {
        background-color: #ccc;
    }
</style>
