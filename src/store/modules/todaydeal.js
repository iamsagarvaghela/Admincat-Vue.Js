import axios from "axios";
var state = {
    products: [],
    catProducts: [],
    product_detail: [],
    cart_detail: [],
    getcart_data: [],
    removecart_data: [],
    searchData: "",
    order_status: "",
    order_data: []
};

const getters = {
    todaydealProducts: (state) => state.products,
    // todaydealProducts(state) {
    //     state.products = state
    // }
    categoryProducts: (state) => state.catProducts,
    singleProduct: (state) => state.product_detail,
    cartDetail: (state) => state.cart_detail,
    getcartData: (state) => state.getcart_data,
    getordertData: (state) => state.order_data,
};

const actions = {
    //Today Deal Products
    async getProducts({ commit }, searchValue) {
        //for search
        if (searchValue != null && searchValue != undefined) {
            localStorage.setItem("search-keyword", searchValue);
        }
        searchValue = localStorage.getItem("search-keyword");
        //end for search
        state.searchData = searchValue;
        let user = localStorage.getItem("user-info");
        const token = JSON.parse(user).success.token;
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
        }; //pass token

        let response = await axios.post(
            process.env.VUE_APP_BASE_URL + "productlist/",
            {
                search: searchValue,
            },
            {
                headers,
            }
        );
        localStorage.setItem("all-product", JSON.stringify(response));
        var result = JSON.parse(localStorage.getItem("all-product"));
        commit("SET_PRODUCT", result.data);
    },
    //Category Menuwise Load Products
    async loadCatProducts({ commit }, payload_catid) {
        let user = localStorage.getItem("user-info");
        const token = JSON.parse(user).success.token;
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
        }; //pass token

        const result = await axios.get(
            process.env.VUE_APP_BASE_URL + "catProduct/" + payload_catid,
            {
                headers,
            }
        ); //get list of product category wise

        commit("CAT_PRODUCT", result.data.product_data);
    },
    //add product to cart table
    async addtoCart({ commit }, cartData) {
        let user = localStorage.getItem("user-info");
        const token = JSON.parse(user).success.token;
        const headers = {
            "content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
        };

        let result = await axios.post(
            process.env.VUE_APP_BASE_URL + "addtoCart/",
            {
                customer_id: cartData["customer_id"],
                product_id: cartData["product_id"],
                product_price: cartData["product_price"]
            },
            {
                headers,
            }
        );

        commit("ADD_TO_CART", result.data);
    },
    //get data for cart view purpose
    async getcartData({ commit }, customer_id) {
        let user = localStorage.getItem("user-info");
        const token = JSON.parse(user).success.token;

        const headers = {
            "content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
        };

        let result = await axios.post(
            process.env.VUE_APP_BASE_URL + "getcartData/",
            {
                customer_id: customer_id,
            },
            {
                headers,
            }
        );
        
        commit("GET_CART", result.data);
    },

    //get data for cart view purpose
    async updatecartData({ commit }, updcartData) {
        let user = localStorage.getItem("user-info");
        const token = JSON.parse(user).success.token;

        const headers = {
            "content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
        };

        let result = await axios.post(
            process.env.VUE_APP_BASE_URL + "updatecartData/", {
                id: updcartData["cart_id"],
                tot_quantity: updcartData["tot_quantity"],
                tot_price : updcartData["tot_price"]
            }, {
                headers,
            }
        );
        // window.location.reload();
        commit("GET_CART", result.data);
    },

    //remove product from cart
    async removefromCart({ commit }, pro_id) {
        let user = localStorage.getItem("user-info");
        const token = JSON.parse(user).success.token;
        const headers = {
            "content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
        };
        let result = await axios.post(
            process.env.VUE_APP_BASE_URL + "removefromCart/",
            {
                id:pro_id
            },
            {
                headers,
            }
        );
        window.location.reload();

        commit("REMOVE_ITEM_FROM_CART", result.data);
    },

    //orderdata status
    async orderStatus({ commit }, customer_id) {
        let user = localStorage.getItem("user-info");
        const token = JSON.parse(user).success.token;
        const headers = {
            "content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
        };

        let result = await axios.post(
            process.env.VUE_APP_BASE_URL + "orderStatus/",
            {
                customer_id: customer_id
            },
            {
                headers,
            }
        );
        console.log("Order Placed Successfully");
        commit("ORDER_STATUS", result);
    },

    //get ordered data
    async orderView({ commit }, customer_id) {
        let user = localStorage.getItem("user-info");
        const token = JSON.parse(user).success.token;

        const headers = {
            "content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
        };

        let result = await axios.post(
            process.env.VUE_APP_BASE_URL + "orderView/", {
                customer_id: customer_id,
            }, {
                headers,
            }
        );
        commit("GET_ORDER", result.data);
    },

};

const mutations = {
    // setProducts: (state, products) => (state.products = products)
    // loadCatProducts() {
    //     alert("Hello")
    // },
    SET_PRODUCT(state, products) {
        state.products = products;
    },
    CAT_PRODUCT(state, catProducts) {
        state.catProducts = catProducts;
    },
    SINGLE_PRODUCT(state, product_detail) {
        state.product_detail = product_detail;
    },
    ADD_TO_CART(state, cart_detail) {
        state.cart_detail = cart_detail;
    },
    GET_CART(state, getcart_data) {
        state.getcart_data = getcart_data;
    },
    REMOVE_ITEM_FROM_CART(state, removecart_data) {
        state.removecart_data = removecart_data;
    },  
    ORDER_STATUS(state, order_status) {
        state.order_status = order_status;
    },
    GET_ORDER(state, order_data) {
        state.order_data = order_data;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
