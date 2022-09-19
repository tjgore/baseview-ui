/* eslint-disable @typescript-eslint/ban-types */
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isUnauthenticatedError } from '../utils/helpers';
import { isErrorResponse } from '../types';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const EXCLUDE_API = ['/api/user'];

const shouldClearUserCache = error => isErrorResponse(error) && isUnauthenticatedError(error) && !EXCLUDE_API.includes(error.response.config.url);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [cacheName, setCacheName] = useState<string[] | null>(null);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: process.env.NEXT_PUBLIC_APP_ENV === 'prod' ? 'always' : false,
            onError: error => {
              if (shouldClearUserCache(error)) {
                setCacheName(['user']);
              }
            },
          },
        },
      }),
  );

  /**
   * If any app request gives a 401 error, then invalidate the user cache and fetch the user
   * If the user request is also 401, the useAuth hook will redirect to login
   */
  useEffect(() => {
    if (!isEmpty(cacheName)) {
      queryClient.invalidateQueries(['user']);
      setCacheName([]);
      console.log('clear the user cache');
    }
  }, [cacheName, queryClient]);

  const getLayout = Component.getLayout ?? (page => page);

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
