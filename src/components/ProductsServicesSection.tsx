/**
 * Products & Services Section
 * Main wrapper component that handles routing between:
 * - Overview (grid of products)
 * - Analyzer (add new product)
 * - Detail (view product details)
 */

import React, { useState } from 'react';
import { ProductsServicesOverview } from './ProductsServicesOverview';
import { ProductServiceAnalyzerNew } from './ProductServiceAnalyzerNew';
import { ProductDetailPage } from './ProductDetailPage';

type Page = 'overview' | 'analyzer' | 'detail';

export function ProductsServicesSection() {
  const [currentPage, setCurrentPage] = useState<Page>('overview');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleNavigate = (page: Page, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
  };

  const handleAnalysisComplete = (data: any) => {
    // In real app, save data to context/database
    console.log('Product data:', data);
    // Navigate to detail page
    setCurrentPage('detail');
    setSelectedProductId('1'); // Mock ID
  };

  return (
    <>
      {currentPage === 'overview' && (
        <ProductsServicesOverview
          onNavigate={(page, productId) => {
            if (page === 'analyzer') {
              handleNavigate('analyzer');
            } else if (page === 'detail' && productId) {
              handleNavigate('detail', productId);
            }
          }}
        />
      )}

      {currentPage === 'analyzer' && (
        <ProductServiceAnalyzerNew
          onComplete={handleAnalysisComplete}
          onBack={() => handleNavigate('overview')}
        />
      )}

      {currentPage === 'detail' && selectedProductId && (
        <ProductDetailPage
          productId={selectedProductId}
          onBack={() => handleNavigate('overview')}
          onEdit={() => handleNavigate('analyzer')}
        />
      )}
    </>
  );
}
