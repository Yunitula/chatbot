const { parse } = require('json2csv');
const fs = require('fs');


const data = [
    {
      "question": "What is the latest version of iOS?",
      "answer": "The latest version of iOS is iOS 17."
    },
    {
      "question": "How do I reset my Apple ID password?",
      "answer": "To reset your Apple ID password, go to the Apple ID account page, click 'Forgot Apple ID or password,' and follow the on-screen instructions."
    },
    {
      "question": "What is the maximum storage capacity available for the iPhone?",
      "answer": "The maximum storage capacity available for the iPhone is 1TB, available on the iPhone 15 Pro models."
    },
    {
      "question": "How do I set up Face ID on my iPhone?",
      "answer": "To set up Face ID, go to Settings > Face ID & Passcode, and follow the prompts to register your face."
    },
    {
      "question": "What is AppleCare+?",
      "answer": "AppleCare+ is an extended warranty and service plan that provides additional coverage and support for Apple products, including repairs and accidental damage."
    },
    {
      "question": "How can I track my lost Apple device?",
      "answer": "You can track a lost Apple device using the Find My app or by visiting iCloud.com/find."
    },
    {
      "question": "How do I factory reset my Mac?",
      "answer": "To factory reset a Mac, restart the computer and hold Command + R to enter macOS Recovery, then choose 'Erase' from the Disk Utility options."
    },
    {
      "question": "How do I update my Apple Watch?",
      "answer": "To update your Apple Watch, open the Watch app on your iPhone, go to General > Software Update, and follow the instructions."
    },
    {
      "question": "How do I activate Siri on my iPhone?",
      "answer": "To activate Siri, hold the side button or say 'Hey Siri' if it’s enabled in Settings > Siri & Search."
    },
    {
      "question": "What is the Apple ecosystem?",
      "answer": "The Apple ecosystem refers to the interconnected environment of Apple devices and services, where devices like the iPhone, iPad, Mac, Apple Watch, and Apple TV work seamlessly together."
    },
    {
      "question": "How do I back up my iPhone to iCloud?",
      "answer": "To back up your iPhone to iCloud, go to Settings > [your name] > iCloud > iCloud Backup, and toggle on iCloud Backup, then tap 'Back Up Now.'"
    },
    {
      "question": "How do I enable Dark Mode on my Mac?",
      "answer": "To enable Dark Mode on a Mac, go to System Preferences > General, and select the 'Dark' option under Appearance."
    },
    {
      "question": "What is the maximum number of devices I can pair with my Apple ID?",
      "answer": "You can pair up to 10 devices with your Apple ID, including a combination of iPhones, iPads, Macs, and other Apple products."
    },
    {
      "question": "How do I uninstall an app on my iPhone?",
      "answer": "To uninstall an app on your iPhone, press and hold the app icon, then select 'Remove App' and tap 'Delete App.'"
    },
    {
      "question": "How do I use AirDrop on my iPhone?",
      "answer": "To use AirDrop, swipe down from the upper-right corner to open Control Center, enable AirDrop, then select the file you want to send and choose the device you want to send it to."
    },
    {
      "question": "What is Apple ID two-factor authentication?",
      "answer": "Two-factor authentication adds an extra layer of security to your Apple ID by requiring a verification code, sent to a trusted device, in addition to your password."
    },
    {
      "question": "How do I set up Family Sharing on Apple devices?",
      "answer": "To set up Family Sharing, go to Settings > [your name] > Family Sharing, then follow the prompts to add family members and share Apple services."
    },
    {
      "question": "How do I turn off notifications on my Mac?",
      "answer": "To turn off notifications on a Mac, go to System Preferences > Notifications, select an app, and adjust the notification settings."
    },
    {
      "question": "How can I check my iCloud storage usage?",
      "answer": "To check your iCloud storage usage, go to Settings > [your name] > iCloud > Manage Storage."
    },
    {
      "question": "How do I transfer contacts from my old iPhone to my new one?",
      "answer": "To transfer contacts, you can use iCloud or iTunes to back up your old iPhone and restore it to your new one, or use the Quick Start feature during setup."
    }
  ]

const csv = parse(data);

fs.writeFileSync('questions_answers.csv', csv);

console.log('CSV file has been generated successfully!');