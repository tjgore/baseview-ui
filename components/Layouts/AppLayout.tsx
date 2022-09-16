/**
 * Top most layout and used to manage global data. Can hold Toast component
 */
const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen overflow-hidden bg-gray-100 font-sans antialiased">
      <div>{children}</div>
    </div>
  );
};

export const getLayout = page => <AppLayout>{page}</AppLayout>;

export default AppLayout;
