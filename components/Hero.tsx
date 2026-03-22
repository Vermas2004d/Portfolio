import React from 'react'
import Image from 'next/image'
import { Spotlight } from './ui/Spotlight'
import { cn } from '@/lib/utils'
import { TextGenerateEffect } from './ui/text-generate-effect'
import MagicButton from './ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa'

const Hero = () => {
  return (
    <section className='relative min-h-screen pb-20 pt-24 overflow-clip'>
      <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill='white' />
      <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple' />
      <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' />

      <div className='absolute inset-0 flex items-center justify-center bg-white dark:bg-black-100/80'>
        <div
          className={cn(
            'absolute inset-0',
            '[background-size:40px_40px]',
            '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
            'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
          )}
        />
        <div className='pointer-events-none absolute inset-0 bg-white/70 dark:bg-black-100/70 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />
      </div>

      <div className='relative z-10 mx-auto flex w-[95vw] max-w-6xl flex-col gap-8 lg:flex-row lg:items-center'>
        <div className='absolute -top-5 left-8 rounded-lg border border-cyan-300/40 bg-black/70 px-3 py-1 text-xs font-mono text-cyan-100 backdrop-blur-lg shadow-lg animate-[pulse_4s_ease-in-out_infinite]'>
          <span className='text-emerald-300'>const</span> stack = ["React", "Next.js", "TypeScript"]
        </div>
        <div className='absolute top-20 right-8 rounded-lg border border-violet-300/40 bg-black/70 px-3 py-1 text-xs font-mono text-violet-100 backdrop-blur-lg shadow-lg animate-[pulse_4s_ease-in-out_infinite]'>
          <span className='text-fuchsia-200'>if</span> (user.experience &gt; 90) {'{'} hire = true {'}'}
        </div>
        
        <div className='absolute bottom-20 right-6 rounded-lg border border-green-300/40 bg-black/70 px-3 py-1 text-xs font-mono text-green-100 backdrop-blur-lg shadow-lg animate-[pulse_4s_ease-in-out_infinite]'>
          <span className='text-cyan-200'>let</span> performance = "99%";
        </div>

        <div className='space-y-6 lg:w-1/2'>
         

          <TextGenerateEffect
            className='text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl'
            words='Transforming Concepts into Seamless User Experiences'
          />

          <p className='text-base text-gray-700 dark:text-gray-300 md:text-lg'>
            Hi, I&apos;m Madhav — a Next.js Developer from India who blends performance, design and user-first thinking into every project.
          </p>

          <ul className='space-y-2 text-sm text-gray-600 dark:text-gray-300 md:text-base'>
            <li>• <strong>Frontend engineering:</strong> React, Next.js, TypeScript</li>
            <li>• <strong>UX-focused implementations:</strong> responsive design, accessibility, animation</li>
            <li>• <strong>Deploy & scale:</strong> Vercel, CI/CD, performance optimizations</li>
          </ul>

          <div className='flex flex-wrap gap-3'>
            <a href='#projects'>
              <MagicButton title='Show my work' icon={<FaLocationArrow />} position='right' />
            </a>
            <a href='/resume.pdf' download>
              <MagicButton title='Download CV' icon={<FaLocationArrow />} position='right' />
            </a>
          </div>
        </div>

        <div className='relative lg:w-1/2'>
          <div className='absolute -top-8 left-4 z-30 rounded-lg border border-cyan-400/40 bg-black/80 px-3 py-1 text-xs tracking-wide text-cyan-100 shadow-lg backdrop-blur-sm ring ring-cyan-200/20 animate-[pulse_3s_ease-in-out_infinite]'>
            <span className='font-mono text-green-300'>0xFEEDBEEF:</span> <span className='text-sky-200'>React</span>, <span className='text-violet-200'>Next.js</span>, <span className='text-cyan-200'>TypeScript</span>
          </div>

          <div className='relative overflow-hidden rounded-3xl border-2 border-cyan-400/40 bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#9333ea] p-5 shadow-[0_35px_60px_-35px_rgba(148,163,184,0.65)]'>
            <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(168,85,247,0.14),rgba(139,92,246,0.18))]' />
            <div className='absolute inset-0 bg-violet-500/8 backdrop-blur-sm' />

            <div className='absolute inset-0 scale-[1.15] rounded-3xl border border-fuchsia-400/35 opacity-60 blur-sm animate-[pulse_4s_ease-in-out_infinite]' />
            <div className='absolute -inset-7 rounded-[36px] border border-cyan-300/30 opacity-50 animate-[spin_18s_linear_infinite]' />

            <div className='relative z-10 flex h-full items-center justify-center p-3'>
              <div className='relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-tr from-slate-900/80 to-indigo-950/80 p-1 shadow-2xl'>
                <Image
                  src='/profile.jpg'
                  alt='Madhav profile picture'
                  width={1000}
                  height={1000}
                  className='h-70 w-full max-h-[420px] object-cover transition duration-700 ease-in-out hover:scale-105 hover:brightness-110'
                  priority
                />
              </div>
              <div className='absolute -bottom-3 right-4 rounded-xl bg-black/35 px-3 py-1 text-xs font-medium text-cyan-100 backdrop-blur-lg shadow-sm'>Web Dev + UI/UX + Performance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero