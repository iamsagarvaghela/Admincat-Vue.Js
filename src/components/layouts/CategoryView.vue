<template>
<div class="container pt-3 pb-1">
    <div class="table text-center row col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-2 col-sm-2 col-xs-2" v-for="item in categories.data" :key="item.id">
            <router-link :to="`/catproducts/`+ item.id" class="menu">
                <div class="category"> <b>{{ item.name }}</b></div>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: "CategoryView",
    data() {
        return {
            categories: []
        }
    },
    methods: {
        async loadCategories() {
            let user = localStorage.getItem('user-info'); //user-info is local storage variable
            const token = JSON.parse(user).success.token // to get tokem from response
            // console.log(token);
            const headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + token
            }; //pass token

            let result = await axios.get("http://localhost:8000/api/categoryList", {
                headers
            }); //get list of category data 
            this.categories = result.data
            // console.log(this.categories.data)
        }
    },
    mounted() {
        this.loadCategories()
    }
}
</script>

<style scoped>
.category {
    background: #cee3ff;
    transition: 0.3s;
    color: #0A204E;
    font-size: 13pt;
    width: 100% !important;
    height: 80px !important;
    border-radius: 40px;
    justify-content: center;
    text-align: center;
    display: flex;
    align-items: center;
    /* box-shadow: #ffe0e8 inset 0px 0px 5px 0px; */
}

.row>* {
    padding-left: 0 !important;
    padding-right: 0 !important;
}

.category:hover {
    background: #7ca4da;
    cursor: pointer;
    color: white;

}

.menu {
    text-decoration: none;
}
</style>
