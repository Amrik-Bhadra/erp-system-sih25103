import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function VerifyOtpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify OTP</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Please enter the OTP sent to your email
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="otp">OTP Code</Label>
          <Input id="otp" type="text" placeholder="******" required />
        </div>
        <Button type="submit" className="w-full">
          Verify
        </Button>
      </div>
    </form>
  )
}
