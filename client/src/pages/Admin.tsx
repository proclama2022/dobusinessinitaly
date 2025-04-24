import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { apiRequest } from '@/lib/queryClient';
import { useTranslation } from 'react-i18next';

// Schema di validazione per il form
const blogPostSchema = z.object({
  title: z.string().min(5, { message: 'Il titolo deve essere di almeno 5 caratteri' }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Formato data non valido (YYYY-MM-DD)' }),
  category: z.string().min(2, { message: 'La categoria è obbligatoria' }),
  excerpt: z.string().min(10, { message: 'L\'estratto deve essere di almeno 10 caratteri' }),
  author: z.string().min(2, { message: 'L\'autore è obbligatorio' }),
  content: z.string().min(50, { message: 'Il contenuto deve essere di almeno 50 caratteri' }),
  slug: z.string().optional(),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

const AdminPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  // Inizializza il form con valori di default
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      date: new Date().toISOString().split('T')[0], // Data odierna in formato YYYY-MM-DD
      category: '',
      excerpt: '',
      author: '',
      content: '',
      slug: '',
    },
  });

  // Gestione del caricamento dell'immagine
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImageFile(file);
      
      // Crea un'anteprima dell'immagine
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Invio del form
  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Step 1: Se c'è un'immagine, la carica prima
      let coverImageUrl = '';
      
      if (coverImageFile) {
        const formData = new FormData();
        formData.append('image', coverImageFile);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Errore durante il caricamento dell\'immagine');
        }
        
        const uploadResult = await uploadResponse.json();
        coverImageUrl = uploadResult.imageUrl;
      } else {
        // Se non è stata caricata un'immagine, usa un'immagine di placeholder
        coverImageUrl = 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
      }
      
      // Step 2: Salva il post del blog
      const response = await apiRequest('/api/blog', {
        method: 'POST',
        body: JSON.stringify({
          meta: {
            title: data.title,
            date: data.date,
            category: data.category,
            excerpt: data.excerpt,
            coverImage: coverImageUrl,
            author: data.author,
          },
          content: data.content,
          slug: data.slug || undefined,
        }),
      });
      
      if (response.success) {
        toast({
          title: 'Articolo pubblicato',
          description: 'L\'articolo è stato pubblicato con successo.',
        });
        
        // Reset del form
        form.reset();
        setCoverImageFile(null);
        setCoverImagePreview(null);
      } else {
        throw new Error(response.message || 'Errore durante il salvataggio dell\'articolo');
      }
    } catch (error: any) {
      toast({
        title: 'Errore',
        description: error.message || 'Si è verificato un errore durante la pubblicazione dell\'articolo',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Amministrazione Blog</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Nuovo Articolo</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Titolo */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titolo</FormLabel>
                    <FormControl>
                      <Input placeholder="Inserisci il titolo dell'articolo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Slug (opzionale) */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug URL (opzionale)</FormLabel>
                    <FormControl>
                      <Input placeholder="url-personalizzato" {...field} />
                    </FormControl>
                    <FormDescription>
                      Se non specificato, verrà generato dal titolo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Data */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Categoria */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="Es. Fiscalità, Startup, Consulenza" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Autore */}
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Autore</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome dell'autore" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Immagine di copertina */}
              <div>
                <Label htmlFor="coverImage">Immagine di copertina</Label>
                <Input 
                  id="coverImage" 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1"
                />
                {coverImagePreview && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Anteprima:</p>
                    <img 
                      src={coverImagePreview} 
                      alt="Anteprima" 
                      className="h-32 object-cover rounded-md" 
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Estratto */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estratto</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Breve descrizione dell'articolo (comparirà nelle anteprime)" 
                      {...field}
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Contenuto */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenuto</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Scrivi il contenuto dell'articolo utilizzando la sintassi Markdown" 
                      {...field}
                      rows={15}
                      className="font-mono"
                    />
                  </FormControl>
                  <FormDescription>
                    Utilizza la sintassi Markdown per formattare il testo. Esempio: # Titolo, ## Sottotitolo, **grassetto**, *corsivo*, - punto elenco
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Pubblicazione in corso...' : 'Pubblica articolo'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminPage;