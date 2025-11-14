import { motion, useInView } from "framer-motion";
import "../styles/CoreCompetencies.scss";
import { useRef } from "react";

const CoreCompetencies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const competencies = [
    "Mobile Application Development",
    "Business Development",
    "Team Leadership & Management",
    "Project Management",
    "Translation Services",
    "Digital Content Creation",
  ];

  return (
    <div className="core-competencies">
      <div className="core-competencies__container" ref={ref}>
        {/* Title */}
        <motion.h2
          className="core-competencies__title"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Core Competencies
        </motion.h2>

        {/* Main Content Container */}
        <div className="core-competencies__content">
          {/* Competency Cards Grid */}
          <motion.div
            className="core-competencies__grid"
            initial={{ y: 0, opacity: 1 }}
            animate={
              isInView
                ? {
                    y: -50,
                    opacity: 1,
                    transition: { duration: 1, delay: 0.5, ease: "easeInOut" },
                  }
                : { y: 0, opacity: 1 }
            }
            style={{ position: 'relative', zIndex: 2 }}
          >
            {competencies.map((competency, index) => (
              <motion.div
                key={index}
                className="core-competencies__card"
                initial={{ opacity: 0.4, scale: 0.9, y: 20 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          delay: 0.4 + index * 0.1,
                          ease: "easeOut",
                        },
                      }
                    : { opacity: 0.4, scale: 0.9, y: 20 }
                }
              >
                <span className="core-competencies__card-text">
                  {competency}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Central Glass Card with Gradient Inside */}
          <motion.div
            className="core-competencies__glass-overlay"
            initial={{ scale: 1.2, y: 0 }}
            animate={
              isInView
                ? {
                    scale: 0.6,
                    y: 150, // Move further down to avoid overlapping the title
                    transition: {
                      duration: 1,
                      delay: 0.6,
                      ease: "easeInOut",
                    },
                  }
                : { scale: 1.2, y: 0 }
            }
            style={{ zIndex: 1 }}
          >
            <motion.div
              className="core-competencies__glass-card"
              initial={{ rotate: 0 }}
              animate={
                isInView
                  ? {
                      transition: {
                        duration: 1.2,
                        delay: 1,
                        ease: "easeOut",
                      },
                    }
                  : { rotate: 0 }
              }
            >
              <motion.div
                className="core-competencies__gradient"
                initial={{ scale: 1 }}
                animate={
                  isInView
                    ? {
                        scale: 1.1,
                        transition: {
                          duration: 0.8,
                          delay: 0.8,
                          ease: "easeOut",
                        },
                      }
                    : { scale: 1 }
                }
              ></motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoreCompetencies;
