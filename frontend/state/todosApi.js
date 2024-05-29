import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/'}),
    tagTypes: ['Todos'],
    endpoints: build => ({
        getTodos: build.query({
            query: () => 'todos',
            providesTags: ['Todos']
        }),
        toggleTodo: build.mutation({
            query: ({ id, todo }) => ({
                url: `todos/${id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todos'],
        }),
        createTodo: build.mutation({
            query: todo => ({
                url: 'todos',
                method: 'Post',
                body: todo
            }),
            invalidatesTags: ['Todos']
        })
    })
})

export const {
    useGetTodosQuery,
    useToggleTodoMutation,
    useCreateTodoMutation
} = todosApi