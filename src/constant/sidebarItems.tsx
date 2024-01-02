import { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  HeartOutlined,
  ProjectOutlined,
  TeamOutlined,
  FileDoneOutlined,
  RocketOutlined,
  MonitorOutlined,
  UserOutlined,
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

  const facultySidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Interest",
      icon: <HeartOutlined />,
      key: "interest",
      children: [
        {
          label: <Link href={`/${role}/set-interest`}>Set Interest</Link>,
          key: `/${role}/set-interest`,
        },
        {
          label: <Link href={`/${role}/interest-list`}>Interest List</Link>,
          key: `/${role}/interest-list`,
        },
      ],
    },
    {
      label: "Related Works",
      icon: <ProjectOutlined />,
      key: "related-works",
      children: [
        {
          label: (
            <Link href={`/${role}/set-related-works`}>Set Related Works</Link>
          ),
          key: `/${role}/set-related-works`,
        },
        {
          label: (
            <Link href={`/${role}/related-works-list`}>Related Works List</Link>
          ),
          key: `/${role}/related-works-list`,
        },
      ],
    },
    {
      label: "Student List",
      icon: <TeamOutlined />,
      key: "student-list",
      children: [
        {
          label: (
            <Link href={`/${role}/enrolled-student`}>Enrolled Student</Link>
          ),
          key: `/${role}/enrolled-student`,
        },
        {
          label: <Link href={`/${role}/complete-task`}>Complete Task</Link>,
          key: `/${role}/complete-task`,
        },
      ],
    },
    {
      label: "Task",
      icon: <FileDoneOutlined />,
      key: "task",
      children: [
        {
          label: <Link href={`/${role}/create-task`}>Create Task</Link>,
          key: `/${role}/create-task`,
        },
        {
          label: <Link href={`/${role}/assign-task`}>Assign Task</Link>,
          key: `/${role}/assign-task`,
        },
      ],
    },
  ];

  const studentSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Skill",
      icon: <RocketOutlined />,
      key: "skill",
      children: [
        {
          label: <Link href={`/${role}/set-skill`}>Set Skill</Link>,
          key: `/${role}/set-skill`,
        },
        {
          label: <Link href={`/${role}/skill-list`}>Skill List</Link>,
          key: `/${role}/skill-list`,
        },
      ],
    },
    {
      label: "Interest",
      icon: <HeartOutlined />,
      key: "interest-student",
      children: [
        {
          label: (
            <Link href={`/${role}/set-interest-student`}>Set Interest</Link>
          ),
          key: `/${role}/set-interest-student`,
        },
        {
          label: (
            <Link href={`/${role}/interest-list-student`}>Interest List</Link>
          ),
          key: `/${role}/interest-list-student`,
        },
      ],
    },
    {
      label: "Related Works",
      icon: <ProjectOutlined />,
      key: "related-works-student",
      children: [
        {
          label: (
            <Link href={`/${role}/set-related-works-student`}>
              Set Related Works
            </Link>
          ),
          key: `/${role}/set-related-works-student`,
        },
        {
          label: (
            <Link href={`/${role}/related-works-list-student`}>
              Related Works List
            </Link>
          ),
          key: `/${role}/related-works-list-student`,
        },
      ],
    },
    {
      label: <Link href={`/${role}/career-guide`}>Career Guide</Link>,
      icon: <MonitorOutlined />,
      key: `/${role}/career-guide`,
    },
    {
      label: "Faculty",
      icon: <UserOutlined />,
      key: "faculty-list-student",
      children: [
        {
          label: (
            <Link href={`/${role}/enrolled-faculty-list`}>
              Enrolled Faculty
            </Link>
          ),
          key: `/${role}/enrolled-faculty-list`,
        },
        {
          label: (
            <Link href={`/${role}/suggested-faculty-list`}>
              Suggested Faculty
            </Link>
          ),
          key: `/${role}/suggested-faculty-list`,
        },
      ],
    },
    {
      label: "Task",
      icon: <FileDoneOutlined />,
      key: "task-list-student",
      children: [
        {
          label: (
            <Link href={`/${role}/assigned-task-list`}>Assigned Task</Link>
          ),
          key: `/${role}/assigned-task-list`,
        },
        {
          label: (
            <Link href={`/${role}/completed-task-list`}>Completed Task</Link>
          ),
          key: `/${role}/completed-task-list`,
        },
      ],
    },
  ];

  if (role === "admin") {
    return studentSidebarItems;
  } else if (role === "super_admin") {
    return adminSidebarItems;
  } else if (role === "faculty") {
    return adminSidebarItems;
  } else if (role === "student") {
    return facultySidebarItems;
  } else {
    return defaultSidebarItems;
  }
};
