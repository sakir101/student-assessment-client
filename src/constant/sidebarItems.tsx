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
      label: <p className="hover:text-slate-400">Profile</p>,
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/profile/account-profile`}
            >
              Account Profile
            </Link>
          ),
          key: `/${role}/profile/account-profile`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/profile/password-change`}
            >
              Change Password
            </Link>
          ),
          key: `/${role}/profile/password-change`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: (
        <Link className="hover:text-slate-400" href={`/${role}/manage-student`}>
          Manage Students
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-student`,
    },
    {
      label: (
        <Link className="hover:text-slate-400" href={`/${role}/manage-faculty`}>
          Manage Faculties
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-faculty`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: (
        <Link
          className="hover:text-slate-400"
          href={`/${role}/manage-universities`}
        >
          Manage Universities
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-universities`,
    },
    {
      label: (
        <Link className="hover:text-slate-400" href={`/${role}/manage-skills`}>
          Manage Skills
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-skills`,
    },
    {
      label: (
        <Link
          className="hover:text-slate-400"
          href={`/${role}/manage-interests`}
        >
          Manage Interests
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-interests`,
    },
    {
      label: (
        <Link
          className="hover:text-slate-400"
          href={`/${role}/manage-related-works`}
        >
          Manage Related Works
        </Link>
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
      label: (
        <Link className="hover:text-slate-400" href={`/${role}/admin`}>
          Manage Admin
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: (
        <Link className="hover:text-slate-400" href={`/${role}/user`}>
          Manage User
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Manage permission",
      key: "manage-permission",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: (
            <Link className="hover:text-slate-400" href={`/${role}/permission`}>
              View permissions
            </Link>
          ),
          key: `/${role}/permission`,
        },
      ],
    },
  ];

  const facultySidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Expertise",
      icon: <HeartOutlined />,
      key: "interest",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/expertise-faculty/create`}
            >
              Set Expertise
            </Link>
          ),
          key: `/${role}/expertise-faculty/create`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/expertise-faculty/view`}
            >
              Expertise List
            </Link>
          ),
          key: `/${role}/expertise-faculty/view`,
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
            <Link
              className="hover:text-slate-400"
              href={`/${role}/set-related-works`}
            >
              Set Related Works
            </Link>
          ),
          key: `/${role}/set-related-works`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/related-works-list`}
            >
              Related Works List
            </Link>
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
            <Link
              className="hover:text-slate-400"
              href={`/${role}/student-list/enrolled-student`}
            >
              Enrolled Student
            </Link>
          ),
          key: `/${role}/student-list/enrolled-student`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/student-list/complete-task`}
            >
              Complete Task
            </Link>
          ),
          key: `/${role}/student-list/complete-task`,
        },
      ],
    },
    {
      label: "Task",
      icon: <FileDoneOutlined />,
      key: "task",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/task/create-task`}
            >
              Create Task
            </Link>
          ),
          key: `/${role}/task/create-task`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/task/task-list`}
            >
              Task List
            </Link>
          ),
          key: `/${role}/task/task-list`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/task/assign-task`}
            >
              Assign Task
            </Link>
          ),
          key: `/${role}/task/assign-task`,
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
          label: (
            <Link className="hover:text-slate-400" href={`/${role}/set-skill`}>
              Set Skill
            </Link>
          ),
          key: `/${role}/set-skill`,
        },
        {
          label: (
            <Link className="hover:text-slate-400" href={`/${role}/skill-list`}>
              Skill List
            </Link>
          ),
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
            <Link
              className="hover:text-slate-400"
              href={`/${role}/interest-student/create`}
            >
              Set Interest
            </Link>
          ),
          key: `/${role}/interest-student/create`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/interest-student/view`}
            >
              Interest List
            </Link>
          ),
          key: `/${role}/interest-student/view`,
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
            <Link
              className="hover:text-slate-400"
              href={`/${role}/set-related-works-student`}
            >
              Set Related Works
            </Link>
          ),
          key: `/${role}/set-related-works-student`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/related-works-list-student`}
            >
              Related Works List
            </Link>
          ),
          key: `/${role}/related-works-list-student`,
        },
      ],
    },
    {
      label: (
        <Link className="hover:text-slate-400" href={`/${role}/career-guide`}>
          Career Guide
        </Link>
      ),
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
            <Link
              className="hover:text-slate-400"
              href={`/${role}/faculty-list/enrolled-faculty`}
            >
              Enrolled Faculty
            </Link>
          ),
          key: `/${role}/faculty-list/enrolled-faculty`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/faculty-list/suggested-faculty`}
            >
              Suggested Faculty
            </Link>
          ),
          key: `/${role}/faculty-list/suggested-faculty`,
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
            <Link
              className="hover:text-slate-400"
              href={`/${role}/task/assigned-task`}
            >
              Assigned Task
            </Link>
          ),
          key: `/${role}/task/assigned-task`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/task/completed-task`}
            >
              Completed Task
            </Link>
          ),
          key: `/${role}/task/completed-task`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/task/task-feedback`}
            >
              Task Feedback
            </Link>
          ),
          key: `/${role}/task/task-feedback`,
        },
      ],
    },
  ];

  if (role === "admin") {
    return adminSidebarItems;
  } else if (role === "super_admin") {
    return superAdminSidebarItems;
  } else if (role === "faculty") {
    return facultySidebarItems;
  } else if (role === "student") {
    return studentSidebarItems;
  } else {
    return defaultSidebarItems;
  }
};
