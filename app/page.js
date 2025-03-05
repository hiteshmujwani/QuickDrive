"use client";

import { Particles } from "@/components/magicui/particles";
import Header from "./_components/Header";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { AuroraText } from "@/components/magicui/aurora-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useRouter } from "next/navigation";
import { WordRotate } from "@/components/magicui/word-rotate";
import { TextAnimate } from "@/components/magicui/text-animate";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <section className="relative">
        <div className="fixed top-0 left-0 h-full w-full z-[-1]">
          <DotPattern quantity={200} />
        </div>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[calc(100vh-10vh)] lg:items-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-2xl flex items-center justify-center gap-4 leading-4 sm:leading-8 flex-wrap font-bold sm:font-extrabold sm:text-4xl md:text-5xl ">
              A
              <SparklesText text="beautiful" />
              platform to securely
              <WordRotate
                className="  text-black dark:text-white"
                words={["store", "share", "access"]}
              />
              your files anytime.
            </h1>

            <TextAnimate
              animation="blurIn"
              as="h1"
              className="mt-4 sm:text-xl/relaxed"
            >
              Upload, organize, and access your files instantly with our
              seamless cloud storage. Stay connected and in control, whether
              you're at home, work, or on the go.
            </TextAnimate>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <InteractiveHoverButton onClick={() => router.push("/upload")}>
                {" "}
                Get Started
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
