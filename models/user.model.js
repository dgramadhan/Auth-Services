module.exports = mongoose => {
    const userSchema = mongoose.Schema({
        nama: String,
        password: String,
        email : String,
        verified: {
            type: Boolean,
            default: false
        }
    },
    { 
        versionKey: false,
        timestamps: true });
        
    const User = mongoose.model('user', userSchema);

    return User;
}