import { createSlice } from "@reduxjs/toolkit";


const cartItemFromStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[];

//Offcanvas start
const initialState = {
  //Offcanvas inactive until press boton cart
  isCartOpen: false,
  //Cart count items and list

  cart: cartItemFromStorage,
  count: [],
  items: [],
  metadata: [],
};



export const cartSlice = createSlice({
  name: "cart",
  initialState,

  

  //where we are created our actions and reducers
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('cart', JSON.stringify(state.cart));

    },






    addToCart: (state, action) => {
      state.isCartOpen= !state.isCartOpen;
      if (action.payload) {
        let idItemAction = action.payload.item.id;
        var index = state.cart ? state.cart.map((item) => item.id).indexOf(idItemAction) : -1;
        if(index !== -1){
            state.cart[index].count ++;
        } else {
          state.cart = [...state.cart, action.payload.item];
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
      // state.cart = [...state.cart, action.payload.item];

    },


    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(state.cart));

    },

    resetCart: (state) => {
      state.cart = [];
      state.count = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));

    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (
          item.id === action.payload.id &&
          item?.attributes?.instock > item.count
        ) {
          item.count++;
          localStorage.setItem('cart', JSON.stringify(state.cart));

        }
        return item;

      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
          localStorage.setItem('cart', JSON.stringify(state.cart));

        }
        return item;
      });
    },

    //Opent cart with press botton
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  resetCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  
} = cartSlice.actions;

export default cartSlice.reducer;
