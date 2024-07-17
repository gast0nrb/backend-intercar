const sq = require("./connection")

const testConn = async () => {
    try {
       await sq.authenticate();
       sq.sync({force : true})
       console.log(`DB Connection created succesfully`) 
    } catch (err) {
       console.error("Cannot connect with db, err : " + err) 
    }
}

module.exports = testConn;