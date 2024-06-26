import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

function RangeSlider({ min, max, onRangeChange, initialValue }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onRangeChange(newValue[0], newValue[1]);
  };

  return (
    <div className="w-full my-2 sm:w-96 lg:ml-1">
      <Typography id="range-slider" gutterBottom>
        Price Range:
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={min}
        max={max}
      />
      <Typography variant="caption">
        Min: ${value[0]} - Max: ${value[1]}
      </Typography>
    </div>
  );
}

export default RangeSlider;
