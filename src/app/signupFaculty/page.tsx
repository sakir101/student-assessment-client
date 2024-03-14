import Navbar from "@/components/Navbar/Navbar";
import SignUpFaculty from "@/components/SignUpFaculty/SignUpFaculty";

const page = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(to right, #051937, #001b4b, #001c5f, #001b71, #0c1682)",
      }}
    >
      <Navbar />
      <SignUpFaculty />
    </div>
  );
};

export default page;
