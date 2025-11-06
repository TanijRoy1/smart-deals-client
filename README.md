# 🧩 M54 – MongoDB and Basic CRUD Setup Guide
This guide walks through setting up a simple CRUD (Create, Read, Update, Delete) application using Express.js and MongoDB (Atlas or Local).

## ⚙️ 1. Server Setup
### Create and initialize the project
```js
mkdir simple-crud-server
cd simple-crud-server
npm init -y
code .
```

### Install dependencies
```js
npm i express cors mongodb
```
### Configure package.json

Update the scripts section:
```js
"scripts": {
  "start": "node index.js"
}
```
### Create index.js
```js
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Simple CRUD server is running.");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
```
### Start the server
```js
nodemon index.js
```
## ☁️ 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
 and create an account.

2. Security → Database Access → Add New Database User

 - Username: simpleDBUser

 - Generate a secure password and save it.

 - Role: Atlas Admin

3. Security → Network Access → Add IP Address

 - Allow access from anywhere (0.0.0.0/0).

4. Database → Cluster → Connect → Drivers

 - Copy the connection URI.

 - Replace <db_password> with your actual password.

Example URI:
```js
const uri = "mongodb+srv://simpleDBUser:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
```

## 🧠 3. Connect MongoDB to Express
```js
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. Yor are successfully connected to MongoDB!");
  } finally {
    // Optionally close the client when needed
  }
}

run().catch(console.dir);
```

## 🧩 4. CRUD Operations
### Database & Collection
```js
const usersDB = client.db("usersDB");
const usersCollection = usersDB.collection("users");
```

### ➕ Create (POST)

Server-side:
```js
app.post("/users", async (req, res) => {
  const newUser = req.body;
  const result = await usersCollection.insertOne(newUser);
  res.send(result);
});
```

Client-side:
```js
fetch("http://localhost:3000/bids", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(newBid),
})
  .then(res => res.json())
  .then(data => {
    if (data.insertedId) {
      alert("User added successfully!");
      newBid._id = data.insertedId;
      const newBids = [...bids, newBid];
      const sortedBids = newBids.sort((a, b) => b.bid_price - a.bid_price);
      setBids(sortedBids);
    }
  });
```
### 📥 Read (GET)

Get All Users:
```js
app.get("/users", async (req, res) => {
  const cursor = usersCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});
```

Get One User by ID:
```js
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await usersCollection.findOne(query);
  res.send(result);
});
```

Client Example:
```js
fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(data => console.log(data));
```
### 🗑️ Delete (DELETE)

Server-side:
```js
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await usersCollection.deleteOne(query);
  res.send(result);
});
```

Client-side:
```js
const handleDeleteUser = (id) => {
  fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" })
    .then(res => res.json())
    .then(data => {
      if (data.deletedCount) {
        alert("Deleted successfully!");
        setUsers(users.filter(user => user._id !== id));
      }
    });
};
```
### ✏️ Update (PATCH)

Server-side:
```js
app.patch("/users/:id", async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const query = { _id: new ObjectId(id) };
  const update = {
    $set: {
      name: updatedUser.name,
      email: updatedUser.email,
    },
  };
  const result = await usersCollection.updateOne(query, update);
  res.send(result);
});
```

