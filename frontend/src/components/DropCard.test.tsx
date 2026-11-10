import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import { DropCard } from './DropCard'
import type { Drop } from '../api'

// Éviter les dépendances au fonctionnement du compte à rebours
vi.mock('./Countdown', () => ({
  Countdown: () => <div>Compte à rebours</div>,
}))

describe('DropCard', () => {
  const drop: Drop = {
    id: 1,
    product: 'Nike Air Max 1',
    description: 'Edition limitée',
    price_cents: 18000,
    stock: 100,
    remaining: 42,
    opens_at: '2026-12-01T09:00:00Z',
    status: 'live',
  }

  it('affiche le produit', () => {
    render(
      <MemoryRouter>
        <DropCard drop={drop} />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: 'Nike Air Max 1' }),
    ).toBeInTheDocument()
  })

  it('affiche le prix', () => {
    render(
      <MemoryRouter>
        <DropCard drop={drop} />
      </MemoryRouter>,
    )

    expect(screen.getByText('180,00 €')).toBeInTheDocument()
  })

  it('affiche le stock restant', () => {
    render(
      <MemoryRouter>
        <DropCard drop={drop} />
      </MemoryRouter>,
    )

    expect(
      screen.getByText('42 / 100 paires restantes'),
    ).toBeInTheDocument()
  })

  it('affiche le statut du drop', () => {
    render(
      <MemoryRouter>
        <DropCard drop={drop} />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('drop-card')).toBeInTheDocument()

    // Vérifie le badge de statut.
    expect(screen.getByText(/en cours|live/i)).toBeInTheDocument()
  })
})