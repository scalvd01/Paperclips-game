import { i18n } from "@/i18n";

export const currencyCodes: Record<string, string> = {
    en: "USD", // US Dollar
    es: "EUR", // Euro
    ja: "JPY", // Japanese Yen
    ko: "KRW", // South Korean Won
    pt: "BRL", // Brazilian Real
    fr: "EUR", // Euro
    it: "EUR", // Euro
    ru: "RUB", // Russian Ruble
    uk: "EUR", // Euro
    ca: "CAD", // Canadian Dollar
    de: "CHF", // Swiss Franc
    zh: "CNY", // Chinese Yuan
    hi: "INR", // Indian Rupee
};

export const formattedValue = ( value: number, isCurrency?: boolean, maximumFractionDigits?: number,minimumFractionDigits?: number ) => {
    return new Intl.NumberFormat(i18n.global.locale.value, {
        style: isCurrency ? "currency" : "decimal",
        currency: currencyCodes[i18n.global.locale.value],
        maximumFractionDigits: maximumFractionDigits,
        minimumFractionDigits: minimumFractionDigits,
    }).format(value);
};