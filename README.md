This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Database Design

### Tables

1. **Users:**
   - id (INT, PRIMARY KEY, AUTO_INCREMENT)
   - email (VARCHAR, UNIQUE)
   - password (VARCHAR)
   - name (VARCHAR)

2. **Products:**
   - id (INT, PRIMARY KEY, AUTO_INCREMENT)
   - name (VARCHAR)
   - description (TEXT)
   - price (DECIMAL)

3. **Orders:**
   - id (INT, PRIMARY KEY, AUTO_INCREMENT)
   - user_id (INT, FOREIGN KEY REFERENCES Users(id))
   - order_date (DATETIME)

4. **OrderItems:**
   - id (INT, PRIMARY KEY, AUTO_INCREMENT)
   - order_id (INT, FOREIGN KEY REFERENCES Orders(id))
   - product_id (INT, FOREIGN KEY REFERENCES Products(id))
   - quantity (INT)

### SQL Queries

**Create Tables:**

```sql
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255)
);

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE OrderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);
```

**Insert Data:**

```sql
INSERT INTO Users (email, password, name) VALUES ('user@example.com', 'securepassword', 'John Doe');
INSERT INTO Products (name, description, price) VALUES ('Fried Chicken', 'Delicious fried chicken', 9.99);
INSERT INTO Orders (user_id) VALUES (1);
INSERT INTO OrderItems (order_id, product_id, quantity) VALUES (1, 1, 2);
```

**Retrieve Data:**

```sql
SELECT * FROM Users;
SELECT * FROM Products;
SELECT * FROM Orders WHERE user_id = 1;
SELECT * FROM OrderItems WHERE order_id = 1;
```
