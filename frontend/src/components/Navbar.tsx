"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <div className="navbar bg-base-200 px-6 shadow">
      <div className="flex-1">
        <button
          className="text-xl font-bold btn btn-ghost normal-case"
          onClick={() => router.push("/")}
        >
          MiniBlog
        </button>
      </div>

      <div className="flex gap-2 items-center">
        {isLoggedIn ? (
          <button className="btn btn-sm btn-error" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
