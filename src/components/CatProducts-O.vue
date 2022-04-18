<template>
<Header />
<!-- <h6>{{catProducts.data}}</h6> -->
<div class="container pt-3">
    <h3>{{catProducts.name}}</h3>
    <hr>
    <div class="form-group row col-md-12">
        <div class="loader" v-show="loader">
            <img src="../assets/loader.svg" />
        </div>
        <h4 class="text-center pt-1">
            🎁 Grab Your Best Deal 🎁
        </h4>
        <div class="col-md-2 bg-white card">
            <ProductFilter :data="this.catProducts" />
        </div>
        <div class="col-md-10">
            <div class="row row-cols-1 row-cols-md-5 g-4 pt-2">
                <div class="col" v-for="item in catProducts.products" :key="item.id">
                    <router-link :to="`/productdetails/`+ item.id" class="product">
                        <div class="card">
                            <img :src="`${VUE_APP_IMAGE_URL}`+item.image" class="card-img-top p-4" alt="">
                            <div class="card-body">
                                <p class="card-title">{{ item.name }}</p>
                                <!-- <p class="card-text">{{item.description}}</p> -->
                                <div style="float:left">
                                    <p><i class="fa fa-inr"></i> {{ item.price }}</p>
                                </div>
                                <div style="float:right">
                                    <!-- <p style="text-decoration:line-through;"><i class="fa fa-inr"></i> {{ item.price * 2 }} </p> -->
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Header from './layouts/Header.vue'
import ProductFilter from './ProductFilter.vue'

export default {
    name: 'Home',
    components: {
        Header,
        ProductFilter
    },
    data() {
        return {
            catProducts: {},
            VUE_APP_IMAGE_URL: process.env.VUE_APP_IMAGE_URL,
            loader: false
        }
    },
    methods: {
        async loadCatProducts() {
            this.loader = true
            let user = localStorage.getItem('user-info'); //user-info is local storage variable
            const token = JSON.parse(user).success.token // to get tokem from response
            // console.log(token);
            const headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + token
            }; //pass token

            let result = await axios.get("http://localhost:8000/api/catProduct/" + this.$route.params.cat_id, {
                headers
            }); //get list of product category wise
            // console.log("result",result)

            this.catProducts = result.data.product_data
            this.loader = false

            // console.log("CatProducts", this.catProducts)
        }
    },
    mounted() {
        this.loadCatProducts()
    }
}
</script>

<style scoped>
img {
    height: 190px !important;
    width: 100% !important;
    object-fit: contain;
}

.card-body {
    flex: 1 1 auto;
    padding: 0rem 1rem !important;
}

.card {
    border-radius: 20px;
}

.card:hover {
    /* background: #ffe0e9; */
    background: #cee3ff;
    transition: 0.3s;
}

.card-title {
    font-size: 12pt !important;
    font-weight: 500;
}

blink {
    -webkit-animation: 2s linear infinite condemned_blink_effect;
    /* for Safari 4.0 - 8.0 */
    animation: 1s linear infinite condemned_blink_effect;
    color: #4e7ab5;
}

.discount {
    height: 50px !important;
    width: 50px !important;
}

.product {
    text-decoration: none;
    color: inherit;
    /*Prevent changing link color*/
}

hr {
    height: 1px;
    border: 0;
    box-shadow: 0px 0px 18px 4px #f3abbf;
}

.bg-white {
    background: #b5d0f18c !important;
    /* box-shadow: inset 0px 0px 20px 0px #b0b0b0; */
    /* box-shadow: inset -20px 10px 20px 0px #b5d0ed; */
}

.loader {
    position: fixed;
    z-index: 1;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 100%;
}
</style>
