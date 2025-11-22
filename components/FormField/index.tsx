"use client";

import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

interface Option {
  label: string;
  value: string | number;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  prefixIcon?: React.ReactNode;
  customClass?: string;
  placeholder?: string;
  inputWidth?: number;
  onChange?: (e: any) => void;
  checkErrors?: Array<(value: any) => string | null>;
  onFocus?: () => void;
  onBlur?: () => void;
  selectOnFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  isTextarea?: boolean;
  refInput?: any;
  onRemoveText?: () => void;
  showRemove?: boolean;
  loading?: boolean;
  description?: string;
  wrapperClass?: string;
  labelClass?: string;
  rows?: number;
  prefixClassName?: string;
  options?: Option[]; // Nếu có thì render select
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>;
}

const FormField = forwardRef((props: Props, ref) => {
  const {
    label = "",
    type = "text",
    prefixIcon,
    customClass = "",
    placeholder,
    value,
    onChange,
    checkErrors = [],
    onFocus,
    onBlur,
    selectOnFocus = false,
    disabled,
    readOnly = false,
    maxLength,
    required,
    refInput = null,
    isTextarea = false,
    onRemoveText,
    showRemove = false,
    loading = false,
    description = "",
    wrapperClass = "",
    labelClass = "",
    rows = 1,
    prefixClassName,
    min,
    max,
    options,
    ...rest
  } = props;

  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const onFocusHandler = (e: any) => {
    if (selectOnFocus) e.target.select();
    if (onFocus) onFocus();
  };

  const onBlurHandler = () => {
    setTouched(true);
    if (onBlur) onBlur();
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      setTouched(true);
      return validateForm();
    },
  }));

  const validateForm = () => {
    if (checkErrors.length > 0) {
      for (let fn of checkErrors) {
        if (typeof fn === "function") {
          const err = fn(value);
          if (err) {
            setError(err);
            return err;
          }
        }
      }
      setError("");
    }
    return "";
  };

  useEffect(() => {
    validateForm();
  }, [value]);

  const { children, ...safeRest } = rest;

  let inputElement = null;

  if (options && options.length > 0) {
    inputElement = (
      <select
        className={`${customClass} border rounded-md px-3 py-2 w-full`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...(safeRest as React.SelectHTMLAttributes<HTMLSelectElement>)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else if (isTextarea) {
    inputElement = (
      <textarea
        className={`${customClass} border focus:!bg-white w-full rounded text-xs px-3 py-2`}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        onChange={onChange}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        rows={rows}
        maxLength={maxLength}
        ref={refInput}
        {...(safeRest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  } else {
    inputElement = (
      <div className="relative">
        {prefixIcon && (
          <div
            className={`absolute left-2 top-1/2 -translate-y-1/2 flex items-center ${prefixClassName}`}
          >
            {prefixIcon}
          </div>
        )}
        <input
          className={`${customClass} bg-rafl_violet-100 placeholder-rafl_violet-400 text-rafl_violet-950 h-[60px] focus:!bg-white w-full rounded-2xl text-2xl leading-6 px-6 py-[18px] !border-none !outline-none`}
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          onChange={onChange}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          min={min}
          max={max}
          maxLength={maxLength}
          ref={refInput}
          {...(safeRest as InputHTMLAttributes<HTMLInputElement>)}
        />
        {!!value && showRemove && !loading && (
          <div
            onClick={onRemoveText}
            className="absolute right-3 px-1 top-3 z-20 cursor-pointer"
          ></div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${wrapperClass}`}>
      {label && (
        <p
          className={`text-xl font-bold text-rafl_violet-400 mb-2.5 ${labelClass}`}
        >
          {label}
        </p>
      )}

      {description && (
        <p className="text-mailreef_gray-5 text-xs mb-2">{description}</p>
      )}

      {inputElement}

      {touched && error && (
        <p className="text-sm font-medium mt-1 text-rafl_red-700">{error}</p>
      )}
    </div>
  );
});

export default FormField;
