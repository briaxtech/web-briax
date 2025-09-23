"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t border-border/40 py-6 md:py-8 px-4"
    >
      <div className="container max-w-4xl mx-auto text-center">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center mb-4">
          <img src="/briax-logo.png" alt="BrIAx" className="h-10 md:h-12 w-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground"
        >
          © Copyright 2025. All Rights Reserved.
        </motion.p>
      </div>
    </motion.footer>
  )
}
