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
          <DialogTitle>Configurações Pomodoro</DialogTitle>
          <DialogDescription>
            Faça alterações no seu pomodoro. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="25:00"
            label="Tempo do Pomodoro"
            name="name"
            error="true"
          />
          <Input
            placeholder="05:00"
            label="Tempo do Pausa Curta"
            name="shortpause"
          />
          <Input
            placeholder="10:00"
            label="Tempo da pausa longa"
            name="longpause"
          />
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
