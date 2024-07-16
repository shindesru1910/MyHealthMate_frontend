import {  toast } from 'react-toastify';

export function errortoast(msg){
    return toast.error(msg,
    {theme: "colored",});
}
export function successtoast(msg){
    return toast.success(msg,{
        theme: "colored",
      });
}
