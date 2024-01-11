"use client";
import { Layout } from "antd";
import SABreadCrumb from "./SABreadCrumb";
import Header from "./header";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";
  return (
    <Content style={{ minHeight: "100vh", color: "black" }}>
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
