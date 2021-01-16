const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = mongoose.Schema({
    id: Number,
    email: String,
    password: String,
    resetLink: {
        data:String,
        default:''
    }
}, {
    _id: false
});

UserSchema.plugin(AutoIncrement, { id: 'user_model_id_counter' });
module.exports = mongoose.model('User', UserSchema);