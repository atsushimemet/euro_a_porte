import Header from '@/components/Header'
import Hero from '@/components/Hero'
import InstagramGrid from '@/components/InstagramGrid'

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-50">
      <Header />
      <Hero />
      <InstagramGrid />
    </main>
  )
}
