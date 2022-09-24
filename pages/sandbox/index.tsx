/* eslint-disable */
/* @ts-ignore */
import { useState } from 'react';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { NextPageWithLayout } from '@/pages/_app';
import useAuth from '@/hooks/useAuth';
import { getLayout } from '@/components/Layouts/UserLayout';
import Modal from '@/components/Modals';
import ScrollContent from '@/components/Modals/ScrollContent';

const Overview: NextPageWithLayout = () => {
  useAuth({ middleware: 'auth' });
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
          <div>
            <div>
              <nav
                className="flex"
                aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="flex flex-wrap items-center space-x-2 lg:flex-nowrap">
                  <li>
                    <div className="flex">
                      <a
                        href="#"
                        className="truncate text-sm font-medium text-gray-500 hover:text-gray-700">
                        Software Academy
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <a
                        href="#"
                        className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Overview
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mt-1 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">School Overview</h2>
              </div>
              <div className="mt-4 flex shrink-0 md:mt-0 md:ml-4">
                <Link href="/schools/1/invite">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2
                  text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Invite
                  </button>
                </Link>
                <Link href="/schools">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md bg-slate-200 px-4 py-2 text-sm
                    font-semibold text-gray-700 shadow-sm hover:bg-slate-300 hover:text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2">
                    Schools
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="p-4 sm:px-0">
            <div className="h-96 rounded-lg  border bg-white p-5">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm
                  font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2">
                Scrollable Modal
              </button>
              <Modal
                open={open}
                setOpen={(state: boolean) => setOpen(state)}>
                <ScrollContent
                  title="Add New School"
                  setOpen={(state: boolean) => setOpen(state)}
                  button={
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md border border-transparent
                                    bg-red-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-700
                                    focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                      Save
                    </button>
                  }>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam in arcu cursus euismod quis.
                    Vivamus arcu felis bibendum ut. Accumsan tortor posuere ac ut consequat. Lectus arcu bibendum at varius vel pharetra. Curabitur vitae nunc sed velit dignissim.
                    Quam vulputate dignissim suspendisse in est ante in. Non curabitur gravida arcu ac tortor dignissim. Congue mauris rhoncus aenean vel elit scelerisque. Turpis
                    egestas sed tempus urna et pharetra pharetra. Id diam maecenas ultricies mi eget mauris pharetra et. Mattis vulputate enim nulla aliquet. Viverra maecenas
                    accumsan lacus vel facilisis volutpat est velit egestas. Pellentesque dignissim enim sit amet. Suspendisse potenti nullam ac tortor vitae purus faucibus. Nec
                    feugiat in fermentum posuere urna nec. Cras semper auctor neque vitae tempus quam pellentesque nec. Aliquam id diam maecenas ultricies mi eget. Tortor id
                    aliquet lectus proin nibh. Habitant morbi tristique senectus et netus et malesuada. Commodo nulla facilisi nullam vehicula ipsum. Pellentesque elit eget gravida
                    cum. Sed enim ut sem viverra aliquet eget sit amet. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Nec ullamcorper sit amet risus
                    nullam eget felis eget. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Mauris augue neque gravida in fermentum et sollicitudin. Mattis aliquam
                    faucibus purus in massa tempor. At auctor urna nunc id cursus metus aliquam. Habitant morbi tristique senectus et netus et. Habitant morbi tristique senectus
                    et. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Cras semper auctor neque vitae tempus quam. Id cursus metus aliquam eleifend. Leo a diam
                    sollicitudin tempor id. Tempus quam pellentesque nec nam aliquam sem et. Nec tincidunt praesent semper feugiat nibh. Lobortis mattis aliquam faucibus purus in
                    massa tempor nec feugiat. Duis at consectetur lorem donec massa sapien faucibus. At quis risus sed vulputate odio ut enim. Vel orci porta non pulvinar. Lobortis
                    mattis aliquam faucibus purus in massa tempor. Consectetur libero id faucibus nisl tincidunt eget nullam non nisi. Quam id leo in vitae turpis massa sed
                    elementum tempus. Et netus et malesuada fames ac. Sapien eget mi proin sed libero enim. Suspendisse interdum consectetur libero id faucibus. Quis auctor elit
                    sed vulputate mi sit amet mauris commodo. Velit aliquet sagittis id consectetur purus. Nunc sed id semper risus in hendrerit gravida. Non blandit massa enim nec
                    dui nunc mattis enim. Augue lacus viverra vitae congue eu consequat ac felis. Viverra maecenas accumsan lacus vel facilisis. Egestas maecenas pharetra convallis
                    posuere morbi. At tellus at urna condimentum mattis pellentesque id. Ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit duis
                    tristique sollicitudin nibh sit. Pretium nibh ipsum consequat nisl vel. Massa vitae tortor condimentum lacinia quis vel eros. Id ornare arcu odio ut sem. Diam
                    quam nulla porttitor massa id neque aliquam vestibulum morbi. Nullam non nisi est sit amet. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. Velit
                    laoreet id donec ultrices. Nisl vel pretium lectus quam id leo in vitae turpis. Ac tortor dignissim convallis aenean et tortor. Tortor at auctor urna nunc id
                    cursus metus. Quis commodo odio aenean sed. Morbi tristique senectus et netus et malesuada fames ac. Purus in massa tempor nec feugiat. Nulla facilisi etiam
                    dignissim diam quis enim lobortis. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin.
                  </div>
                </ScrollContent>
              </Modal>
              <div className=" w-1/2 py-16">
                <div className="">
                  <div className="mb-4 flex w-full border-b pb-2 font-semibold text-gray-500">
                    <div className="flex w-full">
                      <p className="w-3/4">Name and Email</p> <p className=" w-1/4">Actions</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className=" flex w-3/4 flex-col">
                      <p>
                        Tyndale Wesley Gore <span className="ml-1 rounded bg-blue-100 px-2 text-xs text-blue-600">Admin</span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500">tyndalewesleygore@musicacdemy.com</p>
                    </div>

                    <div className="flex w-1/4 space-x-3 text-right">
                      <button
                        type="button"
                        className="text-blue-500 hover:underline">
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-red-500 hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
};

Overview.getLayout = getLayout;

export default Overview;
