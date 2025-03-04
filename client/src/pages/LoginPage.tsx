import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import Loading from "../components/Loading";
import CustomNavbar from "../components/CustomNavbar";
import BackPage from "../components/BackPage";

const LoginPage = ({
    Data,
}: {
    Data: {
        token: string;
        setTokenFunction: (token: string) => void;
        id: string;
        setIdFunction: (id: string) => void;
    };
}) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setisLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setisLoading(true);

        try {
            axios
                .post(`${API_URL}/api/accounts/login`, {
                    username_or_email: usernameOrEmail,
                    password: password,
                })
                .then(({ data }) => {
                    if (data.success === false) {
                        setMessage(data.message);
                        return;
                    }
                    Data.setTokenFunction(data.token);
                    Data.setIdFunction(data.id);
                    if (data.role === "participant") {
                        navigate("/problemset"); // Navigate to problemset for participants
                    } else if (data.role === "admin") {
                        navigate("/admin"); // Navigate to admin page for admins
                    }
                })
                .catch((e: AxiosError) => {
                    setisLoading(false);
                    setMessage(
                        (e.response?.data as { success: boolean; message: string }).message
                    );
                });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const CustomNavData: Navbar = {
        items: [
            { text: "Student Login", link_path: "/studentlogin" },
            { text: "Institution Login", link_path: "/institutelogin" },
        ],
    };

    return (
        <>
            <Link to={"/"}>
                <div>
                    <BackPage />
                </div>

                <div
                    id="logo-cont"
                    className="inline-block relative text-[24px] left-1/2 -translate-x-1/2 font-bold italic mx-auto mt-[12px]"
                >
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 px-[1px]">
                        PolyCode
                    </span>
                    <span>Arena</span>
                </div>
            </Link>
            <div className="min-h-fit w-[300px] mx-auto text-[14px]">
                <div className="relative bg-black shadow-md rounded px-5 pt-6 pb-8 mb-4">
                    <h2 className="text-[34px] font-bold mb-[30px] text-center mt-[60px]">
                        Log In
                    </h2>

                    <div className="text-10px font-semibold whitespace-nowrap mb-4">
                        <CustomNavbar data={CustomNavData} />
                    </div>

                    <div className="mb-4">
                        <input
                            className="appearance-none border w-full py-2 px-3 placeholder:text-text_2 focus:placeholder:text-orange-500 bg-black rounded border-borders leading-tight focus:outline-none focus:border-orange-500"
                            type="text"
                            placeholder="Username or Email"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="appearance-none border w-full py-2 px-3 placeholder:text-text_2 focus:placeholder:text-orange-500 bg-black rounded border-borders leading-tight focus:outline-none focus:border-orange-500"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-orange-500 hover:bg-red-600 text-black font-bold py-[6px] px-4 rounded focus:outline-none focus:shadow-outline w-full transition"
                            type="button"
                            onClick={handleLogin}
                        >
                            {isLoading ? (
                                <div className="w-full block h-[21px]">
                                    <div className="absolute left-1/2 -translate-x-1/2">
                                        <Loading />
                                    </div>
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-[20px]">
                        <span className="text-text_2">
                            Don't have an account?{" "}
                        </span>
                        <Link
                            to="/signup"
                            className="text-orange-500 hover:text-red-600"
                        >
                            Signup
                        </Link>
                    </div>
                    <div className="text-center mt-[20px] text-red-600 w-full overflow-hidden">
                        {message}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
