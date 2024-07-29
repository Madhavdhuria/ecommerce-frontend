import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllCategoriesResponse,
  AllProductsResponse,
  deleteproductrequest,
  MessageResponse,
  newproductrequest,
  SearchProductsParams,
  SearchProductsResponse,
  updateproductrequest,
} from "../../types/api-types";
import { Product } from "../../types/types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "/latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `/admin-products?id=${id}`,
      providesTags: ["product"],
    }),
    allCategories: builder.query<AllCategoriesResponse, string>({
      query: () => `/categories`,
      providesTags: ["product"],
    }),
    productDetail: builder.query<
      {
        success: boolean;
        product: Product;
      },
      string
    >({
      query: (id) => id,
      providesTags: ["product"],
    }),
    searchproducts: builder.query<SearchProductsResponse, SearchProductsParams>(
      {
        query: ({ price, page, search, category, sort }) => {
          let base = `/all/?search=${search}&page=${page}`;

          if (price) {
            console.log(price);
            base += `&price=${price}`;
          }
          if (sort) {
            base += `&sort=${sort}`;
          }
          if (category) {
            base += `&category=${category}`;
          }
          return base;
        },
        providesTags: ["product"],
      }
    ),
    newProduct: builder.mutation<MessageResponse, newproductrequest>({
      query: ({ formData, id }) => ({
        url: `/new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation<MessageResponse, updateproductrequest>({
      query: ({ formData, Productid, Userid }) => ({
        url: `${Productid}/?id=${Userid}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
   deleteProduct: builder.mutation<MessageResponse, deleteproductrequest>({
      query: ({ Productid, Userid }) => ({
        url: `${Productid}/?id=${Userid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useAllCategoriesQuery,
  useSearchproductsQuery,
  useNewProductMutation,
  useProductDetailQuery,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productApi;
