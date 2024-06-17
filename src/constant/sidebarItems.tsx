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
              href={`/${role}/profile/update-profile`}
            >
              Update Profile
            </Link>
          ),
          key: `/${role}/profile/update-profile`,
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
      label: "Manage Users",
      icon: <HeartOutlined />,
      key: "Manage Users",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/manage-faculties`}
            >
              Manage Faculties
            </Link>
          ),
          key: `/${role}/manage-faculties`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/manage-students`}
            >
              Manage Students
            </Link>
          ),
          key: `/${role}/manage-students`,
        },
      ],
    },
    {
      label: "Manage Interests",
      icon: <HeartOutlined />,
      key: "Manage Interest",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/manage-interest/create`}
            >
              Create
            </Link>
          ),
          key: `/${role}/manage-interest/create`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/manage-interest/view`}
            >
              View
            </Link>
          ),
          key: `/${role}/manage-interest/view`,
        },
      ],
    },
    {
      label: "Master Field",
      icon: <HeartOutlined />,
      key: "Master Field",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/master-field/create`}
            >
              Create
            </Link>
          ),
          key: `/${role}/master-field/create`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/master-field/view`}
            >
              View
            </Link>
          ),
          key: `/${role}/master-field/view`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/master-field/assign-subField`}
            >
              Assign Sub Field
            </Link>
          ),
          key: `/${role}/master-field/assign-subField`,
        },
      ],
    },
    {
      label: "Sub Field",
      icon: <HeartOutlined />,
      key: "Sub Field",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/sub-field/create`}
            >
              Create
            </Link>
          ),
          key: `/${role}/sub-field/create`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/sub-field/view`}
            >
              View
            </Link>
          ),
          key: `/${role}/sub-field/view`,
        },
      ],
    },
    {
      label: "Job",
      icon: <HeartOutlined />,
      key: "Job",
      children: [
        {
          label: (
            <Link className="hover:text-slate-400" href={`/${role}/job/create`}>
              Create
            </Link>
          ),
          key: `/${role}/job/create`,
        },
        {
          label: (
            <Link className="hover:text-slate-400" href={`/${role}/job/view`}>
              View
            </Link>
          ),
          key: `/${role}/job/view`,
        },
      ],
    },
    {
      label: "Course",
      icon: <HeartOutlined />,
      key: "Course",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/course/create`}
            >
              Create
            </Link>
          ),
          key: `/${role}/course/create`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/course/view`}
            >
              View
            </Link>
          ),
          key: `/${role}/course/view`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [...defaultSidebarItems];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Manage Admin",
      icon: <HeartOutlined />,
      key: "Manage Admin",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/manage-admin/create`}
            >
              Create
            </Link>
          ),
          key: `/${role}/manage-admin/create`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/manage-admin/view`}
            >
              View
            </Link>
          ),
          key: `/${role}/manage-admin/view`,
        },
      ],
    },
    ...commonAdminSidebarItems,
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
              href={`/${role}/related-works-faculty/create`}
            >
              Set Related Works
            </Link>
          ),
          key: `/${role}/related-works-faculty/create`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/related-works-faculty/view`}
            >
              Related Works List
            </Link>
          ),
          key: `/${role}/related-works-faculty/view`,
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
            <Link
              className="hover:text-slate-400"
              href={`/${role}/skill/create`}
            >
              Set Skill
            </Link>
          ),
          key: `/${role}/skill/create`,
        },
        {
          label: (
            <Link className="hover:text-slate-400" href={`/${role}/skill/view`}>
              Skill List
            </Link>
          ),
          key: `/${role}/skill/view`,
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
              href={`/${role}/related-works-student/create`}
            >
              Set Related Works
            </Link>
          ),
          key: `/${role}/related-works-student/create`,
        },
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/related-works-student/view`}
            >
              Related Works List
            </Link>
          ),
          key: `/${role}/related-works-student/view`,
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
