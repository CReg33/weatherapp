var mongoose = require('mongoose');
// BDD connection
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://admin:AdminPwd@cluster0.qlxkf.mongodb.net/weatherapp?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );
