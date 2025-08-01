import Image from 'next/image'
import Link from 'next/link'

export default function CommunitySection() {
    return (
        <section className="py-16 md:py-32" id='community'>
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">
                        Built by the Community <br /> for the Community
                    </h2>
                    <p className="mt-6">Our application is shaped by the people who use it. Every feature, improvement,<br />and idea comes from real feedback and shared goals.</p>
                </div>
                <div className="mx-auto mt-12 flex max-w-lg flex-wrap justify-center gap-3">
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://randomuser.me/api/portraits/men/2.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://randomuser.me/api/portraits/men/3.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://avatars.githubusercontent.com/u/33433388?v=4" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://randomuser.me/api/portraits/men/5.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://randomuser.me/api/portraits/men/6.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://randomuser.me/api/portraits/men/7.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://randomuser.me/api/portraits/men/8.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://randomuser.me/api/portraits/men/9.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/mister-fix" target="_blank" title="Stephen Mwingira" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <Image alt="John Doe" src="https://randomuser.me/api/portraits/men/10.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
