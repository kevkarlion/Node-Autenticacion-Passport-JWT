const bcrypt = require('bcrypt');

//bycrypt es asincrono

async function hasPasVerify(){
  const myPassword = 'admin 123 2002';
  const hash = '$2b$10$54Uh6KToAJVOVvMAQdJKe.iX9tKyd4byQX7tEeQ4lGIJAxfVTu1MO';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

hasPasVerify();
