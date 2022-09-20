import Spinner from '@/components/Spinner';

const LoadingText = ({ text }: { text?: string }) => {
  return (
    <>
      <Spinner
        className="mr-2"
        color="text-gray-900"
        size="h-4 w-4"
      />
      <p>{text ?? 'Loading'}...</p>
    </>
  );
};

export default LoadingText;
