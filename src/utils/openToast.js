// ToastType 에는 'error'  'warning'  'success' 세 가지가 들어갑니다.
// 토스트에 넣을 메세지는 txt 안에 적어주세요.
//
import { toast } from 'react-toastify';

function openToast({ type = 'success', txt = 'notification!' }) {
  if (type !== ('success' || 'error' || 'warning')) return;
  toast[type](txt, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'dark',
  });
}

export default openToast;
