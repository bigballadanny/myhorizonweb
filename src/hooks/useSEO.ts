import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  schema?: Record<string, any>;
}

export function useSEO({ title, description, keywords, schema }: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // 4. Update or Inject JSON-LD Schema (Crucial for Generative Engine Optimization - GEO)
    if (schema) {
      const scriptId = 'geo-json-ld';
      let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.text = JSON.stringify(schema);
    }

    // Cleanup function if needed, but usually we just overwrite on next route
  }, [title, description, keywords, schema]);
}
