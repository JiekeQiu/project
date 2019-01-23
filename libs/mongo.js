const {
  MongoClient,
  ObjectId
} = require('mongodb');
// 连接地址
const url = 'mongodb://localhost:27017';
// 数据库名
const dbName = 'h1810';
// 使用connect方法连接到服务器
// MongoClient.connect(url, (err, client) => {
//     console.log("连接成功");
//     const db = client.db(dbName);
//     client.close();

// });
let connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        reject(err)
      } else {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        resolve({
          db,
          client
        })
      }
    });
  })
}

let insert = (col, arr) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.insertMany(arr, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result);
        client.close();
      }
    })
  })
}

let find = (col, obj) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.find({
      ...obj
    }).toArray(function (err, docs) {
      if (err) {
        reject(err)
      } else {
        resolve(docs);
        client.close();
      }
    });
  })
}

// 改
let update = (col, obj1, obj2)=>{
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.updateOne({
      ...obj1
    }, { $set: { ...obj2 } }, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result);
        client.close();
      }

    })
  })
}
// update('list',{_id:ObjectId("5c34883a88dc053748bba83c")},{name:'辣条',price:6})
// 删

let del = (col, obj) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.deleteOne({ ...obj }, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result);
        client.close();
      }
    })
  })
}

module.exports = {
  connect,
  insert,
  find,
  update,
  del,
  ObjectId
}

  // node express mongodb jquery