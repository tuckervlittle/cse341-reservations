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
          required: false,
          unique: true,
          sparse: true

        },
        role: {
          type: String,
          default: "resident"  // admin, resident, security
        },
        email: {
          type: String,
          required: true,
          unique: true
        }
        // password: {
        //   type: String,
        //   required: false
        // }
      },
      { timestamps: true }
    )
  );

  return User;
};

