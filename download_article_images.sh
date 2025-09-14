#!/bin/bash
# Script per scaricare e salvare le immagini degli articoli localmente

echo "📥 Scaricando immagini degli articoli..."

# Crea la cartella per le immagini
mkdir -p public/images/articles

# Lista delle immagini da scaricare
images=(
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1554224154-26032fce8d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
)

# Nomi dei file locali
names=(
    "business-office-1.jpg"
    "tax-finance-1.jpg"
    "legal-documents-1.jpg"
    "professional-1.jpg"
    "team-meeting-1.jpg"
    "calculator-finance-1.jpg"
    "documents-paperwork-1.jpg"
    "data-analytics-1.jpg"
    "business-strategy-1.jpg"
    "office-work-1.jpg"
)

# Scarica le immagini
for i in "${!images[@]}"; do
    echo "📥 Scaricando ${names[$i]}..."
    curl -o "public/images/articles/${names[$i]}" "${images[$i]}"
done

echo "✅ Immagini scaricate in public/images/articles/"
echo "🔄 Ora puoi aggiornare gli articoli per usare le immagini locali"
