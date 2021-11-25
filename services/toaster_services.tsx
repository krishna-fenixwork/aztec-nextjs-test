import { toast } from 'react-toastify';

const toastOptions:any = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
}

export const notifySuccess = (notifSuccessMsg:any) => toast.success(notifSuccessMsg, toastOptions);
 
export const notifyError = (notifErrorMsg:any) => toast.error(notifErrorMsg, toastOptions);
 
export const notifyInfo = (notifInfoMsg:any) => toast.info(notifInfoMsg, toastOptions);