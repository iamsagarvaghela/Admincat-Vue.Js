<template>
<Header />

<section class="h-100">
    <div class="h-100 py-5">
        <div class="row d-flex justify-content-center h-100">
            <div class="col-7">
                <div class="row">
                    <div class="col-md-7 loader" v-show="loader">
                        <img src="../assets/loader.svg" />
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="fw-normal mb-0 cart">
                        <i class="fa fa-shopping-cart"></i> My Cart
                    </p>
                </div>
                <div v-if="getcartData.status == 'info'" class="card rounded-3 mb-4 p-5">
                    <h3 class="text-center">☹ Your Cart is Currently Empty ☹</h3>
                </div>
                <div class="card rounded-3 mb-4" v-for="item in getcartData.data" :key="item.id">
                    <!-- {{ price = parseInt(price) + parseInt(item.price) }} -->
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
                                <button class="btn btn-link px-2" @click="minusClick(item.id,item.price)">
                                    <i class="fa fa-minus"></i>
                                </button>

                                <input id="qty" min="1" :max="item.stock" name="quantity" :value="item.tot_quantity" type="number" class="form-control form-control-sm" disabled />

                                <button class="btn btn-link px-2" @click="plusClick(item.id,item.price)">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 class="mb-0" style="color:green">
                                    <i class="fa fa-inr"></i> {{ item.price }}
                                </h5>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                <button style="border:none;outline:none;color:white" class="btn btn-danger btn-sm" @click="removeProduct(item.id)">
                                    <i class="fa fa-remove"></i>
                                </button>
                            </div>
                        </div>
                    </div>
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
                                <td>
                                    <b>{{ getcartData.data.reduce((acc, nxt)=>acc+nxt.tot_quantity,0) }}</b>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <hr />
                                </td>
                            </tr>
                            <tr>
                                <td>Delivery Charge:</td>
                                <td><b>FREE</b></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <hr />
                                </td>
                            </tr>
                            <tr>
                                <td>Total Amount:</td>
                                <td>
                                    <b>{{ getcartData.data.reduce((acc, nxt)=>(parseFloat(acc)+parseFloat(nxt.price)).toFixed(2),0) }}</b>
                                </td>
                            </tr>
                        </table>
                        <hr />
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
// import store from "../store/index"
import store from "@/store/index"
// import {
//     mapGetters
// } from "vuex";
export default {
    name: "Cart",
    // computed: mapGetters(["getcartData"]),
    computed: {
        getcartData: () => {
            return store.state.todaydeal.getcart_data
        }
    },
    components: {
        Header,
    },
    data() {
        return {
            customer_id: [],
            VUE_APP_IMAGE_URL: process.env.VUE_APP_IMAGE_URL,
            items: [],
            loader: false
        };
    },
    methods: {
        getcart() {
            this.loader = true
            this.$store.state.todaydeal.getcart_data = [];
            this.customer_id = JSON.parse(localStorage.getItem("user-info"));
            this.customer_id = this.customer_id.success.id;
            this.$store.dispatch("getcartData", this.customer_id);
            setTimeout(() => {
                this.loader = false
            }, 1000)
        },
        removeProduct(pro_id) {
            if (confirm("Remove from cart?") == true) {
                this.$store.dispatch("removefromCart", pro_id);
            }
        },
        minusClick(id) {
            let finalObj = {
                data: []
            };

            // for(let i=0;i<this.getcartData.data.length; i++) {
            //     if(this.getcartData.data[i].id === id) {
            //         if(this.getcartData.data[i].tot_quantity > 1) {
            //             this.getcartData.data[i].tot_quantity -= 1;
            //         }
            //         this.getcartData.data[i].price = (this.getcartData.data[i].tot_quantity * this.getcartData.data[i].tot_price).toFixed(2);
            //     }
            //     finalObj.data.push(JSON.parse(JSON.stringify(this.getcartData.data[i])));
            // }

            this.getcartData.data.forEach((cartData) => {
                if (cartData.id === id) {
                    if (cartData.tot_quantity > 1) {
                        cartData.tot_quantity -= 1;
                    }
                    cartData.price = (cartData.tot_quantity * cartData.tot_price).toFixed(2);
                }
                finalObj.data.push(JSON.parse(JSON.stringify(cartData)));
            })

            // console.log(finalObj);

            this.$store.commit("GET_CART", finalObj);
        },
        plusClick(id) {
            let finalObj = {
                data: []
            };

            // for(let i=0;i<this.getcartData.data.length; i++) {
            //     if(this.getcartData.data[i].id === id) {
            //         if(this.getcartData.data[i].tot_quantity < this.getcartData.data[i].stock) {
            //             this.getcartData.data[i].tot_quantity += 1;
            //         }
            //         this.getcartData.data[i].price = (this.getcartData.data[i].tot_quantity * this.getcartData.data[i].tot_price).toFixed(2);
            //     }
            //     finalObj.data.push(JSON.parse(JSON.stringify(this.getcartData.data[i])));
            // }

            this.getcartData.data.forEach((cartData) => {
                if (cartData.id === id) {
                    if (cartData.tot_quantity < cartData.stock) {
                        cartData.tot_quantity += 1;
                    } else {
                        alert("We're Sorry! We have only " + cartData.tot_quantity + " items available of " + cartData.name + ".")
                    }
                    cartData.price = (cartData.tot_quantity * cartData.tot_price).toFixed(2);
                }
                finalObj.data.push(JSON.parse(JSON.stringify(cartData)));
            })

            // console.log(finalObj);

            this.$store.commit("GET_CART", finalObj);
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

.img-fluid {
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
    opacity: 1;
}

.form-control:disabled {
    text-align: center;
    font-weight: bold;
    background: #ffe0e9;
    border-color: #305b94;
}
</style>
