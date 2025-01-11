const projects = [
  {
    id: "smart-shopping-cart",
    section: ["ML","Front-End"],
    title: "Smart Shopping Cart",
    description:
      "The Smart Shopping Cart is an innovative solution aimed at transforming the retail shopping experience by integrating artificial intelligence, computer vision, and IoT technologies. This project eliminates the need for traditional checkout lines, offering a seamless and efficient shopping process.",
    features: [
      "Real-time item recognition using computer vision.",
      "Automatic calculation of the total cost for added convenience.",
      "Seamless and integrated payment system to save time.",
      "Personalized product recommendations and in-store navigation assistance.",
    ],
    image: "/smartCart.jpg",
    link: "https://github.com/Abuhamida/Smart-Shopping-Cart",
    technologies: ["Python", "IoT", "React","Flutter", "yolo","Computer Vision"],
    details: `
      The Smart Shopping Cart addresses key challenges in retail, such as long checkout lines and a lack of tailored shopping experiences. By leveraging IoT for real-time data capture and computer vision for item identification, this solution creates a user-friendly and efficient shopping environment. The integration of personalized recommendations and navigation features enhances the customer experience further, making it a standout innovation in retail technology.
    `,
    love: 50,
  },
  {
    id: "medicare-ehr-system",
    section: ["ML","Front-End"],
    title: "Medicare EHR System",
    description:
      "A comprehensive Electronic Health Record (EHR) system designed to integrate AI for assisting in medical diagnoses, coupled with IoT devices for real-time monitoring of patient vitals.",
    features: [
      "AI-powered diagnosis support for medical conditions.",
      "Real-time monitoring of patient vital signs using IoT devices.",
      "Unique IoT device integration for every patient.",
      "Improved data accessibility and streamlined healthcare workflows.",
    ],
    image: "/medicare.png",
    link: "https://github.com/Abuhamida/medicare_predection",
    technologies: ["AI", "IoT", "Next.js", "Node.js"],
    details: `
      Medicare EHR System solves the issue of fragmented patient data and delayed diagnoses by integrating AI and IoT for real-time monitoring and better patient care. The system enhances healthcare workflows by offering a centralized, easy-to-access platform for managing patient data.
    `,
    love: 40,
  },
  {
    id: "asteroid-hazard-prediction",
    section: ["ML"],
    title: "Asteroid Hazard Prediction",
    description:
      "A machine learning solution for predicting asteroid hazards using NASA's dataset of nearest Earth objects.",
    features: [
      "Utilizes NASA's nearest Earth objects dataset for predictions.",
      "Random Forest classifier with 97% accuracy.",
      "Handles class imbalance using SMOTE.",
      "Deployed using Gradio for user interaction.",
    ],
    image: "/asteroid-prediction.jpg",
    link: "https://github.com/Abuhamida/asteroid-hazard-prediction",
    technologies: ["Python", "Random Forest", "Gradio","Power BI"],
    details: `
      This project addresses the critical challenge of identifying potentially hazardous asteroids in Earth's vicinity. Using machine learning models trained on NASA's datasets, the system achieves high prediction accuracy and offers an interactive user interface with Gradio for ease of use.
    `,
    love: 25,
  },
  {
    id: "customer-segmentation-analysis",
    section: ["ML"],
    title: "Customer Segmentation Analysis",
    description:
      "A data analysis and clustering project designed to identify e-commerce customer segments based on their purchasing behavior and characteristics.",
    features: [
      "Performs exploratory data analysis (EDA) on customer datasets.",
      "Segments customers using K-Means clustering.",
      "Generates insights on customer behavior and characteristics.",
      "Provides visualizations using Power BI dashboards.",
    ],
    image: "/customer-segmentation.jpg",
    link: "https://github.com/Abuhamida/E-commerce-Customer-Segmentation",
    technologies: ["Python", "K-Means", "Power BI"],
    details: `
      This project aims to help e-commerce businesses understand their customer base better by grouping customers into distinct segments based on purchasing behavior. Insights gained from this analysis can be used for targeted marketing and improving customer experiences.
    `,
    love: 20,
  },
  {
    id: "mining-process-flotation-analysis",
    section: ["ML"],
    title: "Mining Process Flotation Plant Analysis",
    description:
      "A comprehensive analysis of flotation plant data using advanced machine learning models to predict quality and improve operations.",
    features: [
      "Performs Exploratory Data Analysis (EDA) to understand process data.",
      "Trains Random Forest model for accurate predictions of quality.",
      "Deployed with Gradio for user-friendly predictions.",
      "Creates Power BI dashboards for visual insights.",
    ],
    image: "/mining-process.jpg",
    link: "https://github.com/Abuhamida/Quality-Prediction-in-a-Mining-Process",
    technologies: ["Python", "Random Forest", "Gradio", "Power BI"],
    details: `
      This project addresses the challenge of monitoring and predicting the quality of mining processes. Leveraging advanced machine learning models, it optimizes operations and offers actionable insights through detailed visualizations, thereby improving efficiency and decision-making in the mining industry.
    `,
    love: 30,
  },
];

export default projects;
