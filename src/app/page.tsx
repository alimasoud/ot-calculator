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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { blockInvalidChar } from "@/components/blockInvalidChar";
export default function Home() {

  const [ot, setOT] = useState<string | null>(null);
  const [calculatedHourlyRate, secalculatedHourlyRate] = useState<string | null>(null);
  const [calculatedHourlyRateAfter, secalculatedHourlyRateAfter] = useState<string | null>(null);
  const [show, setshow] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);
    const salary = formData.get('salary');
    const hours = formData.get('hours');
    const minutes = formData.get('minutes');
    const type = formData.get('type');

    // if(Number(minutes) > 60)

    const hourlyRate = Number(salary) * 12 / 365 / 8;
    const hourlyRateWithOT = Number(salary) * 12 / 365 / 8 * Number(type);
    const minutesInpoints = Number(minutes) / 60;
    const calculatedOT = hourlyRate * Number(type) * (Number(hours) + minutesInpoints);

    setOT(calculatedOT.toFixed(3));
    secalculatedHourlyRate(hourlyRate.toFixed(3));
    secalculatedHourlyRateAfter(hourlyRateWithOT.toFixed(3));

    setshow(true);
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
                <CardTitle>Bahrain Over Time Calculator</CardTitle>
                <CardDescription>Calculate your overtime pay easily. <Dialog>
                  <DialogTrigger className="w-6 h-6 rounded-full bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 inline-flex items-center justify-center text-xs font-medium transition-colors">!</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Disclaimer and User Declaration</DialogTitle>
                      <DialogDescription className="space-y-2">

                        By using this application, you acknowledge and agree to the following terms:<br /><br />

                        1. <b>Accuracy of Information</b><br />
                        The results, calculations, and information provided by this application are intended for general informational purposes only. While we strive for accuracy, we do not guarantee that the data or results are 100% accurate or applicable to your specific circumstances.<br /><br />

                        2. <b>Basis of Calculations</b><br />
                        All calculations and estimates provided are based on the <b>Labour Law of the Kingdom of Bahrain</b>, as interpreted and implemented at the time of development. However, variations in individual employment contracts, company policies, or updated legal regulations may lead to different outcomes in actual practice.<br /><br />

                        3. <b>No Legal or Financial Advice</b><br />
                        This application does not provide legal, financial, or professional advice. Users should consult with a qualified professional, legal expert, or the Ministry of Labour for advice specific to their situation.<br /><br />

                        4. <b>Limitation of Liability</b><br />
                        The developers and maintainers of this application shall not be held liable for any decisions made, actions taken, or consequences arising from the use of the information provided by the app.<br /><br />

                        5. <b>User Responsibility</b><br />
                        Users are responsible for verifying the information and seeking official clarification if needed. This tool should be used as a guide only, not a definitive source.<br /><br />

                        By continuing to use this application, you accept the above terms and understand that any data or result generated is <b>an estimate only</b> and may <b>not reflect your actual entitlements</b> under Bahrain Labour Law.<br />

                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog></CardDescription>
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
                      <Input id="salary" name="salary" placeholder="Your Salary in Bahraini Dinar" required type="number" min="0" onKeyDown={blockInvalidChar}/>
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full sm:w-1/2 sm:px-5">
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
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                    <div className="flex flex-col space-y-1.5 w-full sm:w-1/2">
                      <Label htmlFor="hours">Hours</Label>
                      <Input id="hours" name="hours" placeholder="Your OT hours" required type="number" min="0" onKeyDown={blockInvalidChar}/>
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full sm:w-1/2 sm:px-5">
                      <Label htmlFor="minutes">Minutes</Label>
                      <Input id="minutes" name="minutes" placeholder="Your OT minutes" required type="number" min="0" max="60" defaultValue={0} onKeyDown={blockInvalidChar}/>
                    </div>
                  </div>
                </div>
                <div className="py-5">
                  <Button type="submit">Calculate</Button>
                </div>
              </form>
              {/* Result Data Form */}
              {show && (
                <div className="space-y-3">
                  <div className="py-2">
                    <Card className="w-full">
                      <div className="flex flex-col sm:flex-row justify-between p-4 gap-2">
                        <Label className="text-sm sm:text-base">Calculated Over time:</Label>
                        <Label className="text-lg sm:text-xl font-semibold text-primary">{ot} BHD</Label>
                      </div>
                    </Card>
                  </div>
                  <div className="py-2">
                    <Card className="w-full">
                      <div className="flex flex-col sm:flex-row justify-between p-4 gap-2">
                        <Label className="text-sm sm:text-base">Hourly Rate (Before OT):</Label>
                        <Label className="text-lg sm:text-xl font-semibold text-primary">{calculatedHourlyRate} BHD</Label>
                      </div>
                    </Card>
                  </div>
                  <div className="py-2">
                    <Card className="w-full">
                      <div className="flex flex-col sm:flex-row justify-between p-4 gap-2">
                        <Label className="text-sm sm:text-base">Hourly Rate (After OT):</Label>
                        <Label className="text-lg sm:text-xl font-semibold text-primary">{calculatedHourlyRateAfter} BHD</Label>
                      </div>
                    </Card>
                  </div>
                </div>)}
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