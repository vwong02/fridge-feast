const { dbPool } = require('../connection')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const addUser = (user) => {
  return bcrypt.hash(user.password, saltRounds)
    .then(hash => {
      return dbPool.query(`INSERT INTO users (first_name, last_name, email, password)
          VALUES ($1, $2, $3, $4)`,
        [ user.first_name, user.last_name, user.email, hash ]);
    })
    .then(() => {
      console.log('User added successfully!');
      return { added: true };
    })
    .catch(error => {
      console.error('Error adding user: ', error);
      throw error;
    });
};

const loginUser = (email, password) => {
  return dbPool.query(`SELECT * FROM users WHERE email = $1`,
    [ email ])
    .then((data) => {
      if (data.rows.length > 0) {
        return bcrypt.compare(password, data.rows[ 0 ].password)
          .then(match => {
            if (match) {
              console.log('User logon successfully!');
              return data.rows[ 0 ];
            } else {
              console.log('User logon failed!');
              return null;
            }
          });
      } else {
        console.log('User logon failed!');
        return null;
      }
    })
    .catch(error => {
      console.error('Error searching user: ', error);
      throw error;
    });
}

const getUsers = () => {
  return dbPool.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    })
}

// const addUser = (user) => {
//   return dbPool.query(`INSERT INTO users (first_name, last_name, email, password)
//       VALUES ($1, $2, $3, $4)`,
//   [user.first_name, user.last_name, user.email, user.password])
//     .then(() => {
//       console.log('User added successfully!')
//       return {added:true}
//     })
//     .catch(error => {
//       console.error('Error adding user: ', error)
//       throw error;
//     })
// }

// const loginUser = (email, password) => {
//   return dbPool.query(`SELECT * FROM users WHERE email = $1 and password = $2`,
//     [email, password])
//     .then((data) => {
//       (data.rows.lengh >0 ? console.log('User logon successfully!') : console.log('User logon failed!'))
//       return data.rows[0]
//     })
//     .catch(error => {
//       console.error('Error searching user: ', error)
//       throw error
//     })
// }

module.exports = { getUsers, addUser, loginUser }