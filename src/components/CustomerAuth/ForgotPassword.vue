<template>
<section>
    <div class="login bg-light">
        <form>
            <img src="../../assets/forgot-eye.gif" class="center" />

            <h2><i class="fa fa-key mb-2 mt-2"></i> Forgot Password?</h2>
            <p>We need to verify your identity</p>
            <hr />
            <table>
                <tr v-for="item in error" v-bind:key="item">
                    <td align="left"><b>Email</b> field is required</td>
                </tr>
            </table>
            <div class="mb-2 mt-2">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="Enter Email address" v-model="email" />
            </div>
            <hr />
            <button type="button" class="btn btn-primary" @click="forgotPass">
                Get Reset Link
            </button>
            <label>&nbsp;&nbsp;&nbsp;
                <router-link to="/"><i cla ss="fa fa-long-arrow-left"></i> Back to Login</router-link></label>
            <br />
        </form>
    </div>
</section>
</template>

<script>
import axios from "axios";

export default {
    name: "ForgetPassword",
    data() {
        return {
            email: "",
            error: [],
        };
    },
    methods: {
        async forgotPass() {
            this.error = [];
            var item;
            if (this.email == "") {
                var error = this.error.push(item);
            }

            if (!error) {
                try {
                    var result = await axios.post(
                        `http://localhost:8000/api/customer/forget-password?email=${this.email}`
                    );
                } catch {
                    alert("❌ Invalid Credentials");
                }
                // console.log(result) //check data get or not
                // if (result.status == 200  && result.data.length > 0) {
                if (result.status == 200) {
                    // localStorage.setItem("user-info", JSON.stringify(result.data[0]));
                    alert("Reset Link Shared Successfully");
                    this.$router.push({
                        name: "Login",
                    });
                }
            }
        },
    },
};
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
