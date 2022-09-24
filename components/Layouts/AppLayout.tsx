import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Top most layout and used to manage global data. Can hold Toast component
 */
const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen overflow-hidden bg-gray-100 font-sans text-sm leading-7 tracking-wider text-gray-700 antialiased">
      <ToastContainer
        bodyClassName="!mb-3 !flex !items-start font-sans"
        position="top-right"
        icon={true}
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>{children}</div>
    </div>
  );
};

export const getLayout = page => <AppLayout>{page}</AppLayout>;

export default AppLayout;
