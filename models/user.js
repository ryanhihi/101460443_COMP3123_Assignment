const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String, // This should be hashed
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now } 
   });
   
//Hash the password before saving the user
userSchema.pre('save', async function(next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (this.isModified('password')) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword; // Store the hashed password
    }
    next();
});

//Compare provided password with stored hashed password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;