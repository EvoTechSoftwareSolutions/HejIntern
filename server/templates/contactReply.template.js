export const thankYouContactHTMLTemplate = (name) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #4f46e5; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">Thank You!</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <h2 style="margin-bottom: 10px;">Hi ${name}, 👋</h2>

        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for contacting us. We have successfully received your message.
          Our support team will review your request and respond as soon as possible.
        </p>

        <div style="margin: 20px 0; padding: 15px; background: #f9fafb; border-left: 4px solid #4f46e5;">
          <p style="margin: 0;">
            ⏱ Response time: Within 24 hours
          </p>
        </div>

        <p style="font-size: 14px; color: #555;">
          If your inquiry is urgent, feel free to reply to this email directly.
        </p>

        <a href="#" 
           style="display: inline-block; margin-top: 20px; padding: 12px 20px; background: #4f46e5; color: white; text-decoration: none; border-radius: 6px;">
           Visit Our Website
        </a>
      </div>

      <!-- Footer -->
      <div style="background: #f3f4f6; text-align: center; padding: 15px; font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>

    </div>
  </div>
  `;
};