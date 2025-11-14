import React, { useEffect, useRef, useState } from "react";
import "../styles/ProfessionalExperience.scss";

const ProfessionalExperience: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = document.querySelectorAll(".timeline-item");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  const experiences = [
    {
      company: "Saudi Electronic University",
      period: "2024 - Present",
      position: "Part-time Faculty Member",
      details: {
        type: "responsibilities",
        items: [
          "Teaching Executive Business Administration diploma courses, mentoring students in business concepts and practical applications.",
        ],
      },
    },
    {
      company: "ELAF Institute",
      period: "2019-2021",
      position: "English Language Instructor",
      details: {
        type: "achievements",
        items: [
          "Taught 6 diploma-level classes",
          "Developed comprehensive English language curriculum",
          "Served over 100 students monthly",
          "Authored educational textbook for ESL learners",
        ],
      },
    },
    {
      company: "Freelance Translation Services",
      period: "2016-2018",
      position: "Translator",
      details: {
        type: "specialization",
        items: [
          "Collaborated with Athra platform on Twitter for article translation covering diverse topics including social commentary and contemporary issues.",
        ],
      },
    },
    {
      company: '"Brown" Home Bakery',
      period: "2020 - Present",
      position: "Founder & Manager",
      details: {
        type: "achievements",
        items: [
          "Successfully established and managed a home bakery serving over 12 coffee shops in Hail and surrounding areas, demonstrating entrepreneurial skills and business acumen.",
        ],
      },
    },
  ];

  return (
    <section className="professional-experience">
      <h2 className="glow-text">Professional Experience</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-content">
              <div className="experience-header">
                <h3>{exp.company}</h3>
                <span className="period">{exp.period}</span>
              </div>
              <div className="details">
                <div
                  className={`details-header ${
                    expandedItems[index] ? "expanded" : ""
                  }`}
                  onClick={() =>
                    setExpandedItems((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
                >
                  <h5>
                    {exp.details.type.charAt(0).toUpperCase() +
                      exp.details.type.slice(1)}
                  </h5>
                  <span className="arrow">↗</span>
                </div>
                <div
                  className={`details-content ${
                    expandedItems[index] ? "expanded" : ""
                  }`}
                >
                  <ul>
                    {exp.details.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <h4 className="position">{exp.position}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalExperience;
