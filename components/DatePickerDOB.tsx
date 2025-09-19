"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerDOBProps = {
  value?: string // ISO string from form state
  onChange: (value: string) => void
}

export function DatePickerDOB({ value, onChange }: DatePickerDOBProps) {
  const [open, setOpen] = React.useState(false)
  const date = value ? new Date(value) : undefined

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="dob" className="px-1 text-white font-semibold">
        Date of Birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dob"
            className="w-56 justify-between font-normal bg-gray-800 border-yellow-500/30 text-white hover:bg-gray-700"
          >
            {date ? format(date, "PPP") : "Select date"}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 bg-gray-900 border-yellow-500/30"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              if (d) onChange(d.toISOString()) // ✅ send ISO string to parent
              setOpen(false)
            }}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear()}
            disabled={(d) => d > new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
