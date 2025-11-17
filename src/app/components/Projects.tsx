"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import "../styles/RecentProjects.scss";
import { useTranslation } from "react-i18next";
import Link from "next/link";


const RecentProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: isArabic ? "تطبيق التجارة الإلكترونية" : "E-Commerce Mobile App",
      category: isArabic ? "تطوير تطبيقات الجوال" : "Mobile Development",
      description: isArabic
        ? "تطبيق تسوق متكامل يضم ميزة التجربة بالواقع المعزز وتجربة شراء سلسة."
        : "A comprehensive shopping app with AR try-on features and seamless checkout experience.",
      image: "./apple.jpg",
      tech: ["React Native", "Node.js", "MongoDB"],
      year: "2024",
      status: isArabic ? "مميز" : "Featured",
    },
    {
      id: 2,
      title: isArabic
        ? "لوحة تحكم مدعومة بالذكاء الاصطناعي"
        : "AI-Powered Analytics Dashboard",
      category: isArabic ? "تطوير الويب" : "Web Development",
      description: isArabic
        ? "منصة ذكاء أعمال لحظية مع تحليلات تنبؤية وتقارير مخصصة."
        : "Real-time business intelligence platform with predictive analytics and custom reporting.",
      image: "./Lan.jpg",
      tech: ["React", "Python", "TensorFlow"],
      year: "2024",
      status: isArabic ? "جديد" : "New",
    },
    {
      id: 3,
      title: isArabic
        ? "نظام الهوية البصرية للعلامة التجارية"
        : "Brand Identity System",
      category: isArabic ? "تصميم" : "Design",
      description: isArabic
        ? "تجديد شامل للهوية البصرية يتضمن تصميم الشعار، الخطوط، وإرشادات العلامة التجارية."
        : "Complete brand overhaul including logo design, typography, and brand guidelines.",
      image: "./data.jpg",
      tech: ["Adobe Creative Suite", "Figma"],
      year: "2023",
      status: isArabic ? "حاصل على جائزة" : "Award Winner",
    },
    {
      id: 4,
      title: isArabic
        ? "نظام تصويت قائم على البلوك تشين"
        : "Blockchain Voting System",
      category: isArabic ? "بلوك تشين" : "Blockchain",
      description: isArabic
        ? "منصة تصويت آمنة وشفافة مبنية على شبكة إيثريوم مع تكامل العقود الذكية."
        : "Secure, transparent voting platform built on Ethereum with smart contract integration.",
      image: "./master1.jpg",
      tech: ["Solidity", "Web3.js", "React"],
      year: "2023",
      status: isArabic ? "مفتوح المصدر" : "Open Source",
    },
    {
      id: 5,
      title: isArabic
        ? "تطبيق تتبع اللياقة بتقنية إنترنت الأشياء"
        : "Fitness Tracking IoT App",
      category: isArabic ? "تطوير إنترنت الأشياء" : "IoT Development",
      description: isArabic
        ? "نظام متكامل للياقة البدنية مع تكامل للأجهزة القابلة للارتداء وتدريب شخصي مخصص."
        : "Connected fitness ecosystem with wearable integration and personalized coaching.",
      image: "./munchable.jpg",
      tech: ["Flutter", "Firebase", "IoT"],
      year: "2023",
      status: isArabic ? "نشط" : "Live",
    },
  ];

  // const getStatusColor = (status: string | undefined): string => {
  //   switch(status) {
  //     case "Featured": return "featured";
  //     case "New": return "new";
  //     case "Award Winner": return "award";
  //     case "Open Source": return "opensource";
  //     case "Live": return "live";
  //     default: return "default";
  //   }
  // };
  const getStatusColor = (status: string | undefined): string => {
    switch (status) {
      case "Featured":
      case "مميز":
        return "featured";
      case "New":
      case "جديد":
        return "new";
      case "Award Winner":
      case "حاصل على جائزة":
        return "award";
      case "Open Source":
      case "مفتوح المصدر":
        return "opensource";
      case "Live":
      case "نشط":
        return "live";
      default:
        return "default";
    }
  };
  return (
    <div className={`recent-projects ${isArabic ? "rtl" : ""}`} ref={ref} id="projects">
      <div className="recent-projects__container">
        {/* Header Section */}
        <div className="recent-projects__header">
          <motion.div
            className="recent-projects__title-section"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="recent-projects__title">
              {t("recentProjects.title")}
            </h2>
            <p className="recent-projects__subtitle">
              {t("recentProjects.subtitle")}
            </p>
          </motion.div>

          {/* Floating Elements */}
          {/* <motion.div 
            className="recent-projects__floating-element recent-projects__floating-element--1"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="recent-projects__floating-element recent-projects__floating-element--2"
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          /> */}
        </div>

        {/* Projects Grid */}
        <div className="recent-projects__grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`recent-projects__card ${
                index === 0 ? "recent-projects__card--featured" : ""
              }`}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        delay: 0.3 + index * 0.1,
                        ease: "easeOut",
                      },
                    }
                  : { opacity: 0, y: 50, scale: 0.9 }
              }
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              // Removed whileHover to prevent card from moving up on hover
            >
              <div className="recent-projects__card-inner">
                {/* Shine Effect */}
                <div className="recent-projects__shine"></div>

                {/* Animated Background */}
                <div className="recent-projects__background">
                  <div className="recent-projects__tiles">
                    <div className="recent-projects__tile recent-projects__tile-1"></div>
                    <div className="recent-projects__tile recent-projects__tile-2"></div>
                    <div className="recent-projects__tile recent-projects__tile-3"></div>
                    <div className="recent-projects__tile recent-projects__tile-4"></div>
                    <div className="recent-projects__tile recent-projects__tile-5"></div>
                    <div className="recent-projects__tile recent-projects__tile-6"></div>
                    <div className="recent-projects__tile recent-projects__tile-7"></div>
                    <div className="recent-projects__tile recent-projects__tile-8"></div>
                    <div className="recent-projects__tile recent-projects__tile-9"></div>
                    <div className="recent-projects__tile recent-projects__tile-10"></div>
                  </div>

                  <div className="recent-projects__line recent-projects__line-1"></div>
                  <div className="recent-projects__line recent-projects__line-2"></div>
                  <div className="recent-projects__line recent-projects__line-3"></div>
                </div>

                {/* Project Image */}
                <div className="recent-projects__image-container">
                  <Image
                    src={project.image.replace('./', '/')}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="recent-projects__image"
                  />
                  <div className="recent-projects__image-overlay">
                    <motion.div
                      className="recent-projects__view-button"
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href={`/projects/${project.id}`}>{t("recentProjects.viewProject")}</Link>
                    </motion.div> 
                  </div>
                  <div
                    className={`recent-projects__status recent-projects__status--${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </div>
                </div>

                {/* Project Info */}
                <div className="recent-projects__info">
                  <div className="recent-projects__meta">
                    <span className="recent-projects__category">
                      {project.category}
                    </span>
                    <span className="recent-projects__year">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="recent-projects__project-title">
                    {project.title}
                  </h3>
                  <p className="recent-projects__description">
                    {project.description}
                  </p>

                  <div className="recent-projects__tech">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="recent-projects__tech-tag"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements - Removed old decoration */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <motion.div
          className="recent-projects__cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, delay: 1.2 }
          } : { opacity: 0, y: 30 }}
        >
          <button className="recent-projects__cta-button">
            <span>View All Projects</span>
            <motion.div 
              className="recent-projects__cta-arrow"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.div>
          </button>
        </motion.div> */}
      </div>

      {/* Background Elements */}
      <div className="recent-projects__background">
        <div className="recent-projects__bg-grid"></div>
        <motion.div
          className="recent-projects__bg-glow"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default RecentProjects;
