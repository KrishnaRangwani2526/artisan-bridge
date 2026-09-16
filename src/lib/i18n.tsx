import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type LangCode = "en" | "hi" | "bn" | "mr" | "ta";

export const languages: { code: LangCode; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
];

type Dict = Partial<Record<Exclude<LangCode, "en">, string>>;

// Keyed by the English string itself, so any untranslated text simply shows in English.
const dictionary: Record<string, Dict> = {
  "E-Setu": { hi: "ई-सेतु", bn: "ই-সেতু", mr: "ई-सेतू", ta: "இ-சேது" },
  "Bridge for artisans": {
    hi: "कारीगरों के लिए सेतु",
    bn: "কারিগরদের সেতু",
    mr: "कारागिरांसाठी सेतू",
    ta: "கைவினைஞர்களுக்கான பாலம்",
  },
  Explore: { hi: "देखें", bn: "ঘুরে দেখুন", mr: "पहा", ta: "உலாவு" },
  Discover: { hi: "खोजें", bn: "আবিষ্কার", mr: "शोधा", ta: "கண்டறி" },
  Artisans: { hi: "कारीगर", bn: "কারিগর", mr: "कारागीर", ta: "கைவினைஞர்கள்" },
  "Post a need": { hi: "ज़रूरत बताएं", bn: "চাহিদা দিন", mr: "गरज सांगा", ta: "தேவை பதிவு" },
  "Post a requirement": {
    hi: "आवश्यकता दर्ज करें",
    bn: "প্রয়োজন পোস্ট করুন",
    mr: "आवश्यकता नोंदवा",
    ta: "தேவையை பதிவிடு",
  },
  Responses: { hi: "जवाब", bn: "উত্তর", mr: "प्रतिसाद", ta: "பதில்கள்" },
  "For artisans": { hi: "कारीगरों के लिए", bn: "কারিগরদের জন্য", mr: "कारागिरांसाठी", ta: "கைவினைஞர்களுக்கு" },
  "Search handicrafts, crafts, cities": {
    hi: "हस्तशिल्प, कला, शहर खोजें",
    bn: "হস্তশিল্প, কারুকাজ, শহর খুঁজুন",
    mr: "हस्तकला, कारागिरी, शहर शोधा",
    ta: "கைவினை, நகரம் தேடு",
  },
  Search: { hi: "खोजें", bn: "খুঁজুন", mr: "शोधा", ta: "தேடு" },
  Customer: { hi: "ग्राहक", bn: "ক্রেতা", mr: "ग्राहक", ta: "வாடிக்கையாளர்" },
  "Bulk buyer": { hi: "थोक खरीदार", bn: "পাইকারি ক্রেতা", mr: "घाऊक खरेदीदार", ta: "மொத்த வாங்குபவர்" },
  "All crafts": { hi: "सभी कला", bn: "সব কারুকাজ", mr: "सर्व कला", ta: "அனைத்து கைவினை" },
  Pottery: { hi: "मिट्टी के बर्तन", bn: "মৃৎশিল্প", mr: "मातीकाम", ta: "மண்பாண்டம்" },
  Woodwork: { hi: "लकड़ी का काम", bn: "কাঠের কাজ", mr: "लाकूडकाम", ta: "மரவேலை" },
  Textiles: { hi: "वस्त्र", bn: "বস্ত্র", mr: "वस्त्र", ta: "ஜவுளி" },
  Metalwork: { hi: "धातु शिल्प", bn: "ধাতুশিল্প", mr: "धातुकाम", ta: "உலோக வேலை" },
  Painting: { hi: "चित्रकला", bn: "চিত্রকলা", mr: "चित्रकला", ta: "ஓவியம்" },
  "Bamboo & cane": { hi: "बांस व बेंत", bn: "বাঁশ ও বেত", mr: "बांबू व बेत", ta: "மூங்கில்" },
  Leather: { hi: "चमड़ा", bn: "চামড়া", mr: "चामडे", ta: "தோல்" },
  Stonework: { hi: "पत्थर शिल्प", bn: "পাথরের কাজ", mr: "दगडकाम", ta: "கல் வேலை" },
  "Place order": { hi: "ऑर्डर करें", bn: "অর্ডার করুন", mr: "ऑर्डर करा", ta: "ஆர்டர் செய்" },
  "Order placed": { hi: "ऑर्डर हो गया", bn: "অর্ডার হয়েছে", mr: "ऑर्डर झाली", ta: "ஆர்டர் செய்யப்பட்டது" },
  "Ask for bulk quote": {
    hi: "थोक मूल्य पूछें",
    bn: "পাইকারি দর চান",
    mr: "घाऊक दर विचारा",
    ta: "மொத்த விலை கேள்",
  },
  "Price per piece": { hi: "प्रति नग मूल्य", bn: "প্রতি পিস দাম", mr: "प्रति नग किंमत", ta: "ஒரு துண்டு விலை" },
  "Bulk price": { hi: "थोक मूल्य", bn: "পাইকারি দাম", mr: "घाऊक किंमत", ta: "மொத்த விலை" },
  "Minimum order": { hi: "न्यूनतम ऑर्डर", bn: "ন্যূনতম অর্ডার", mr: "किमान ऑर्डर", ta: "குறைந்தபட்ச ஆர்டர்" },
  Quantity: { hi: "मात्रा", bn: "পরিমাণ", mr: "प्रमाण", ta: "அளவு" },
  "About this piece": { hi: "इस वस्तु के बारे में", bn: "এই পণ্য সম্পর্কে", mr: "या वस्तूबद्दल", ta: "இந்த பொருள் பற்றி" },
  Materials: { hi: "सामग्री", bn: "উপকরণ", mr: "साहित्य", ta: "பொருட்கள்" },
  Size: { hi: "आकार", bn: "মাপ", mr: "आकार", ta: "அளவு" },
  "Made in": { hi: "बनने में समय", bn: "তৈরি হতে সময়", mr: "तयार होण्यास", ta: "தயாரிக்க" },
  days: { hi: "दिन", bn: "দিন", mr: "दिवस", ta: "நாட்கள்" },
  "The maker": { hi: "कारीगर", bn: "কারিগর", mr: "कारागीर", ta: "செய்தவர்" },
  "Verified by E-Setu": {
    hi: "ई-सेतु द्वारा सत्यापित",
    bn: "ই-সেতু যাচাই করেছে",
    mr: "ई-सेतू पडताळणी",
    ta: "இ-சேது சரிபார்த்தது",
  },
  "View full catalogue": {
    hi: "पूरा संग्रह देखें",
    bn: "সম্পূর্ণ ক্যাটালগ",
    mr: "संपूर्ण संग्रह",
    ta: "முழு பட்டியல்",
  },
  "More from this artisan": {
    hi: "इसी कारीगर से और",
    bn: "এই কারিগরের আরও",
    mr: "याच कारागिराकडून अधिक",
    ta: "இதே கைவினைஞரிடமிருந்து",
  },
  "No results found": { hi: "कुछ नहीं मिला", bn: "কিছু পাওয়া যায়নি", mr: "काही सापडले नाही", ta: "முடிவு இல்லை" },
  "Choose your language": {
    hi: "अपनी भाषा चुनें",
    bn: "আপনার ভাষা বাছুন",
    mr: "तुमची भाषा निवडा",
    ta: "உங்கள் மொழியை தேர்வு செய்க",
  },
  "Every page will show English along with your language.": {
    hi: "हर पेज पर अंग्रेज़ी के साथ आपकी भाषा दिखेगी।",
    bn: "প্রতিটি পাতায় ইংরেজির সঙ্গে আপনার ভাষা দেখানো হবে।",
    mr: "प्रत्येक पानावर इंग्रजीसह तुमची भाषा दिसेल.",
    ta: "ஒவ்வொரு பக்கத்திலும் ஆங்கிலத்துடன் உங்கள் மொழி காட்டப்படும்.",
  },
  Continue: { hi: "आगे बढ़ें", bn: "এগিয়ে যান", mr: "पुढे जा", ta: "தொடர்" },
  Accept: { hi: "स्वीकारें", bn: "গ্রহণ করুন", mr: "स्वीकारा", ta: "ஏற்க" },
  Decline: { hi: "मना करें", bn: "প্রত্যাখ্যান", mr: "नाकारा", ta: "நிராகரி" },
  Accepted: { hi: "स्वीकार किया", bn: "গৃহীত", mr: "स्वीकारले", ta: "ஏற்கப்பட்டது" },
  Declined: { hi: "अस्वीकार", bn: "প্রত্যাখ্যাত", mr: "नाकारले", ta: "நிராகரிக்கப்பட்டது" },
  "Open requirements": { hi: "खुली आवश्यकताएं", bn: "খোলা চাহিদা", mr: "खुल्या आवश्यकता", ta: "திறந்த தேவைகள்" },
  "Delivery city": { hi: "डिलीवरी शहर", bn: "ডেলিভারি শহর", mr: "वितरण शहर", ta: "வழங்கும் நகரம்" },
  "Your name": { hi: "आपका नाम", bn: "আপনার নাম", mr: "तुमचे नाव", ta: "உங்கள் பெயர்" },
  "Mobile number": { hi: "मोबाइल नंबर", bn: "মোবাইল নম্বর", mr: "मोबाइल क्रमांक", ta: "கைபேசி எண்" },
  "Cash on delivery or UPI. No advance to the artisan.": {
    hi: "डिलीवरी पर नकद या यूपीआई। कारीगर को अग्रिम नहीं।",
    bn: "ডেলিভারিতে নগদ বা ইউপিআই। কারিগরকে অগ্রিম নয়।",
    mr: "डिलिव्हरीवर रोख किंवा यूपीआय. कारागिराला आगाऊ नाही.",
    ta: "டெலிவரியில் பணம் அல்லது UPI. முன்பணம் இல்லை.",
  },
  Sort: { hi: "क्रम", bn: "সাজান", mr: "क्रम", ta: "வரிசை" },
  Popular: { hi: "लोकप्रिय", bn: "জনপ্রিয়", mr: "लोकप्रिय", ta: "பிரபலம்" },
  "Price: low to high": {
    hi: "मूल्य: कम से अधिक",
    bn: "দাম: কম থেকে বেশি",
    mr: "किंमत: कमी ते जास्त",
    ta: "விலை: குறைவு முதல்",
  },
  "Price: high to low": {
    hi: "मूल्य: अधिक से कम",
    bn: "দাম: বেশি থেকে কম",
    mr: "किंमत: जास्त ते कमी",
    ta: "விலை: அதிகம் முதல்",
  },
  Fastest: { hi: "सबसे तेज़", bn: "দ্রুততম", mr: "सर्वात जलद", ta: "விரைவானது" },
};

type Ctx = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (en: string) => string;
  chosen: boolean;
};

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
  chosen: true,
});

const STORAGE_KEY = "esetu-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");
  const [chosen, setChosen] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (saved) setLangState(saved);
    else setChosen(false);
    setHydrated(true);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      chosen: hydrated ? chosen : true,
      setLang: (l) => {
        setLangState(l);
        setChosen(true);
        window.localStorage.setItem(STORAGE_KEY, l);
      },
      t: (en: string) => {
        if (lang === "en") return en;
        const other = dictionary[en]?.[lang as Exclude<LangCode, "en">];
        return other ? `${en} · ${other}` : en;
      },
    }),
    [lang, chosen, hydrated],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
