/*
  # Construction Platform Database Schema

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `featured_image` (text, nullable)
      - `category` (text)
      - `author` (text)
      - `published` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `location` (text)
      - `property_type` (text)
      - `bedrooms` (integer, nullable)
      - `bathrooms` (integer, nullable)
      - `area` (numeric, nullable)
      - `images` (text array)
      - `contact_info` (text)
      - `published` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `professionals`
      - `id` (uuid, primary key)
      - `name` (text)
      - `profession` (text)
      - `company` (text)
      - `description` (text)
      - `contact_email` (text)
      - `contact_phone` (text, nullable)
      - `location` (text)
      - `specialties` (text array)
      - `experience_years` (integer, nullable)
      - `profile_image` (text, nullable)
      - `verified` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `contractors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `company` (text)
      - `contractor_type` (text)
      - `description` (text)
      - `contact_email` (text)
      - `contact_phone` (text, nullable)
      - `location` (text)
      - `services` (text array)
      - `license_number` (text, nullable)
      - `verified` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `materials_suppliers`
      - `id` (uuid, primary key)
      - `company_name` (text)
      - `contact_person` (text)
      - `material_categories` (text array)
      - `description` (text)
      - `contact_email` (text)
      - `contact_phone` (text, nullable)
      - `location` (text)
      - `website` (text, nullable)
      - `verified` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own content
    - Add policies for public read access to published content
*/

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  featured_image text,
  category text NOT NULL,
  author text NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  location text NOT NULL,
  property_type text NOT NULL,
  bedrooms integer,
  bathrooms integer,
  area numeric,
  images text[] DEFAULT '{}',
  contact_info text NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create professionals table
CREATE TABLE IF NOT EXISTS professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  profession text NOT NULL,
  company text NOT NULL,
  description text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  location text NOT NULL,
  specialties text[] DEFAULT '{}',
  experience_years integer,
  profile_image text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contractors table
CREATE TABLE IF NOT EXISTS contractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  contractor_type text NOT NULL,
  description text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  location text NOT NULL,
  services text[] DEFAULT '{}',
  license_number text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create materials_suppliers table
CREATE TABLE IF NOT EXISTS materials_suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_person text NOT NULL,
  material_categories text[] DEFAULT '{}',
  description text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  location text NOT NULL,
  website text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials_suppliers ENABLE ROW LEVEL SECURITY;

-- Create policies for articles
CREATE POLICY "Articles are viewable by everyone when published"
  ON articles
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage articles"
  ON articles
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for properties
CREATE POLICY "Properties are viewable by everyone when published"
  ON properties
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for professionals
CREATE POLICY "Professionals are viewable by everyone when verified"
  ON professionals
  FOR SELECT
  USING (verified = true);

CREATE POLICY "Authenticated users can manage professionals"
  ON professionals
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for contractors
CREATE POLICY "Contractors are viewable by everyone when verified"
  ON contractors
  FOR SELECT
  USING (verified = true);

CREATE POLICY "Authenticated users can manage contractors"
  ON contractors
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for materials_suppliers
CREATE POLICY "Materials suppliers are viewable by everyone when verified"
  ON materials_suppliers
  FOR SELECT
  USING (verified = true);

CREATE POLICY "Authenticated users can manage materials suppliers"
  ON materials_suppliers
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS articles_category_idx ON articles(category);
CREATE INDEX IF NOT EXISTS articles_published_idx ON articles(published);
CREATE INDEX IF NOT EXISTS articles_created_at_idx ON articles(created_at DESC);

CREATE INDEX IF NOT EXISTS properties_type_idx ON properties(property_type);
CREATE INDEX IF NOT EXISTS properties_published_idx ON properties(published);
CREATE INDEX IF NOT EXISTS properties_price_idx ON properties(price);

CREATE INDEX IF NOT EXISTS professionals_profession_idx ON professionals(profession);
CREATE INDEX IF NOT EXISTS professionals_verified_idx ON professionals(verified);

CREATE INDEX IF NOT EXISTS contractors_type_idx ON contractors(contractor_type);
CREATE INDEX IF NOT EXISTS contractors_verified_idx ON contractors(verified);

CREATE INDEX IF NOT EXISTS materials_suppliers_verified_idx ON materials_suppliers(verified);