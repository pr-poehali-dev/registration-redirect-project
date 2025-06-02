import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserRegistration {
  phone: string;
  registeredAt: string;
}

const Admin = () => {
  const [registrations, setRegistrations] = useState<UserRegistration[]>([]);

  useEffect(() => {
    // Получаем данные из localStorage
    const userData = localStorage.getItem("userRegistration");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setRegistrations([parsedData]);
      } catch (error) {
        console.error("Ошибка при парсинге данных:", error);
      }
    }
  }, []);

  const clearData = () => {
    localStorage.removeItem("userRegistration");
    setRegistrations([]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ru-RU");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-between">
              📊 Админ-панель
              <Button onClick={clearData} variant="outline" className="text-sm">
                Очистить данные
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-lg font-semibold text-gray-700">
              Зарегистрированные номера: {registrations.length}
            </div>

            {registrations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📱</div>
                <p>Нет зарегистрированных номеров</p>
              </div>
            ) : (
              <div className="space-y-3">
                {registrations.map((registration, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-lg">
                          {registration.phone}
                        </div>
                        <div className="text-sm text-gray-500">
                          Зарегистрирован:{" "}
                          {formatDate(registration.registeredAt)}
                        </div>
                      </div>
                      <div className="text-green-600 font-semibold">
                        ✅ Активен
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
