# Gmail SMTP Setup Guide for Church Management System

## Step 1: Enable 2-Factor Authentication on Your Gmail Account

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click on **2-Step Verification**
4. Follow the prompts to enable 2FA (you'll need your phone)

## Step 2: Generate an App Password

1. After enabling 2FA, go back to **Security**
2. Under "Signing in to Google", click on **App passwords**
   - If you don't see this option, make sure 2FA is enabled
3. In the "Select app" dropdown, choose **Mail**
4. In the "Select device" dropdown, choose **Other (Custom name)**
5. Type "Church Management System" or any name you prefer
6. Click **Generate**
7. Google will show you a 16-character password (e.g., `abcd efgh ijkl mnop`)
8. **COPY THIS PASSWORD** - you won't be able to see it again!

## Step 3: Update Your .env File

Replace the placeholders in `backend/.env` with your actual credentials:

```env
# Email Config
SMTP_EMAIL=your_actual_email@gmail.com
SMTP_PASSWORD=abcdefghijklmnop  # The 16-character app password (remove spaces)
FROM_EMAIL=noreply@churchapp.com  # This can be any email
FROM_NAME=Church Management System
```

### Example:
```env
SMTP_EMAIL=johnsmith@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
FROM_EMAIL=noreply@muhoronichurch.org
FROM_NAME=Muhoroni Altar Church
```

## Step 4: Test the Email Functionality

1. Save the `.env` file
2. The backend server will automatically restart (nodemon)
3. Test the forgot password feature:
   - Go to http://localhost:5173/forgot-password
   - Enter a registered email address
   - Check your inbox for the reset email

## Troubleshooting

### "Invalid login" or "Username and Password not accepted"
- Make sure you're using the **App Password**, not your regular Gmail password
- Remove any spaces from the app password
- Ensure 2FA is enabled on your Google account

### "Less secure app access"
- This is no longer needed with App Passwords
- App Passwords are the secure way to use Gmail SMTP

### Email not sending
- Check that SMTP_EMAIL and SMTP_PASSWORD are correct
- Make sure there are no extra spaces or quotes
- Check the backend console for error messages

## Alternative: Using a Different Email Provider

If you don't want to use Gmail, you can use:

### SendGrid (Recommended for production)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_EMAIL=apikey
SMTP_PASSWORD=your_sendgrid_api_key
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_EMAIL=postmaster@your-domain.mailgun.org
SMTP_PASSWORD=your_mailgun_password
```

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_EMAIL=your_email@outlook.com
SMTP_PASSWORD=your_password
```

## Security Notes

- Never commit your `.env` file to Git
- The `.env` file is already in `.gitignore`
- Keep your App Password secure
- Revoke App Passwords you're no longer using

## Need Help?

If you encounter issues, check:
1. Backend console logs for detailed error messages
2. Gmail account security settings
3. That the email address exists in your database
