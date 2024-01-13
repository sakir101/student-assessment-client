"use client";

import { useGetCareerQuery } from "@/redux/api/careerGuideApi";
import { getUserInfo } from "@/services/auth.service";

const CareerGuidePage: React.FC = () => {
  const { userId: id } = getUserInfo() as any;
  const { data, isLoading } = useGetCareerQuery(id);

  const categoryNames: string[] = [
    "CategoryA",
    "CategoryB",
    "CategoryC",
    "CategoryD",
    "CategoryE",
    "CategoryF",
  ];

  // Map the data to the new structure
  const mappedData = {
    class_probabilities: Object.fromEntries(
      Object.entries(data?.class_probabilities || {}).map(
        ([key, value], index) => [
          categoryNames[index],
          Math.round(value as number),
        ]
      )
    ),
  };

  let category;

  if (mappedData && mappedData.class_probabilities) {
    category = [
      {
        career: [
          {
            id: "1",
            title: "Artificial Intelligence Engineers",
            desc: "Artificial Intelligence (AI) refers to the development of computer systems capable of performing tasks that typically require human intelligence, such as learning, problem-solving, and natural language understanding, aiming to enhance efficiency and adaptability in various domains.",
            link: "https://www.coursera.org/courses?query=artificial%20intelligence",
            img: "/images/ai.jpg",
          },
          {
            id: "2",
            title: "Robotics and Automation Engineers",
            desc: "Robotics and automation involve the use of intelligent machines and systems to perform tasks traditionally carried out by humans, enhancing efficiency and precision across various industries. These technologies aim to streamline processes, minimize errors, and contribute to advancements in fields such as manufacturing, healthcare, and logistics.",
            link: "https://www.coursera.org/courses?query=robotics",
            img: "/images/robot.jpg",
          },
          {
            id: "3",
            title: "Internet of Things  Specialists",
            desc: "The Internet of Things (IoT) refers to the network of interconnected devices, sensors, and objects that communicate and share data over the internet, enabling seamless integration and automation for improved efficiency and decision-making in various domains.",
            link: "https://www.coursera.org/courses?query=iot",
            img: "/images/iot.jpg",
          },
          {
            id: "4",
            title: "Machine Learning Engineers",
            desc: "Machine learning is a branch of artificial intelligence that enables computers to learn and make decisions without being explicitly programmed, using algorithms and statistical models to analyze and interpret data.",
            link: "https://www.coursera.org/learn/machine-learning",
            img: "/images/machineLearning.jpg",
          },
        ],
        percentage: mappedData?.class_probabilities?.CategoryA,
      },
      {
        career: [
          {
            id: "1",
            title: "Data Scientists",
            desc: "Data science involves extracting insights and knowledge from large and complex datasets through a combination of statistical analysis, machine learning algorithms, and domain expertise, empowering informed decision-making across various industries.",
            link: "https://www.coursera.org/browse/data-science",
            img: "/images/dataScience.jpg",
          },
        ],
        percentage: mappedData?.class_probabilities?.CategoryB,
      },
      {
        career: [
          {
            id: "1",
            title: "Mobile App Developer",
            desc: "Mobile app development involves creating software applications specifically designed to run on mobile devices, such as smartphones and tablets, utilizing platforms like iOS or Android. It encompasses the entire process from concept and design to coding, testing, and deployment, aiming to provide users with efficient and user-friendly experiences on their portable devices.",
            link: "https://developer.android.com/courses",
            img: "/images/mobileApp.jpg",
          },
          {
            id: "2",
            title: "Game Developer",
            desc: "Game developers create interactive experiences by designing and programming video games, bringing together creativity and technical expertise to deliver immersive and entertaining digital worlds.",
            link: "https://www.udemy.com/courses/development/game-development/",
            img: "/images/gameDevelop.jpg",
          },
          {
            id: "3",
            title: "Web Developer",
            desc: "Web development involves creating and maintaining websites or web applications, employing various technologies such as HTML, CSS, JavaScript, and server-side languages to ensure functionality and user interactivity on the internet.",
            link: "https://www.udemy.com/courses/development/web-development/",
            img: "/images/webDevelop.jpg",
          },
        ],
        percentage: mappedData?.class_probabilities?.CategoryC,
      },
      {
        career: [
          {
            id: "1",
            title: "Cyber Security Engineers",
            desc: "Cybersecurity is the practice of protecting computer systems, networks, and data from digital threats, encompassing measures such as firewalls, encryption, and vigilant monitoring to safeguard against cyber attacks and unauthorized access.",
            link: "https://www.coursera.org/courses?query=cybersecurity",
            img: "/images/cyber.jpg",
          },
          {
            id: "2",
            title: "Information Security Analysts",
            desc: "Information security involves implementing measures to protect digital information from unauthorized access, disclosure, alteration, or destruction, ensuring confidentiality, integrity, and availability of data. It encompasses strategies, technologies, and practices to safeguard sensitive information in an increasingly interconnected and digital world.",
            link: "https://www.coursera.org/courses?query=cybersecurity",
            img: "/images/informationSecurity.jpg",
          },
          {
            id: "3",
            title: "Cloud computing and DevOps",
            desc: "Cloud computing is a technology that enables on-demand access to a shared pool of computing resources over the internet. DevOps is a collaborative approach that integrates software development and IT operations, fostering continuous delivery and automation to enhance efficiency and collaboration in the software development lifecycle.",
            link: "https://www.coursera.org/browse/information-technology/cloud-computing",
            img: "/images/cloudComputing.jpg",
          },
          {
            id: "4",
            title: "Tech Policy and Advocacy",
            desc: "Tech policy and advocacy involve shaping regulations and influencing decision-makers to address ethical, legal, and societal implications of technology, ensuring responsible innovation and safeguarding user rights in the rapidly evolving digital landscape.",
            link: "https://www.coursera.org/learn/justice-and-equity-in-technology-policy",
            img: "/images/teachPolicy.jpg",
          },
        ],
        percentage: mappedData?.class_probabilities?.CategoryD,
      },
      {
        career: [
          {
            id: "1",
            title: "Software Developer",
            desc: "Software development and engineering involve the systematic process of designing, building, testing, and maintaining software applications to meet specific requirements, ensuring functionality, reliability, and scalability. It encompasses a range of methodologies and practices aimed at creating high-quality, efficient, and innovative solutions for various technological needs.",
            link: "https://www.coursera.org/courses?query=software%20engineering",
            img: "/images/softwareDev.jpg",
          },
          {
            id: "2",
            title: "Project Manager",
            desc: "A Project Manager is responsible for planning, executing, and closing projects, overseeing team members, managing resources, and ensuring successful project delivery within scope, time, and budget constraints. They play a crucial role in coordinating efforts and maintaining communication to achieve project objectives.",
            link: "https://www.io4pm.org/",
            img: "/images/projManager.jpg",
          },
          {
            id: "3",
            title: "Consulting and IT Manager",
            desc: "Consulting and IT Management involves advising organizations on effective technology utilization, strategic planning, and overseeing the implementation of IT solutions to optimize business processes and enhance overall performance.",
            link: "https://www.coursera.org/courses?query=management%20consulting",
            img: "/images/consultingIT.jpg",
          },
          {
            id: "4",
            title: "System Analyst",
            desc: "System analysis involves a comprehensive examination of an organization's processes, data, and technology to design efficient and effective solutions, ensuring optimal system performance and alignment with business objectives.",
            link: "https://www.udemy.com/topic/systems-analysis/",
            img: "/images/systemAnalyst.jpg",
          },
        ],
        percentage: mappedData?.class_probabilities?.CategoryE,
      },
      {
        career: [
          {
            id: "1",
            title: "Graphic Designer",
            desc: "Graphic design is the art of combining text and visuals to convey a message or tell a story, harmonizing aesthetics and functionality to create visually compelling and effective communication.",
            link: "https://www.creativeitinstitute.com/courses/professional-graphics-design",
            img: "/images/graphicDesign.jpg",
          },
          {
            id: "2",
            title: "UI/Ux Designer",
            desc: "UI/UX design focuses on creating an intuitive and visually appealing user interface, ensuring a seamless and enjoyable user experience for digital products, websites, and applications. It involves a balance between aesthetic elements and user-centric functionality to enhance overall usability.",
            link: "https://www.creativeitinstitute.com/courses/ux-ui-design",
            img: "/images/uiUx.jpg",
          },
        ],
        percentage: mappedData?.class_probabilities?.CategoryF,
      },
    ];
  }

  const sortedCategory: any = category?.sort(
    (a, b) => b.percentage - a.percentage
  );

  console.log(sortedCategory);

  return (
    <div>
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Your Career Guide
      </h1>
      {Object.keys(data || {}).length ? (
        <div>
          <p className="text-center font-semibold text-lg my-7">
            Hi! Sakir system analyzed your data. After analyzing your data it is
            found that
          </p>
          <div>
            <p>Your primary goal should be</p>
            <div className="p-5 border- solid border-2 border-r-4 border-sky-600 w-2/6">
              {sortedCategory.length > 0
                ? sortedCategory[0]?.career.map(
                    (obj: string, index: number) => <p key={index}>{obj}</p>
                  )
                : "No primary goal found"}
            </div>
            <p>Your secondary objectives should be</p>
            <div>
              {sortedCategory
                .slice(1, 3)
                .map((secondaryGoal: any, index: number) => (
                  <div key={index}>{secondaryGoal.career.join(", ")}</div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p>At first, you have to choose interest</p>
      )}
    </div>
  );
};

export default CareerGuidePage;
