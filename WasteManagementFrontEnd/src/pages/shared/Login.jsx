import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, user, token } = useAuth();
  const [userName, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      //navigate("/");
    }
  }, []);

  return (
    <div className='flex flex-wrap justify-center items-center h-screen bg-[#ffffff]'>
      <div className= 'h-full w-1/2'>
      <img
          src="https://img.freepik.com/premium-photo/purple-recycling-bin-with-leaves-coral-background-waste-management-3d-illustration_37732-1699.jpg"
          alt="Poster"
          className="object- w-full h-full"
        />
      </div>
      <div className='w-1/2 flex justify-center items-center h-full'>
        <div
          className="flex flex-col w-2/4 mx-auto  md:p-10 2xl:p-12 bg-[#ffffff] rounded-2xl shadow-xl"
        >
          <div className="flex flex-row gap-3 pb-4 ">
            <h1 className="text-3xl text-center font-bold text-black my-auto">
             Login
            </h1>
          </div>
          <form className="flex flex-col ">
            <div className="pb-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#111827]"
              >
                E-mail
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                  placeholder="yourmail@gmail.com"
                  value={userName}
                  onChange={(e) => SetUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-[#111827]"
              >
                Password
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-square-asterisk"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M12 8v8"></path>
                    <path d="m8.5 14 7-4"></path>
                    <path d="m8.5 10 7 4"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••••"
                  className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                loginUser(userName, password);
              }}
              type="submit"
              className="w-full text-black bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