Client-side:
```js
const handleUpdateUser = (e) => {
  e.preventDefault();
  const updatedUser = {
    name: e.target.name.value,
    email: e.target.email.value,
  };

  fetch(`http://localhost:3000/users/${user._id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(updatedUser),
  })
    .then(res => res.json())
    .then(data => {
      if (data.modifiedCount) {
        alert("User info updated!");
      }
    });
};
```

## 🧰 5. Local MongoDB (Optional)

If you want to use MongoDB locally:

1. Install MongoDB Community Server.

2. Open MongoDB Compass.

3. Click “+ Add New Connection”.

4. Use local URI:
```js
mongodb://localhost:27017
```

5. Comment out the Atlas URI and replace with the local one.

## 🧩 6. Notes & Concepts

### 1. PATCH vs PUT

 - PATCH updates specific fields.

 - PUT replaces the entire document.

### 2. Upsert

 - Adds a new document if it doesn’t exist during an update operation.

### 3. `defaultValue` vs `value` in React
```js
<input name="email" defaultValue={user.email} />  // Uncontrolled
<input name="email" value={user.email} />         // Controlled
```





















# 🧠 M55 - CRUD with Smart Deals using MongoDB

This guide documents the steps for setting up Smart Deals, a full-stack MERN project implementing CRUD operations with MongoDB, Express, Firebase, and React.
.

## 🚀 Server Setup
### 1. Clone Resources and Initialize Server
```js
git clone <smart-deals-resources-repo>
mkdir smart-deals-server
cd smart-deals-server
npm init -y
```
### 2. Install Dependencies
```js
npm install express cors mongodb dotenv
```
### 3. Test API with Thunder Client
- Install Thunder Client extension in VS Code.
- Click New Request and test your API routes.

## 🗄️ MongoDB Setup
### 4. Connect to MongoDB Atlas

#### 1. Go to MongoDB Atlas.
#### 2. Create a new cluster.
#### 3. Navigate to:
   - Database Access → Add New Database User
   - Username: smartDBUser
   - Password: yourSecurePassword
#### 4. Allow network access for all IPs (0.0.0.0/0).
#### 5. Copy your MongoDB connection URI.

### 5. Configure Environment Variables
Create a .env file in the root directory:
```js
DB_USER=smartDBUser
DB_PASS=yourSecurePassword
```

In index.js:
```js
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z1gnsog.mongodb.net/?appName=Cluster0`;
```

## ⚙️ Basic CRUD Operations
### 6. GET Products with Projection, Sort, and Pagination
Get conditional data: go to CRUD operation → Query Document → Specify Documents to return
```js
app.get("/products", async (req, res) => {
  const projectFields = { title: 1, price_min: 1, price_max: 1, image: 1 };
  const cursor = productsCollection
    .find()
    .sort({ price_min: -1 })
    .skip(2)
    .limit(3)
    .project(projectFields);

  const result = await cursor.toArray();
  res.send(result);
});
```

### 7. GET Products with Query Parameter

Example request:
```js
GET http://localhost:3000/products?email=faria@gmail.com
```
```js
app.get("/products", async (req, res) => {
  const email = req.query.email;
  const query = {};
  if (email) query.email = email;

  const result = await productsCollection.find(query).toArray();
  res.send(result);
});
```
## 💰 Bids Feature
### 8. Database Collections
```js
const db = client.db("smart_db");
const productsCollection = db.collection("products");
const bidsCollection = db.collection("bids");
```
### 9. Fetch Bids (All or by Buyer)
```js
app.get("/bids", async (req, res) => {
  const email = req.query.email;
  const query = {};
  if (email) query.buyer_email = email;

  const result = await bidsCollection.find(query).toArray();
  res.send(result);
});
```
### 10. Insert Bid
```js
app.post("/bids", async (req, res) => {
  const newBid = req.body;
  const result = await bidsCollection.insertOne(newBid);
  res.send(result);
});
```

💡 Tip: Ensure that each bid includes a valid `product_id` referencing a document in the `products` collection.

## 👥 Users Management with Firebase
### 11. Firebase Setup

#### 1. Create a new Firebase project.

#### 2. Enable Google Sign-In in the Authentication settings.

### 12. Save User Data to Database

Client-side code:
```js
signInWithGoogle()
  .then(result => {
    const newUser = {
      name: result.user.displayName,
      email: result.user.email,
      image: result.user.photoURL,
    };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(data => console.log("User saved:", data));
  })
  .catch(err => console.error(err));
```

Server-side API:
```js
const usersCollection = db.collection("users");

app.post("/users", async (req, res) => {
  const newUser = req.body;
  const query = { email: newUser.email };
  const existingUser = await usersCollection.findOne(query);

  if (existingUser) {
    res.send({ message: "User already exists. Do not insert again." });
  } else {
    const result = await usersCollection.insertOne(newUser);
    res.send(result);
  }
});
```

