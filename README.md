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
   fetch("http://localhost:3000/users", {
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
    return res.status(401).send({message : "unauthorized access"});
  }
  const token = req.headers.authorization.split(" ")[1];
  if(!token){
    return res.status(401).send({message : "unauthorized access"});
  }

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











---