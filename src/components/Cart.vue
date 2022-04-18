<template>
<Header />
    <div class="loader" v-show="loader">
        <img src="../assets/loader.svg" />
    </div>
<section class="h-100">
    <div class="h-100 py-5">
        <div class="row d-flex justify-content-center h-100">
            <!-- align-items-center-->
            <div class="col-7">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="fw-normal mb-0 cart">
                        <i class="fa fa-shopping-cart"></i> My Cart
                    </p>
                </div>
                <div v-if="getcartData.status == 'info'" class="card rounded-3 mb-4 p-5">
                    <h3 class="text-center">☹ Your Cart is Currently Empty ☹</h3>
                </div>
                <div class="card rounded-3 mb-4" v-for="(item, index) in getcartData.data" :key="index">
                    {{ (price = parseInt(price) + parseInt(item.price)) }}
                    <div class="card-body pt-4 pr-4 pl-4 pb-0">
                        <div class="row d-flex justify-content-between align-items-center">
                            <div class="col-md-2 col-lg-2 col-xl-2">
                                <router-link :to="{
                                    name: 'ProductDetails',
                                    params: { productData: JSON.stringify(item) },
                                    }" class="product">
                                    <img :src="`${VUE_APP_IMAGE_URL}` + item.image" class="img-fluid rounded-3" alt="Image" />
                                </router-link>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3">
                                <p class="lead fw-normal mb-2">{{ item.name }}</p>
                                <p><span class="text-muted">Color: </span>{{ item.color }}</p>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button class="btn btn-link px-2" @click="minusClick(index,item.price)">
                                    <i class="fa fa-minus"></i>
                                </button>
                                <button @click="getVal"></button>

                                <input id="form1" min="1" :max="item.stock" name="quantity" v-model="this.quantity" type="number" class="form-control form-control-sm" />

                                <button class="btn btn-link px-2" @click="plusClick(index,item.price)">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 class="mb-0">
                                    <i class="fa fa-inr"></i> {{ (this.price = item.price) }}
                                </h5>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                <button class="btn btn-danger btn-sm" @click="removeProduct(item.id)">
                                    <i class="fa fa-remove"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {{ this.quantity }}
                    <div class="container">
                        <p align="right" type="button" data-toggle="collapse" :data-target="'#demo' + item.id" class="product">
                            <span class="text-muted">+ More Details</span>
                        </p>
                        <div :id="'demo' + item.id" class="collapse mt-2 mb-2">
                            <div>
                                <span class="text-muted">Description</span><br />
                                <div class="container mt-1">▪ {{ item.description }}</div>
                            </div>

                            <div class="mt-1">
                                <span class="text-muted">Available Stock</span><br />
                                <div class="container mt-1">▪ {{ item.stock }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-3">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="fw-normal mb-0 cart">Price Details</p>
                </div>

                <div class="card">
                    <div class="card-body">
                        <table width="100%">
                            <tr>
                                <td>Total Items:</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <hr />
                                </td>
                            </tr>
                            <tr>
                                <td>Delivery Charge:</td>
                                <td>FREE</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <hr />
                                </td>
                            </tr>
                            <tr>
                                <td>Total Amount:</td>
                                <td>20000.00</td>
                            </tr>
                        </table>
                        <hr/>
                        <div class="text-center">
                            <button type="button" class="buy btn-block btn-lg">
                                <i class="fa fa-bolt"></i>&nbsp;PROCESS TO PAY
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import Header from "./layouts/Header.vue";
import {
    mapGetters
} from "vuex";
export default {
    name: "Cart",
    computed: mapGetters(["getcartData"]),
    components: {
        Header,
    },
    data() {
        return {
            customer_id: [],
            VUE_APP_IMAGE_URL: process.env.VUE_APP_IMAGE_URL,
            price: 0,
            quantity: 1,
            items : [],
            loader: false
        };          
    },
    methods: {
        getcart() {
            this.loader=true
            this.$store.state.todaydeal.getcart_data = [];
            this.customer_id = JSON.parse(localStorage.getItem("user-info"));
            this.customer_id = this.customer_id.success.id;
            this.$store.dispatch("getcartData", this.customer_id);
            this.loader=false
        },
        removeProduct(pro_id) {
            if (confirm("Remove from cart?") == true) {
                this.$store.dispatch("removefromCart", pro_id);
            }
        },
        getVal() {
            console.log(document.getElementById("form1").value);
        },
        minusClick(index,price){
            console.log(index)
            console.log(price)
        },
        plusClick(index,price){
            console.log(index)
            console.log(price)
        }
    },
    created() {
        this.getcart();
    },
};
</script>

<style scoped>
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

.cart {
    color: #4e7ab5;
    font-size: 20pt;
}

.cart:hover {
    color: #305b94;
    font-size: 20pt;
}

img {
    height: 110px !important;
    width: 100% !important;
    object-fit: contain;
}

.product {
    text-decoration: none;
    color: inherit;
    /*Prevent changing link color*/
}

.btn-link {
    color: #4e7ab5;
    border: none;
}

.btn-link:click {
    color: #4e7ab5;
    border: none !important;
    outline: none !important;
}

.btn-group-sm>.btn,
.btn-sm {
    /* padding: 0.25rem 0.5rem;
    font-size: .875rem; */
    border-radius: 1.2rem;
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
    opacity: 1;
}
</style>
