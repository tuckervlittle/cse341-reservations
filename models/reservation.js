module.exports = (mongoose) => {
  const Reservation = mongoose.model(
    "reservations",
    mongoose.Schema(
      {
        userId: String,         // username owner
        areaId: String,         
        date: String,           
        start_time: String,     
        end_time: String,       
        status: String,         // pending, approved, rejected, cancelled
        admin_comment: String,  
      },
      { timestamps: true }
    )
  );

  return Reservation;
};
