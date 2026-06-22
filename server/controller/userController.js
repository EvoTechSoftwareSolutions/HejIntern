import prisma from "../lib/prisma.js";

export const getAllUsers = async (req, res, next) => {
  try {
    console.log("GET ALL USERS CONTROLLER HIT");

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        roleId: true,
        languageId: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });

  } catch (error) {
    next(error); 
  }
};

//get only user id
export const getMyProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        roleId: true,
        languageId: true,
      },
    });

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
  }
};

//update user

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    // 1. CHECK USER EXISTS
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. CHECK EMAIL DUPLICATE (only if email is changing)
    if (email && email !== user.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already in use",
        });
      }
    }

    // 3. UPDATE USER (SAFE PARTIAL UPDATE)
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: username ?? user.username,
        email: email ?? user.email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        roleId: true,
        languageId: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // 4. RESPONSE
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    next(error);
  }
};

//hard delete
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "User deleted permanently",
    });
  } catch (error) {
    next(error);
  }
};

//soft delete
export const softDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "User soft deleted",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};