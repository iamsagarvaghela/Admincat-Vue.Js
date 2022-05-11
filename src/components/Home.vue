<template>
<Header />
<CategoryView/>
<TodayDeal />
</template>

<script>
import Header from './layouts/Header.vue'
import CategoryView from './layouts/CategoryView.vue'
import TodayDeal from './layouts/TodayDeal.vue'

export default {
    name: 'Home',
    components: {
        Header,
        CategoryView,
        TodayDeal
    },
}
</script>

<style scoped>

</style>

