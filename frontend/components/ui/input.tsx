import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [hasValue, setHasValue] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== '')
    if (props.onChange) {
      props.onChange(e)
    }
  }

  React.useEffect(() => {
    if (props.value) {
      setHasValue(String(props.value) !== '')
    }
  }, [props.value])

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full items-center gap-2 px-3.5 py-2.5",
        "rounded-xl border-[0.5px] border-[#26272B] bg-[#1A1A1E]",
        "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
        "text-base font-normal leading-6",
        "overflow-hidden text-ellipsis whitespace-nowrap",
        "placeholder:text-[#70707B]",
        hasValue ? "text-white font-medium" : "text-[#70707B]",
        "focus-visible:border-[#875BF7] focus-visible:border focus-visible:text-white focus-visible:font-medium focus-visible:outline-none",
        "aria-invalid:border-[#E88997] aria-invalid:ring-1 aria-invalid:ring-[#E88997]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all",
        className
      )}
      style={{
        fontFamily: 'var(--font-body)',
        fontFeatureSettings: "'case' on, 'cv01' on, 'cv08' on, 'cv09' on, 'cv11' on, 'cv13' on"
      }}
      {...props}
      onChange={handleChange}
    />
  )
}

export { Input }
