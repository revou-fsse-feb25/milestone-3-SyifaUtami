

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
  
## login page: 
- added forms 
***
## New additions for Module 5

### Shopping Cart & Checkout Page
- Save to cart now uses local storage
<img width="614" alt="Screenshot 2025-06-06 at 4 08 41 pm" src="https://github.com/user-attachments/assets/47de7e54-9a7a-4dbe-b138-306ab4f75215" />

- Display cart summary and a checkout button

<img width="1502" alt="Screenshot 2025-06-06 at 4 12 11 pm" src="https://github.com/user-attachments/assets/536950ab-1c72-4a47-86f7-b17262e91aea" />



### Authentication & Middleware:

- ANY unauthenticated users are not able to access the checkout page. It will redirect to /login.
- unauthenticated NON-ADMIN users cannot access the admin page. It will redirect to /unauthenticated page.
- Admin page location: 
<img width="706" alt="Screenshot 2025-06-06 at 4 05 49 pm" src="https://github.com/user-attachments/assets/e19d39f8-8e78-47fa-ab53-b0af3de3d97d" />

- Unauthorized warning for non-admins

<img width="753" alt="Screenshot 2025-06-06 at 4 06 37 pm" src="https://github.com/user-attachments/assets/668756a8-e054-4ade-8375-03b7ccc09d0d" />


### Admin Dashboard (CRUD with API Routes & ISR):

<img width="1486" alt="Screenshot 2025-06-06 at 4 17 24 pm" src="https://github.com/user-attachments/assets/544f1f6e-f2f4-4016-b747-1ba4e0f24aee" />

- uses ISR and utilize API routes on admin dashboard page (see main admin page coding)
- search feature in admin/products page to help with editing

<img width="1048" alt="Screenshot 2025-06-06 at 4 23 12 pm" src="https://github.com/user-attachments/assets/34782080-4130-4d38-9d61-b53397c7a565" />

- can edit or delete products through admin/products/edit
<img width="1429" alt="Screenshot 2025-06-06 at 4 19 25 pm" src="https://github.com/user-attachments/assets/be6bd408-767e-4812-8fb2-fccddc31158c" />

- can add products through admin/products/add

<img width="1025" alt="Screenshot 2025-06-06 at 4 20 18 pm" src="https://github.com/user-attachments/assets/2038e13e-392c-4f8a-b7d6-43feb0c3d9d4" />

## Unit Testing & Performance Optimization:
- uses jest and react testing for optimization and error handling
- uses LazyLoading for ProductCart in product/[id] 
