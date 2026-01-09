import { useState, useEffect } from 'react';
import OptimizedImage from '@/components/OptimizedImage';

const AdminPage = () => {
  const [input, setInput] = useState('');
  const [authenticated, setAuthenticated] = useState(() => {
    return !!localStorage.getItem('admin-auth');
  });
  const [password, setPassword] = useState(() => {
    return localStorage.getItem('admin-auth') || '';
  });
  const [error, setError] = useState('');

  // Stato per il form di upload
  const [form, setForm] = useState({
    title: '',
    date: '',
    category: '',
    excerpt: '',
    coverImage: '',
    author: '',
    content: '',
  });
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Stato per lista articoli
  const [posts, setPosts] = useState<{ slug: string; title: string; date: string; }[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      localStorage.setItem('admin-auth', input);
      setPassword(input);
      setAuthenticated(true);
      setError('');
    } else {
      setError('Inserisci una password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    setAuthenticated(false);
    setPassword('');
    setInput('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadMsg('');
    // Genera uno slug semplice dal titolo
    const slug = form.title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`,
        },
        body: JSON.stringify({
          meta: {
            title: form.title,
            date: form.date,
            category: form.category,
            excerpt: form.excerpt,
            coverImage: form.coverImage,
            author: form.author,
          },
          content: form.content,
          slug,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setUploadMsg('Articolo caricato con successo!');
        setForm({ title: '', date: '', category: '', excerpt: '', coverImage: '', author: '', content: '' });
      } else {
        setUploadMsg('Errore: ' + (data.message || 'Impossibile caricare l\'articolo.'));
      }
    } catch (err) {
      setUploadMsg('Errore di rete o server.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setForm({ ...form, coverImage: data.data.path });
        setUploadMsg('Immagine caricata con successo!');
      } else {
        setUploadMsg('Errore caricamento immagine: ' + (data.message || 'Errore sconosciuto'));
      }
    } catch (err) {
      setUploadMsg('Errore di rete durante upload immagine.');
    } finally {
      setUploadingImage(false);
    }
  };

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch('/api/blog?lang=all');
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error('Errore fetch posts', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchPosts();
    }
  }, [authenticated]);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Confermi eliminazione dell'articolo ${slug}?`)) return;
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${password}` }
      });
      const data = await res.json();
      if (data.success) {
        setPosts(p => p.filter(post => post.slug !== slug));
        alert('Articolo eliminato e sitemap aggiornata');
      } else {
        alert('Errore: ' + data.message);
      }
    } catch (err) {
      alert('Errore rete');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="max-w-md w-full space-y-8 text-center bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Accesso Amministratore</h2>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded mb-2"
            placeholder="Password"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="w-full bg-primary text-white py-2 rounded font-semibold">Entra</button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Area Admin Blog</h2>
        <button onClick={handleLogout} className="text-sm text-red-600 underline mb-4">Logout</button>
        {/* Lista articoli esistenti */}
        <div className="text-left mb-8">
          <h3 className="text-lg font-bold mb-2">Articoli esistenti</h3>
          {loadingPosts ? <div>Caricamento...</div> : (
            <ul className="space-y-1 max-h-64 overflow-y-auto border rounded p-2">
              {posts.map(post => (
                <li key={post.slug} className="flex justify-between items-center text-sm">
                  <span>{post.title || post.slug}</span>
                  <button onClick={() => handleDelete(post.slug)} className="text-red-600 underline">Elimina</button>
                </li>
              ))}
              {posts.length === 0 && <li>Nessun articolo</li>}
            </ul>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block font-medium mb-1">Titolo</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Data</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Categoria</label>
            <input name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Excerpt (riassunto breve)</label>
            <input name="excerpt" value={form.excerpt} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Immagine di copertina</label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border rounded px-3 py-2"
                disabled={uploadingImage}
              />
              {uploadingImage && <div className="text-blue-600 text-sm">Caricamento immagine...</div>}
              <input
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="URL immagine (si popola automaticamente dopo upload)"
                readOnly
              />
              {form.coverImage && (
                <OptimizedImage
                  src={form.coverImage}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded mt-2"
                  width={80}
                  height={80}
                />
              )}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Autore</label>
            <input name="author" value={form.author} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Contenuto (Markdown)</label>
            <textarea name="content" value={form.content} onChange={handleChange} className="w-full border rounded px-3 py-2 min-h-[120px]" required />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded font-semibold" disabled={uploading}>
            {uploading ? 'Caricamento...' : 'Carica Articolo'}
          </button>
          {uploadMsg && <div className={uploadMsg.startsWith('Errore') ? 'text-red-600 mt-2' : 'text-green-600 mt-2'}>{uploadMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
