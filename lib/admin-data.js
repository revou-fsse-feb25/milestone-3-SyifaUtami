//this is for admin data fetch
export async function fetchDashboardData() {
    console.log('🚀 Force fresh ISR fetch...');
    
    try {
      // ISR keeps returning 0 - force fresh fetch
      const timestamp = Date.now();
      const [productsRes, usersRes] = await Promise.all([
        fetch(`https://api.escuelajs.co/api/v1/products?_t=${timestamp}`, {
          next: { revalidate: 3600 },
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }),
        fetch(`https://api.escuelajs.co/api/v1/users?_t=${timestamp}`, {
          next: { revalidate: 3600 },
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate', 
            'Pragma': 'no-cache'
          }
        })
      ]);
      //error check.......
      console.log('📡 Fresh fetch results:');
      console.log('- Products status:', productsRes.status);
      console.log('- Users status:', usersRes.status);
      console.log('- Products content-length:', productsRes.headers.get('content-length'));
      console.log('- Users content-length:', usersRes.headers.get('content-length'));
  
      if (!productsRes.ok || !usersRes.ok) {
        throw new Error(`API failed: Products ${productsRes.status}, Users ${usersRes.status}`);
      }
  
      const [products, users] = await Promise.all([
        productsRes.json(),
        usersRes.json()
      ]);
      
      console.log('📦 Fresh data received:');
      console.log('- Products count:', products?.length);
      console.log('- Users count:', users?.length);
      
      if (!Array.isArray(products) || products.length === 0) {
        console.error('empty products array!');
        console.log('🔍 Products response body:', products);
        
        // in case ISR fails... try without ISR (bc sometimes it crashes :(...)
        console.log('Trying without ISR...');
        const fallbackRes = await fetch('https://api.escuelajs.co/api/v1/products', {
          cache: 'no-store'
        });
        const fallbackProducts = await fallbackRes.json();
        console.log('🔄 Fallback products count:', fallbackProducts?.length);
        
        if (fallbackProducts?.length > 0) {
          console.log('Using non-ISR data.');
          return processData(fallbackProducts, users);
        }
      }
  
      return processData(products, users);
  
    } catch (error) {
      console.error('💥 Error:', error);
      return null;
    }
  }
  
  function processData(products, users) {
    const totalProducts = Array.isArray(products) ? products.length : 0;
    const totalUsers = Array.isArray(users) ? users.length : 0;
    
    const categoryMap = {};
    if (totalProducts > 0) {
      products.forEach((product) => {
        if (product?.category?.name) {
          const catName = product.category.name;
          const catId = product.category.id || catName;
          
          if (!categoryMap[catId]) {
            categoryMap[catId] = {
              name: catName,
              count: 0,
              id: catId
            };
          }
          categoryMap[catId].count++;
        }
      });
    }
  
    const categoryStats = Object.values(categoryMap).map(category => ({
      ...category,
      percentage: totalProducts > 0 ? ((category.count / totalProducts) * 100).toFixed(1) : '0.0'
    }));
  
    categoryStats.sort((a, b) => b.count - a.count);
    
    return {
      totalProducts,
      totalUsers,
      totalCategories: categoryStats.length,
      avgProductsPerCategory: categoryStats.length > 0 ? Math.round(totalProducts / categoryStats.length) : 0,
      categoryStats,
      lastUpdated: new Date().toISOString()
    };
  }
  