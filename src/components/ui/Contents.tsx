"use client";
import { Layout } from "antd";
import SABreadCrumb from "./SABreadCrumb";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";
  return (
    <Content style={{ minHeight: "100vh", color: "black" }}>
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
      {children}
    </Content>
  );
};

export default Contents;
