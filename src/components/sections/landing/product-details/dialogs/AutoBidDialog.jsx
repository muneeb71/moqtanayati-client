"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Label from "@/components/form-fields/Label";
import InputField from "@/components/form-fields/InputField";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const AutoBidDialog = ({ className = "", bidAmount, setBidAmount }) => {
  const [newAmount, setNewAmount] = useState(0);
  const [inputRange, setInputRange] = useState({ min: 0, max: 5000 });
  const [sliderRange, setSliderRange] = useState({ min: 0, max: 5000 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeDrag, setActiveDrag] = useState(null);

  useEffect(() => {
    if (inputRange.min > inputRange.max) {
      setInputRange(prev => ({ ...prev, min: inputRange.max }));
    }
    
    setSliderRange(prev => ({
      min: Math.max(prev.min, inputRange.min),
      max: Math.min(prev.max, inputRange.max)
    }));
  }, [inputRange]);

  const handleInputChange = (value, type) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      setInputRange(prev => ({
        ...prev,
        [type]: numValue
      }));
    }
  };

  const handleSliderChange = (value, type) => {
    setSliderRange(prev => ({
      ...prev,
      [type]: Number(value)
    }));
  };

  const handleConfirm = () => {
    setBidAmount(newAmount);
  };
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "flex h-[55px] items-center justify-center rounded-[6.7px] border border-moonstone px-5 text-moonstone hover:bg-moonstone hover:text-white",
          className,
        )}
      >
        Auto Bidding
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-[24px] sm:max-w-[471px] sm:rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="border-b-[1.2px] border-[#F0F1F4] pb-4 text-center text-[21.6px] font-medium">
            Auto Bidding
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <span className="text-[14.4px] leading-[24px] text-davyGray">
            Define a maximum bid amount, <span className="text-moonstone">Moqtanayati</span> will automatically bid on
            your behalf up to your limit, potentially keeping you competitive
            without constant monitoring
          </span>
          <h1 className="text-black font-medium text-start w-full mb-10 mt-5">Price Range</h1>
          <div className="w-full space-y-4 mb-10">
          <div className="relative h-2 w-full mt-8">
              {isDragging && (
                <div 
                  className="absolute -top-8 transform -translate-x-1/2"
                  style={{ 
                    left: `${(activeDrag === 'min' ? sliderRange.min : sliderRange.max) / inputRange.max * 100}%`
                  }}
                >
                  <div className="bg-moonstone text-white px-2 py-1 rounded-lg text-sm whitespace-nowrap">
                    ${activeDrag === 'min' ? sliderRange.min : sliderRange.max}
                  </div>
                </div>
              )}

              <div className="absolute h-full w-full rounded-full bg-gray-200">
                <div
                  className="absolute h-full rounded-full bg-moonstone"
                  style={{
                    left: `${(sliderRange.min / inputRange.max) * 100}%`,
                    right: `${100 - (sliderRange.max / inputRange.max) * 100}%`
                  }}
                />
              </div>
              
              <input
                type="range"
                min={inputRange.min}
                max={inputRange.max}
                value={sliderRange.min}
                onChange={(e) => handleSliderChange(e.target.value, 'min')}
                onMouseDown={() => {
                  setIsDragging(true);
                  setActiveDrag('min');
                }}
                onMouseUp={() => {
                  setIsDragging(false);
                  setActiveDrag(null);
                }}
                onTouchStart={() => {
                  setIsDragging(true);
                  setActiveDrag('min');
                }}
                onTouchEnd={() => {
                  setIsDragging(false);
                  setActiveDrag(null);
                }}
                className="absolute h-full w-full appearance-none bg-transparent"
                style={{
                  pointerEvents: 'auto',
                  zIndex: 1
                }}
              />
              
              <input
                type="range"
                min={inputRange.min}
                max={inputRange.max}
                value={sliderRange.max}
                onChange={(e) => handleSliderChange(e.target.value, 'max')}
                onMouseDown={() => {
                  setIsDragging(true);
                  setActiveDrag('max');
                }}
                onMouseUp={() => {
                  setIsDragging(false);
                  setActiveDrag(null);
                }}
                onTouchStart={() => {
                  setIsDragging(true);
                  setActiveDrag('max');
                }}
                onTouchEnd={() => {
                  setIsDragging(false);
                  setActiveDrag(null);
                }}
                className="absolute h-full w-full appearance-none bg-transparent"
                style={{
                  pointerEvents: 'auto',
                  zIndex: 2
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <InputField
                  type="number"
                  placeholder="Min Price"
                  value={inputRange.min}
                  onChange={(e) => handleInputChange(e.target.value, 'min')}
                  className="w-full"
                />
              </div>
              <span className="text-davyGray">-</span>
              <div className="flex-1">
                <InputField
                  type="number"
                  placeholder="Max Price"
                  value={inputRange.max}
                  onChange={(e) => handleInputChange(e.target.value, 'max')}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <DialogClose asChild>
            <RoundedButton
              title="Confirm"
              className="px-20"
              onClick={() => handleConfirm()}
            />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutoBidDialog;

<style jsx global>{`
  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: white;
    border: 2px solid #42B7C5;
    margin-top: -11px;
    cursor: pointer;
    z-index: 3;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  input[type='range']::-moz-range-thumb {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: white;
    border: 2px solid #42B7C5;
    cursor: pointer;
    z-index: 3;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  input[type='range']:focus {
    outline: none;
  }
`}</style>
