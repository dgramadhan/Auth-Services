module.exports = mongoose => {
    const userSchema = mongoose.Schema({
        nama: String,
        password: String,
    },
    { timestamps: true });
    const User = mongoose.model('User', userSchema);

    return User;
}