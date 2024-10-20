
import { GetStartedForm } from './GetStartedForm'

export default function Component() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <section className="w-full py-8 md:py-12 lg:py-16">
        <div className="px-4 md:px-6">
          <div className="flex flex-col gap-8 items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to FitEase
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Your personal guide to a healthier lifestyle. Start your fitness journey today!
              </p>
            </div>
            <div className="w-full max-w-sm">
              <h2 className="text-2xl font-bold mb-4">Get Started</h2>
              <p className="text-muted-foreground mb-6">Enter your details to begin your fitness journey.</p>
              <GetStartedForm />
            </div>
          </div>
        </div>
      </section>
    </main>

  )
}