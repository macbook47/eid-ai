"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import Toggle from "../components/Toggle";
import SplashScreen from "../components/SplashScreen";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";

type LanguageType = "id" | "en";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Formal");
  const [generatedBios, setGeneratedBios] = useState<String>("");
  const [isLlama, setIsLlama] = useState(false);
  const [language, setLanguage] = useState<LanguageType>("id");
  const [showSplash, setShowSplash] = useState(true);

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getVibeStyle = (vibe: VibeType, lang: LanguageType) => {
    if (lang === "id") {
      switch (vibe) {
        case "Casual":
          return "santai dan akrab";
        case "Religious":
          return "religius dan penuh makna";
        case "Funny":
          return "lucu dan menghibur";
        default:
          return "formal dan sopan";
      }
    } else {
      switch (vibe) {
        case "Casual":
          return "casual and friendly";
        case "Religious":
          return "religious and meaningful";
        case "Funny":
          return "funny and entertaining";
        default:
          return "formal and polite";
      }
    }
  };

  const prompt = language === "id" 
    ? `Buatkan 3 ucapan selamat Idul Fitri dalam Bahasa Indonesia dengan gaya ${getVibeStyle(vibe, language)}. 
Berikan label "1.", "2.", dan "3.". Hanya berikan 3 ucapan tersebut, tidak perlu yang lain. 
Ucapan harus lebih panjang (maksimal 500 karakter), bermakna, dan sesuai untuk dibagikan. 
${vibe === "Funny" ? "Tambahkan unsur humor yang sopan dan sesuai dengan momen Lebaran. " : ""}
${vibe === "Religious" ? "Tambahkan kutipan ayat atau hadist yang sesuai. " : ""}
${vibe === "Casual" ? "Gunakan bahasa yang lebih santai dan kekinian namun tetap sopan. " : ""}
${vibe === "Formal" ? "Gunakan bahasa yang formal dan profesional. " : ""}
Gunakan konteks berikut sebagai inspirasi: ${bio}${bio.slice(-1) === "." ? "" : "."}`
    : `Create 3 Eid greetings in English with a ${getVibeStyle(vibe, language)} style.
Label them with "1.", "2.", and "3.". Only provide these 3 greetings, nothing else.
The greetings should be longer (maximum 500 characters), meaningful, and suitable for sharing.
${vibe === "Funny" ? "Add appropriate humor suitable for Eid celebration. " : ""}
${vibe === "Religious" ? "Add relevant Quranic verses or hadiths. " : ""}
${vibe === "Casual" ? "Use casual and contemporary language while maintaining politeness. " : ""}
${vibe === "Formal" ? "Use formal and professional language. " : ""}
Use the following context as inspiration: ${bio}${bio.slice(-1) === "." ? "" : "."}`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/together", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: isLlama
          ? "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"
          : "mistralai/Mixtral-8x7B-Instruct-v0.1",
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const runner = ChatCompletionStream.fromReadableStream(response.body!);
    runner.on("content", (delta) => setGeneratedBios((prev) => prev + delta));

    scrollToBios();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-white">
      {showSplash && <SplashScreen onClose={() => setShowSplash(false)} />}
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <div className="absolute top-5 right-5">
          <button
            onClick={() => setLanguage(lang => lang === "id" ? "en" : "id")}
            className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 transition border border-gray-200 card-hover"
          >
            {language === "id" ? "🇬🇧 English" : "🇮🇩 Bahasa"}
          </button>
        </div>
        <div className="floating">
          <p className="bg-emerald-50 rounded-2xl py-2 px-6 text-emerald-700 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out card-shadow">
            ✨ {language === "id" ? "Buat ucapan Lebaran yang berkesan" : "Create memorable Eid greetings"} ✨
          </p>
        </div>
        <h1 className="sm:text-4xl text-2xl max-w-[708px] font-bold text-slate-900 mb-8">
          {language === "id" ? "Buat Ucapan Idul Fitri dengan " : "Create Eid Greetings with "}
          <span className="text-emerald-600">AI</span>
        </h1>
        <div className="mt-7 mb-12">
          <Toggle isGPT={isLlama} setIsGPT={setIsLlama} />
        </div>

        <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover">
          <div className="flex mt-3 items-center space-x-3">
            <div className="bg-emerald-50 rounded-full p-2 floating">
              <Image
                src="/1-black.png"
                width={30}
                height={30}
                alt="1 icon"
                className="mb-0"
              />
            </div>
            <p className="text-left font-medium text-slate-700">
              {language === "id" ? (
                <>
                  Masukkan kata-kata kunci atau inspirasi{" "}
                  <span className="text-slate-500">(contoh: keluarga, teman, atau rekan kerja)</span>
                </>
              ) : (
                <>
                  Enter keywords or inspiration{" "}
                  <span className="text-slate-500">(e.g., family, friends, or colleagues)</span>
                </>
              )}
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-xl border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 my-5"
            placeholder={language === "id" ? "contoh: ucapan untuk keluarga besar" : "example: greetings for extended family"}
          />
          <div className="flex mb-5 items-center space-x-3">
            <div className="bg-emerald-50 rounded-full p-2 floating">
              <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
            </div>
            <p className="text-left font-medium text-slate-700">
              {language === "id" ? "Pilih gaya ucapan." : "Choose greeting style."}
            </p>
          </div>
          <div className="block mb-4">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} language={language} />
          </div>
          {loading ? (
            <button
              className="bg-emerald-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-8 mt-6 hover:bg-emerald-700 w-full transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          ) : (
            <button
              className="shine-effect bg-emerald-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-8 mt-6 hover:bg-emerald-700 w-full transition duration-300 ease-in-out transform hover:scale-[1.02]"
              onClick={(e) => generateBio(e)}
            >
              {language === "id" ? "Buat Ucapan Lebaran ✨" : "Generate Eid Greetings ✨"}
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto mb-8"
                  ref={bioRef}
                >
                  {language === "id" ? "Ucapan Lebaran Anda ✨" : "Your Eid Greetings ✨"}
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split(/2\.|3\./)
                  .map((generatedBio, index) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-lg p-6 hover:bg-gray-50 transition cursor-copy border border-gray-100 w-full card-hover"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast(language === "id" ? "Ucapan disalin ke clipboard" : "Greeting copied to clipboard", {
                            icon: "✨",
                          });
                        }}
                        key={index}
                      >
                        <p className="text-slate-700">{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
