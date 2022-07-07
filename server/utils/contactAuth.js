const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const expiration = '4h';

module.exports = {
  signToken: function({firstName, lastName, email, isAdmin, _id}) {
    const payload = { firstName,lastName,email,isAdmin,_id };
    console.log(payload);
    return jwt.sign({ data: payload }, secret,{ expiresIn: expiration });
  },

  authMiddleware: function({req}) {
    //this will allow the token to be sent via req.body, req.query, or the headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    //["Bearer", "<tokenvalue"] 
    if(req.headers.authorization) {
        token = token
        .split(' ')
        .pop()
        .trim()
        .split('"')[0]
      }

    if (!token) {
      console.log('no token');
        return req;
       }

    
  try {
    console.log('i ran');
    if(token) { 
      console.log(token);
      console.log(secret);
      console.log('i ran 2');
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    }
  } catch{
      console.log('invalid token');
  }
    return req;
 }
};

/**
{
  "data": {
    "loginContact": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6Im5ld2VzdDUiLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJuZXdlc3Q3QWRtaW5AZW1haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiX2lkIjoiNjJjNjEzMjY5MTY2NTBjZTg4NDdlODcwIn0sImlhdCI6MTY1NzE3NDM4MiwiZXhwIjoxNjU3MTg4NzgyfQ.-1r9vRg8coznseVm9jhiZpxCSxOdZIW1it4ufqSN8qU",
      "user": {
        "_id": "62c61326916650ce8847e870",
        "email": "newest7Admin@email.com",
        "descriptionText": "payload test!",
        "firstName": "newest5",
        "lastName": "admin",
        "phone": "888-549-4190",
        "isAdmin": true
      }
    }
  }
}
 */