////////////////framework/////////////////
/** @format */

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// var MongoClient = require('mongodb').MongoClient;
const jwt = require("jsonwebtoken");
// var MongoClient = require('mongodb').MongoClient;
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// use middleware
app.use(cors());
app.use(express.json());

function varifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    console.log("decoded", decoded);
    req.decoded = decoded;
    next();
  });
}

var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.v85be.mongodb.net:27017,cluster0-shard-00-01.v85be.mongodb.net:27017,cluster0-shard-00-02.v85be.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-e24feo-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function run() {
  try {
    await client.connect();
    const productCollection = client
      //database name bosate hobe
      .db("BookHouseSimple")
      //collection name bosate hobe
      .collection("books");

    
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running jenius server");
});

app.listen(port, () => {
  console.log("listening to port variable");
});






//backend all coad
/** @format */

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const jwt = require("jsonwebtoken");

require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());
//////////////////////email jwt darar varification kora//////////////
function varifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    console.log("decoded", decoded);
    req.decoded = decoded;
    next();
  });
}
//////////////////////email jwt darar varification kora//////////////



var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.v85be.mongodb.net:27017,cluster0-shard-00-01.v85be.mongodb.net:27017,cluster0-shard-00-02.v85be.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-e24feo-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function run() {
  try {
    await client.connect();
    const productCollection = client
      //database name bosate hobe
      .db("BookHouseSimple")
      //collection name bosate hobe
      .collection("books");

/////////////////////////collection toiri kora///////////////  
    const requestCollection = client
    //datatbase name thik rakhte hobe
      .db("BookHouseSimple")
      //collection name alada bosate hobe
      .collection("request");
/////////////////////////collection toiri kora///////////////  




///////////////for auth and jwt for login fontend//////////////
/* handle sighn in ba sighn in korar somoy email ta pathate hobe oi email onujaiye jwt pathabe sei jwt ke localstorage a set korte hobe */
     const { data } = await axios.post(
      "https://assighment11.herokuapp.com/login",
      { email }
    );
    
    localStorage.setItem("accessToken", data.accessToken);
    navigate(from, { replace: true });

///////////////for auth and jwt for login fontend//////////////
///////////////////////////////for auth and jwt for login backend///////////////////////
    app.post("/login", async (req, res) => {
      const user = req.body;
      //emailke object er moto die dite hobe
      console.log(user);
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
      });
      res.send({ accessToken });
      console.log(accessToken);
    });
///////////////////////////////for auth and jwt for login backend///////////////////////





//////////////////////////pagination fontend/////////////////////////////////////////
  //pagecount mane kotota page/button hobe
  const [pageCount, setPageCount] = useState(0);
  //page mane koto number button/page a click korsi
  const [page, setPage] = useState(0);
  //size mane prottokta page a koita kore dekhabe
  const [size, setSize] = useState(2);
  const [books, setBooks] = useState([]);
