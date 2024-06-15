"use client";

import PasswordChange from "@/components/PasswordChange/PasswordChange";

const PasswordChangeSuperAdmin = () => {
  return (
    <div>
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Update password
      </h1>

      <div className="flex justify-center margin-auto my-4">
        <PasswordChange />
      </div>
    </div>
  );
};

export default PasswordChangeSuperAdmin;
