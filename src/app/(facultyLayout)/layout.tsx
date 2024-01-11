"use client";

import { USER_ROLE } from "@/constant/role";
import {
  getUserInfo,
  isLoggedIn,
  userVerificationCheck,
} from "@/services/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import Sidebar from "@/components/ui/Sidebar";
import Contents from "@/components/ui/Contents";
import { Secret } from "jsonwebtoken";

type UserInfo = {
  exp: number;
  iat: number;
  role: string;
  userId: string;
};

const DashboardLayoutFaculty = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }

    const { role, exp } = getUserInfo() as any;
    if (!(exp * 1000 > Date.now())) {
      router.push("/login");
    }

    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_FACULTY;
    const verifyToken = userVerificationCheck(secretKey as Secret);

    if (role !== USER_ROLE.FACULTY || verifyToken === null) {
      router.push("/error");
    }

    setIsLoading(true);
  }, [userLoggedIn, router]);

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <Layout hasSider>
      <Sidebar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayoutFaculty;
