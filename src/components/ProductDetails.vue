<template>
<Header />
<div class="container border mt-4 bg-white">
    <div class="row col-md-12 py-3">
        <div class="col-md-5">
            <img :src="`${VUE_APP_IMAGE_URL}`+product_detail.image" class="card-img-top p-5" alt="">
        </div>
        <div class="col-md-7 pt-3">
            <h3>{{ product_detail.name }}</h3>
            <h5><i class="fa fa-inr"></i> {{ product_detail.price }}</h5>

            <h5 class="pt-3 desc">Description</h5>
            <ul>
                <li>
                    <h6>{{ product_detail.description }}</h6>
                </li>
                <li>
                    <h6>{{ product_detail.description }}</h6>
                </li>
                <li>
                    <h6>{{ product_detail.description }}</h6>
                </li>
            </ul>
            <h5 class="pt-3 desc">Available Colors</h5>
            <h5>{{ product_detail.color }}</h5>
            <h5 class="pt-3 desc">Stock</h5>
            <h5>{{ product_detail.stock }}</h5>
            <div class="row col-md-12 mt-5">
                <div class="col-md-6 col-sm-6 col-xs-6 my-2">
                    <button class="cart" @click="addCart(product_detail.id, product_detail.price)"><i class="fa fa-shopping-cart"></i>&nbsp;ADD TO CART</button>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6 my-2">
                    <button class="buy"><i class="fa fa-bolt"></i>&nbsp;BUY NOW</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Header from './layouts/Header.vue'
// import { mapGetters } from "vuex"

export default {
    name: 'ProductDetails',
    // computed: mapGetters(['singleProduct']),
    components: {
        Header
    },
    props: ['productData'],
    // props:{
    //     productData:Object
    // },
    data() {
        return {
            product_detail: [],
            customer_id:[],
            VUE_APP_IMAGE_URL: process.env.VUE_APP_IMAGE_URL
        }
    },
    methods: {
        addCart(pro_id, pro_price) {
            this.customer_id = JSON.parse(localStorage.getItem("user-info"))
            this.customer_id = this.customer_id.success.id
            let cartData = {"customer_id" : this.customer_id, "product_id" : pro_id, "product_price" : pro_price}
            this.$store.dispatch("addtoCart", cartData)
            alert(this.product_detail.name + " Added to your Cart 🛒.")
        }
    },
    mounted() {
        if (localStorage.getItem("single-product") == undefined) {      
            this.product_detail = JSON.stringify(localStorage.setItem("single-product", this.productData))
        } 
        if(localStorage.getItem("single-product") !== null){
                if(this.productData !== undefined){
                    this.product_detail = JSON.stringify(localStorage.setItem("single-product", this.productData))
                } 
        }
        this.product_detail = JSON.parse(localStorage.getItem("single-product"))
    }
}
</script>

<style scoped>
img {
    height: 600px !important;
    width: 100% !important;  
    object-fit: contain;
}

.desc {
    color: #898989;
}

.cart {
    background: #ffe0e9;
    padding: 10px 50px 10px 50px;
    width: 300px;
    border: none;
    font-size: 13pt;
    font-weight: 500;
    color: #4e7ab5;
    border: #4e7ab5 solid 1px;
}

.cart:hover {
    background: #ecc4cf;
    transition: 0.3s;
}

.buy {
    background: #4e7ab5;
    padding: 10px 50px 10px 50px;
    width: 300px;
    border: none;
    font-size: 13pt;
    font-weight: 500;
    color: #ffe0e9;
    border: #ffe0e9 solid 1px;
}

.buy:hover {
    background: #305b94;
    transition: 0.3s;
}

.container {
    border-radius: 20px;
}
</style>
