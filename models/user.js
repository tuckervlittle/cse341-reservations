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
        role: {
          type: String,
          default: "resident"  // admin, resident, security
        },
        email: {
          type: String,
          required: true,
          unique: true
        },
        password: {
          type: String,
          required: true
        }
      },
      { timestamps: true }
    )
  );

  return User;
};

