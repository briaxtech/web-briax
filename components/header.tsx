"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40"
    >
      <div className="container flex h-12 md:h-14 lg:h-16 items-center justify-between px-3 md:px-4 max-w-7xl mx-auto">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
          <img src="/briax-logo.png" alt="BrIAx" className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto" />
        </motion.div>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {["Productos", "Servicios", "Beneficios", "Recursos", "Precios"].map((item, index) => (
            <motion.a
              key={item}
              href="#"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="bg-primary hover:bg-primary/90 text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 md:py-2">
            Solicitar acceso
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}
