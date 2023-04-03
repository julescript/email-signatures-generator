# Email Signature Generator

This repository contains a Node.js script to automate the generation and distribution of custom HTML email signatures using Nodemailer. The purpose of this code is to create personalized email signatures for each employee in a company and send them via email, ensuring a consistent brand identity across all communications.

## Features

- Generates personalized HTML email signatures from a CSV file containing employee data
- Embeds the email signature within an HTML file containing instructions on how to install the signature in Gmail
- Uses Nodemailer to send customized email signatures to each employee

## Prerequisites

- Node.js (https://nodejs.org/en/download/)
- Nodemailer (installed via npm)

## Setup and Usage

1. Clone this repository to your local machine.
2. Navigate to the project folder using the terminal or command prompt.
3. Run `npm install nodemailer` to install the required Nodemailer package.
4. Open the `email-signatures-script.js` file in a text editor.
5. Replace the placeholders `[your gmail]` and `[gmail app password]` with your Gmail credentials.
6. Update the `csvData` variable with your employee data in CSV format, following this structure: `First,Last,Position,Email,Phone` example: `John,Doe,Software Engineer,john.doe@example.com,+1 555-555-5555`
7. Save the changes and execute `node email-signatures-script.js` in the terminal or command prompt to run the script.

The script will process the CSV data, generate personalized HTML email signatures for each member of the company, and send them to their respective email addresses.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
