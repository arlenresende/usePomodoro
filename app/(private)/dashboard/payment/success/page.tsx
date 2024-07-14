import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function Success() {
  return (
    <Card className="w-full max-w-[80%]">
      <CardHeader>
        <CardTitle>Pagamento realizado com sucesso</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-muted-foreground">
          Seu pagamento foi processado com sucesso! Obrigado por sua compra.
          Você receberá um e-mail de confirmação em breve
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Link href="/dashboard">Voltar para o Dashboard</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
