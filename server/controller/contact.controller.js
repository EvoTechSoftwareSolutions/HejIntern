import prisma from "../lib/prisma.js";
import sendEmail from "../utils/sendEmail.js";
import { thankYouContactHTMLTemplate } from "../templates/contactReply.template.js";

// CREATE CONTACT
export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, enquiry_type, language_id } = req.body;

    // 1. Validation
    if (!name || !email || !phone || !subject || !enquiry_type || !language_id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Save contact in DB
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        subject,
        enquiry_type,
        language_id,
        status: "PENDING",
      },
    });

    // 3. Generate email template
    const emailBody = thankYouContactHTMLTemplate(name);

    // 4. Send email (FIXED)
    await sendEmail({
      to: email,
      subject: "Thank you for contacting us",
      html: emailBody,
    });

    // 5. Response
    return res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: contact,
    });

  } catch (error) {
    console.error("Create Contact Error:", error);
    next(error);
  }
};

// GET ALL CONTACTS
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        language: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: contacts,
    });

  } catch (error) {
    next(error);
  }
};

// GET CONTACT BY ID
export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        language: true,
      },
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });

  } catch (error) {
    next(error);
  }
};

// DELETE CONTACT
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.contact.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};