import { getLayout as getAppLayout } from './AppLayout';
/**
 * Layout with no nav, just an empty full page
 */
const FullPageLayout = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
};

export const getLayout = page => getAppLayout(<FullPageLayout>{page}</FullPageLayout>);

export default FullPageLayout;
