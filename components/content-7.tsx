import { Cpu, Zap } from 'lucide-react'
import Image from 'next/image'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32" id="text-editor">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-center mx-auto">Write expressive notes with the Tiptap editor.</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24 items-center">
                    <div className="relative space-y-4">
                        <p className="text-muted-foreground">
                            Tiptap lets you create beautifully formatted notes. <span className="text-accent-foreground font-bold">From lists to code blocks</span>, craft content that’s truly yours.
                        </p>
                        <p className="text-muted-foreground">Built for productivity with rich formatting, markdown shortcuts, and intuitive controls all come together in a seamless editor.</p>

                        <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Zap className="size-4" />
                                    <h3 className="text-sm font-medium">Faaast</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">Tiptap is blazing fast and optimized for a smooth writing experience.</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Cpu className="size-4" />
                                    <h3 className="text-sm font-medium">Powerful</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">Supports collaborative editing, custom extensions, and full control.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-6 sm:mt-0">
                        <div className="bg-linear-to-b aspect-67/34 relative rounded-2xl ">
                            <Image src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/657c5d6268aea6c85dd4a066_tiptap-editor-hero.png" className="hidden rounded-[15px] dark:block" alt="payments illustration dark" width={1206} height={612} />
                            <Image src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/657c5d6268aea6c85dd4a066_tiptap-editor-hero.png" className="rounded-[15px] shadow dark:hidden" alt="payments illustration light" width={1206} height={612} />
                            {/* <Image src="/screenshot_2.png" className="hidden rounded-[15px] dark:block" alt="payments illustration dark" width={1206} height={612} />
                            <Image src="/screenshot_5.png" className="rounded-[15px] shadow dark:hidden" alt="payments illustration light" width={1206} height={612} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
