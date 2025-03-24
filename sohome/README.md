# Sohome Marine Transport & Logistics Website

A responsive, modern dark-themed website for Sohome Marine Transport & Logistics company based in Kolkata, India. The website showcases the company's services, team members, and provides contact information.

## Setting Up EmailJS for Contact Form

The contact form is configured to use EmailJS to send emails. Follow these steps to set it up:

1. Create an account at [EmailJS](https://www.emailjs.com/) (they offer a free tier)
2. Create a new Email Service in your EmailJS dashboard (connect it to your email provider)
3. Create a new Email Template with the following template parameters:
   - `name` - sender's name
   - `email` - sender's email
   - `subject` - email subject
   - `message` - message content
   - `to_email` - recipient email (kcheese1000@gmail.com)
4. Get your EmailJS User ID (Public Key) from Account > API Keys
5. Open `contact.html` and replace `"YOUR_PUBLIC_KEY"` with your actual EmailJS Public Key
6. Open `js/contact.js` and update the following:
   - Replace `'SERVICE_ID'` with your EmailJS service ID
   - Replace `'TEMPLATE_ID'` with your EmailJS template ID

After completing these steps, the contact form will send emails to kcheese1000@gmail.com when visitors submit the form.

## Features

- Responsive design that works on mobile, tablet, and desktop devices
- Dark theme with modern UI elements and animations
- Multiple pages: Home, About Us, and Contact
- Interactive elements including mobile navigation, testimonial slider, and form validation
- Contact form that simulates email submission

## Pages

1. **Home Page**: Introduces the company and its services with a hero section, services cards, and client testimonials
2. **About Us Page**: Presents the company story, mission, vision, team members, and core values
3. **Contact Page**: Includes contact information, a contact form, and an embedded map

## Tech Stack

- HTML5
- CSS3 (Vanilla CSS with CSS Variables)
- JavaScript (Vanilla JS without frameworks)
- Font Awesome for icons

## Team Members Featured

- Karthik - Chief Executive Officer
- Sohome - Marketing Head
- Ayush - Loadmaster

## Contact Information

- Email: website@mail.com
- Phone: +91 0000000000
- Location: Port Kolkata, India

## Project Structure

```
/
├── index.html          # Home page
├── about.html          # About Us page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
└── README.md           # Project documentation
```

## Usage

Simply open the `index.html` file in a web browser to view the website. No server setup or build process is required as this is a static website using vanilla HTML, CSS, and JavaScript.

## Notes for Future Development

- To implement the actual email sending functionality for the contact form, consider integrating a service like EmailJS or setting up a backend server.
- Images used are placeholder URLs from Unsplash. For production, download and host these images locally.
- Consider adding more pages such as Services, Projects/Portfolio, Blog, etc. 