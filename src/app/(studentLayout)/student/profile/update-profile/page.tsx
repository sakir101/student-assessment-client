"use client";

import UpdateProfileStudent from "@/components/UpdateProfileStudent/UpdateProfileStudent";

const UpdateProfile = () => {
  return (
    <div>
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Update profile
      </h1>

      <div className="flex justify-center margin-auto my-4">
        <UpdateProfileStudent />
      </div>
    </div>
  );
};

export default UpdateProfile;
