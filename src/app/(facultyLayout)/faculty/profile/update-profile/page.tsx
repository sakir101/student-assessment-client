import UpdateProfileFaculty from "@/components/UpdateProfileFaculty/UpdateProfileFaculty";

const UpdateProfile = () => {
  return (
    <div>
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Update profile
      </h1>

      <div className="flex justify-center margin-auto my-4">
        <UpdateProfileFaculty />
      </div>
    </div>
  );
};

export default UpdateProfile;
