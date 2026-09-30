import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App.jsx';

function addTask(title) {
  fireEvent.change(screen.getByLabelText('Nouvelle tâche'), { target: { value: title } });
  fireEvent.click(screen.getByRole('button', { name: 'ajouter' }));
}

test('affiche le texte Ajouter sur le bouton', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'Ajouter' })).toHaveTextContent(/^Ajouter$/);
});

test('affiche une liste vide et refuse les tâches vides', () => {
  render(<App />);
  addTask('   ');
  expect(screen.getByText('Aucune tâche pour le moment.')).toBeInTheDocument();
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
});

test('ajoute, termine, réactive et supprime une tâche sans affecter les autres', () => {
  render(<App />);
  addTask('  Acheter du pain  ');
  addTask('Lire');
  expect(screen.getByLabelText('Nouvelle tâche')).toHaveValue('');
  const checkbox = screen.getByRole('checkbox', { name: 'Acheter du pain' });
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(screen.getByText('1 tâche(s) restante(s)')).toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: 'Lire' })).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  fireEvent.click(screen.getByRole('button', { name: 'Supprimer Acheter du pain' }));
  expect(screen.queryByText('Acheter du pain')).not.toBeInTheDocument();
  expect(screen.getByText('Lire')).toBeInTheDocument();
});
