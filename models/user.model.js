module.exports = mongoose => {
    const userSchema = mongoose.Schema({
        nama: String,
        password: String,
    },
    { 
        versionKey: false,
        timestamps: true });
        
    const User = mongoose.model('user', userSchema);

    return User;
}