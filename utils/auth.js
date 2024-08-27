const bcryp = require("bcrypt")

const comparePass = async (tryPass, userPass) => {
    return await bcryp.compare(tryPass,userPass)
};


module.exports =comparePass;