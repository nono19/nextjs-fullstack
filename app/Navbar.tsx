'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { use } from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'

const Navbar = () => {
  const currentPath = usePathname() //hook

  const links = [
    { label : 'Dashboard', href: '/' },
    { label : 'Issues', href: '/issues' },
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 p-5 h-4 items-center'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => 
          <Link 
            key={ link.href } 
            className={classNames({
              'text-zinc-900' : link.href === currentPath, //jika sama dengan current path dibuat tebal
              'text-zinc-500' : link.href !== currentPath, // jika tidak sama dibuat buram
              'hover:text-zinc-800 transition-colors' : true, // css tailwind yg akan dirender tetap
            })}
            href={link.href}
            >
              {link.label}
          </Link>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
