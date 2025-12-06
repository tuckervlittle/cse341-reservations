module.exports = (mongoose) => {
  const Calendar = mongoose.model(
    "calendars",
    mongoose.Schema(
      {
        date: { type: Date, required: true },         
        areaId: { type: mongoose.Schema.Types.ObjectId, ref: "areas" },
        isAvailable: { type: Boolean, default: true },
        notes: String,
      },
      { timestamps: true }
    )
  );

  return Calendar;
};
