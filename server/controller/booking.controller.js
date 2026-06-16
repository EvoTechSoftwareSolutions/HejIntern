import prisma from "../lib/prisma.js";

export const createBooking = async (req, res, next) => {
  try {
    const {
      user_id,
      customization_id,
      package_id,
      travel_date,
      total_amount,
    } = req.body;

    // 1. VALIDATION
    if (
      !user_id ||
      !customization_id ||
      !package_id ||
      !travel_date ||
      !total_amount
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. CHECK USER
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. CHECK CUSTOMIZATION
    const customization = await prisma.customization.findUnique({
      where: { id: customization_id },
    });

    if (!customization) {
      return res.status(404).json({
        success: false,
        message: "Customization not found",
      });
    }

    // 4. CHECK PACKAGE
    const tourPackage = await prisma.tourPackage.findUnique({
      where: { id: package_id },
    });

    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    // 5. CREATE BOOKING
    const booking = await prisma.booking.create({
      data: {
        user_id,
        customization_id,
        package_id,
        travel_date: new Date(travel_date),
        total_amount: parseFloat(total_amount),
      },
      include: {
        user: true,
        customization: true,
        tourPackage: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};


export const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      user_id,
      customization_id,
      package_id,
      travel_date,
      total_amount,
      payment_status,
      booking_status,
    } = req.body;

    // 1. CHECK BOOKING EXISTS
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // 2. VALIDATE USER (if updating)
    if (user_id) {
      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    }

    // 3. VALIDATE CUSTOMIZATION (if updating)
    if (customization_id) {
      const customization = await prisma.customization.findUnique({
        where: { id: customization_id },
      });

      if (!customization) {
        return res.status(404).json({
          success: false,
          message: "Customization not found",
        });
      }
    }

    // 4. VALIDATE PACKAGE (if updating)
    if (package_id) {
      const pkg = await prisma.tourPackage.findUnique({
        where: { id: package_id },
      });

      if (!pkg) {
        return res.status(404).json({
          success: false,
          message: "Package not found",
        });
      }
    }

    // 5. UPDATE BOOKING
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        user_id: user_id ?? booking.user_id,
        customization_id:
          customization_id ?? booking.customization_id,
        package_id: package_id ?? booking.package_id,
        travel_date: travel_date
          ? new Date(travel_date)
          : booking.travel_date,
        total_amount: total_amount
          ? parseFloat(total_amount)
          : booking.total_amount,
        payment_status: payment_status ?? booking.payment_status,
        booking_status: booking_status ?? booking.booking_status,
      },
      include: {
        user: true,
        customization: true,
        tourPackage: {
          include: {
            theme: true,
          },
        },
      },
    });

    // 6. RESPONSE
    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });

  } catch (error) {
    next(error);
  }
};
export const confirmBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        booking_status: "CONFIRMED",
        payment_status: "PAID",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Booking confirmed",
      data: updated,
    });

  } catch (error) {
    next(error);
  }
};




// GET ALL BOOKINGS
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        tourPackage: {
          include: {
            theme: true,
          },
        },
        customization: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

//get all booking by user id
export const getAllBookingsByUserId = async (req, res, next) => {
  try {
    // 1. get logged-in user
    const userId = req.user.id;

    // 2. fetch bookings
    const bookings = await prisma.booking.findMany({
      where: {
        user_id: userId,
      },
      include: {
        customization: true,
        tourPackage: {
          include: {
            theme: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (error) {
    next(error);
  }
};

//get by booking ID
export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
        customization: true,
        tourPackage: {
          include: {
            theme: true,
          },
        },
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });

  } catch (error) {
    next(error);
  }
};
export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        booking_status: "CANCELLED",
        payment_status: "FAILED",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Booking cancelled",
      data: updated,
    });

  } catch (error) {
    next(error);
  }
};
