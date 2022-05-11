<template>
<h4 class="text-center mt-2 mb-0">
    Filters
</h4>
<div class="pb-5 bg-image">
    <hr class="hr-main">
    <label><b>Brand</b></label>
    <hr class="mb-1 mt-1">
    <div class="col" v-for="item in data.subcategories" :key="item.id">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <input type="checkbox" class="form-check-input">
            {{ item.name }}
        </div>
    </div>

    <hr class="hr-main">
    <label><b>Color</b></label>
    <hr class="mb-1 mt-1">
    <div class="col" v-for="item in data.products" :key="item.id">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <input type="checkbox" class="form-check-input"> {{ item.color }}
        </div>
    </div>

    <hr class="hr-main">
    <label><b>Price</b></label>
    <hr class="mb-1 mt-1">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <input type="checkbox" class="form-check-input"> <i class="fa fa-inr"></i>&nbsp;1000 Below
    </div>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <input type="checkbox" class="form-check-input"> <i class="fa fa-inr"></i>&nbsp;1000 to 10000
    </div>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <input type="checkbox" class="form-check-input"> <i class="fa fa-inr"></i>&nbsp;10000 to 25000
    </div>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <input type="checkbox" class="form-check-input"> <i class="fa fa-inr"></i>&nbsp;25000 to 50000
    </div>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <input type="checkbox" class="form-check-input"> <i class="fa fa-inr"></i>&nbsp;50000 Above
    </div>
</div>
</template>

<script>
export default {
    name: 'ProductFilter',
    // props: {
    //     data: Object
    // },
    props: ['data'],
    data() {
        return {
            VUE_APP_IMAGE_URL: process.env.VUE_APP_IMAGE_URL
        }
    }
}
</script>

<style scoped>
.hr-main {
    height: 1px;
    border: 0;
    box-shadow: 0px 0px 18px 4px #f3abbf;
}
</style>
