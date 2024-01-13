"use client";
import { Layout } from "antd";
import SABreadCrumb from "./SABreadCrumb";
import Header from "./header";
import style from "./sidebar.module.css";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";
  return (
    <Content
      className="w-full fixed lg:w-fit lg:static"
      style={{ height: "100vh", color: "black", overflowY: "auto" }}
    >
      <Header />
      <div className="ms-10 lg:ms-0">
        <SABreadCrumb
          items={[
            {
              label: `${base}`,
              link: `/${base}`,
            },
            {
              label: "student",
              link: `/${base}/student`,
            },
          ]}
        />
      </div>

      {children}
    </Content>
  );
};

export default Contents;
