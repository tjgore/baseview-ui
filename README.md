This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in
`pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Styling Notes

Page header - `text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight`

Section, Card or main Title - `text-xl font-medium leading-6 text-gray-900`

Descriptions under page header - `mt-1 text-sm text-gray-500 md:block`

Descriptions under Titles - `mt-1 text-xs text-gray-500 md:block`

Regular text -

Buttons **TODO keep padding and margin separate from button use a wrapping div instead.**

- Blue Primary -
  `inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2`
- Gray Secondary -
  `ml-3 inline-flex items-center rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-slate-300 hover:text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2`

Input label

Any Input
