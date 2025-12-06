module.exports = (mongoose) => {
  const Reservation = mongoose.model(
    "reservations",
    mongoose.Schema(
      {
        userId: String,         // username owner
        areaId: { type: mongoose.Schema.Types.ObjectId, ref: "areas" },         
        date: { type: Date, required: true },           
        start_time: String,     
        end_time: String,       
        status: { 
          type: String, 
          enum: ["pending", "approved", "rejected", "canceled"],
          default: "pending"
        },
        admin_comment: String,  
      },
      { timestamps: true }
    )
  );

  return Reservation;
};
