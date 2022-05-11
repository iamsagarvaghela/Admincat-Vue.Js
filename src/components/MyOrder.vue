<template>
<Header />
<section class="h-100">
    <div class="h-100 py-5">
        <div class="row d-flex justify-content-center h-100">
            <div class="col-md-7 loader" v-show="loader">
                <img src="../assets/loader.svg" />
            </div>
            <div class="col-6">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="fw-normal mb-0 order">
                        <i class="fa fa-first-order fa-spin"></i> My Order
                    </p>
                </div>
                <div v-if="getOrder.status == 'info'" class="card rounded-3 mb-4 p-5">
                    <h3 class="text-center">☹ No Order Found ☹</h3>
                </div>
                <div class="card rounded-3 mb-4" v-for="item in getOrder.data" :key="item.id">
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
                           
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 class="mb-0" style="color:green">
                                    <i class="fa fa-inr"></i> {{ item.tot_price==1 ? item.price : item.tot_price   }}
                                </h5>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import Header from "./layouts/Header.vue"
import store from "@/store/index"

export default {
    name: "MyOrder",
    data() {
        return {
            loader: false,
            VUE_APP_IMAGE_URL: process.env.VUE_APP_IMAGE_URL,

        }
    },
    computed: {
        getOrder: () => {
            return store.state.todaydeal.order_data
        }
    },
    methods: {
        getorderData() {
            this.loader = true;
            this.$store.state.todaydeal.order_data = [];
            this.customer_id = JSON.parse(localStorage.getItem("user-info"));
            this.customer_id = this.customer_id.success.id;
            this.$store.dispatch("orderView", this.customer_id);
            setTimeout(() => {
                this.loader = false
            }, 1000);
        }
    },
    components: {
        Header,
    },
    created() {
        this.getorderData();
    }
};
</script>

<style scoped>
.loader {
    position: fixed;
    z-index: 1;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vh;
    opacity: 1;
}

.order {
    color: #4e7ab5;
    font-size: 20pt;
}

.img-fluid {
    height: 110px !important;
    width: 100% !important;
    object-fit: contain;
}
</style>
