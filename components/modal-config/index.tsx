import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '../input'

interface DialogConfigProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function ModalConfig({ open, setOpen }: DialogConfigProps) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pomodoro Settings</DialogTitle>
          <DialogDescription>
            Make changes to your pomodoro. Click save when finished.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="25:00"
            label="Pomodoro Time"
            name="name"
            error="true"
          />
          <Input
            placeholder="05:00"
            label="Short Break Time"
            name="shortpause"
          />
          <Input placeholder="10:00" label="Long Break Time" name="longpause" />
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
