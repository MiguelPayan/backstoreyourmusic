const mongoose = require('mongoose');

const password = 'gCF25SySDHARRQKX';

const uri = `mongodb+srv://miguelpayan:${password}@clusterusuariosgoogle.r9cat7p.mongodb.net/usuarios`;


module.exports = ()=> mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})