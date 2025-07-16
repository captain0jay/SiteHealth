'use client';

import React from 'react';
import { Work_Sans } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400'],
});

interface HeadingProps {
  title?: string;
  subtitle?: string;
}

export default function Heading({ title, subtitle }: HeadingProps) {
  return (
    <div className={workSans.className}>
      {subtitle && (
        <motion.p
          className="text-gray-600 text-xl mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}

      <div className="relative h-[48px] mb-4">
        <AnimatePresence mode="wait">
          {title && (
            <motion.h2
              key={title}
              className="text-4xl font-semibold absolute"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {title}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
