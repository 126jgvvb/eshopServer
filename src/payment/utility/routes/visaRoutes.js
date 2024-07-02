let AuthAPI=require('../controllers/visaCheckoutController');

app.post('/create-visa-trxn',(req,resp)=>AuthAPI.createVisaSrcTransaction(req,resp));
app.post("/decrypt-visa-src-data",(req,resp)=>AuthAPI.decryptVisaSrcData(req,resp));
