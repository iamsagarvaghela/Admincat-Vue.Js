<template>
<section>
    <div class="registration bg-light">
        <form>
            <h2><i class="fa fa-user-plus"></i> Registration</h2>
            <hr>
            <table>
                <tr v-for="item in error" v-bind:key="item">
                    <td align="left">
                        <b>{{ item }}</b> field is required
                    </td>
                </tr>
            </table>
            <div class="mb-2 mt-2">
                <label for="name" class="form-label">Fullname</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Fullname" v-model="form.name">
            </div>
            <div class="mb-2">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="Enter Email address" v-model="form.email">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-2">
                <label for="phone" class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="phone" placeholder="+91" v-model="form.phone">
            </div>
            <div class="mb-2">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" placeholder="XXXXXXXX" autocomplete="off" v-model="form.password">
            </div>
            <hr>
            <button type="button" class="btn btn-primary" @click="signUp">Register</button>
            <label>&nbsp;&nbsp;&nbsp;Have an Account? <router-link to="/">Login</router-link></label>
        </form>
    </div>
</section>
</template>

<script>
import axios from 'axios' //For API calling
export default {
    name: 'Registration',
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone: '',
                password: ''
            },
            error: []
        }
    },
    methods: {
        async signUp() {
            this.error = []

            for (const item in this.form) {
                if (this.form[item] === "" || this.form[item].length === 0) {
                  var error = this.error.push(item)
                }
            }
            if (!error) {
                // console.log(this.name, this.email,  this.password);
                let result = await axios.post("http://localhost:8000/api/customer/store", {
                    name: this.form.name,
                    email: this.form.email,
                    phone: this.form.phone,
                    password: this.form.password
                });
                // axios.post('http://localhost:8000/api/customer/store', this.form)
                //     .then(response => console.log(response))
                //     .catch(error => console.log(error))

                // console.log(result);
                if (result.status == 201) {
                    alert("Signup Success");
                }
                localStorage.setItem("user-info", JSON.stringify(result.data)) //convert object data to json format and user-info is local storage name
                this.$router.push({
                    name: 'Home'
                }) //route redirection
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
.registration {
    display: flex;
    align-content: center;
    align-items: center;
    height: 100vh;
    justify-content: center;
}

a {
    text-decoration: none;
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
