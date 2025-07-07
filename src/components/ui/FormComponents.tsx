// =============================================================================
// KAIROS FRONTEND - ENHANCED FORM COMPONENTS
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/components/ui/FormComponents.tsx
// Purpose: Reusable form components with validation and theming
// =============================================================================

import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

// ============================================================================
// BASE FORM COMPONENT TYPES
// ============================================================================

interface BaseFormFieldProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'minimal' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

interface InputProps extends BaseFormFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}

interface TextAreaProps extends BaseFormFieldProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  rows?: number;
  maxLength?: number;
  resize?: boolean;
  autoGrow?: boolean;
}

interface SelectOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
}

interface SelectProps extends BaseFormFieldProps {
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  loading?: boolean;
  createOption?: (inputValue: string) => SelectOption;
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const getFormFieldClasses = (variant: string, size: string, hasError: boolean, disabled: boolean, focused: boolean) => {
  const baseClasses = 'transition-all duration-200 font-medium';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };
  
  const variantClasses = {
    default: `
      bg-gray-900/50 border border-gray-700 rounded-xl
      ${focused ? 'border-primary bg-gray-900/80' : ''}
      ${hasError ? 'border-red-500 bg-red-500/10' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-600'}
    `,
    minimal: `
      bg-transparent border-b-2 border-gray-700 rounded-none
      ${focused ? 'border-primary' : ''}
      ${hasError ? 'border-red-500' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-600'}
    `,
    filled: `
      bg-gray-800/80 border border-transparent rounded-xl
      ${focused ? 'border-primary bg-gray-800' : ''}
      ${hasError ? 'border-red-500 bg-red-500/10' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800/90'}
    `,
  };
  
  return `${baseClasses} ${sizeClasses[size as keyof typeof sizeClasses]} ${variantClasses[variant as keyof typeof variantClasses]}`;
};

