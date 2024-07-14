import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function Cancelled() {
  return (
    <Card className="w-full max-w-[80%]">
      <CardHeader>
        <CardTitle>Falha no Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-muted-foreground">
          Infelizmente, houve um problema ao processar o seu pagamento. Por
          favor, verifique suas informações e tente novamente mais tarde. Se o
          problema persistir, entre em contato com nosso suporte. Agradecemos
          pela sua compreensão.
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
