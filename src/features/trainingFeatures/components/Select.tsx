import { useState, useRef, useEffect } from "react";
import { css } from "../../../../styled-system/css";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[] | undefined;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  mWidth?: boolean;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  mWidth = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const selectRef = useRef<HTMLDivElement>(null);

  // Find the label for the current value
  useEffect(() => {
    const option = options?.find((opt) => opt.value === value);
    setSelectedLabel(option ? option.label : "");
  }, [value, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prevState) => !prevState);
    }
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={selectRef}
      className={css({
        position: "relative",

        minWidth: "190px",
        width: !mWidth ? "100%" : "",
      })}
    >
      {/* Select trigger */}
      <button
        type="button"
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",

          padding: "0.5rem 0.75rem",
          width: "100%",

          backgroundColor: "buttons.bg.normal",
          borderRadius: "md",
          border: "2px solid token(colors.effects.border)",
          cursor: disabled ? "not-allowed" : "pointer",

          color: "buttons.text.normal",

          transition: "all 0.2s",
          textAlign: "left",

          _hover: {
            backgroundColor: "buttons.bgHover.normal",
            color: "buttons.textHover.normal",
          },
        })}
        onClick={toggleDropdown}
      >
        <span>{selectedLabel || placeholder}</span>

        <div
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            width: "1rem",
            height: "1rem",

            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s ease",
            color: "effects.border",
          })}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul
          className={css({
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,

            margin: 0,
            marginRight: "1.5rem",
            padding: 0,
            width: "100%",
            maxHeight: "200px",

            backgroundColor: "buttons.bg.normal",
            borderRadius: "md",
            border: "2px solid token(colors.effects.border)",
            boxShadow: "md",

            color: "buttons.text.normal",
            zIndex: 30,

            overflowY: "auto",
            listStyle: "none",

            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "effects.border",
              borderRadius: "4px",
            },
          })}
        >
          {options?.map((option) => (
            <li
              key={option.value}
              className={css({
                padding: "0.5rem 0.75rem",

                color:
                  option.value === value
                    ? "typography.secondaryText"
                    : "buttons.text.normal",

                cursor: "pointer",

                _hover: {
                  backgroundColor:
                    option.value !== value ? "buttons.bgHover.normal" : "",
                  color:
                    option.value !== value ? "buttons.textHover.normal" : "",
                },
              })}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
