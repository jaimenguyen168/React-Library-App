import { HexColorInput, HexColorPicker } from "react-colorful";
import { useState } from "react";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center book-form_input mb-2 w-2/5">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;
