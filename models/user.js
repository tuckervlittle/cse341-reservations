module.exports = (mongoose) => {
  const User = mongoose.model(
    "users",
    mongoose.Schema(
      {
        username: String,     
        full_name: String,
        dni: String,
        role: String, // admin, resident, security
        email: String,
      },
      { timestamps: true }
    )
  );

  return User;
};

