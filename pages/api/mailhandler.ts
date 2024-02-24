import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';

interface FormData {
  [key: string]: unknown; // Define the type for form data
}
// Define the structure of the form data
interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phoneNumber: string;
  message: string;
  agreed: boolean;
}

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const generateEmailContent = (data: { [s: string]: unknown } | ArrayLike<unknown>) => {
  const CONTACT_MESSAGE_FIELDS: { [key: string]: string } = {
    firstName: 'First Name',
    lastName: 'Last Name',
    company: 'Company',
    email: 'Email',
    phoneNumber: 'Phone Number',
    message: 'Message',
    agreed: 'Agreed',
  };

  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ''
  );

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
  }, '');

  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
  };
};



// Define the API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data: FormData = req.body;
    // Check if all required fields are provided
    const missingFields = findMissingFields(data);
    if (missingFields.length > 1) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // Send email
    await sendEmail(data);

    return res.status(200).json({ message: 'Success: email was sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Function to find missing required fields
function findMissingFields(data: FormData): string[] {
  const requiredFields: (keyof FormData)[] = ['firstName', 'lastName', 'company', 'email', 'phoneNumber', 'message', 'agreed'];
  return requiredFields.filter(field => !data[field]) as string[];
}

// Function to send email
async function sendEmail(data: FormData): Promise<void> {
  // Create a Nodemailer transporter
  const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PSW,
    },
  });

  try {
    // Generate email content
    const emailContent = generateEmailContent(data);

    // Send email
    const mailOptions: SendMailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Lead - Website | Contact Form',
      ...emailContent, // Spread the generated email content
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

// import nodemailer from 'nodemailer';

// export default async function handler(req: { method: string; body: { firstName: any; lastName: any; company: any; email: any; phoneNumber: any; message: any; agreed: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): any; new(): any; }; }; }) {
//   if (req.method === 'POST') {
//     const data = req.body;

//     // Ensure that all required fields are provided
//     if (!data.firstName || !data.lastName || !data.company || !data.email || !data.phoneNumber || !data.message || !data.agreed) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Create a transporter with your SMTP settings
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.NODEMAILER_EMAIL,
//         pass: process.env.NODEMAILER_PSW,
//       },
//     });

//     try {
//       // Send mail with defined transport object
//       await transporter.sendMail({
//         from: process.env.NODEMAILER_EMAIL,
//         to: process.env.NODEMAILER_EMAIL,
//         subject: "Lead - Website",
//         text: data.message,
//       });
//       return res.status(200).json({ message: "Success: email was sent" });

//     } catch (error) {
//       console.error('Error sending email:', error);
//       return res.status(500).json({ message: "COULD NOT SEND MESSAGE" });
//     }
//   } else {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
