'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle } from 'react-icons/fa'
import { SignInButton } from '@clerk/nextjs'

export default function LoginComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const form = event.target as HTMLFormElement
    const email = (form.email as HTMLInputElement).value
    const password = (form.password as HTMLInputElement).value

    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Credenciales inválidas o error del servidor.')
      }

      const data = await response.json()
      console.log('Usuario autenticado:', data)

      
    } catch {
      console.error('Error al iniciar sesión:')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 bg-[url('/fondo.webp')] bg-cover bg-center">
      <div className="w-full max-w-4xl flex bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-6">Iniciar Sesión</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" placeholder="correo@ejemplo.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" required type="password" />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-amber-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-amber-600">O continúa con</span>
              </div>
            </div>
            <SignInButton
  mode="modal"
  className="w-full mt-4 text-amber-800 border-amber-300 hover:bg-amber-100-br-20"
  type= "button"
>
  Inicia sesion con Google o Apple
</SignInButton>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/restaurant-interior.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-amber-900/60"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-amber-100 mb-4 drop-shadow-lg">Descubre el Sabor</h2>
              <p className="text-amber-50 text-lg drop-shadow">
                La cocina es un lenguaje mediante el cual se expresa armonía, creatividad, felicidad, belleza, poesía, complejidad, magia, humor, provocación, cultura.
              </p>
              <p className="text-amber-200 mt-2 drop-shadow">- Alain Ducasse</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
