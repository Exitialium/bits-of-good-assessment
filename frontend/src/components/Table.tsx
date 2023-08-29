import React from 'react';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
  

type Person = {
firstName: string
lastName: string
age: number
visits: number
status: string
progress: number
}

interface TableProps {
    name: string;
    avatar: string;
    hero_project?: string;
    notes?: string;
    email?: string;
    phone?: string;
    rating?: string;
    status?: boolean;
    id?: string;
    deleteFunction: Function;
    changeFunction: Function;
    indexNum: number;
  }
const Table = (props: TableProps) => {
    return (
        <tr className='element'>
            <td className='user-name border px-8 py-4'><input type="text" value={props.name}  onChange={(evnt)=>(props.changeFunction(props.indexNum, evnt))} name="name" className="form-control" /></td>
            <td className='user-avatar'><img src={props.avatar}></img></td> 
            <td className='user-name border px-8 py-4'><input type="text" value={props.hero_project}  onChange={(evnt)=>(props.changeFunction(props.indexNum, evnt))} name="hero_project" className="form-control" /></td>
            <td className='user-name border px-8 py-4'><input type="text" value={props.notes}  onChange={(evnt)=>(props.changeFunction(props.indexNum, evnt))} name="notes" className="form-control" /></td>
            <td className='user-name border px-8 py-4'><input type="text" value={props.email}  onChange={(evnt)=>(props.changeFunction(props.indexNum, evnt))} name="email" className="form-control" /></td>
            <td className='user-name border px-8 py-4'><input type="text" value={props.phone}  onChange={(evnt)=>(props.changeFunction(props.indexNum, evnt))} name="phone" className="form-control" /></td>
            <td className='user-name border px-8 py-4'><input type="text" value={props.rating}  onChange={(evnt)=>(props.changeFunction(props.indexNum, evnt))} name="rating" className="form-control" /></td>
            <td className='user-id border px-8 py-4'>{props.id}</td> 
            <td><button className="btn btn-outline-danger" onClick={()=>(props.deleteFunction(props.indexNum))}>x</button></td>
        </tr>
        // <div className="post-card">
        //     <h2 className="post-title">{props.name}</h2>
        //     <p className="post-body">{props.avatar}</p>
        //     {/* <button className="btn-delete">Delete</button> */}
        // </div>
    )   
}

export default Table;