const nodemailer = require('nodemailer');

const csvData = `First,Last,Position,Email,Phone
Julien,Hosri,UI/UX Consultant,julien@company.io,+961 0 000 000`;

const htmlTemplate = (firstName, lastName, position, email, phoneNumber) => `
<table role="presentation" style="width:100%;border-collapse:collapse;border-spacing:0;text-align:left;font-family: Arial, sans-serif;color:rgb(54,55,56)">
   <tr>
      <td style="padding:0;width:120px">
         <a href="https://company.io/" target="_blank">
            <img src="[url to the company logo]" alt="SEF" height="100px" width="100px">
         </a>
      </td>
      <td style="padding:0;font-size:15px">
         <div style="background-color:rgb(54,55,56);padding:2px 6px;display:inline-block;color:rgb(255,255,255);font-weight:bold">
            <span style="color:rgb(40,238,167)">${firstName}</span> ${lastName}
         </div>
         <div style="padding:0;font-size:13px;font-weight:bold;margin:4px 0 10px 0">
            ${position} <span style="color:rgb(165,166,169)"> - [Company Name]</span>
         </div>
         <div style="font-family:Courier New,Courier,monospace;font-size:12px;line-height:18px;color:rgb(165,166,169)">
            <div>// <a href="mailto:${email}" style="text-decoration-line:none;text-decoration:none;color:rgb(165,166,169)" target="_blank">${email}</a></div>
            <div>// <a href="tel:${phoneNumber}" style="text-decoration-line:none;text-decoration:none;color:rgb(165,166,169)" target="_blank">${phoneNumber}</a></div>
         </div>
      </td>
   </tr>
</table>
`;

const emailTemplate = (signature, recipient) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Signature</title>
</head>
<body>
   <p>Hello ${recipient}!</p>
   <p>You are receiving this email because of the rebranding of [Company Name]. As part of this process, we have to change the email signatures.</p>
   <p>Please follow the instructions below to add the attached signature to your gmail account:</p>
   <ol>
      <li>Open Gmail on your desktop.</li>
      <li>In the top right, click Settings. See all settings.</li>
      <li>In the 'Signature' section, copy and paste the below signature to the box.</li>
      <li>Make sure no lines are added before or after the signature.</li>
      <li>Make sure to make it your default for new and replied emails.</li>
      <li>Make sure to check "Insert signature before quoted text in replies and remove the "--" line that precedes it."</li>
      <li>At the bottom of the page, click Save changes.</li>
      <li>Done!</li>
   </ol>
   <p><b>Your new signature:</b><p>
   <p>------------- start selecting after this line -----------------------</p>
   ${signature}
   <p>------------- finish selecting and copy till before this line -------</p>
   <p>If you need any assistance or have questions, feel free to reply to this email.</p>
   <p>Best,</p>
   <p>Julien</p>
</body>
</html>
`;

// Replace with your Gmail credentials
const yourEmail = '[your gmail]';
const yourPassword = '[gmail app password]';

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: yourEmail,
      pass: yourPassword,
   },
});

const sendSignatureEmail = async (recipient, signature) => {
   const mailOptions = {
      from: 'Julien Hosri',
      to: recipient.Email,
      subject: 'Your New Company Email Signature',
      html: emailTemplate(signature, recipient.First),
   };

   try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${recipient}: ${info.response}`);
   } catch (error) {
      console.log(`Error sending email to ${recipient}:`, error);
   }
};

const lines = csvData.split('\n');
const header = lines.shift().split(',');

const processCsvLine = (line) => {
   const values = line.split(',');
   const data = header.reduce((obj, key, index) => {
      obj[key.trim()] = values[index].trim();
      return obj;
   }, {});

   const signature = htmlTemplate(data.First, data.Last, data.Position, data.Email, data.Phone);
   sendSignatureEmail(data, signature);
};

lines.forEach(processCsvLine);