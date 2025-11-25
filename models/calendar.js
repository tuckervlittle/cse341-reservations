module.exports = (mongoose) => {
  const Calendar = mongoose.model(
    "calendars",
    mongoose.Schema(
      {
        date: String,         
        areaId: String,
        is_available: Boolean,
        notes: String,
      },
      { timestamps: true }
    )
  );

  return Calendar;
};
