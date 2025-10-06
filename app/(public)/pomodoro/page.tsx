import Footer from '@/components/footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Técnica Pomodoro - Use Pomodoro',
  description:
    'Aprenda sobre a Técnica Pomodoro, um método eficaz de gerenciamento de tempo que utiliza períodos de trabalho focado intercalados com pequenas pausas para maximizar a concentração e o desempenho mental.',
  keywords: [
    'pomodoro',
    'técnica pomodoro',
    'produtividade',
    'gerenciamento de tempo',
    'foco',
    'concentração',
  ],
  openGraph: {
    title: 'Técnica Pomodoro - Use Pomodoro',
    description:
      'Aprenda sobre a Técnica Pomodoro, um método eficaz de gerenciamento de tempo para maximizar sua produtividade e foco.',
    url: '/pomodoro',
    siteName: 'Use Pomodoro',
    locale: 'pt-BR',
    type: 'website',
  },
}

export default function PomodoroTechniquePage() {
  return (
    <div className="container-none mx-auto py-4 lg:py-12 px-4 lg:px-12 h-full flex items-start justify-between flex-col">
      <Header />
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 my-12">
        <h1 className="text-4xl font-bold text-center">A Técnica Pomodoro</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>O que é a Técnica Pomodoro?</CardTitle>
            <CardDescription>
              Um método de gerenciamento de tempo desenvolvido por Francesco
              Cirillo no final dos anos 1980.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              A Técnica Pomodoro é um método de gerenciamento de tempo que
              utiliza períodos de trabalho focado intercalados com pequenas
              pausas para maximizar a concentração e o desempenho mental.
            </p>
            <p>
              O nome &quot;Pomodoro&quot; (tomate em italiano) vem do cronômetro
              de cozinha em formato de tomate que Francesco Cirillo utilizava
              enquanto estudante universitário.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Como funciona?</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-4">
              <li>
                <strong>Escolha uma tarefa</strong> - Selecione a tarefa que
                você deseja realizar.
              </li>
              <li>
                <strong>Configure o temporizador</strong> - Tradicionalmente
                para 25 minutos (um &quot;pomodoro&quot;).
              </li>
              <li>
                <strong>Trabalhe na tarefa</strong> - Concentre-se completamente
                até o temporizador tocar.
              </li>
              <li>
                <strong>Faça uma pausa curta</strong> - Quando o temporizador
                tocar, faça uma pausa de 5 minutos.
              </li>
              <li>
                <strong>Repita</strong> - Após completar quatro
                &quot;pomodoros&quot;, faça uma pausa mais longa de 15-30
                minutos.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Benefícios da Técnica Pomodoro</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reduz a ansiedade associada ao tempo</li>
              <li>Aumenta o foco e a concentração ao minimizar interrupções</li>
              <li>Melhora a consciência sobre decisões</li>
              <li>Aumenta a motivação e mantém-na constante</li>
              <li>Reforça a determinação para atingir objetivos</li>
              <li>Melhora o processo de trabalho ou estudo</li>
              <li>
                Fortalece a determinação para enfrentar situações complexas
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Dicas para usar a Técnica Pomodoro</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Ajuste o tempo</strong> - Adapte a duração dos
                intervalos conforme sua necessidade
              </li>
              <li>
                <strong>Elimine distrações</strong> - Desligue notificações e
                evite interrupções durante um pomodoro
              </li>
              <li>
                <strong>Use as pausas corretamente</strong> - Levante-se,
                alongue-se, beba água, mas evite atividades que possam
                distraí-lo por muito tempo
              </li>
              <li>
                <strong>Registre seu progresso</strong> - Acompanhe quantos
                pomodoros você completa para cada tarefa
              </li>
              <li>
                <strong>Respeite o processo</strong> - Não pule as pausas, elas
                são essenciais para o descanso mental
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col xl:flex-row items-center justify-center gap-4 mt-8">
          <Button asChild>
            <Link href="/">Voltar para a Página Inicial</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Ir para o Dashboard</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
