// ===== Import Modules =====
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");



const app = express();
const PORT = process.env.PORT || 3000;



// ===== Set View Engine =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ===== Middleware =====

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (CSS, Images, JS)
app.use(express.static(path.join(__dirname, "public")));



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

app.post("/appointment", (req, res) => {

  const { name, email, phone, doctor, date, time, message } = req.body;

  const whatsappNumber = "917415772776"; // replace with your number (no + sign)

  const whatsappMessage = `
New Appointment Request

Name: ${name}
Email: ${email}
Phone: ${phone}
Doctor: ${doctor}
Date: ${date}
Time: ${time}
Message: ${message}
  `;

  const encodedMessage = encodeURIComponent(whatsappMessage);

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  res.redirect(whatsappURL);
});




// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
