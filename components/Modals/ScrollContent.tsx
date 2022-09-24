import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalProps = {
  setOpen: (state: boolean) => void;
  title: string;
  body?: JSX.Element | string;
  children?: JSX.Element;
  button?: JSX.Element;
};

const Modal = ({ setOpen, title, body, children, button }: ModalProps) => {
  return (
    <div
      className="relative min-h-[calc(100vh-80px)] overflow-hidden
              rounded-lg bg-white text-left shadow-xl transition-all
                sm:w-full sm:max-w-2xl">
      <div className="border-b px-12 py-6">
        <Dialog.Title
          as="h3"
          className="text-xl font-medium leading-6 text-gray-900">
          {title}
        </Dialog.Title>
      </div>
      <div className="h-[calc(100vh-200px)] overflow-y-scroll p-12 pt-4">
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
          <div className="text-center sm:text-left">
            <div className="mt-2 mb-4">{body ?? children ?? null}</div>
          </div>
        </div>
      </div>
      <div className="border-t p-6">
        <div className="sm:flex sm:flex-row-reverse">
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
    </div>
  );
};

export default Modal;
