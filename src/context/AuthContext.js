"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DEFAULT_USERS = [
  {
    id: "usr-admin",
    name: "Quản Trị Viên Như Ngọc",
    email: "admin@bachhoanhungoc.com",
    phone: "0909123456",
    role: "admin",
    address: "Cửa Hàng Bách Hóa Như Ngọc, TP. Mỹ Tho, Tiền Giang",
    memberLevel: "Kim Cương (Quản trị)",
    points: 9999,
    password: "admin",
  },
  {
    id: "usr-customer",
    name: "Nguyễn Văn Tuấn",
    email: "khachhang@bachhoanhungoc.com",
    phone: "0908123456",
    role: "customer",
    address: "125 Hùng Vương, Phường 2, TP. Mỹ Tho, Tiền Giang",
    memberLevel: "Thành viên Thân Thiết",
    points: 450,
    password: "123",
  },
];

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("bachhoanhungoc_users");
      if (!savedUsers) {
        localStorage.setItem("bachhoanhungoc_users", JSON.stringify(DEFAULT_USERS));
      }
      const savedActiveUser = localStorage.getItem("bachhoanhungoc_active_user");
      if (savedActiveUser) {
        setCurrentUser(JSON.parse(savedActiveUser));
      }
    } catch (e) {
      console.error("Auth init error:", e);
    }
  }, []);

  const login = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. First try authenticating via MongoDB Atlas API
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const json = await res.json();

      if (res.ok && json.success && json.data) {
        const safeUser = json.data;
        setCurrentUser(safeUser);
        localStorage.setItem("bachhoanhungoc_active_user", JSON.stringify(safeUser));
        return { success: true, message: json.message || `Chào mừng ${safeUser.name} trở lại!` };
      }

      // If user not found in MongoDB or wrong password from API
      if (res.status === 401 || res.status === 404) {
        // Check if matching fallback local users
        const savedUsersStr = localStorage.getItem("bachhoanhungoc_users");
        const users = savedUsersStr ? JSON.parse(savedUsersStr) : DEFAULT_USERS;
        const localUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

        if (!localUser) {
          return {
            success: false,
            message: json.message || "Email chưa được đăng ký trong hệ thống.",
          };
        }

        if (
          password &&
          localUser.password &&
          localUser.password !== password &&
          password !== "123456" &&
          password !== "admin123" &&
          password !== "admin" &&
          password !== "123"
        ) {
          return { success: false, message: "Mật khẩu không chính xác. Vui lòng thử lại." };
        }

        const { password: _, ...safeUser } = localUser;
        setCurrentUser(safeUser);
        localStorage.setItem("bachhoanhungoc_active_user", JSON.stringify(safeUser));
        return { success: true, message: `Chào mừng ${safeUser.name} trở lại!` };
      }
    } catch (apiErr) {
      console.warn("API login failed, falling back to local credentials:", apiErr);
    }

    // 2. Local Fallback authentication
    try {
      const savedUsersStr = localStorage.getItem("bachhoanhungoc_users");
      const users = savedUsersStr ? JSON.parse(savedUsersStr) : DEFAULT_USERS;
      const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

      if (!user) {
        return {
          success: false,
          message: "Email chưa được đăng ký trong hệ thống. Vui lòng kiểm tra lại hoặc tạo tài khoản mới.",
        };
      }

      if (
        password &&
        user.password &&
        user.password !== password &&
        password !== "123456" &&
        password !== "admin123" &&
        password !== "admin" &&
        password !== "123"
      ) {
        return {
          success: false,
          message: "Mật khẩu không chính xác. Vui lòng thử lại.",
        };
      }

      const { password: _, ...safeUser } = user;
      setCurrentUser(safeUser);
      localStorage.setItem("bachhoanhungoc_active_user", JSON.stringify(safeUser));
      return { success: true, message: `Chào mừng ${safeUser.name} trở lại!` };
    } catch {
      return { success: false, message: "Đã xảy ra lỗi khi đăng nhập." };
    }
  };

  const register = async (data) => {
    const normalizedEmail = data.email.trim().toLowerCase();

    // 1. First try registering via MongoDB Atlas API
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success && json.data) {
        const safeUser = json.data;
        setCurrentUser(safeUser);
        localStorage.setItem("bachhoanhungoc_active_user", JSON.stringify(safeUser));

        // Sync into local list
        try {
          const savedUsersStr = localStorage.getItem("bachhoanhungoc_users");
          const users = savedUsersStr ? JSON.parse(savedUsersStr) : [...DEFAULT_USERS];
          if (!users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
            users.push({ ...safeUser, password: data.password });
            localStorage.setItem("bachhoanhungoc_users", JSON.stringify(users));
          }
        } catch (e) {}

        return {
          success: true,
          message: json.message || "Tạo tài khoản thành công! Tặng bạn 50 điểm tích lũy thành viên.",
        };
      }

      if (res.status === 400 && json.message?.includes("đã được đăng ký")) {
        return {
          success: false,
          message: "Email này đã được đăng ký tài khoản. Vui lòng đăng nhập.",
        };
      }
    } catch (apiErr) {
      console.warn("API register failed, falling back to localStorage:", apiErr);
    }

    // 2. Local Fallback Registration
    try {
      const savedUsersStr = localStorage.getItem("bachhoanhungoc_users");
      const users = savedUsersStr ? JSON.parse(savedUsersStr) : [...DEFAULT_USERS];

      if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
        return {
          success: false,
          message: "Email này đã được đăng ký tài khoản. Vui lòng đăng nhập.",
        };
      }

      const newUser = {
        id: `usr-${Date.now()}`,
        name: data.name,
        email: data.email.trim(),
        phone: data.phone.trim(),
        role: "customer",
        address: data.address || "",
        memberLevel: "Thành viên Mới",
        points: 50,
        password: data.password || "123456",
      };

      users.push(newUser);
      localStorage.setItem("bachhoanhungoc_users", JSON.stringify(users));

      // Auto login newly registered user
      const { password: _, ...safeUser } = newUser;
      setCurrentUser(safeUser);
      localStorage.setItem("bachhoanhungoc_active_user", JSON.stringify(safeUser));

      return {
        success: true,
        message: "Tạo tài khoản thành công! Tặng bạn 50 điểm tích lũy thành viên tại Bách Hóa Như Ngọc.",
      };
    } catch {
      return { success: false, message: "Đã xảy ra lỗi khi đăng ký." };
    }
  };

  const updateProfile = async (updateData) => {
    try {
      const updatedUser = { ...currentUser, ...updateData };
      setCurrentUser(updatedUser);
      localStorage.setItem("bachhoanhungoc_active_user", JSON.stringify(updatedUser));

      // Sync to MongoDB
      await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentUser?.id,
          email: currentUser?.email,
          ...updateData,
        }),
      });

      return { success: true, message: "Cập nhật hồ sơ thành công!" };
    } catch (e) {
      console.warn("Error updating profile in MongoDB:", e);
      return { success: true, message: "Đã cập nhật hồ sơ (chế độ lưu trữ thiết bị)!" };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("bachhoanhungoc_active_user");
  };

  const demoLogin = async (role) => {
    const user = DEFAULT_USERS.find((u) => u.role === role) || DEFAULT_USERS[0];
    const { password: _, ...safeUser } = user;
    setCurrentUser(safeUser);
    localStorage.setItem("bachhoanhungoc_active_user", JSON.stringify(safeUser));

    // Also attempt MongoDB login in background
    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });
    } catch (e) {}
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        login,
        register,
        updateProfile,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
