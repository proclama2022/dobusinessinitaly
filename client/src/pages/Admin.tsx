import { useEffect } from 'react';

const AdminPage = () => {

  useEffect(() => {
    // Per motivi di sicurezza, la pagina admin è stata temporaneamente disabilitata
    // Reindirizzo alla home page dopo 3 secondi
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            🔒 Accesso Negato
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Per motivi di sicurezza, l'area admin è stata temporaneamente disabilitata.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            Reindirizzamento alla home page in corso...
          </p>
          <p className="mt-2 text-xs text-red-600">
            Se sei un amministratore autorizzato, contatta il supporto tecnico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
