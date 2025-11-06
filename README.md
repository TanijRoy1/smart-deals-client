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
fetch("https://smart-deals-api-server-gamma.vercel.app/bids", {
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
fetch("https://smart-deals-api-server-gamma.vercel.app/users")
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
  fetch(`https://smart-deals-api-server-gamma.vercel.app/users/${id}`, { method: "DELETE" })
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

  fetch(`https://smart-deals-api-server-gamma.vercel.app/users/${user._id}`, {
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






















# React + Vite

16. create smart-deals-client
17. ask chatgpt: 
```js
what do you think when should I use component folder structure for a react application or when should I use pages or feature wise folder structure
```
18. create a firebase project
19. save user data on database
```js
signInWithGoogle()
 .then(result => {
   //  console.log(result.user);
   const newUser = {
     name: result.user.displayName,
     email: result.user.email,
     image: result.user.photoURL
   }

   // create user in the database
   fetch("https://smart-deals-api-server-gamma.vercel.app/users", {
     method: "POST",
     headers: {
      "content-type" : "application/json"
     },
     body: JSON.stringify(newUser),
   })
     .then(res => res.json())
     .then(data => {
       console.log("user after save", data);
     })
 })
 .catch(err => console.log(err))
```
```js
const usersCollection = db.collection("users");


app.post("/users", async (req, res) => {
  const newUser = req.body;

  const email = req.body.email;
  const query = {email : email};
  const existingUser = await usersCollection.findOne(query);

  if(existingUser){
    res.send({message: "user already exist. Do not insert again."});
  } else {
    const result = await userCollection.insertOne(newUser);
    res.send(result);
  }
})
```

20. button in index.css
```js
.btn-primary{
  @apply bg-linear-to-r from-[#34434] to-[4434jk]
}
.btn-primary:hover{
  @apply opacity-90
}
```
21. latest products
```js
// "/latest-products"
// .sort({created_at : -1}).limit(6).project(projectFields)
// LatestProducts.jsx
// ProductDetails ---- "/products/:id"
```
22. bid Modal
```js
// 1.
const bidModalRef = useRef(null);
// 2.
// replace <dialog id="my_modal_5"> by <dialog ref={bidModalRef}>
// 3.
const handleBidModalOpen = () => {
  bidModalRef.current.showModal();
}
// 4.
<button onClick={handleBidModalOpen}>My Button </button>
```
23. set defaultValue to input
```js
<input
  type="text"
  name="name"
  defaultValue={user.displayName}
  readOnly
/>
<input
  type="email"
  name="email"
  defaultValue={user.email}
  readOnly
/>
```
24. .env file in server side
```js
// 1.
npm install dotenv
// 2.
require("dotenv").config();
// 3.
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z1gnsog.mongodb.net/?appName=Cluster0`;
```


# M57 - JWT & Firebase Admin SDK, Verification, Save User Data

1. send accessToken from client side to server side
```js
useEffect(()=> {
  if(user?email){
    fetch(`http:localhost:3000/bids?email=${user.email}`, {
      headers : {
        authorization : `Bearer ${user.accessToken}`
      }
    })
  }
},[user])
```
2. get accessToken in server side
```js
// middleware
const verifyFirebaseToken = (req, res, next) => {
  console.log("in the verify middleware", req.headers.authorization);
  if(!req.headers.authorization){
    // ask chatgpt : give me http status code
    return res.status(401).send({message : "unauthorized access"});
  }
  const token = req.headers.authorization.split(" ")[1];
  if(!token){
    return res.status(401).send({message : "unauthorized access"});
  }
  // then verify token

  next();
}

// get by email
app.get("/bids", verifyFirebaseToken, async (req, res) => {
  const email = req.query.email;
  const query = {};
  if(email){
    query.buyer_email = email;
  }
  const cursor = bidsCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
})
```
3. in firebase
- go to project settings > service accounts
- npm i firebase-admin
- copy the code and paste it in server side
- click "Generate new private key"
- cut the downloader json file and paste in the server side and keep it in .gitignore
- go to documentation > ID Token verification
- verify token
```js
const verifyFirebaseToken = async (req, res, next) => {
  
  // then verify token
  try {
    const userInfo = await admin.auth().verifyIdToken(token);
    // console.log("after token validation", userInfo);
    req.token_email = userInfo.email;
    next();
  } 
  catch {
    return res.status(401).send({message : "unauthorized access"});
  }
}

// in get by email
app.get("/bids", verifyFirebaseToken, async (req, res) => {
  console.log(req.token_email);
  if(email){
    if(email !== req.token_email){
      return res.status(403).send({message : "forbiden access"});
    }
    query.buyer_email = email;
  }
})
```
4. verify productDetails page in same way
5. go to jwt.io
 - Libraries > click nodejs> view repo
 - npm install jsonwebtoken
 ```js
  const jwt = require("jsonwebtoken")

 // jwt related apis
 app.post("/getToken", (req, res) => {
  const token = jwt.sign({email : "abc"}, process.env.JWT_SECRET, {expiresIn: "1h"});
  res.send({token : token});
 })
 ```
 - create JWT_SECRET in terminal --- 1. node , 2. require('crypto').randomBytes(64).toString('hex')
6. post jwt token from client side
```js
useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if(currentUser){
        const loggedUser = {email : currentUser.email};

        fetch("https://smart-deals-api-server-gamma.vercel.app/getToken", {
          method: "POST",
          headers: {
            "content-Type" : "application/json"
          },
          body: JSON.stringify(loggedUser)
        })
          .then(res => res.json())
          .then(data => {
            console.log("after getting token", data);
            localStorage.setItem("token", data.token);
          })
      } else {
        localStorage.removeItem("token");
      }
    })
    return () => unsubscribe();
  },[])
