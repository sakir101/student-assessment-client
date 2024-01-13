"use client";

import { useGetCareerQuery } from "@/redux/api/careerGuideApi";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import Loading from "@/app/loading";

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
            desc: "Artificial Intelligence (AI) is the creation of computer systems capable of performing tasks requiring human intelligence, such as learning, problem-solving, and natural language understanding, to improve efficiency and adaptability.",
            link: "https://www.coursera.org/courses?query=artificial%20intelligence",
            img: "/images/ai.jpg",
          },
          {
            id: "2",
            title: "Robotics and Automation Engineers",
            desc: "Robotics and automation use intelligent machines to perform tasks traditionally performed by humans, enhancing efficiency and precision in industries like manufacturing, healthcare, and logistics.",
            link: "https://www.coursera.org/courses?query=robotics",
            img: "/images/robot.jpg",
          },
          {
            id: "3",
            title: "Internet of Things  Specialists",
            desc: "The Internet of Things (IoT) is a network of interconnected devices, sensors, and objects that communicate and share data via the internet, enhancing efficiency and decision-making in various fields.",
            link: "https://www.coursera.org/courses?query=iot",
            img: "/images/iot.jpg",
          },
          {
            id: "4",
            title: "Machine Learning Engineers",
            desc: "Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions using algorithms and statistical models to analyze and interpret data.",
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
            desc: "Data science is a field that uses statistical analysis, machine learning algorithms, and domain expertise to extract insights from large, complex datasets, enabling informed decision-making across various industries.",
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
            desc: "Mobile app development is the process of creating software applications for mobile devices, encompassing concept, design, coding, testing, and deployment to provide efficient and user-friendly experiences.",
            link: "https://developer.android.com/courses",
            img: "/images/mobileApp.jpg",
          },
          {
            id: "2",
            title: "Game Developer",
            desc: "Game developers create interactive experiences by designing and programming video games, combining creativity and technical expertise to create immersive and entertaining digital worlds.",
            link: "https://www.udemy.com/courses/development/game-development/",
            img: "/images/gameDevelop.jpg",
          },
          {
            id: "3",
            title: "Web Developer",
            desc: "Web development involves creating and maintaining websites or applications using technologies like HTML, CSS, JavaScript, and server-side languages to ensure functionality and user interaction on the internet.",
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
            desc: "Cybersecurity involves safeguarding computer systems, networks, and data from digital threats through measures like firewalls, encryption, and vigilant monitoring.",
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
            desc: "Information security safeguards digital information from unauthorized access, disclosure, alteration, or destruction, ensuring confidentiality, integrity, and availability in an interconnected digital world through strategies, technologies, and practices.",
            link: "https://www.coursera.org/browse/information-technology/cloud-computing",
            img: "/images/cloudComputing.jpg",
          },
          {
            id: "4",
            title: "Tech Policy and Advocacy",
            desc: "Tech policy and advocacy involve regulating technology, influencing decision-makers to address ethical, legal, and societal implications, ensuring responsible innovation, and safeguarding user rights in the rapidly evolving digital landscape.",
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
            desc: "Software development and engineering is a systematic process of designing, building, testing, and maintaining software applications to ensure functionality, reliability, and scalability.",
            link: "https://www.coursera.org/courses?query=software%20engineering",
            img: "/images/softwareDev.jpg",
          },
          {
            id: "2",
            title: "Project Manager",
            desc: "A Project Manager is responsible for planning, executing, and closing projects, overseeing team members, managing resources, and ensuring successful delivery within budget, scope, and time constraints.",
            link: "https://www.io4pm.org/",
            img: "/images/projManager.jpg",
          },
          {
            id: "3",
            title: "Consulting and IT Manager",
            desc: "Consulting and IT Management involves advising organizations on efficient technology use, strategic planning, and implementing IT solutions to optimize business processes and improve performance.",
            link: "https://www.coursera.org/courses?query=management%20consulting",
            img: "/images/consultingIT.jpg",
          },
          {
            id: "4",
            title: "System Analyst",
            desc: "System analysis is a thorough analysis of an organization's processes, data, and technology to create efficient solutions that align with business objectives.",
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
            desc: "Graphic design is the combination of text and visuals to convey a message or story, blending aesthetics and functionality for visually compelling and effective communication.",
            link: "https://www.creativeitinstitute.com/courses/professional-graphics-design",
            img: "/images/graphicDesign.jpg",
          },
          {
            id: "2",
            title: "UI/Ux Designer",
            desc: "UI/UX design aims to create an intuitive, visually appealing interface for digital products, websites, and applications, balancing aesthetics with user-centric functionality for seamless usability.",
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

  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Your Career Guide
      </h1>
      {isLoading ? (
        <Loading />
      ) : Object.keys(data || {}).length ? (
        <div>
          <p className="text-center font-semibold text-lg my-7">
            Hi! Sakir system analyzed your data. After analyzing your data it is
            found that
          </p>
          <div className="divider"></div>
          <div>
            <p className="text-center text-blue-600 font-bold text-lg my-7">
              Your primary goal should be
            </p>
            <div className="grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-5 lg:w-3/4">
              {sortedCategory.length > 0
                ? sortedCategory[0]?.career.map(
                    (primaryObj: any, index: number) => (
                      <div
                        key={primaryObj?.id}
                        className="card  bg-base-100 shadow-xl transition-transform transform hover:scale-110 cursor-pointer"
                      >
                        <figure className="px-10 pt-10">
                          <Image
                            src={primaryObj?.img}
                            width={500}
                            height={200}
                            layout="responsive"
                            alt="login image"
                          />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">{primaryObj?.title}</h2>
                          <p>{primaryObj?.desc}</p>
                          <div className="divider"></div>
                          <div>
                            <Link
                              href={primaryObj?.link}
                              target="_blank"
                              className="flex justify-center items-center no-underline"
                            >
                              <p className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                                Go to course
                              </p>
                              <ArrowRightOutlined className="ms-3 text-sm text-blue-600 hover:text-blue-800 font-semibold" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  )
                : "No primary goal found"}
            </div>
            <div className="mt-5 lg:mt-20">
              <p className="text-center text-blue-600 font-bold text-lg my-7">
                Your secondary goal should be
              </p>
              <div className="grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-5 lg:w-3/4">
                {sortedCategory
                  .slice(1, 3)
                  .map((secondaryGoal: any, index: number) => {
                    return secondaryGoal?.career.map(
                      (secondaryObj: any, index: number) => (
                        <div
                          key={secondaryObj?.id}
                          className="card  bg-base-100 shadow-xl transition-transform transform hover:scale-110 cursor-pointer"
                        >
                          <figure className="px-10 pt-10">
                            <Image
                              src={secondaryObj?.img}
                              width={500}
                              height={200}
                              layout="responsive"
                              alt="login image"
                            />
                          </figure>
                          <div className="card-body items-center text-center">
                            <h2 className="card-title">
                              {secondaryObj?.title}
                            </h2>
                            <p>{secondaryObj?.desc}</p>
                            <div className="divider"></div>
                            <div>
                              <Link
                                href={secondaryObj?.link}
                                target="_blank"
                                className="flex justify-center items-center no-underline"
                              >
                                <p className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                                  Go to course
                                </p>
                                <ArrowRightOutlined className="ms-3 text-sm text-blue-600 hover:text-blue-800 font-semibold" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center my-24 w-full lg:w-1/2">
            <p className="text-center text-red-700 font-bold text-lg">
              It is recommended that if you can not view your career goal then
              you must have to select your skill, related works and interest.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerGuidePage;
