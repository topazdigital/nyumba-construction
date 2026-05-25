import React from 'react';
import MagazineHero from '../components/Home/MagazineHero';
import FeaturedArticles from '../components/Home/FeaturedArticles';
import FeaturedProperties from '../components/Home/FeaturedProperties';
import Sidebar from '../components/Home/Sidebar';

const Home: React.FC = () => {
  return (
    <div>
      <MagazineHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <FeaturedArticles />
            <div className="mt-16">
              <FeaturedProperties />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;