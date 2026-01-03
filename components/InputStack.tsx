"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegPaste } from "react-icons/fa6";
import { LuScanText } from "react-icons/lu";
import { HiOutlineUpload } from "react-icons/hi";
import TextInput from "./upload/TextInput";
import ImageScanner from "./upload/ImageScanner";
import FileUpload from "./upload/FileUpload";

interface Card {
  id: number;
  title: React.ReactNode;
  content: string | React.ReactNode;
  color: string;
}

interface CardStackProps {
  cards?: Card[];
}

const InputStack: React.FC<CardStackProps> = ({ cards: propCards }) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(3);
  const [textValue, setTextValue] = useState<string>("");
  const [scannedText, setScannedText] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const defaultCards: Card[] = [
    {
      id: 1,
      title: (
        <div className="grid grid-cols-[1rem_auto] items-center justify-center gap-2">
          <HiOutlineUpload size={"1rem"} />
          <p className="bg-gradient-to-b from-black to-[rgb(168,168,168)] bg-clip-text text-transparent">
            Upload
          </p>
        </div>
      ),
      content: <FileUpload onFilesChange={(files) => setUploadedFiles(files)} />,
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: (
        <div className="grid grid-cols-[1rem_auto] items-center justify-center gap-2">
          <LuScanText size={"1rem"} />
          <p className="bg-gradient-to-b from-black to-[rgb(168,168,168)] bg-clip-text text-transparent">
            Scan
          </p>
        </div>
      ),
      content: <ImageScanner value={scannedText} onChange={(value) => setScannedText(value)} />,
      color: "bg-green-100",
    },
    {
      id: 3,
      title: (
        <div className="grid grid-cols-[1rem_auto] items-center justify-center gap-2">
          <FaRegPaste size={"1rem"} />
          <p className="bg-gradient-to-b from-black to-[rgb(168,168,168)] bg-clip-text text-transparent">
            Paste
          </p>
        </div>
      ),
      content: <TextInput />,
      color: "bg-purple-100",
    },
  ];

  const cards = propCards || defaultCards;
  const [cardOrder, setCardOrder] = useState<number[]>(cards.map((card) => card.id));

  const handleCardClick = (cardId: number) => {
    if (selectedCardId === cardId) {
      //   setSelectedCardId(null);
      // Reset to original order
      //   setCardOrder(cards.map((card) => card.id));
    } else {
      setSelectedCardId(cardId);
      // Move selected card to front
      const newOrder = cardOrder.filter((id) => id !== cardId);
      newOrder.push(cardId);
      setCardOrder(newOrder);
    }
  };

  // Sort cards by their order in cardOrder array
  const sortedCards = [...cards].sort((a, b) => cardOrder.indexOf(a.id) - cardOrder.indexOf(b.id));

  return (
    <div className="relative md:mx-auto mt-32 hd-96 bosrder  md:w-[40rem] border-red-500">
      <AnimatePresence mode="wait">
        {sortedCards.map((card) => {
          const isSelected = selectedCardId === card.id;
          const zIndex = cardOrder.indexOf(card.id);
          // Calculate offset from bottom: higher z-index = at bottom (y: 0), lower z-index = offset upward (negative y)
          // Card at front (highest z-index) should be at bottom, cards behind should be offset up
          const verticalOffset = -(cardOrder.length - 20 - zIndex) - 30;
          const scale = isSelected ? 1.05 : 1 - (cardOrder.length - 1 - zIndex) * 0.01;

          return (
            <motion.div
              key={card.id}
              className={`${
                isSelected ? "brightnessa-100 h-[40rem] p-4" : "h-[5rem] brightness-[98%] p-4 py-2"
              } absolwute grid grid-rows-[2rem_auto] bottdom-0 w-full cursor-pointer rounded-2xl  shadosw-2xl border border-zinc-200 bg-white shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] `}
              initial={{ scale: 0.9, opacity: 0, marginTop: 0 }}
              animate={{
                x: 0,
                y: isSelected ? verticalOffset : verticalOffset,
                scale: scale,
                zIndex: zIndex + 10,
                rotate: 0,
                opacity: 1,
                marginTop: isSelected ? -25 : -45,
              }}
              exit={{ scale: 0.9, opacity: 0, marginTop: 0 }}
              transition={{
                type: "tween",
              }}
              whileHover={{
                scale: scale - 0.02,
                // y: isSelected ? 0 : 1,
              }}
              onClick={() => handleCardClick(card.id)}
            >
              <h3 className="text-md text-black font-bold mb-2 text-center ">{card.title}</h3>
              {isSelected && (
                <div className="  h-full overflow-scroll ">
                  <div className="border border-zinc-50 rounded-full" />
                  <div className="text-gray-700 h-full flex">
                    {typeof card.content === "string" ? <p>{card.content}</p> : card.content}
                  </div>
                  {/* <div className="flex gap-4">
                    <Button className="grow rounded-full font-semibold text-md bg-gray-800 border-none ">
                      <RiResetLeftLine />
                      Reset
                    </Button>
                    <Button className="grow bg-[#3767ea23] border-none text-black rounded-full font-semibold text-md  ">
                      <HiOutlineUpload size={"1rem"} />
                      Upload
                    </Button>
                  </div> */}
                </div>
              )}
              {/* {isSelected && (
                <motion.div
                  className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              )}  */}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default InputStack;
