## To add
- Admin Dashboard (CRUD with API Routes & ISR):
Create an admin panel where users can view, add, edit, and delete products.
Implement API Routes for CRUD operations.
Use Incremental Static Regeneration (ISR) to update pages dynamically.
- Unit Testing & Performance Optimization:
Write unit tests for components using Jest & React Testing Library.
Optimize performance with lazy loading, caching, and custom hooks.


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
