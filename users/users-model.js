const bcrypt = require("bcryptjs")// bcrypt library
const db = require("../database/dbConfig")

function find() {
  return db("users")
    .select("id", "username")
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .select("id", "username", "password")
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 12) 
  // rounds is 2^ (to the power of) 10 === 1,024. request should take 1-2 seconds to complete.

  const [id] = await db("users")
    .insert(user)
 
  return findById(id)
}

function findById(id) {
  return db("users")
    .where({ id })
    .first("id", "username")
}

module.exports = {
  add,
  find,
  findBy,
  findById,
}