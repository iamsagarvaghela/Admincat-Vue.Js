<template>
<Header />
<div class="profile">
    <div class="container pt-5 profile">
        <div class="col-lg-4">
            <div class="card mb-4">
                <div class="card-body text-center image-upload">
                    <!-- <img :src="`${VUE_APP_PROFILE_IMAGE_URL}`+customer_detail.customer[0].image" alt="avatar" class="rounded-circle img-fluid" style="width: 100px;"> -->
                     <img :src="`${VUE_APP_PROFILE_IMAGE_URL}`+ `20220406101904.png`" alt="avatar" class="rounded-circle img-fluid" style="width: 100px;">
                    <!-- <v-file-input id="file-input">dsd</v-file-input> -->
                    <h5 class="my-3">{{ customer_detail.customer[0].name }}</h5>
                    <p class="text-muted mb-1">{{ customer_detail.customer[0].email }}</p>
                    <p class="text-muted mb-4">{{ customer_detail.customer[0].address }}</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="profile">
    <div class="col-lg-4">
        <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Full Name</p>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" v-model="customer_detail.customer[0].name" placeholder="Enter Fullname" />
                    </div>

                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Email</p>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" v-model="customer_detail.customer[0].email" placeholder="Enter Email address" />

                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Phone</p>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" v-model="customer_detail.customer[0].phone" placeholder="Enter Phone number" />

                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Address</p>
                    </div>
                    <div class="col-sm-9">
                        <textarea cols="47" placeholder="Enter delivery address here" v-model.lazy="customer_detail.customer[0].address"> </textarea>
                    </div>
                </div>
                <!-- <form @submit="formSubmit" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-sm-3">
                            <p class="mb-0">Profile Photo</p>
                        </div>
                        <div class="col-sm-9">
                            <input type="file" class="form-control" v-on:change="onChange" />
                        </div>
                    </div>
                </form> -->
            </div>
        </div>
    </div>
</div>
<div class="profile">
    <button class="btn btn-primary" @click="updateProfile">Update Profile</button>
</div>
</template>

<script>
import axios from "axios";
import Header from "./layouts/Header.vue";
export default {
    name: "Profile",
    components: {
        Header,
    },
    data() {
        return {
            customer_detail: [],
            VUE_APP_IMAGE_URL: process.env.VUE_APP_IMAGE_URL,
            VUE_APP_PROFILE_IMAGE_URL : process.env.VUE_APP_CUSTOMER_IMAGE_URL,
            file: ''
        };
    },
    methods: {
        // onChange(e) {
        //     this.file = e.target.files[0]
        //     console.log(this.file)
        // },
        async loadCustomerDetail() {
            let user = localStorage.getItem("user-info"); //user-info is local storage variable
            const token = JSON.parse(user).success.token; // to get tokem from response
            // console.log(token);
            const headers = {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + token,
            }; //pass token
            let result = await axios.get(
                "http://localhost:8000/api/customer/customer-profile/" +
                this.$route.params.cust_id, {
                    headers,
                }
            ); //get data of customer
            // console.log("result",result)

            this.customer_detail = result.data;
            // console.log("customer", this.customer_detail);
        },
        async updateProfile() {
            let result = await axios.post(
                "http://localhost:8000/api/customer/update-profile/" +
                this.customer_detail.customer[0].id, {
                    name: this.customer_detail.customer[0].name,
                    email: this.customer_detail.customer[0].email,
                    phone: this.customer_detail.customer[0].phone,
                    address: this.customer_detail.customer[0].address,
                    // image: this.customer_detail.customer[0].image
                }
            ); //get data of customer
            localStorage.setItem("delivery-address",JSON.stringify(this.customer_detail.customer[0].address));

            if (result) {
                alert("Profile updated successfully");
            }
        },
    },
    created() {
        this.loadCustomerDetail();
        // this.updateProfile();
    },
};
</script>

<style scoped>
.profile {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center;
    align-content: center !important;
    width: 100% !important;
    height: 100% !important;
}

.card {
    border-radius: 20px;
}

input {
    border: none;
    width: 100%;
    outline: none;
}

textarea {
    outline: none;
    border: none;
}

.image-upload>input {
    display: none;
}
</style>
