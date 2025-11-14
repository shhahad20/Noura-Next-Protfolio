import i18n from "../i18n";

const isArabic = i18n.language === "ar";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  year: string;
  status: string;
}

export const projectsData: Project[] = [
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
