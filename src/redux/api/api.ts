import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  // tagTypers er karone tkota todo namer cas create hobe
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();

        if (priority) {
          params.append("priority", priority);
        }
        return {
          url: "/tasks",
          method: "GET",
          // params: { priority },  // unprofetional
          params: params, // profetional
        };
      },
      // providerTags er karone todo cash e getTodos er query maddome all data cash hobe
      providesTags: ["todo"],
    }),
    addTodo: builder.mutation({
      query: (data) => {
        console.log("inside base api: ", data);
        return {
          url: "/task",
          method: "POST",
          body: data,
        };
      },
      // invalidatesTags er karone todo theke all cas remove hoye jabe. tai abar sathe sathe getTodos providesTags er maddome abar todo cash add korbe. fole reload sara data add korle data sob fetch korbe.
      invalidatesTags: ["todo"],
    }),

    updateTodo: builder.mutation({
      query: (options) => {
        console.log("opstions", options);
        return {
          url: `/task/${options.id}`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["todo"],
    }),

    deleteTodo: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/task/${id.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = baseApi;
