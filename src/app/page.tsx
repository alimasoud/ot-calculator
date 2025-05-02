'use client'

import Image from "next/image";
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ModeToggle } from "@/components/ui/modeButton";

import { FormEvent, useState } from 'react'
export default function Home() {

  const [ot, setOT] = useState(null);
  const [calculatedHourlyRate, secalculatedHourlyRate] = useState(null);
  const [calculatedHourlyRateAfter, secalculatedHourlyRateAfter] = useState(null);
  // const [ot, setOT] = useState(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()


    const formData = new FormData(event.currentTarget);
    const salary = formData.get('salary');
    const hours = formData.get('hours');
    const type = formData.get('type');


    const hourlyRate = salary * 12 / 365 / 8;
    const hourlyRateWithOT = salary * 12 / 365 / 8 * type;

    const calculatedOT = hourlyRate * type * hours;

    setOT(calculatedOT.toFixed(3));
    secalculatedHourlyRate(hourlyRate.toFixed(3));
    secalculatedHourlyRateAfter(hourlyRateWithOT.toFixed(3));
  }

  return (
    <div>
      <div className="flex row-reverse">

      </div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-20 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[24px] sm:gap-[32px] row-start-2 items-center w-full max-w-[600px]">
          <Card className="w-full">
            <CardHeader className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
              <div>
                <CardTitle>Over Time Calculator</CardTitle>
                <CardDescription>Calculate your overtime pay easily.</CardDescription>
              </div>
              <ModeToggle />
            </CardHeader>
            <CardContent>
              {/* Data Form */}
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                    <div className="flex flex-col space-y-1.5 w-full sm:w-1/2">
                      <Label htmlFor="salary">Salary</Label>
                      <Input id="salary" name="salary" placeholder="Your Salary in Bahraini Dinar" required />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full sm:w-1/2 sm:px-5">
                      <Label htmlFor="hours">Hours</Label>
                      <Input id="hours" name="hours" placeholder="Your OT hours" required />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="type">Working hours type</Label>
                    <Select name="type" required>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="1.25">Normal Day</SelectItem>
                        <SelectItem value="1.5">Holidays</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="py-5">
                  <Button type="submit">Calculate</Button>
                </div>
              </form>
              {/* Result Data Form */}
              <div>
                <div className="py-2">
                  <Card className="w-full">
                    <div className="flex justify-between mx-2">
                      <Label htmlFor="salary">Calculated Over time:</Label>
                      <Label htmlFor="salary">{ot} BHD</Label>
                    </div>
                  </Card>
                </div>
                <div className="py-2">
                  <Card className="w-full">
                    <div className="flex justify-between mx-2">
                      <Label htmlFor="salary">Calculated Hourly Rate Before OT:</Label>
                      <Label htmlFor="salary">{calculatedHourlyRate} BHD</Label>
                    </div>
                  </Card>
                </div>
                <div className="py-2">
                  <Card className="w-full">
                    <div className="flex justify-between mx-2">
                      <Label htmlFor="salary">Calculated Hourly Rate After OT:</Label>
                      <Label htmlFor="salary">{calculatedHourlyRateAfter} BHD</Label>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
            {/* <CardFooter >
            </CardFooter> */}
          </Card>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} <a href="https://alimasaud.com">Ali Masaud</a>. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}