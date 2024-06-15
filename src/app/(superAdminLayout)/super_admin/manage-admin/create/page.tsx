import CreateAdmin from "@/components/CreateAdmin/CreateAdmin";

const AdminCreate = () => {
  return (
    <div>
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Create Admin
      </h1>

      <div className="flex justify-center margin-auto my-4">
        <CreateAdmin />
      </div>
    </div>
  );
};

export default AdminCreate;
