"use client";
import { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FormInput from "./form-input";
import { IoArrowDownCircle } from "react-icons/io5";

export default function ContentGeneration() {
  const scrollToBottom = useRef<HTMLDivElement | null>(null);
  const [summarized, setSummarized] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [textLoading, setTextLoading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [isBottomVisible, setIsBottomVisible] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (scrollToBottom.current) {
      observer.observe(scrollToBottom.current);
    }

    return () => {
      if (scrollToBottom.current) {
        observer.unobserve(scrollToBottom.current);
      }
    };
  }, [scrollToBottom]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTextLoading(true);
    setImageLoading(true);
    setSummarized("");
    setImage("");

    const form = e.target as HTMLFormElement;
    const queryInput = form.elements.namedItem("hnUrl") as HTMLInputElement;

    if (!queryInput) {
      console.error("No query input found");
      setTextLoading(false);
      setImageLoading(false);
      return;
    }
    const url = `/api/stream?hnUrl=${queryInput.value}`;
    const imageUrl = `/api/image?hnUrl=${queryInput.value}`;

    const [imageResponse, textResponse] = await Promise.all([
      fetch(imageUrl),
      fetch(url),
    ]);

    try {
      if (imageResponse.ok) {
        const imageBlob = await imageResponse.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);
      } else {
        console.error("Failed to fetch image from API");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setImageLoading(false);
    }

    try {
      const reader = textResponse.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let text = "";

      if (!reader) {
        throw new Error("Summary cannot be generated. Please try again.");
      }

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        text += decoder.decode(value);
        setSummarized(text);

        if (text.split(" ").length >= 2) {
          setTextLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching summarized text:", error);
      setTextLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <FormInput handleSubmitFn={handleSubmit} />

      {!isBottomVisible && (
        <button
          onClick={() =>
            scrollToBottom.current?.scrollIntoView({ behavior: "smooth" })
          }
          className="fixed bottom-8 right-8 z-50 bg-white rounded-full p-2"
        >
          <IoArrowDownCircle className="text-4xl sm:text-5xl md:text-6xl text-orange-500" />
        </button>
      )}

      <div className="w-full border rounded-lg bg-slate-100 px-4 sm:px-8 md:px-12 lg:px-24 my-6">
        {imageLoading ? (
          <div className="my-10 flex items-center justify-center rounded-xl">
            <Skeleton height={256} width={256} />
          </div>
        ) : (
          image && (
            <div className="my-10 flex items-center justify-center">
              <img
                src={image}
                width={256}
                height={256}
                alt="Generated visual representation"
                className="rounded-xl"
              />
            </div>
          )
        )}

        {textLoading ? (
          <div className="my-10 p-6 rounded-xl">
            <Skeleton count={10} />
          </div>
        ) : (
          summarized && (
            <div className="my-10 p-4 sm:p-6 md:p-8 border bg-white rounded-xl prose prose-h1:tracking-tight prose-li:marker:text-black min-w-full prose-orange">
              <div dangerouslySetInnerHTML={{ __html: marked(summarized) }} />
            </div>
          )
        )}

        <div ref={scrollToBottom} />
      </div>
    </div>
  );
}
