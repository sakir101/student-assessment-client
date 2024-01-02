import { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/account-profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-student`}>Manage Students</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-student`,
    },
    {
      label: <Link href={`/${role}/manage-faculty`}>Manage Faculties</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-faculty`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: (
        <Link href={`/${role}/manage-universities`}>Manage Universities</Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-universities`,
    },
    {
      label: <Link href={`/${role}/manage-skills`}>Manage Skills</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-skills`,
    },
    {
      label: <Link href={`/${role}/manage-interests`}>Manage Interests</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-interests`,
    },
    {
      label: (
        <Link href={`/${role}/manage-related-works`}>Manage Related Works</Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-related-works`,
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    ...adminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Manage permission",
      key: "manage-permission",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/permission`}>View permissions</Link>,
          key: `/${role}/permission`,
        },
      ],
    },
  ];

  if (role === "student") {
    return defaultSidebarItems;
  } else if (role === "admin") {
    return adminSidebarItems;
  } else if (role === "super_admin") {
    return adminSidebarItems;
  }
};
