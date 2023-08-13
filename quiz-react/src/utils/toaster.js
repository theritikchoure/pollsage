import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isEmpty } from '../helpers/common';

// example options object
// let options = {
    // position: top-left || top-right || top-center || bottom-left || bottom-right || bottom-center,
    // autoClose: 5000, // 5 seconds
    // hideProgressBar: false || true,
    // closeOnClick: true || false,
    // pauseOnHover: true || false,
    // draggable: true || false,
    // progress: undefined || ,
    // theme: "light",
// }

export const successToast = (message='', options={}) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast.success(message, options);
};

export const infoToast = (message='', options={}) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast.info(message, options);
};

export const warningToast = (message='', options={}) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast.warning(message, options);
};

export const errorToast = (message='', options={}) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast.error(message, options);
};

export const loadingToast = (message='', options={}) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast.loading(message, options);
};

export const defaultToast = (message='', options={}) => {
    if(isEmpty(message)) return;
    dismissToast();
    return toast(message, options);
};

export const dismissToast = (id=null) => {
    toast.dismiss(id && id);
}