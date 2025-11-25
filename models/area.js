module.exports = (mongoose) => {
  const Area = mongoose.model(
    "areas",
    mongoose.Schema(
      {
        name: String,          // (club house, grill zone, sport court)
        description: String,
        price: Number,
      },
      { timestamps: true }
    )
  );

  return Area;
};
