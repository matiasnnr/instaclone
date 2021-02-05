const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

// nos conecta con nuestra base de datos
mongoose.connect(process.env.BBDD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
    // }, (err, res) => {
}, (err, _) => { // si no usamos una variable la dejamos con barra baja _
    if (err) {
        console.log('Error de conexión')
    } else {
        console.log('Conexión correcta');
    }
})