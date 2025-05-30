## Welcome to my project
Here is my attempt at learning Next.js . Current features are:

![image](https://github.com/user-attachments/assets/1eebe7b3-3f14-445f-9216-4a9e24bd81f1)

### The usage of page.js
I am using page.js to create each pages: home, about, cart. Each pages are filled with components. 
### Components
the components are made for every system inside of the pages.
For the components:
- ProductCard (as seen  above, which shows the products). It uses UseEffect and UseState
- NavBar (the navigation on top of each pages)
- textstyle (help styling the text - for now there are 'highlighted' feature that makes blue highlights on texts
- Header to show the hero image and the text 
<img width="1512" alt="Screenshot 2025-05-31 at 2 00 39 am" src="https://github.com/user-attachments/assets/638a3476-abe7-4b8a-8887-6e9df19a00ea" />
- AddToCart component to count the quantity and send the information to the cart page
- BackButton component to just make a back button
<img width="1493" alt="Screenshot 2025-05-31 at 2 03 17 am" src="https://github.com/user-attachments/assets/c9ee5546-c8a5-49ca-b731-ed4e291b8ed6" />
- productTile (not be confused with productcard) to display the items chosen on the cart

### Context
- CartContext, is used to: add quantity of item if it exists, add new item if it doesn't, count number of product quantity, remove deleted products, count total price of the products.

## Product detail page
- uses [id]
- uses routing for product details that fetch product information and map them
  
Is still figuring out using NextAuth.js, and Context API/Zustand/Redux.
***


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
