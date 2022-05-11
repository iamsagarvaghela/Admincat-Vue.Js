<template>
<Header />
<section class="vh-100 mt-5">
    <div class="container h-100">
        <div class="row d-flex justify-content-center  h-100">
            <div class="col">
                <p> <span class="heading"><i class="fa fa-money"></i>&nbsp;Process to checkout </span>
                    <span>({{ tot_quantity }} item in your cart)</span></p>

                <div class="card mb-4 mt-4">
                    <div class="card-body" v-for="item in order_detail.data" :key="item.id">

                        <div class="row align-items-center">
                            <div class="col-md-3 ">
                                <img :src="`${VUE_APP_IMAGE_URL}` + item.image" class="img-fluid" alt="product image">
                            </div>
                            <div class="col-md-3 justify-content-center">
                                <div>
                                    <p class="small text-muted mb-4">Name</p>
                                    <p class="lead fw-normal mb-0">{{item.name}}</p>
                                </div>
                            </div>
                            <div class="col-md-2 justify-content-center">
                                <div>
                                    <p class="small text-muted mb-4">Color</p>
                                    <p class="lead fw-normal mb-0">{{item.color}}</p>
                                </div>
                            </div>
                            <div class="col-md-2 justify-content-center">
                                <div>
                                    <p class="small text-muted mb-4">Quantity</p>
                                    <p class="lead fw-normal mb-0">{{item.tot_quantity}}</p>
                                </div>
                            </div>
                            <div class="col-md-2 justify-content-center">
                                <div>
                                    <p class="small text-muted mb-4">Price</p>
                                    <p class="lead fw-normal mb-0"><i class="fa fa-inr"></i>&nbsp;{{item.tot_price}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <!-- <div class="card-body p-4">
                        <div class="float-end">
                            <p class="mb-0 me-5 d-flex align-items-center">
                                <span class="text-muted me-2">Delivery Address:</span> <span class="lead fw-normal">
                                    {{delivery_address}}</span>
                            </p>
                        </div>
                    </div> -->
                     <div class="card-body p-4">
                        <div class="float-end">
                            <p class="mb-0 me-5 d-flex align-items-center">
                                <span class="text-muted me-2">Delivery Address:</span> <span class="lead fw-normal">
                                     <input type="text" :value = "delivery_address"> <i class="fa fa-pencil"></i></span>
                            </p>
                        </div>
                    </div>
                  
                    <div class="card-body p-4">

                        <div class="float-end">
                            <p class="mb-0 me-5 d-flex align-items-center">
                                <span class="text-muted me-2">Order total:</span> <span class="lead fw-normal">
                                    <b><i class="fa fa-usd"></i>&nbsp;{{tot_price}}</b></span>
                            </p>
                        </div>
                        <div class="float-end">
                            <p class="mb-0 me-5 d-flex align-items-center">
                                <span class="text-muted me-2">Order total:</span> <span class="lead fw-normal">
                                    <b><i class="fa fa-inr"></i>&nbsp;{{(tot_price*70).toFixed(2)}}</b></span>
                            </p>
                        </div>
                        <div class="float-end">
                            <p class="mb-0 me-5 d-flex align-items-center">
                                <span class="text-muted me-2">Delivery Charge:</span> <span class="lead fw-normal">
                                    FREE</span>
                            </p>
                        </div>

                    </div>
                </div>
                <hr>
                <div class="inline-block">
                    <div ref="paypal" class="paypal paypal-button"></div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import Header from './layouts/Header.vue'
import store from "@/store/index"

export default {
    components: {
        Header
    },
    data() {
        return {
            VUE_APP_IMAGE_URL: process.env.VUE_APP_IMAGE_URL,
            order_detail: [],
            tot_price: 0,
            tot_quantity: 0,
            delivery_address: '',
            customer_id:''
        }
    },
    props: ['orderData'],
    mounted() {
        if (localStorage.getItem("order-detail") == undefined) {
            this.order_detail = JSON.stringify(localStorage.setItem("order-detail", this.orderData))
        }
        if (localStorage.getItem("order-detail") !== null) {
            if (this.orderData !== undefined) {
                this.order_detail = JSON.stringify(localStorage.setItem("order-detail", this.orderData))
            }
        }
        this.order_detail = JSON.parse(localStorage.getItem("order-detail"))
        this.tot_quantity = this.order_detail.data.reduce((acc, nxt) => acc + nxt.tot_quantity, 0)
        this.tot_price = ((this.order_detail.data.reduce((acc, nxt) => (parseFloat(acc) + parseFloat(nxt.tot_price)), 0)) / 70).toFixed(2)

        //update from here
        this.delivery_address = JSON.parse(localStorage.getItem('delivery-address'))

        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AfCGR8A0RsdGHABr6Vlvf40rCALIEovb1SlCmA0XLsu_jqy_hGBOfZEIbE1jWtCGc1ehiskqZSh5X5by&disable-funding=credit,card";
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
        // console.log(JSON.stringify(this.order_detail.data));
    },
    methods: {
        setLoaded: function () {
            this.loaded = true;
            window['paypal'] //window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: "USD",
                                    value: this.tot_price
                                },
                            }]
                        });
                    },
                    onApprove: (data, actions) => {
                        return actions.order.capture().then(function (details) {
                            console.log(details);
                            store.dispatch("orderStatus", JSON.parse(localStorage.getItem('user-info')).success.id);
                        })
                    },
                    style:{
                        color:'blue',
                        shape:'pill'
                    }
                })
                .render(this.$refs.paypal);
        },
    }
}
</script>

<style scoped>
.heading {
    color: #4e7ab5;
    font-size: 20pt;
    font-weight: 400 !important;
}

.img-fluid {
    height: 110px !important;
    width: 100% !important;
    object-fit: contain;
}

.row>* {
    padding-left: 0px !important;
    padding-right: 0px !important;
}

.inline-block {
    display: flex !important;
    text-align: center !important;
    justify-content: right !important;
    align-content: center !important;
    align-items: center !important;
}

.paypal-button {
    width: 30% !important;
}

hr {
    height: 1px;
    border: 0;
    box-shadow: 0px 0px 18px 4px #305b94;
}

input{
    width:150vh;
    border:0;
    outline: none;
}
</style>