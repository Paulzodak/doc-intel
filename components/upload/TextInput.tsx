import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { RiResetLeftLine } from "react-icons/ri";
import { HiOutlineUpload } from "react-icons/hi";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput = ({ value, onChange }: TextInputProps) => {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-center my-2 md:my-4 text-sm md:text-base">
        Paste in the notes, outline or text content you&apos;d like to use
      </h3>
      <Textarea
        className="w-full h-full mb-3 md:mb-4 min-h-[150px] md:min-h-[200px] text-sm md:text-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex gap-2 md:gap-4">
        <Button className="grow rounded-full font-semibold text-xs md:text-md bg-gray-800 border-none">
          <RiResetLeftLine className="text-sm md:text-base" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
        <Button variant="secondary" className="grow rounded-full font-semibold text-xs md:text-md">
          <HiOutlineUpload size={"1rem"} />
          <span className="hidden sm:inline">Upload</span>
        </Button>
      </div>
    </div>
  );
};

export default TextInput;
