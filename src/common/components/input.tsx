import * as React from 'react'
import { Eye, EyeOff, Search, X } from 'lucide-react'

import { cn } from '@/lib/utils'

type InputProps = React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', onChange, value, defaultValue, disabled, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(defaultValue == null ? '' : String(defaultValue))

    const isControlled = value !== undefined
    const currentValue = isControlled ? (value == null ? '' : String(value)) : internalValue
    const isSearch = type === 'search'
    const isPassword = type === 'password'
    const hasSearchValue = isSearch && currentValue.length > 0
    const isInvalid = props['aria-invalid'] === true || props['aria-invalid'] === 'true'

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node

        if (typeof ref === 'function') {
          ref(node)
          return
        }

        if (ref) {
          ref.current = node
        }
      },
      [ref],
    )

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(event.currentTarget.value)
      }

      onChange?.(event)
    }

    const clearSearchValue = () => {
      if (!inputRef.current || disabled) return

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
      nativeInputValueSetter?.call(inputRef.current, '')
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
      inputRef.current.focus()

      if (!isControlled) {
        setInternalValue('')
      }
    }

    const actualType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type

    const inputElement = (
      <input
        ref={setRefs}
        type={actualType}
        data-slot="input"
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={cn(
          'h-9 w-full min-w-0 rounded-[2px] border border-[var(--input-border-default)] bg-transparent px-3 py-1.5 text-base leading-6 text-[var(--input-text-default)] transition-colors outline-none',
          'placeholder:text-[var(--input-text-default)] selection:bg-primary selection:text-primary-foreground',
          'hover:border-[var(--input-border-hover)] hover:bg-[var(--input-bg-hover)]',
          'focus-visible:border-2 focus-visible:border-[var(--input-border-focus)] focus-visible:ring-0',
          'aria-invalid:border-[var(--input-border-error)] aria-invalid:text-[var(--input-text-error)] aria-invalid:placeholder:text-[var(--input-text-error)]',
          'disabled:cursor-not-allowed disabled:border-[var(--input-border-disabled)] disabled:text-[var(--input-text-disabled)] disabled:placeholder:text-[var(--input-text-disabled)] disabled:opacity-100',
          'data-[state=active]:border-[var(--input-border-active)] data-[state=active]:text-[var(--input-text-active)] data-[state=active]:placeholder:text-[var(--input-text-active)]',
          '[&:not(:placeholder-shown):not(:focus-visible):not([aria-invalid=true]):not(:disabled)]:border-[var(--input-border-active)]',
          '[&:not(:placeholder-shown):not(:focus-visible):not([aria-invalid=true]):not(:disabled)]:text-[var(--input-text-active)]',
          '[&:not(:placeholder-shown):not(:focus-visible):not([aria-invalid=true]):not(:disabled)]:placeholder:text-[var(--input-text-active)]',
          'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          isSearch && 'pl-[41px] pr-10',
          isPassword && 'pr-10',
          className,
        )}
        {...props}
      />
    )

    if (!isSearch && !isPassword) {
      return inputElement
    }

    const iconColorClass = disabled
      ? 'text-[var(--input-text-disabled)]'
      : isInvalid
        ? 'text-[var(--input-text-error)]'
        : hasSearchValue
          ? 'text-[var(--input-text-active)]'
          : 'text-[var(--input-text-default)]'

    return (
      <div className="relative w-full">
        {isSearch && (
          <Search aria-hidden className={cn('pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2', iconColorClass)} />
        )}
        {inputElement}
        {isSearch && hasSearchValue && (
          <button
            type="button"
            tabIndex={-1}
            className={cn('absolute top-1/2 right-3 size-4 -translate-y-1/2', iconColorClass)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearSearchValue}
            disabled={disabled}
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
        {isPassword && (
          <button
            type="button"
            className={cn('absolute top-1/2 right-3 size-5 -translate-y-1/2', iconColorClass)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            disabled={disabled}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