## 🛒 Products and Bidding Features
### 13. Latest Products Endpoint
```js
app.get("/latest-products", async (req, res) => {
  const projectFields = { title: 1, image: 1, price_min: 1, price_max: 1 };
  const result = await productsCollection
    .find()
    .sort({ created_at: -1 })
    .limit(6)
    .project(projectFields)
    .toArray();

  res.send(result);
});
```
### 14. Bid Modal in React
```js
const bidModalRef = useRef(null);

// Open modal
const handleBidModalOpen = () => {
  bidModalRef.current.showModal();
};

// JSX
<dialog ref={bidModalRef}> ... </dialog>
<button onClick={handleBidModalOpen}>Place a Bid</button>
```
### 15. Prefill Input Fields
```js
<input type="text" name="name" defaultValue={user.displayName} readOnly />
<input type="email" name="email" defaultValue={user.email} readOnly />
```
### 16. promt:
```js
Think yourself as a senior software engineer. I already have a products collections. Now I need to add bids, where people can bid their own price for a product. I will also have to see what the bids for this product. Also I can see my bids to any of the products. I will be able to remove my bid, see status of the product I have bid. etc.

how should I store this bid information. What are the different options I have.  What are the different criterias I should think to make the decision. 
```
```js
what do you think when should I use component folder structure for a react application or when should I use pages or feature wise folder structure
```
## 🧩 Concept Notes
Primary Key vs Foreign Key (Simple Analogy)

   - Primary Key → Like a student ID card — unique for each student in a school.

   - Foreign Key → Like a library card linked to the student ID — it references the main record (student).

### ✅ Summary

   - **Server**: Node.js + Express + MongoDB

   - **Client**: React + Firebase

   - **Testing**: Thunder Client

   - **Features**: Products, Bids, Users, CRUD operations

   - **Security**: Environment variables for credentials



# 🧠 M57 - JWT & Firebase Admin SDK Integration
### Secure User Verification and Data Access Control

This module demonstrates how to integrate Firebase Authentication, Firebase Admin SDK, and JWT (JSON Web Token) to authenticate users, verify access tokens, and secure API routes in a full-stack React + Node.js application.

## 🚀 Step 1: Send Firebase Access Token from Client to Server
```js
useEffect(() => {
  if (user?.email) {
    fetch(`http://localhost:3000/bids?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    });
  }
}, [user]);
```

## 🧩 Step 2: Receive and Validate Token on Server
### Middleware to Verify Firebase Token
```js
const verifyFirebaseToken = (req, res, next) => {
  console.log("In verify middleware:", req.headers.authorization);
  
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const userInfo = await admin.auth().verifyIdToken(token);
    req.token_email = userInfo.email;
    next();
  } catch {
    return res.status(401).send({ message: "Unauthorized access" });
  }
 
};
```
### Protected Route Example
```js
app.get("/bids", verifyFirebaseToken, async (req, res) => {
  const email = req.query.email;
  const query = {};

  if(email){
    if(email !== req.token_email){
      return res.status(403).send({message : "forbiden access"});
    }
    query.buyer_email = email;
  }

  const result = await bidsCollection.find(query).toArray();
  res.send(result);
});
```
## 🔑 Step 3: Firebase Admin SDK Setup

### 1. In Firebase Console, go to
   - Project Settings → Service Accounts

### 2. Run:
```js
npm i firebase-admin
```

### 3. Click **“Generate New Private Key”** and move the downloaded JSON file into your server project.
Make sure it’s listed in `.gitignore`.

### 4. Import and initialize Admin SDK in your server:
```js
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
```

## 🧠 Step 4: JWT (JSON Web Token) Setup
### Install and Configure JWT
   - go to jwt.io
   - Libraries → click nodejs → view repo
```js
npm install jsonwebtoken
```

### Create JWT_SECRET in terminal:
```js
node
require('crypto').randomBytes(64).toString('hex')
```

### Set it in your .env file:
```js
JWT_SECRET=your_generated_secret_key
```
### JWT Token Generation API
```js
const jwt = require("jsonwebtoken");

