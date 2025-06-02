import React, { useEffect, useState } from "react";
import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем, зарегистрирован ли пользователь
    const userData = localStorage.getItem("userRegistration");
    if (userData) {
      // Если есть данные регистрации, перенаправляем на YouTube
      window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    // Небольшая задержка для показа успеха, затем перенаправление
    setTimeout(() => {
      window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Успешно!</h1>
          <p className="text-green-600 text-lg">Перенаправляем на видео...</p>
        </div>
      </div>
    );
  }

  return <RegistrationForm onSuccess={handleRegistrationSuccess} />;
};

export default Index;
