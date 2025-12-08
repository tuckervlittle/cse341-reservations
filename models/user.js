module.exports = (mongoose) => {
  const User = mongoose.model(
    "users",
    mongoose.Schema(
      {
        username: {
          type: String,
          required: true,
          unique: true   
        },
        dni: {
          type: String,
          required: true,
          unique: true
        },
        role: String, // admin, resident, security
        email: String
      },
      { timestamps: true }
    )
  );

  return User;
};

