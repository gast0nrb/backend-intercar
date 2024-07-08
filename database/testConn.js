const sq = require("./connection")

const testConn = async () => {
    try {
       await sq.authenticate();
       console.log(`DB Connection created succesfully`) 
    } catch (err) {
       console.err("Cannot connect with db, err : " + err) 
    }
}

module.exports = testConn;