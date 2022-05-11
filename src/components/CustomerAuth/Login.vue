<template>
<section>
    <div class="login bg-light">
        <form>
            <img src="../../assets/cart-ani.gif" class="center" />

            <h2><i class="fa fa-sign-in mt-5"></i> Login</h2>
            <p>Welcome 😊! Login to start your session</p>
            <hr>
            <table>
                <tr v-for="item in error" v-bind:key="item">
                    <td align="left">
                        <b>{{ item }}</b> field is required
                    </td>
                </tr>
            </table>
            <div class="mb-2 mt-2">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="Enter Email address" v-model="form.email">
            </div>
            <div class="mb-2">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" placeholder="XXXXXXXX" autocomplete="off" v-model="form.password">
            </div>
            <hr>
            <button type="button" class="btn btn-primary" @click="login">Login</button>
            <label>&nbsp;&nbsp;&nbsp;<router-link to="forgotpassword"> Forgot Password?</router-link></label><br>
            <label class="mt-2">&nbsp;&nbsp;&nbsp;New User? <router-link to="/registration">Register Now!</router-link></label>
        </form>
    </div>
</section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            error: []
        }
    },
    methods: {
        async login() {
            this.error = []
            for (const item in this.form) {
                if (this.form[item] === "" || this.form[item].length === 0) {
                    var error = this.error.push(item)
                }
            }          
            if (!error) {
                let result = await axios.post(
                    `http://localhost:8000/api/customer/checkLogin`, {
                            email: this.form.email,     //To prevent pass data in URL pass data as an object [Network URL data not available]
                            password: this.form.password
                        }
                    );
                if (result) {
                    localStorage.setItem("user-info", JSON.stringify(result.data));
                    this.$router.push({
                        name: 'Home'
                    });
                } else {
                    alert("❌ Invalid Credentials");
                }
            }
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info') //get localstorage data availability for redirection
        if (user) {
            this.$router.push({
                name: 'Home'
            }) //route redirection if already signup user
        }
    }

}
</script>

<style scoped>
.login {
    display: flex;
    align-content: center;
    align-items: center;
    height: 100vh;
    justify-content: center;
}

a {
    text-decoration: none;
}

.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}

table {
    margin-left: auto;
    margin-right: auto;
    color: red;
    padding: 10px;
}

td:before {
    content: "* ";
}
</style>
