"use client";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import avatar from './assets/img/avatar.jpg';
import avatarDefault from './assets/img/default.jpg';
import { StreamMarkdown } from './components/StreamMarkdown';
import { allModes } from './settings';
import { defaultMode, IMessage, Modes } from "@/app/types/interfaces";
import { Hunter } from './components/hunter/main';
import "tailwindcss/tailwind.css";


export default function ClientSection() {
  const [hunterMode, setHunterMode] = useState(false);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [mode, setMode] = useState<Modes[]>([defaultMode]);
  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  let shiftButtonPress = '';

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isEnabled = mode.some(obj => obj.type === e.target.value);
      const foundMode = allModes.find((obj) => obj.type === e.target.value);

      if (e.target.checked && !isEnabled) {
        if (foundMode && !mode.includes(foundMode)) {
          setMode([...mode, foundMode]);
        }
      } else if (!e.target.checked && isEnabled) {
          setMode(prev => prev.filter(obj => obj.type !== e.target.value));
      }
  }


  const generateResponse = async (e?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    shiftButtonPress = e ? e.key : '';

    if(input === '/hunter') {
      setHunterMode(true);
      return;
    }

    if ((e && e.key === 'Enter' && shiftButtonPress !== 'Shift' && input.length > 3) || (!e && input.length > 3)) {
      e ? e.preventDefault() : null;
      setInput("");
      setChatHistory((prev) => [...prev, { type: "user", text: input }]);


      // Chat Context (History)
      const messages = chatHistory.map((message) => ({
        role: message.type,
        content: message.text,
      }));
      messages.push({ role: "user", content: input });


      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          model,
          messages,
          mode,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullBotResponse = "";
      const botMessageId = Date.now();

      setChatHistory((prev) => [
        ...prev,
        { type: "assistant", text: "", id: botMessageId },
      ]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        fullBotResponse += chunkValue;

        setChatHistory((prev) =>
          prev.map((message) =>
            message.id === botMessageId
              ? { ...message, text: fullBotResponse }
              : message
          )
        );

      }

    }
  };

  useEffect(() => {
    // ESLint req - contentRef.current instanceof HTMLDivElement
    if (contentRef.current instanceof HTMLDivElement) {
      contentRef.current.scrollTo(0, contentRef.current.scrollHeight);
    }
  });

  return (
      <>
      { hunterMode ? (<Hunter />) : (
          <>
            <div id="chatWindow" className="chatWindow" ref={contentRef}>
              {chatHistory.map((message, index) => (
                  <div
                      key={index}
                      className={`${
                          message.type === "user" ? "user-request" : "bot-answer"
                      } shadow-md transition`}
                  >
                    <Image
                        className={`${message.type === "user" ? "userAvatar" : "botAvatar"}`}
                        src={message.type === "user" ? avatar : avatarDefault }
                        alt={`${message.type === "user" ? "user avatar" : "bot avatar"}`}
                    />
                    <div className="text-answer-wrapper w-full max-w-5xl">
                      <StreamMarkdown content={message.text} />
                    </div>
                  </div>
              ))}
            </div>

            <div className="text-area-wrapper w-full">
        <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="userText-area focus:ring-neutral-900
           p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-900"
            placeholder={"Send a message..."}
            onKeyDown={(e) => generateResponse(e)}
        />
              <button className='sendRequestButton' onClick={() => generateResponse()}>Send</button>
            </div>

            <div className="chat-version flex flex-wrap">
              <div className="flex items-center mr-2">
                <label htmlFor="gpt-3" className="pr-2 text-sm">GPT-3</label>
                <input
                    id="gpt-3"
                    type="radio"
                    value="gpt-3.5-turbo"
                    name="gpt-version"
                    className="w-4 h-4"
                    checked={model === "gpt-3.5-turbo"}
                    onChange={(e) => setModel(e.target.value)}
                />
              </div>

              <div className="flex items-center ml-2">
                <input
                    id="gpt-4"
                    type="radio"
                    value="gpt-4"
                    name="gpt-version"
                    className="w-4 h-4"
                    checked={model === "gpt-4"}
                    onChange={(e) => setModel(e.target.value)}
                />
                <label htmlFor="gpt-4" className="pl-2 text-sm">GPT-4</label>
              </div>

              <div className="flex items-center ml-5">
                <input
                    id="mode-bender"
                    type="checkbox"
                    value="drunk"
                    name="mode-bender"
                    className="w-4 h-4"
                    defaultChecked={false}
                    onChange={(e) => modeChangeHandler(e)}
                />
                <label htmlFor="mode-bender" className="pl-2 text-sm">{`Drunk`}</label>
              </div>

              <div className="flex items-center ml-5">
                <input
                    id="mode-bender"
                    type="checkbox"
                    value="buddha"
                    name="mode-bender"
                    className="w-4 h-4"
                    defaultChecked={false}
                    onChange={(e) => modeChangeHandler(e)}
                />
                <label htmlFor="mode-bender" className="pl-2 text-sm">{`Buddha`}</label>
              </div>

            </div>
          </>
        ) }
    </>
  );
}