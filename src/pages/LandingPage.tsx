import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        College ERP System
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          size="lg"
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            navigate('/student')
          }}
        >
          Student Portal
        </Button>

        <Button
          size="lg"
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={() => {
            navigate('/hostel')
          }}
        >
          Hostel Portal
        </Button>

        <Button
          size="lg"
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={() => {
            // Placeholder for 3rd button
            console.log("Button 3 clicked");
          }}
        >
          Button 3
        </Button>

        <Button
          size="lg"
          className="bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={() => {
            // Placeholder for 4th button
            console.log("Button 4 clicked");
          }}
        >
          Button 4
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
