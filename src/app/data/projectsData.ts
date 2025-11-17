export interface Project {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: string;
  tech: string[];
  year: string;
  status: {
    en: string;
    ar: string;
  };
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: {
      en: "E-Commerce Mobile App",
      ar: "تطبيق التجارة الإلكترونية",
    },
    category: {
      en: "Mobile Development",
      ar: "تطوير تطبيقات الجوال",
    },
    description: {
      en: "A comprehensive shopping app with AR try-on features and seamless checkout experience.",
      ar: "تطبيق تسوق متكامل يضم ميزة التجربة بالواقع المعزز وتجربة شراء سلسة.",
    },
    image: "/apple.jpg",
    tech: ["React Native", "Node.js", "MongoDB"],
    year: "2024",
    status: {
      en: "Featured",
      ar: "مميز",
    },
  },
  {
    id: 2,
    title: {
      en: "AI-Powered Analytics Dashboard",
      ar: "لوحة تحكم مدعومة بالذكاء الاصطناعي",
    },
    category: {
      en: "Web Development",
      ar: "تطوير الويب",
    },
    description: {
      en: "Real-time business intelligence platform with predictive analytics and custom reporting.",
      ar: "منصة ذكاء أعمال لحظية مع تحليلات تنبؤية وتقارير مخصصة.",
    },
    image: "./Lan.jpg",
    tech: ["React", "Python", "TensorFlow"],
    year: "2024",
    status: {
      en: "New",
      ar: "جديد",
    },
  },
  {
    id: 3,
    title: {
      en: "Brand Identity System",
      ar: "نظام الهوية البصرية للعلامة التجارية",
    },
    category: {
      en: "Design",
      ar: "تصميم",
    },
    description: {
      en: "Complete brand overhaul including logo design, typography, and brand guidelines.",
      ar: "تجديد شامل للهوية البصرية يتضمن تصميم الشعار، الخطوط، وإرشادات العلامة التجارية.",
    },
    image: "./data.jpg",
    tech: ["Adobe Creative Suite", "Figma"],
    year: "2023",
    status: {
      en: "Award Winner",
      ar: "حاصل على جائزة",
    },
  },
  {
    id: 4,
    title: {
      en: "Blockchain Voting System",
      ar: "نظام تصويت قائم على البلوك تشين",
    },
    category: {
      en: "Blockchain",
      ar: "بلوك تشين",
    },
    description: {
      en: "Secure, transparent voting platform built on Ethereum with smart contract integration.",
      ar: "منصة تصويت آمنة وشفافة مبنية على شبكة إيثريوم مع تكامل العقود الذكية.",
    },
    image: "./master1.jpg",
    tech: ["Solidity", "Web3.js", "React"],
    year: "2023",
    status: {
      en: "Open Source",
      ar: "مفتوح المصدر",
    },
  },
  {
    id: 5,
    title: {
      en: "Fitness Tracking IoT App",
      ar: "تطبيق تتبع اللياقة بتقنية إنترنت الأشياء",
    },
    category: {
      en: "IoT Development",
      ar: "تطوير إنترنت الأشياء",
    },
    description: {
      en: "Connected fitness ecosystem with wearable integration and personalized coaching.",
      ar: "نظام متكامل للياقة البدنية مع تكامل للأجهزة القابلة للارتداء وتدريب شخصي مخصص.",
    },
    image: "./munchable.jpg",
    tech: ["Flutter", "Firebase", "IoT"],
    year: "2023",
    status: {
      en: "Live",
      ar: "نشط",
    },
  },
];
