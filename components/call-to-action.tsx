import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Icon } from './ui/icon'

export default function CallToAction() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Ready to start writing?</h2>
                    <p className="mt-4">Capture ideas big and small, all in one place.</p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <Link href="/">
                                <span>Try for free</span>
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <Link href="/">
                                <span className="flex items-center gap-x-1">Request a demo <Icon name="ArrowRight" size={18} /></span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
