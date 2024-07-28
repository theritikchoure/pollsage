import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isEmpty } from '../helpers/common';

// example options object
let globalOptions = {
    position: "bottom-center",
    autoClose: 5000, // 5 seconds
    hideProgressBar: false,
    closeOnClick: true || false,
    pauseOnHover: true || false,
    draggable: true || false,
    theme: "light",
}

export const successToast = (message='', options=globalOptions) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast.success(message, options);
};

export const infoToast = (message='', options=globalOptions) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast.info(message, options);
};

export const warningToast = (message='', options=globalOptions) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast.warning(message, options);
};

export const errorToast = (message='', options=globalOptions) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast.error(message, options);
};

export const loadingToast = (message='', options=globalOptions) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast.loading(message, options);
};

export const defaultToast = (message='', options=globalOptions) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast(message, options);
};

export const dismissToast = (id=null) => {
    toast.dismiss(id && id);
}