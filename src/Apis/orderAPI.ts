import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://foodfancywebapi.azurewebsites.net/",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({   
    createOrder : builder.mutation({
      query: (orderDetails) => ({
        url: `order/create-order`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: orderDetails,
      }),
    }),
    getAllOrders: builder.query({
      query: (userId) => ({
        url: `order`,
        params: {
          userId: userId,
        }
      }),
      providesTags: ["Orders"],
    }),
    getOrderDetails: builder.query({
        query: (id) => ({
          url: `menuItem/${id}`,
        }),
        providesTags: ["Orders"],
      }),
  }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery, useGetOrderDetailsQuery } = orderApi;
export default orderApi;
