const connectToMongo=require('./db');

const express = require('express')
var cors = require('cors')
var app = express()

connectToMongo();
// mongoose.set("strictQuery", false);

const port =5005

app.use(cors())
// agar app log istamal karna chato ho req.body ko  ek middle ware use karna padega to jmmiidleware use karta ha 
app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello shyam!')
// })


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})
