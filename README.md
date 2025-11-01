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
  @apply bg-gradient-to-r from-[#34434] to-[4434jk]
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
24. 












---