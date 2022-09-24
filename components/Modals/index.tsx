import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  title?: string;
  body?: string;
  button?: JSX.Element;
  icon?: JSX.Element;
  children?: JSX.Element;
};

const Modal = ({ open, setOpen, title, body, button, icon, children }: ModalProps) => {
  return (
    <Transition.Root
      show={open}
      as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-50"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-900 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel>
                {children ? (
                  children
                ) : (
                  <div
                    className="relative overflow-hidden rounded-lg
              bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8
                sm:w-full sm:max-w-xl sm:p-6">
                    <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}>
                        <span className="sr-only">Close</span>
                        <XMarkIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="sm:flex sm:items-start">
                      <div
                        className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        {icon}
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="mt-2 mb-4">
                          <p className="text-sm text-gray-500">{body}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      {button}
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-gray-200 bg-gray-200
                    px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 hover:text-gray-800
                      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