useEffect(() => {
    fetch(`https://assighment11.herokuapp.com/book?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [page, size]);

//////////////////product quantity///////////////
useEffect(() => {
    fetch("https://assighment11.herokuapp.com/productCount")
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pages = Math.ceil(count/2);
        console.log(pages)
        setPageCount(pages);
      });
  }, []);
//////////////////product quantity///////////////


  ///////////////////////////////page button/////////////////////////
  <div className="pagination mt-4 d-flex justify-content-center align-items-center">
  {[...Array(pageCount).keys()].map((number) => (
    <button
      className=  {page === number ? "selected" : ""}
      onClick={() => setPage(number)}
    >
      {number + 1}
    </button>
  ))}

  <select onChange={(e) => setSize(e.target.value)}>
    <option value="5">5</option>
    <option value="10" selected>
      10
    </option>
    <option value="15">15</option>
    <option value="20">20</option>
  </select>
</div>
///////////////////////////////page button/////////////////////////


//////////////////////////pagination fontend//////////////////////////////////////////////
//////////////////////////pagination backend/////////////////////////////////////////
    //backend er datake ui te pathanor jonno nicher re.send app.get er moddho
    app.get("/book", async (req, res) => {
      console.log("query", req.query);
      const page = parseFloat(req.query.page);
      const size = parseFloat(req.query.size);

      const query = {};
      const cursor = productCollection.find(query);

      //.limit(er vetore joto songkha likhbothik totota dekhabe) const products = await cursor.limit(10)toArray();
      //prottok page  aalada alada data set korar jonno main data gulo
      let products;
      if (page || size) {
        products = await cursor
          .skip(page * size)
          .limit(size)
          .toArray();
      } else {
        products = await cursor.toArray();
      }
      res.send(products);
    });
//////////////////////////pagination backend/////////////////////////////////////////







//////////////////////////////// product songkha count/////////////////////////////////
    //product count korar jonno api te  koita product ache ta dekhar jonno
    app.get("/productCount", async (req, res) => {
      // const query = {};
      // const cursor = productCollection.find(query);
      //.limit(er vetore joto songkha likhbothik totota dekhabe) const products = await cursor.limit(10)toArray();
      const count = await productCollection.estimatedDocumentCount();
      console.log(count);
      res.send({ count });
    });
//////////////////////////////// songkha count/////////////////////////////////




////////////////////////id dara query toiri kora///////////////////
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });
////////////////////////id dara query toiri kora///////////////////







    //update 1
    app.put("/book/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);

      const updateUser = req.body;
      console.log(updateUser);

      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          quantity: updateUser.quantity
        }
      };
      const result = await productCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });









             ///////////////update////////////
//////////////////////////update fontend///////////////////////////////////////
const updateQuantity2 = { quantity };
    const url = `https://assighment11.herokuapp.com/update/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(updateQuantity2)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
//////////////////////////update fontend///////////////////////////////////////
//////////////////////////update backend///////////////////////////////////////
    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const updateUser = req.body;
      console.log(updateUser);
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
            // ja update korbo ta set er moddho likhte hobe
            //mon reakhte hobe object er key er sathe ei key hubuhu mil thake hobe
          quantity: updateUser.quantity
        }
      };
      const result = await productCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
//////////////////////////update backend///////////////////////////////////////





//search query dara shudumatro nijer itemguladekha & jwt dhara datagula private korar niom
///////////////fontend of set jwt and search emailquery ///////////////////
const getItem = async () => {
       
    const email = user?.email;
    console.log(email);
    const url = `https://assighment11.herokuapp.com/books?email=${email}`;
    try {
      const { data } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      setLoading(false)
      setBooks(data);
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 403 || error.response.status === 401) {
    
        signOut(auth);
        navigate("/login");
      }
    }
  };
  getItem();
///////////////fontend of set jwt and search emailquery ///////////////////
///////////////backend of set jwt and search emailquery ///////////////////
    app.get("/books", varifyJWT, async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const decodedEmail = req.decoded.email;
      if (email === decodedEmail) {
        const query = { email: email };
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
      } else {
        res.status(403).send({ message: "forbidden access" });
      }
    });
///////////////backend of set jwt and search emailquery ///////////////////




//post mane hocche fontend theke mongodb array te data add ba push kora
////////////////////fontend of post////////////////////////////////////////
         const data={name,price, quantity,img, description,email,publisher}
         const url = "https://assighment11.herokuapp.com/book";
         fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
         })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
          });
////////////////////fontend of post////////////////////////////////////////
////////////////////backend of post////////////////////////////////////////
    app.post("/book", async (req, res) => {
      const newproduct = req.body;
      console.log(req.body);
      const result = await productCollection.insertOne(newproduct);
      res.send(result);
    });
////////////////////backend of post////////////////////////////////////////




//////////////delete method////////////
/////////////////////////fontend of delete method/////////////////////////////////
const procced = window.confirm("Are You sure Want to delete this book?");
      if (procced) {
        const url = `https://assighment11.herokuapp.com/book/${id}`;
        fetch(url, {
          method: "DELETE"
        })
          .then((res) => res.json())
          .then((data) => {
            const remaining = books.filter((book) => book._id !== id);
            setBooks(remaining);
          });
      }
/////////////////////////fontend of delete method/////////////////////////////////
/////////////////////////backend of delete method/////////////////////////////////
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });
/////////////////////////backend of delete method/////////////////////////////////



/////////////////////client side the post kora///////////////////////////////
    app.post("/request", async (req, res) => {
      const order = req.body;
      const request = await requestCollection.insertOne(order);
      res.send(request);
    });
/////////////////////client side the post kora///////////////////////////////





////////////////////////server theke client a get kora///////////////////////////
    app.get("/request", async (req, res) => {
      const query = {};
      const cursor = requestCollection.find(query);
      const request = await cursor.toArray();
      res.send(request);
    });
////////////////////////server theke client a get kora///////////////////////////    
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running jenius server");
});

app.listen(port, () => {
  console.log("listening to port variable");
});

