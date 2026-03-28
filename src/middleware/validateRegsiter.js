const validateRegister = (req, res, next) => {
  const { name, phone, password } = req.body;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   var phoneno = /^\d{10}$/;
if(!name){

    return res.status(400).json({ error: 'invalid user' });
}
  // your validation here

 

if (!phoneno.test(phone)) {

   
    return res.status(400).json({ error: 'invalid pnone number' }); 
}

if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: 'invalid password' }); 
}
 next() }
module.exports = validateRegister
