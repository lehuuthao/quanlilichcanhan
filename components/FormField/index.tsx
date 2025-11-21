import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  InputHTMLAttributes,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  prefixIcon?: any;
  customClass?: string;
  onKeyPress?: () => void;
  placeholder?: string;
  inputWidth?: number;
  onChange?: (e: any) => void;
  checkErrors?: any;
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
  min?: number;
  max?: number;
}

const FormField = forwardRef(
  (
    {
      label = "",
      type = "text",
      prefixIcon,
      customClass = "",
      onKeyPress,
      placeholder,
      inputWidth,
      name,
      onChange,
      value,
      checkErrors = [],
      id,
      onFocus,
      onBlur,
      selectOnFocus = false,
      disabled,
      readOnly = false,
      min,
      maxLength,
      autoComplete,
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
      max,
      ...rest
    }: Props,
    ref
  ) => {
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState("");

    const onFocusHandler = (e: any) => {
      if (selectOnFocus) e.target.select();
      if (onFocus) onFocus();
    };

    const onBlurHandler = () => {
      if (onBlur) {
        setTouched(true);
        onBlur();
      }
    };

    useImperativeHandle(ref, () => ({
      validate: () => {
        setTouched(true);
        return validateForm();
      },
    }));

    const onKeyUp = (event: any) => {
      if (event.charCode === 13) {
        onKeyPress && onKeyPress();
      }
    };

    useEffect(() => {
      validateForm();
    }, [value]);

    const validateForm = () => {
      if (checkErrors.length > 0) {
        for (let idx = 0; idx < checkErrors.length; idx++) {
          const checkErrorFn = checkErrors[idx];
          if (typeof checkErrorFn === "function") {
            const error = checkErrorFn(value);
            if (error) {
              setError(error);
              return error;
            }
          }
        }
        setError("");
      }
      return "";
    };

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
        {isTextarea ? (
          <textarea
            className={`${customClass} border focus:!bg-white w-full rounded text-xs px-3 py-2`}
            id={id}
            autoComplete={autoComplete}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
            onKeyPress={onKeyUp}
            onChange={onChange}
            onBlur={() => onBlurHandler()}
            onFocus={(e: any) => onFocusHandler(e)}
            maxLength={maxLength}
            rows={rows}
            ref={refInput}
          />
        ) : (
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
              id={id}
              type={type}
              autoComplete={autoComplete}
              value={value}
              disabled={disabled}
              placeholder={placeholder}
              readOnly={readOnly}
              ref={refInput}
              required={required}
              onKeyPress={onKeyUp}
              onChange={onChange}
              onBlur={() => onBlurHandler()}
              onFocus={(e: any) => onFocusHandler(e)}
              min={min}
              max={max}
              maxLength={maxLength}
              {...rest}
            />
            {!!value && showRemove && !loading && (
              <div
                onClick={onRemoveText}
                className="absolute right-3 px-1 top-3 z-20 cursor-pointer"
              >
                {/* <CloseIcon className=" text-mailreef_black" /> */}
              </div>
            )}
          </div>
        )}
        {touched && error && (
          <p className="text-sm font-medium mt-1 text-rafl_red-700">{error}</p>
        )}
      </div>
    );
  }
);

export default FormField;
