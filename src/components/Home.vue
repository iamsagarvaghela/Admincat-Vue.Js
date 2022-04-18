<template>
<Header />
<CategoryView/>
<!-- <Slider/> -->
<TodayDeal />
</template>

<script>
import Header from './layouts/Header.vue'
import CategoryView from './layouts/CategoryView.vue'
// import Slider from './layouts/Slider.vue'
import TodayDeal from './layouts/TodayDeal.vue'

export default {
    name: 'Home',
    components: {
        Header,
        CategoryView,
        // Slider,
        TodayDeal
    },
}
</script>

<style scoped>

</style>