```
```js
// jwt related apis
 app.post("/getToken", (req, res) => {
  const loggedUser = req.body;
  const token = jwt.sign(loggedUser, process.env.JWT_SECRET, {expiresIn: "1h"});
  res.send({token : token});
 })
```
7. store token in client side and send to server side
```js
.then(data => {
  console.log("after getting token", data);
  localStorage.setItem("token", data.token);
})

// send token from local storage
useEffect(()=> {
  if(user?email){
    fetch(`http:localhost:3000/bids?email=${user.email}`, {
      headers : {
        authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
},[user])
```
8. create verifyJWTToken middleware
```js
const verifyJWTToken = (req, res, next) => {
  console.log("in the verify middleware", req.headers.authorization);
  if(!req.headers.authorization){
    return res.status(401).send({message : "unauthorized access"});
  }
  const token = req.headers.authorization.split(" ")[1];
  if(!token){
    return res.status(401).send({message : "unauthorized access"});
  }
  // then verify jwt token

  next();
}

// get by email
app.get("/bids", verifyJWTToken, async (req, res) => {
  
})
```
9. go to JWT repo to verify JWT token
```js
// verify jwt token
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if(err){
    return res.status(401).send({message : "unauthorized access"});
  }

  console.log("after decoded", decoded);
  req.token_email = decoded.email;
  next();
})

// in get by email
app.get("/bids", verifyJWTToken, async (req, res) => {
  console.log(req.token_email);
  if(email){
    query.buyer_email = email;
  }
  if(email !== req.token_email){
    return res.status(403).send({message : "forbiden access"});
  }
})
```

10. ask chatgpt : 
```js
I have a react firebase authentication. In server side I am using express and mongodb(no mongose) 

I want to implement jwt token verification with http only cookie. Give me step by step process
```


# M58 - Axios, useAuth, axiosInstance, useAxiosSecure, interceptor, Deploy

1. fetch using axios
```js
useEffect(() => {
    axios(`https://smart-deals-api-server-gamma.vercel.app/products/bids/${productId}`)
      .then(data => {
        // console.log(data);
        setBids(data.data);
      })
  }, [productId]);
```
2. post using axios
```js
axios.post("https://smart-deals-api-server-gamma.vercel.app/products", newProduct)
  .then((data) => {
      if(data.data.insertedId){
        alert("product has been created");
      }
  })
```
3. create custom hooks useAuth()
```js
const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};
```
4. The axiosInstance
```js
const axiosInstance = axios.create({
    baseURL : "https://smart-deals-api-server-gamma.vercel.app"
})
const useAxios = () => {
    return axiosInstance;
};
```
5. useAxiosSecure
```js
const instance = axios.create({
    baseURL : "https://smart-deals-api-server-gamma.vercel.app"
})

const useAxiosSecure = () => {
    const {user, loading} = useAuth();
    if(loading) return;
    instance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user?.accessToken}`
        // console.log(config)
        return config;
    })
    return instance;
};
```
6. verify firebase token
```js
const verifyFirebaseToken = async (req, res, next) => {
  if(!req.headers.authorization){
    res.status(401).send({message: "unauthorized access"});
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.token_email = decoded.email;
    next();
  } catch (error) {
    res.status(401).send({message: "unauthorized access"});
  }
}
```
7. keep it inside useEffect for onmount
```js
seEffect(() => {
    if (loading) return;
    const requestInceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      // console.log(config)
      return config;
    });

    return () => {
        instance.interceptors.request.eject(requestInceptor);
    }
  }, [user, loading]);
```
8. verify firebase token for my bids and my products
```js
app.get("/bids", verifyFirebaseToken, async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        if (email !== req.token_email) {
          return res.status(403).send({ message: "forbiden access" });
        }
        query.buyer_email = email;
      }

      const cursor = bidsCollection.find(query).sort({ bid_price: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });
```
```js
useEffect(() => {
    if(loading) return;
    axiosSecure.get(`/bids?email=${user?.email}`)
      .then((data) => setBids(data.data));

}, [user, loading, axiosSecure]);
```
9. response interceptors handle 401 and 403 to logout user for bad request
```js
// response interceptors
    const responseInterceptor = instance.interceptors.response.use(res => {
        return res;
    }, err => {
        console.log(err);
        const status = err.status;
        if(status === 401 || status === 403){
            console.log("log out the user for bad request.");
            signOutUser()
             .then(()=> {
                navigate("/auth/login");
             })
        }
    })

    return () => {
        instance.interceptors.request.eject(requestInterceptor);
        instance.interceptors.response.eject(responseInterceptor);
    }
```
10. server deploy
```js
// comment these two lines before deploy
// await client.connect();
// await client.db("admin").command({ ping: 1 });
npm i -g vercel
npm login

vercel
vercel --prod
```
11
```js
```
12
```js
```
13
```js
```
```js
```







---