import { useEffect } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Message from './Toast/Message';

const BackgroundFetching = () => {
  const isFetching = useIsFetching();

  useEffect(() => {
    if (isFetching) {
      toast.info(
        <Message
          title="Refreshing"
          body="The page content is being updated."
        />,
        { toastId: 'fetching', hideProgressBar: true, autoClose: false, closeOnClick: false },
      );
    } else {
      toast.update('fetching', {
        render: (
          <Message
            title="Refreshed"
            body="The page content has been updated."
          />
        ),
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  }, [isFetching]);

  return null;
};

export default BackgroundFetching;
