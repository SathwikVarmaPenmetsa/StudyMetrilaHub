import React from "react";


const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-text">
        Welcome to <span className="highlight">PdfStore</span>, a platform built
        to help <strong>students</strong> and <strong>colleges</strong> share
        and access study material with ease.
      </p>

      <div className="about-section">
        <h2 className="section-title">🎯 Our Mission</h2>
        <p>
          Our mission is to make learning resources easily available to every
          student. We believe that knowledge should be accessible, organized,
          and simple to share.
        </p>
      </div>

      <div className="about-section">
        <h2 className="section-title">👩‍🎓 Who Can Use?</h2>
        <ul>
          <li>📘 Students – Find notes grouped by semester & subject</li>
          <li>🏫 Colleges – Share resources across classes</li>
          <li>📚 Teachers – Upload material for quick access</li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="section-title">🚀 Our Vision</h2>
        <p>
          To build a reliable digital library for students and institutions,
          where learning materials are always just one click away.
        </p>
      </div>
    </div>
  );
};

export default About;
