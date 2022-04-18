<template>
<Header />
<div class="container border mt-4 bg-white">
    <div class="row col-md-12 py-3">
        <div class="col-md-5">
            <img :src="`${VUE_APP_IMAGE_URL}`+product_detail.products.image" class="card-img-top p-5" alt="">
        </div>
        <div class="col-md-7 pt-3">
            <h6 class="desc">{{ product_detail.products.category.name }} ({{ product_detail.products.subcategory.name }})</h6>
            <h3>{{ product_detail.products.name }}</h3>
            <h5><i class="fa fa-inr"></i> {{ product_detail.products.price }}</h5>

            <h5 class="pt-3 desc">Description</h5>
            <ul>
                <li>
                    <h6>{{ product_detail.products.description }}</h6>
                </li>
                <li>
                    <h6>{{ product_detail.products.description }}</h6>
                </li>
                <li>
                    <h6>{{ product_detail.products.description }}</h6>
                </li>
            </ul>
            <h5 class="pt-3 desc">Available Colors</h5>
            <h5>{{ product_detail.products.color }}</h5>
            <h5 class="pt-3 desc">Stock</h5>
            <h5>{{ product_detail.products.stock }}</h5>
            <div class="row col-md-12 mt-5">
                <div class="col-md-6 col-sm-6 col-xs-6 my-2">
                    <button class="cart" @click="addCart(product_detail.products.id)"><i class="fa fa-shopping-cart"></i>&nbsp;ADD TO CART</button>
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
import axios from 'axios'
import Header from './layouts/Header.vue'

export default {
    name: 'ProductDetails',
    components: {
        Header
    },
    data() {
        return {
            product_detail: [],
            VUE_APP_IMAGE_URL: process.env.VUE_APP_IMAGE_URL,
        }
    },
    methods: {
        async loadDetailProducts() {
            let user = localStorage.getItem('user-info'); //user-info is local storage variable
            const token = JSON.parse(user).success.token // to get tokem from response
            // console.log(token);
            const headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + token
            }; //pass token
            let result = await axios.get("http://localhost:8000/api/productDetails/" + this.$route.params.pro_id, {
                headers
            }); //get list of product category wise 
            // console.log("result",result)

            this.product_detail = result.data
            // console.log("product", this.product_detail)
        },
        addCart(pro_id){
            // let oldData = localStorage.getItem('product-cart'); //user-info is local storage variable
            // console.warn(oldData)
            // localStorage.setItem("product-cart", JSON.stringify(this.product_detail));
            alert(pro_id)
        }
    },
    created() {
        this.loadDetailProducts()
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
