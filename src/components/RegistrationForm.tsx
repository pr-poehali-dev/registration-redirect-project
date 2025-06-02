import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PhoneInput from "./PhoneInput";

interface RegistrationFormProps {
  onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  const validatePhone = (phoneNumber: string): boolean => {
    // Проверяем что номер имеет полный формат +7 (xxx) xxx-xx-xx
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validatePhone(phone)) {
      setError("Пожалуйста, введите корректный номер телефона");
      return;
    }

    setIsLoading(true);

    try {
      // Сохраняем номер в localStorage (имитация базы данных)
      const userData = {
        phone,
        registeredAt: new Date().toISOString(),
      };

      localStorage.setItem("userRegistration", JSON.stringify(userData));

      // Имитируем задержку сети
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSuccess();
    } catch (err) {
      setError("Произошла ошибка при регистрации. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminAccess = () => {
    if (adminPassword === "462963563") {
      generatePhoneNumbersFile();
      setShowAdminPrompt(false);
      setAdminPassword("");
      setAdminError("");
    } else {
      setAdminError("Неверный пароль");
    }
  };

  const generatePhoneNumbersFile = () => {
    const userData = localStorage.getItem("userRegistration");
    const phoneNumbers = [];

    if (userData) {
      const parsed = JSON.parse(userData);
      phoneNumbers.push(parsed.phone);
    }

    const fileContent = phoneNumbers.join("\n");
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "registered_phones.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
            Добро пожаловать! 🚀
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Введите номер телефона для регистрации
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <PhoneInput
                value={phone}
                onChange={setPhone}
                className="transition-all duration-200 focus:scale-105"
              />
              {error && (
                <p className="text-red-500 text-sm text-center animate-fade-in">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!phone || isLoading}
              className="w-full h-12 text-lg font-semibold bg-purple-600 hover:bg-purple-700 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Регистрируем...</span>
                </div>
              ) : (
                "Зарегистрироваться"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            <p>
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Admin Panel Button */}
      <div className="mt-6 text-center">
        <Button
          onClick={() => setShowAdminPrompt(true)}
          variant="outline"
          className="text-xs text-gray-400 hover:text-gray-600 border-gray-200"
        >
          Admin Panel
        </Button>
      </div>

      {/* Admin Password Prompt */}
      {showAdminPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-sm mx-4">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Доступ к админ-панели</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyDown={(e) => e.key === "Enter" && handleAdminAccess()}
                />
                {adminError && (
                  <p className="text-red-500 text-sm mt-1">{adminError}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleAdminAccess}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Войти
                </Button>
                <Button
                  onClick={() => {
                    setShowAdminPrompt(false);
                    setAdminPassword("");
                    setAdminError("");
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
