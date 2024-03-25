import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface IdeaCardProps {
  title: string
  description: string
}

function IdeaCard({ title, description }: IdeaCardProps) {
  return (
    <Card className='max-w-xs group-data-[state=on]:ring-2 ring-primary h-full'>
      <CardHeader className='text-left'>
        <CardTitle className='leading-normal group-data-[state=on]:text-primary'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default IdeaCard