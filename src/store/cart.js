  import { createSlice } from "@reduxjs/toolkit";
  import { cartData, productData } from "../data/data";

  const cart = createSlice({
    name: "cart",
    initialState: cartData,
    reducers: {
      // INI FUNGSI MENGELOLA STATE NYA
      //FUNGSI  UNTUK MENAMBAH DATA EK STATE CART
      add(state, { payload }) {
        //PAYLOAD ITU DATA YANG DIKIRIM DARI FUNCTION
        state.push(payload);
      },
      update(state, { payload }) {
        const found = state.find((item) => item.id === payload.id);

        //JIKA DATA DITEMUKAN
        if (found) {
          //AMBIL DATA PRODUCTNYA BERDASARKAN ID
          const product = productData.find((p) => p.id === found.product_id);
          found.amount = payload.amount;
          //UPDATE DATA CART
          //TOTAL HASIL PERKALIAN DARI JUMLAH DAN HARGA
          const total = payload.amount * product.price;

          found.total = total;
        } else {
          alert("data chart tidak ada");
        }
      },

      delete(state, { payload }) {
        console.log(payload);
        //HAPUS DATA BERDASARKAN ID
        const index = state.findIndex((item) => item.id === payload.id);
        //SPLICE ARTINYA MENGHAPUS BERDASARKAN INDEX DATA
        state.splice(index, 1);
      },
    },
  });
  export const { add, update } = cart.actions;

  export default cart.reducer;
