import React from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';

/**
 * Reusable Inch Stepper Input Component
 * Allows +/- 0.25" and +/- 1.00" increments with direct typing,
 * clean formatting, and optional reset.
 */
export const InchStepperInput = ({
  label,
  value,
  onChange,
  min = 0,
  max = 120,
  step = 0.25,
  defaultValue = null,
  hint = '',
  helpText = '',
  showFullStepButtons = true,
  className = ''
}) => {
  const numValue = typeof value === 'number' ? value : parseFloat(value) || 0;

  const handleStep = (delta) => {
    const next = Math.round((numValue + delta) * 100) / 100;
    if (next >= min && next <= max) {
      onChange(next);
    }
  };

  const handleDirectChange = (e) => {
    const raw = e.target.value;
    if (raw === '' || raw === '-') {
      onChange(raw);
      return;
    }
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    let val = parseFloat(value);
    if (isNaN(val)) {
      val = defaultValue !== null ? defaultValue : min;
    } else {
      if (val < min) val = min;
      if (val > max) val = max;
      // Round to nearest 0.25
      val = Math.round(val * 4) / 4;
    }
    onChange(val);
  };

  const displayVal = typeof value === 'number' ? value.toFixed(2) : value;

  return (
    <div className={`bg-obsidian-900/90 border border-obsidian-750 hover:border-champagne-500/50 transition-all rounded-xl p-3 sm:p-3.5 group ${className}`}>
      {/* Label and Hint */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <label className="text-xs font-semibold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 group-hover:scale-125 transition-transform" />
          <span>{label}</span>
        </label>
        {hint && (
          <span className="text-[10px] text-gray-400 font-mono tracking-tight bg-obsidian-800 px-1.5 py-0.5 rounded border border-obsidian-700">
            {hint}
          </span>
        )}
      </div>

      {/* Stepper Controls Row */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Quick -1" (Full Inch) Button */}
        {showFullStepButtons && (
          <button
            type="button"
            onClick={() => handleStep(-1.0)}
            disabled={numValue - 1 < min}
            title='Subtract 1.00"'
            className="hidden sm:flex h-9 px-2 items-center justify-center text-[11px] font-mono font-bold rounded-lg bg-obsidian-800 hover:bg-obsidian-700 active:scale-95 text-gray-400 hover:text-champagne-400 border border-obsidian-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            -1"
          </button>
        )}

        {/* - 0.25" Stepper Button */}
        <button
          type="button"
          onClick={() => handleStep(-step)}
          disabled={numValue - step < min}
          title={`Subtract ${step}"`}
          className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-obsidian-800 hover:bg-champagne-500/20 active:scale-95 text-gray-300 hover:text-champagne-400 border border-obsidian-700 hover:border-champagne-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Minus className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Numeric Input with Inch Unit Suffix */}
        <div className="relative flex-1">
          <input
            type="number"
            step={step}
            min={min}
            max={max}
            value={displayVal}
            onChange={handleDirectChange}
            onBlur={handleBlur}
            className="w-full h-9 bg-obsidian-950 text-center font-mono text-sm sm:text-base font-bold text-white rounded-lg border border-obsidian-700 focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400 outline-none transition-all pr-5 pl-2"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-champagne-400/80 pointer-events-none select-none">
            "
          </span>
        </div>

        {/* + 0.25" Stepper Button */}
        <button
          type="button"
          onClick={() => handleStep(step)}
          disabled={numValue + step > max}
          title={`Add ${step}"`}
          className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-obsidian-800 hover:bg-champagne-500/20 active:scale-95 text-gray-300 hover:text-champagne-400 border border-obsidian-700 hover:border-champagne-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Quick +1" (Full Inch) Button */}
        {showFullStepButtons && (
          <button
            type="button"
            onClick={() => handleStep(1.0)}
            disabled={numValue + 1 > max}
            title='Add 1.00"'
            className="hidden sm:flex h-9 px-2 items-center justify-center text-[11px] font-mono font-bold rounded-lg bg-obsidian-800 hover:bg-obsidian-700 active:scale-95 text-gray-400 hover:text-champagne-400 border border-obsidian-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            +1"
          </button>
        )}

        {/* Reset Button (Visible if default is specified and value changed) */}
        {defaultValue !== null && numValue !== defaultValue && (
          <button
            type="button"
            onClick={() => onChange(defaultValue)}
            title={`Reset to default (${defaultValue}")`}
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-gray-400 hover:text-amber-400 border border-obsidian-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {helpText && (
        <p className="text-[10px] text-gray-400 mt-1.5 leading-tight">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default InchStepperInput;
