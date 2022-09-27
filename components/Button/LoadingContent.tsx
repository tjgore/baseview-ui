import Spinner from '@/components/Spinner';

type LoadingContentProps = {
  loading: boolean;
  text: string;
};

const LoadingContent = ({ loading, text }: LoadingContentProps) => {
  return (
    <>
      {loading ? (
        <div className="flex items-center">
          <Spinner className="mr-2" /> Loading...
        </div>
      ) : (
        <>{text}</>
      )}
    </>
  );
};

export default LoadingContent;
