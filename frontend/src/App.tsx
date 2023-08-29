import * as React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

type User = {
  name: string
  avatar: string
  hero_project: string
  notes: string
  email: string
  phone: string
  rating: string
  status: boolean
  id: string
}

const defaultData: User[] = [
  {
    name: "Abcdee",
    avatar: "B",
    hero_project: "C",
    notes: "D",
    email: "E",
    phone: "F",
    rating: "G",
    status: false,
    id: "H"
  },
]

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name', {
    header: () => "Name",
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('avatar', {
    header: () => "Avatar",
    cell: info => <img src={info.getValue()}></img>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('hero_project', {
    header: () => "Hero",
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('notes', {
    header: () => "Notes",
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('email', {
    header: () => "Email",
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('phone', {
    header: () => 'Phone',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('rating', {
    header: () => <span>Rating</span>,
    footer: info => info.column.id,
  }),
  // columnHelper.accessor('status', {
  //   header: 'Status',
  //   footer: info => info.column.id,
  // }),
]

function App() {
  const [data, setData] = React.useState(() => [...defaultData])
  const fetchPosts = () => {
  fetch('http://localhost:5000/api/bog/users')
    .then((response) => response.json())
    .then((data) => setData(data))
  }
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  })
  

  React.useEffect(() => {
    table.setPageSize(10);
    fetchPosts()
  }, []);

  return (
    <div className="w-screen h-screen p-0 flex flex-col items-center justify-center">
      <div className='w-4/5 h-4/5 overflow-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className='text-xs bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          {/* <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[5, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select> */}
        </div>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

export default App;

// import './App.css';
// import {useState, useEffect} from 'react';
// import React from 'react'
// import Table from './components/Table';

// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   ColumnDef
// } from '@tanstack/react-table'

// type User = {
//   name: string
//   avatar: string
//   hero_project: string
//   notes: string
//   email: string
//   phone: string
//   rating: string
//   status: boolean
//   id: string
// }

// const defaultData: User[] = [
//   {
//     name: "A",
//     avatar: "B",
//     hero_project: "C",
//     notes: "D",
//     email: "E",
//     phone: "F",
//     rating: "G",
//     status: false,
//     id: "H"
//   },
// ]

// const columnHelper = createColumnHelper<User>()


// const columns = [
//   columnHelper.accessor(row => row, {
//     id: 'name',
//     cell: info => {info.getValue()},
//     header: () => <span>Name</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.avatar, {
//     id: 'avatar',
//     cell: info => {info.getValue()},
//     header: () => <span>Avatar</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.hero_project, {
//     id: 'hero',
//     cell: info => {info.getValue()},
//     header: () => <span>Hero</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.notes, {
//     id: 'notes',
//     cell: info => {info.getValue()},
//     header: () => <span>Notes</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.email, {
//     id: 'email',
//     cell: info => {info.getValue()},
//     header: () => <span>Email</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.phone, {
//     id: 'phone',
//     cell: info => {info.getValue()},
//     header: () => <span>Phone</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.rating, {
//     id: 'rating',
//     cell: info => {info.getValue()},
//     header: () => <span>Rating</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.status, {
//     id: 'status',
//     cell: info => {info.getValue()},
//     header: () => <span>Status</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.id, {
//     id: 'id',
//     cell: info => {info.getValue()},
//     header: () => <span>ID</span>,
//     footer: info => info.column.id,
//   }),
// ]



// function App() {
//   const [userData, setUser] = React.useState()
//   const fetchPosts = () => {
//     fetch('http://localhost:5000/api/bog/users')
//       .then((response) => response.json())
//       .then((data) => setUser(data))
//   }

//   const rerender = React.useReducer(() => ({}), {})[1]

//   const table = useReactTable<User>({
//     userData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })
//   useEffect(() => {
//     fetchPosts()
//   }, []);
//   return (
//     <div className="p-2">
//       <table>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map(cell => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           {table.getFooterGroups().map(footerGroup => (
//             <tr key={footerGroup.id}>
//               {footerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.footer,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </tfoot>
//       </table>
//       <div className="h-4" />
//       <button onClick={() => rerender()} className="border p-2">
//         Rerender
//       </button>
//     </div>
//     // <div className="flex flex-col min-h-screen justify-center items-center">
//     //   <div>
//     //     <h1 className="text-3xl font-bold underline">
//     //       Hello world!
//     //     </h1>
//     //   </div>
//     //   <div className="App w-4/5 overflow-scroll border-2 p-0">
//     //     <table className='shadow-lg bg-white w-full'>
//     //       <tr>
//     //         <th className="bg-blue-100 border text-center px-8 py-4">Name</th>
//     //         <th className="bg-blue-100 border text-center px-8 py-4">Avatar</th>
//     //         <th className="bg-blue-100 border text-center px-8 py-4">Hero</th>
//     //         <th className="bg-blue-100 border text-center px-8 py-4">Notes</th>
//     //         <th className="bg-blue-100 border text-center px-8 py-4">Email</th>
//     //         <th className="bg-blue-100 border text-center px-8 py-4">Phone</th>
//     //         <th className="bg-blue-100 border text-center px-8 py-4">Rating</th>
//     //         <th className="bg-blue-100 border text-center px-8 py-4">ID</th>
//     //         <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
//     //       </tr>
//     //     {users.map((user, index) => 
            
//     //         <Table 
//     //           key={user.id} 
//     //           id={user.id}
//     //           name={user.name} 
//     //           avatar={user.avatar} 
//     //           hero_project={user.hero_project}
//     //           notes={user.notes}
//     //           email={user.email}
//     //           phone={user.phone}
//     //           rating={user.rating}
//     //           deleteFunction={deleteTableRows}
//     //           changeFunction={handleChange}
//     //           indexNum={index}
//     //         />
//     //       )}
//     //     </table>
//     //   </div>
//     // </div>
//   );
// }

// export default App;