// ============================================================================
// INPUT COMPONENT
// ============================================================================

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = '',
  variant = 'default',
  size = 'md',
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  icon: Icon,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  autoFocus,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || defaultValue || '');
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const inputClasses = getFormFieldClasses(variant, size, !!error, disabled, focused);

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-200 flex items-center space-x-1">
          <span>{label}</span>
          {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          value={currentValue}
          onChange={handleChange}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.();
          }}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={`
            ${inputClasses}
            ${Icon ? 'pl-10' : ''}
            ${type === 'password' ? 'pr-10' : ''}
            w-full text-gray-100 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary/20
          `}
          {...props}
        />

        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 text-gray-400 hover:text-gray-300 transition-colors"
            disabled={disabled}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Character Counter */}
        {maxLength && (
          <div className="absolute right-3 bottom-1 text-xs text-gray-500">
            {currentValue.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Description */}
      {description && !error && (
        <p className="text-sm text-gray-400 flex items-center space-x-1">
          <InformationCircleIcon className="w-4 h-4" />
          <span>{description}</span>
        </p>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-400 flex items-center space-x-1"
          >
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';

// ============================================================================
// TEXTAREA COMPONENT
// ============================================================================

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = '',
  variant = 'default',
  size = 'md',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  rows = 4,
  maxLength,
  resize = true,
  autoGrow = false,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || defaultValue || '');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (autoGrow && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentValue, autoGrow]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const textareaClasses = getFormFieldClasses(variant, size, !!error, disabled, focused);

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-200 flex items-center space-x-1">
          <span>{label}</span>
          {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {/* Textarea Container */}
      <div className="relative">
        <textarea
          ref={ref || textareaRef}
          value={currentValue}
          onChange={handleChange}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.();
          }}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            ${textareaClasses}
            w-full text-gray-100 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary/20
            ${resize ? 'resize-y' : 'resize-none'}
            ${autoGrow ? 'min-h-[100px]' : ''}
          `}
          {...props}
        />

        {/* Character Counter */}
        {maxLength && (
          <div className="absolute right-3 bottom-3 text-xs text-gray-500 bg-gray-900/80 px-2 py-1 rounded">
            {currentValue.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Description */}
      {description && !error && (
        <p className="text-sm text-gray-400 flex items-center space-x-1">
          <InformationCircleIcon className="w-4 h-4" />
          <span>{description}</span>
        </p>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-400 flex items-center space-x-1"
          >
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

TextArea.displayName = 'TextArea';

// ============================================================================
// SELECT COMPONENT
// ============================================================================

export const Select: React.FC<SelectProps> = ({
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = '',
  variant = 'default',
  size = 'md',
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select an option...',
  searchable = false,
  multiple = false,
  clearable = false,
  loading = false,
  createOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    multiple 
      ? (Array.isArray(value) ? value : [])
      : (value !== undefined ? [value] : defaultValue !== undefined ? [defaultValue] : [])
  );

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string | number) => {
    let newValues: (string | number)[];
    
    if (multiple) {
      if (selectedValues.includes(optionValue)) {
        newValues = selectedValues.filter(v => v !== optionValue);
      } else {
        newValues = [...selectedValues, optionValue];
      }
    } else {
      newValues = [optionValue];
      setIsOpen(false);
    }
    
    setSelectedValues(newValues);
    onChange?.(multiple ? newValues : newValues[0]);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onChange?.(multiple ? [] : '');
  };

  const getSelectedLabels = () => {
    return selectedValues.map(val => 
      options.find(opt => opt.value === val)?.label || val
    ).join(', ');
  };

  const selectClasses = getFormFieldClasses(variant, size, !!error, disabled, isOpen);

  return (
    <div className={`relative flex flex-col space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-200 flex items-center space-x-1">
          <span>{label}</span>
          {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            ${selectClasses}
            w-full text-left text-gray-100 flex items-center justify-between
            focus:outline-none focus:ring-2 focus:ring-primary/20
          `}
        >
          <span className={selectedValues.length === 0 ? 'text-gray-500' : ''}>
            {selectedValues.length === 0 ? placeholder : getSelectedLabels()}
          </span>
          
          <div className="flex items-center space-x-2">
            {loading && (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            )}
            {clearable && selectedValues.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
            <ChevronDownIcon 
              className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-64 overflow-hidden"
            >
              {/* Search */}
              {searchable && (
                <div className="p-3 border-b border-gray-700">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search options..."
                      className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="max-h-48 overflow-y-auto">
                {filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  const Icon = option.icon;
                  
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      disabled={option.disabled}
                      className={`
                        w-full text-left px-3 py-2 hover:bg-gray-800 transition-colors
                        ${isSelected ? 'bg-primary/20 text-primary' : 'text-gray-100'}
                        ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        flex items-center justify-between
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        {Icon && <Icon className="w-4 h-4" />}
                        <div>
                          <div className="font-medium">{option.label}</div>
                          {option.description && (
                            <div className="text-sm text-gray-400">{option.description}</div>
                          )}
                        </div>
                      </div>
                      {isSelected && <CheckIcon className="w-4 h-4" />}
                    </button>
                  );
                })}

                {filteredOptions.length === 0 && (
                  <div className="px-3 py-2 text-gray-400 text-center">
                    No options found
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Description */}
      {description && !error && (
        <p className="text-sm text-gray-400 flex items-center space-x-1">
          <InformationCircleIcon className="w-4 h-4" />
          <span>{description}</span>
        </p>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-400 flex items-center space-x-1"
          >
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// CHECKBOX COMPONENT
// ============================================================================

interface CheckboxProps extends BaseFormFieldProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = '',
  checked,
  defaultChecked,
  onChange,
  indeterminate = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked ?? false);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label className="flex items-start space-x-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
          />
          <div
            className={`
              w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
              ${isChecked || indeterminate
                ? 'bg-primary border-primary' 
                : 'bg-transparent border-gray-600 hover:border-gray-500'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'border-red-500' : ''}
            `}
          >
            {(isChecked || indeterminate) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.1 }}
              >
                {indeterminate ? (
                  <div className="w-2 h-0.5 bg-white rounded" />
                ) : (
                  <CheckIcon className="w-3 h-3 text-white" />
                )}
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          {label && (
            <div className="text-sm font-medium text-gray-200 flex items-center space-x-1">
              <span>{label}</span>
              {required && <span className="text-red-400">*</span>}
            </div>
          )}
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </label>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-400 flex items-center space-x-1"
          >
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// FORM WRAPPER COMPONENT
// ============================================================================

interface FormProps<T extends FieldValues> {
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  form?: UseFormReturn<T>;
  schema?: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
}

export function Form<T extends FieldValues>({
  onSubmit,
  children,
  className = '',
  form: providedForm,
  schema,
  defaultValues,
}: FormProps<T>) {
  const form = providedForm || useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: defaultValues as any,
  });

  return (
    <form 
      onSubmit={form.handleSubmit(onSubmit)}
      className={`space-y-6 ${className}`}
    >
      {children}
    </form>
  );
}

// ============================================================================
// FIELD WRAPPER FOR REACT HOOK FORM
// ============================================================================

interface FieldProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  children: (field: any) => React.ReactNode;
}

export function Field<T extends FieldValues>({ name, form, children }: FieldProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => 
        children({
          ...field,
          error: fieldState.error?.message,
        })
      }
    />
  );
}

export default {
  Input,
  TextArea,
  Select,
  Checkbox,
  Form,
  Field,
};