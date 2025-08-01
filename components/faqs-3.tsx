'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'clock',
            question: 'Are changes made in the text editor saved in real time?',
            answer:
            'Yes, all edits in the NotesApp editor are saved automatically in real time. You can close the app at any moment and your changes will be preserved in our secure database.',
        },
        {
            id: 'item-2',
            icon: 'log-in',
            question: 'How do I sign in or create an account?',
            answer:
            'You can sign in using your Google account or create a new account with your email and a password. Both options provide full access to your notes and notebooks.',
        },
        {
            id: 'item-3',
            icon: 'folder',
            question: 'Can I organize my notes into groups?',
            answer:
            'Absolutely. NotesApp lets you create multiple notebooks so you can organize related notes together. This is perfect for separating personal, work, or project-based content.',
        },
        {
            id: 'item-4',
            icon: 'shield',
            question: 'Is my data secure on NotesApp?',
            answer:
            'We take your privacy and data security seriously. All notes are stored in a secure cloud database and transmitted over encrypted connections.',
        },
        {
            id: 'item-5',
            icon: 'help-circle',
            question: 'What should I do if I run into issues?',
            answer:
            'If you experience any problems, you can reach out to our support team via the Help section in the app. We typically respond within 24 hours on business days.',
        },
    ]

    return (
        <section className="bg-muted dark:bg-background py-20" id="faq">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can&apos;t find what you&apos;re looking for? Contact our{' '}
                                <Link
                                    href="#"
                                    className="text-primary font-medium hover:underline">
                                    customer support team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
