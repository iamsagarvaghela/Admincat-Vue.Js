<template>
<div class="loader" v-show="loader">
    <img src="../../assets/loader.svg" />
</div>
<nav class="navbar navbar-expand-lg navbar-light nav-bg">
    <div class="container container-fluid">
        <a class="home navbar-brand"><img src="../../assets/logo-main.gif" class="home-logo" alt="" /> <v @click="clearSearch()">MMarket</v></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
            <div class="container-fluid custom-width text-center">
                <form class="example">
                    <input class="searchInput" type="text" placeholder="Search..." v-model="this.searchValue" @keyup="searchData()" id="srch">
                    <button class="search-button" @click.prevent="searchData()"><b class="fa fa-search"></b></button>
                </form>
            </div>
            <form class="d-flex">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <b>{{ userdata.name }}</b>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                            <li>
                                <router-link class="dropdown-item" :to="`/profile/`+userdata.id"><i class="fa fa-user-o"></i> Profile</router-link>
                            </li>
                             <li>
                                <router-link class="dropdown-item" :to="`/myorder`"><i class="fa fa-cart-arrow-down"></i> My Orders</router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><button v-on:click="logout" class="dropdown-item"><i class="fa fa-sign-out"></i> Logout</button></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link :to="`/cart`" class="nav-link position-relative">
                        <i class="fa fa-shopping-cart fa-lg"></i>
                            <b>&nbsp; Cart</b>
                        </router-link>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</nav>

<!-- #f081a3 = pink
#c2cde6 = skyblue -->
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            userdata: {},
            searchValue: '',
            loader:false,
        }
    },
    methods: {
        logout() {
            localStorage.clear(); // for logout we have to clear cookies from local storages
            this.$router.push({
                name: 'Login'
            }) //redirect to login after click on logout buttons
        },
        async searchData() {
            // alert(this.searchValue)            
            this.loader=true
            await this.$store.dispatch("getProducts",this.searchValue);
            this.loader=false
        },
        async clearSearch(){
            localStorage.removeItem('search-keyword')
            location.href = "http://localhost:100/home"; //reload specific page
            // location.assign("http://localhost:100/home"); //reload specific page
            // window.location.reload(true); //reload current page
            // location.href; // current page url addresss
            // location.protocol; // https:
        }
    },
    mounted() {
        this.searchValue = this.$store.state.todaydeal.searchData //search showing
        let user = localStorage.getItem('user-info') //get localstorage data availability for redirection 
        // console.log(user)
        if (!user) {
            this.$router.push({
                name: 'Login'
            }) //route redirection if no signup user
        } else {
            this.userdata = JSON.parse(user).success
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&display=swap');

.navbar {
    width: 100% !important;
}

.navbar-brand {
    font-family: 'Fredoka', sans-serif;
    font-size: 20pt !important;
    color: #4e7ab5;
    cursor:pointer;
}

.home-logo {
    height: 50px;
    width: auto;
}

.form-control {
    border-radius: 1.25rem;
}

.custom-width {
    width: 50% !important;
}

form.example .searchInput[type=text] {
    padding: 17px;
    font-size: 17px;
    /* border: 1px solid #4e7ab5; */
    border: none !important;
    float: left;
    width: 90%;
    height: 46px;
    background: #f1f1f1;
    border-top-left-radius: 17px;
    border-bottom-left-radius: 17px;
    outline: 0 !important;
}

form.example .search-button {
    float: left;
    width: 10%;
    height: 46px;
    padding: 10px;
    /* background: #8ab6ee; */
    background: #b5d0f1;
    color: white;
    font-size: 17px;
    /* border: 1px solid grey; */
    border: none !important;
    border-left: none;
    cursor: pointer;
    border-top-right-radius: 17px;
    border-bottom-right-radius: 17px;
    transition: 0.3s;
}

form.example .search-button:hover {
    background: #4e7ab5;
}

.nav-bg {
    background-color: #ffe0e9 !important;
}

.home {
    text-decoration: none;
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