app.post("/getToken", (req, res) => {
  const loggedUser = req.body;
  const token = jwt.sign(loggedUser, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.send({ token });
});
```
## 🧭 Step 5: Request Token from Client
```js
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);

    if (currentUser) {
      const loggedUser = { email: currentUser.email };

      fetch("http://localhost:3000/getToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loggedUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Received token:", data);
          localStorage.setItem("token", data.token);
        });
    } else {
      localStorage.removeItem("token");
    }
  });

  return () => unsubscribe();
}, []);
```
## 📦 Step 6: Send Stored JWT Token to Server
```js
useEffect(() => {
  if (user?.email) {
    fetch(`http://localhost:3000/bids?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}, [user]);
```
## 🔒 Step 7: Verify JWT Token on Server
### Create verifyJWTToken Middleware
```js
const verifyJWTToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized access" });
    req.token_email = decoded.email;
    next();
  });
};
```
### Apply Middleware in Protected Route
```js
app.get("/bids", verifyJWTToken, async (req, res) => {
  const email = req.query.email;
  
  if (email && email !== req.token_email) {
    return res.status(403).send({ message: "Forbidden access" });
  }

  const query = { buyer_email: email };
  const result = await bidsCollection.find(query).toArray();
  res.send(result);
});
```
### 8. ask chatgpt : 
```js
I have a react firebase authentication. In server side I am using express and mongodb(no mongose) 

I want to implement jwt token verification with http only cookie. Give me step by step process
```




# ⚙️ M58 - Axios, useAuth, useAxiosSecure, Interceptors & Deployment

This module focuses on using Axios for API requests, implementing custom React hooks (useAuth, useAxios, useAxiosSecure), managing request/response interceptors for secure API communication, and deploying the backend to Vercel.

### 🧩 Step 1: Fetch Data Using Axios
```js
useEffect(() => {
  axios(`http://localhost:3000/products/bids/${productId}`)
    .then((data) => {
      setBids(data.data);
    });
}, [productId]);
```
Axios simplifies HTTP requests and automatically returns JSON responses.

### 📤 Step 2: POST Data Using Axios
```js
axios.post("http://localhost:3000/products", newProduct)
  .then((data) => {
    if (data.data.insertedId) {
      alert("Product has been created successfully!");
    }
  });
```
### 🔐 Step 3: Create Custom useAuth() Hook
```js
const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};
```

### 🧠 Step 4: Create axiosInstance

Centralize Axios configuration with a base URL.
```js
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
  return axiosInstance;
};
```

Usage:
```js
const axiosPublic = useAxios();
```
### 🔒 Step 5: Create useAxiosSecure() with Request Interceptor

Attach Firebase access tokens to every secured request.
```js
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, loading } = useAuth();

  if (loading) return;

  instance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user?.accessToken}`;
    return config;
  });

  return instance;
};
```

Usage:
```js
const axiosSecure = useAxiosSecure();
```
### 🧾 Step 6: Verify Firebase Token on Server
```js
const verifyFirebaseToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.token_email = decoded.email;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized access" });
  }
};
```
### ⚙️ Step 7: Register Axios Interceptors on Mount

To avoid re-registering interceptors on every render, set them once using useEffect.
```js
useEffect(() => {
  if (loading) return;

  const requestInterceptor = instance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user?.accessToken}`;
    return config;
  });

  return () => {
    instance.interceptors.request.eject(requestInterceptor);
  };
}, [user, loading]);
```
### 📦 Step 8: Verify Firebase Token for “My Bids” and “My Products”
Server Side:
```js
app.get("/bids", verifyFirebaseToken, async (req, res) => {
  const email = req.query.email;
  const query = {};

  if (email) {
    if (email !== req.token_email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    query.buyer_email = email;
  }

  const cursor = bidsCollection.find(query).sort({ bid_price: -1 });
  const result = await cursor.toArray();
  res.send(result);
});
```
Client Side:
```js
useEffect(() => {
  if (loading) return;

  axiosSecure.get(`/bids?email=${user?.email}`)
    .then((data) => setBids(data.data));
}, [user, loading, axiosSecure]);
```
### 🚨 Step 9: Handle Unauthorized Requests with Response Interceptors

Automatically log out users if a 401 or 403 error occurs.
```js
// Response Interceptors
const responseInterceptor = instance.interceptors.response.use((res) => {
        return res;
    }, (err) => {
        // console.log(err);
        const status = err.status;
        // const status = err?.response?.status;
        if(status === 401 || status === 403){
            console.log("Logging out user due to bad request...");
            signOutUser().then(() => {
               navigate("/auth/login");
            });
        }
    }
);

return () => {
  instance.interceptors.request.eject(requestInterceptor);
  instance.interceptors.response.eject(responseInterceptor);
};
```
### 🌐 Step 10: Deploy the Server to Vercel

Before deploying, comment out MongoDB connection test lines:
```js
// await client.connect();
// await client.db("admin").command({ ping: 1 });
```
Deployment Commands
```js
npm i -g vercel
vercel login
vercel
vercel --prod
```

   ✅ Your API will now be live and accessible through a Vercel-hosted URL.









---