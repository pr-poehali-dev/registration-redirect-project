import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  className,
  placeholder = "+7 (___) ___-__-__",
}) => {
  const formatPhone = (input: string) => {
    // Удаляем все нецифровые символы
    const digits = input.replace(/\D/g, "");

    // Начинаем с +7
    let formatted = "+7";

    if (digits.length > 1) {
      // Добавляем код города в скобки
      formatted += ` (${digits.slice(1, 4)}`;

      if (digits.length > 4) {
        formatted += `) ${digits.slice(4, 7)}`;

        if (digits.length > 7) {
          formatted += `-${digits.slice(7, 9)}`;

          if (digits.length > 9) {
            formatted += `-${digits.slice(9, 11)}`;
          }
        }
      }
    }

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Если пользователь удаляет и остается только +7, очищаем поле
    if (input === "+7") {
      onChange("");
      return;
    }

    // Форматируем номер
    const formatted = formatPhone(input);
    onChange(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Разрешаем удаление
    if (e.key === "Backspace" || e.key === "Delete") {
      return;
    }

    // Разрешаем только цифры
    if (!/^\d$/.test(e.key) && !["Tab", "Enter", "Escape"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Input
      type="tel"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={cn(
        "text-lg h-12 text-center tracking-wider font-mono",
        className,
      )}
      maxLength={18}
    />
  );
};

export default PhoneInput;
