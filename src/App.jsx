import React, { useState } from 'react';
import { ShoppingCart, X, Menu, Home, Mail } from 'lucide-react';

export default function DecoLazerShop() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const products = [
    {
      id: 1,
      name: 'Bouteille en Cuivre Martelé',
      price: 120,
      image: '🍶',
      description: 'Bouteille traditionnelle en cuivre martelé à la main, parfaite pour l\'eau ou le thé.',
      category: 'Bouteilles'
    },
    {
      id: 2,
      name: 'Bracelet Cuivre Artisanal',
      price: 50,
      image: '✨',
      description: 'Bracelet en cuivre massif, travail traditionnel marocain.',
      category: 'Bijoux'
    },
    {
      id: 3,
      name: 'Plateau Rond en Cuivre',
      price: 250,
      image: '🥘',
      description: 'Grand plateau décoratif en cuivre ciselé, pour présenter le thé ou les dates.',
      category: 'Plateaux'
    },
    {
      id: 4,
      name: 'Tajine Traditionnel',
      price: 450,
      image: '🍲',
      description: 'Tajine en terre cuite avec couvercle pointu, authentique Fès.',
      category: 'Tajines'
    },
    {
      id: 5,
      name: 'Vase Bulbeux',
      price: 180,
      image: '🏺',
      description: 'Vase décoratif en cuivre avec gravures géométriques fines.',
      category: 'Vases'
    },
    {
      id: 6,
      name: 'Petit Plateau Hexagonal',
      price: 150,
      image: '🪔',
      description: 'Plateau hexagonal en cuivre, motifs géométriques traditionnels.',
      category: 'Plateaux'
    },
    {
      id: 7,
      name: 'Bougeoir en Cuivre',
      price: 85,
      image: '🕯️',
      description: 'Bougeoir décoratif, idéal pour les ambiances chaleureuses.',
      category: 'Décoration'
    },
    {
      id: 8,
      name: 'Collier Cuivre Femme',
      price: 75,
      image: '⭐',
      description: 'Collier élégant en cuivre, pièce unique faite à la main.',
      category: 'Bijoux'
    }
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    const cartSummary = cart.map(item => 
      `${item.name} × ${item.quantity} = ${item.price * item.quantity} DH`
    ).join('\n');
    
    const form = new FormData();
    form.append('name', orderForm.name);
    form.append('email', orderForm.email);
    form.append('phone', orderForm.phone);
    form.append('address', orderForm.address);
    form.append('products', cartSummary);
    form.append('total', cartTotal + ' DH');
    
    try {
      await fetch('https://formsubmit.co/adamchb2006@gmail.com', {
        method: 'POST',
        body: form
      });
      
      alert(`Merci ${orderForm.name}! Votre commande a été envoyée avec succès. Nous vous contacterons bientôt.`);
      setCart([]);
      setOrderForm({ name: '', email: '', phone: '', address: '' });
      setCurrentPage('home');
    } catch (error) {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  };

  const renderHome = () => (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 py-16 md:py-24 px-4 border-b-4 border-amber-700">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-950 mb-4">
            Déco Lazer
          </h1>
          <p className="text-xl text-amber-800 mb-8 font-light">
            Artisanat Marocain Authentique en Cuivre
          </p>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre collection d'objets d'art traditionnels fabriqués à la main. Chaque pièce raconte une histoire de savoir-faire ancestral marocain.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-amber-950 mb-12 text-center">
            Nos Produits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-white to-amber-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100 hover:border-amber-400"
              >
                <div className="bg-gradient-to-b from-amber-100 to-orange-50 h-32 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-serif font-bold text-amber-950 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-amber-700 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-serif font-bold text-amber-700">
                      {product.price} DH
                    </span>
                    <span className="text-xs bg-amber-700 text-white px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-semibold py-2 px-4 rounded transition-all duration-200 transform hover:scale-105"
                  >
                    Ajouter au Panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="py-16 px-4 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-amber-950 mb-8">À Propos de Déco Lazer</h2>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-amber-700">
          <h3 className="text-2xl font-serif font-bold text-amber-950 mb-4">Notre Histoire</h3>
          <p className="text-amber-900 leading-relaxed mb-4">
            Depuis plus de 20 ans, Déco Lazer perpétue la tradition ancestrale de l'artisanat marocain. 
            Chaque produit est façonné à la main par nos artisans expérimentés, utilisant des techniques 
            transmises de génération en génération.
          </p>
          <p className="text-amber-900 leading-relaxed">
            Nous nous engageons à offrir des pièces authentiques, de qualité supérieure, qui apportent 
            chaleur et beauté à votre intérieur.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-amber-700">
          <h3 className="text-2xl font-serif font-bold text-amber-950 mb-4">Nos Valeurs</h3>
          <ul className="space-y-3 text-amber-900">
            <li className="flex items-start">
              <span className="text-amber-700 mr-3 text-xl">✓</span>
              <span><strong>Authenticité :</strong> Travail 100% manuel et traditionnel</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-700 mr-3 text-xl">✓</span>
              <span><strong>Qualité :</strong> Les meilleurs matériaux et finitions</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-700 mr-3 text-xl">✓</span>
              <span><strong>Équité :</strong> Rémunération juste pour nos artisans</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-700 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Questions ?</h3>
          <p className="mb-4">Contactez-nous par email ou téléphone pour toute demande spéciale ou information.</p>
          <a href="mailto:adamchb2006@gmail.com" className="text-amber-100 hover:text-white font-semibold">
            adamchb2006@gmail.com
          </a>
        </div>
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="py-16 px-4 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-amber-950 mb-8">Votre Panier</h2>
        
        {cart.length === 0 ? (
          <div className="bg-amber-50 rounded-lg p-8 text-center border-2 border-dashed border-amber-300">
            <ShoppingCart className="w-16 h-16 text-amber-400 mx-auto mb-4 opacity-50" />
            <p className="text-amber-900 text-lg mb-4">Votre panier est vide</p>
            <button
              onClick={() => { setCurrentPage('home'); setShowCart(false); }}
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-6 rounded transition-all"
            >
              Continuer les Achats
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="bg-gradient-to-r from-amber-50 to-white p-4 rounded-lg border border-amber-200 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-amber-950">{item.name}</h3>
                    <p className="text-sm text-amber-700">{item.price} DH × {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-3 mr-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-amber-700 text-white hover:bg-amber-800"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-amber-950">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-amber-700 text-white hover:bg-amber-800"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-amber-950 w-24 text-right">
                    {item.price * item.quantity} DH
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-amber-700 text-white p-6 rounded-lg mb-8">
              <div className="text-right">
                <p className="text-amber-100 mb-2">Sous-total: {cartTotal} DH</p>
                <p className="text-3xl font-serif font-bold">Total: {cartTotal} DH</p>
              </div>
            </div>

            <form onSubmit={handleOrderSubmit} className="bg-white border-2 border-amber-700 rounded-lg p-6">
              <h3 className="text-2xl font-serif font-bold text-amber-950 mb-6">Informations de Livraison</h3>
              
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Votre Nom"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-700 bg-amber-50"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={orderForm.email}
                  onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-700 bg-amber-50"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-700 bg-amber-50"
                />
                <textarea
                  placeholder="Adresse Complète"
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-700 bg-amber-50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                Passer la Commande
              </button>
              <p className="text-xs text-amber-700 text-center mt-4">
                Vous recevrez un email de confirmation. Nous vous contacterons pour organiser le paiement.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-amber-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🏺</div>
            <h1 className="text-2xl font-serif font-bold">Déco Lazer</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => { setCurrentPage('home'); setShowCart(false); }}
              className={`flex items-center gap-2 hover:text-amber-200 transition ${currentPage === 'home' ? 'text-amber-200' : ''}`}
            >
              <Home size={20} /> Accueil
            </button>
            <button
              onClick={() => { setCurrentPage('about'); setShowCart(false); }}
              className={`flex items-center gap-2 hover:text-amber-200 transition ${currentPage === 'about' ? 'text-amber-200' : ''}`}
            >
              <Mail size={20} /> À Propos
            </button>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative flex items-center gap-2 hover:text-amber-200 transition bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-lg"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center gap-2"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-amber-900 px-4 py-4 space-y-3">
            <button
              onClick={() => { setCurrentPage('home'); setMenuOpen(false); }}
              className="block w-full text-left py-2 hover:text-amber-200"
            >
              Accueil
            </button>
            <button
              onClick={() => { setCurrentPage('about'); setMenuOpen(false); }}
              className="block w-full text-left py-2 hover:text-amber-200"
            >
              À Propos
            </button>
            <button
              onClick={() => { setShowCart(!showCart); setMenuOpen(false); }}
              className="block w-full text-left py-2 hover:text-amber-200"
            >
              Panier ({cartCount})
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      {showCart ? renderCart() : (currentPage === 'about' ? renderAbout() : renderHome())}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 to-amber-950 text-amber-50 py-12 px-4 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Déco Lazer</h3>
              <p className="text-amber-100 text-sm">Artisanat Marocain Authentique</p>
            </div>
            <div>
              <h3 className="font-serif font-bold mb-4">Horaires</h3>
              <p className="text-amber-100 text-sm">Lun - Dimanche : 9h - 18h</p>
              <p className="text-amber-100 text-sm">Vendredi : Fermé</p>
            </div>
            <div>
              <h3 className="font-serif font-bold mb-4">Contact</h3>
              <p className="text-amber-100 text-sm">📧 adamchb2006@gmail.com</p>
              <p className="text-amber-100 text-sm">📱 +212 613291567</p>
            </div>
          </div>
          <div className="border-t border-amber-800 pt-8 text-center text-amber-200 text-sm">
            <p>&copy; 2024 Déco Lazer. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
