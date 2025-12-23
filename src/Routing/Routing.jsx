import { lazy } from "react"

const BookFrom=lazy(()=>import('../pages/BookFrom'))
const BookList=lazy(()=>import('../pages/BookList'))
export const Routing=[
    {
     path:'/',
     element:BookList
    },
      {
     path:'/addBook',
     element:BookFrom
    } ,
      {
     path:'/UpdateBook/:id',
     element:BookFrom
    } 
]