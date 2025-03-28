const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_ATLAS );
        
        console.log('BASE DE DATOS ONLINE')
    } catch (error) {

        console.log('Base de datos online')
        throw new Error('Error a la hora de iniciar la base de datos');
    }
    
}


module.exports = {
    dbConnection
}