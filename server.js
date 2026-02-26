// ===== Import Modules =====
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");


const app = express();
const port = process.env.PORT || 3000;


// ===== Set View Engine =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ===== Middleware =====

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (CSS, Images, JS)
app.use(express.static(path.join(__dirname, "public")));

//Creating backend data recovery from gmail 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhargavachetan56@gmail.com",   // Your Gmail
    pass: "bmqt eequ yvml sghf"            // Gmail App Password (NOT real password)
  }
});


// ===== Routes (Render EJS Pages) =====

// Home
app.get("/", (req, res) => {
    res.render("doctorspage.ejs");
});

// Doctors
app.get("/doctor", (req, res) => {
    res.render("doctor.ejs");
});

// homeopathic services page
app.get("/homeopathic", (req, res) => {
    res.render("homeopathic.ejs");
});
//cosmetology service page
app.get("/cosmetology", (req, res) => {
    res.render("cosmetology.ejs");
});

// Appointment Page
app.get("/appointment", (req, res) => {
    res.render("appointment.ejs");
});

// Contact Page
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});
// Gallery Page
app.get("/gallery",(req,res)=>{
res.render("gallery.ejs");
})

// ===== Form Handling =====

app.post("/appointment", async (req, res) => {

  const { name, email, phone, doctor, date, time, message } = req.body;

  const mailOptions = {
    from: email,
    to: "bhargavachetan56@gmail.com",   // Where you want to receive data
    subject: "New Appointment Booking",
    html: `
      <h2>New Appointment Request</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Doctor:</b> ${doctor}</p>
      
      <p><b>Date:</b> ${date}</p>
      <p><b>Time:</b> ${time}</p>
      <p><b>Message:</b> ${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Appointment booked successfully and email sent!");
  } catch (error) {
    console.log(error);
    res.send("Error sending email");
  }
});



// Contact Form POST
app.post("/contact", (req, res) => {

    const {
        name,
        email,
        phone,
        message
    } = req.body;

    console.log("===== New Contact Message =====");
    console.log(req.body);

    res.send(`
        <h2>Message Sent Successfully ✅</h2>
        <a href="/">Go Back Home</a>
    `);
});


// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

