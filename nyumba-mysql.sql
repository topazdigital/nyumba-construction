-- ============================================================
-- Nyumba Magazine - MySQL Database Schema & Sample Data
-- Database: busines1_nyumba  (used on nyumba.impact.co.ke)
-- Compatible with phpMyAdmin / MySQL 5.7+ / MariaDB 10.3+
--
-- IMPORT INSTRUCTIONS (cPanel / phpMyAdmin):
--   1. Log in to cPanel → phpMyAdmin
--   2. Select database: busines1_nyumba
--   3. Click Import → Choose this file → Go
--   Note: If the database doesn't exist yet, create it first in
--         cPanel → MySQL Databases, then assign a user with ALL PRIVILEGES
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+03:00";

-- ============================================================
-- TABLES
-- ============================================================

-- ----------------------
-- Table: users
-- ----------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(100) DEFAULT NULL,
  `last_name` VARCHAR(100) DEFAULT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'user',
  `user_type` VARCHAR(50) DEFAULT 'user',
  `profession` VARCHAR(100) DEFAULT NULL,
  `company` VARCHAR(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `website` VARCHAR(255) DEFAULT NULL,
  `license_number` VARCHAR(100) DEFAULT NULL,
  `avatar` VARCHAR(500) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------
-- Table: articles
-- ----------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `excerpt` TEXT NOT NULL,
  `featured_image` VARCHAR(500) DEFAULT NULL,
  `category` VARCHAR(100) NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `views` INT(11) NOT NULL DEFAULT 0,
  `read_time` VARCHAR(20) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_category` (`category`),
  KEY `idx_published` (`published`),
  KEY `idx_featured` (`featured`),
  FULLTEXT KEY `ft_title_excerpt` (`title`,`excerpt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------
-- Table: properties
-- ----------------------
DROP TABLE IF EXISTS `properties`;
CREATE TABLE `properties` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(15,2) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `property_type` VARCHAR(100) NOT NULL,
  `bedrooms` INT(11) DEFAULT NULL,
  `bathrooms` INT(11) DEFAULT NULL,
  `area` DECIMAL(10,2) DEFAULT NULL,
  `images` JSON DEFAULT NULL,
  `amenities` JSON DEFAULT NULL,
  `contact_name` VARCHAR(255) DEFAULT NULL,
  `contact_phone` VARCHAR(20) DEFAULT NULL,
  `contact_email` VARCHAR(255) DEFAULT NULL,
  `agent` VARCHAR(255) DEFAULT NULL,
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `views` INT(11) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_type` (`property_type`),
  KEY `idx_published` (`published`),
  KEY `idx_featured` (`featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------
-- Table: professionals
-- ----------------------
DROP TABLE IF EXISTS `professionals`;
CREATE TABLE `professionals` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `profession` VARCHAR(100) NOT NULL,
  `company` VARCHAR(255) DEFAULT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `specialties` JSON DEFAULT NULL,
  `experience_years` INT(11) DEFAULT NULL,
  `hourly_rate` DECIMAL(10,2) DEFAULT NULL,
  `certifications` JSON DEFAULT NULL,
  `image` VARCHAR(500) DEFAULT NULL,
  `contact_phone` VARCHAR(20) DEFAULT NULL,
  `contact_email` VARCHAR(255) DEFAULT NULL,
  `website` VARCHAR(255) DEFAULT NULL,
  `verified` TINYINT(1) NOT NULL DEFAULT 0,
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  `reviews` INT(11) NOT NULL DEFAULT 0,
  `projects` INT(11) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_profession` (`profession`),
  KEY `idx_published` (`published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------
-- Table: contractors
-- ----------------------
DROP TABLE IF EXISTS `contractors`;
CREATE TABLE `contractors` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `company` VARCHAR(255) NOT NULL,
  `contractor_type` VARCHAR(100) NOT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `services` JSON DEFAULT NULL,
  `license_number` VARCHAR(100) DEFAULT NULL,
  `insurance` TINYINT(1) NOT NULL DEFAULT 0,
  `bond` TINYINT(1) NOT NULL DEFAULT 0,
  `employees` INT(11) DEFAULT NULL,
  `projects_completed` INT(11) NOT NULL DEFAULT 0,
  `experience_years` INT(11) DEFAULT NULL,
  `image` VARCHAR(500) DEFAULT NULL,
  `contact_phone` VARCHAR(20) DEFAULT NULL,
  `contact_email` VARCHAR(255) DEFAULT NULL,
  `website` VARCHAR(255) DEFAULT NULL,
  `verified` TINYINT(1) NOT NULL DEFAULT 0,
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `rating` VARCHAR(10) NOT NULL DEFAULT '0',
  `reviews` INT(11) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_type` (`contractor_type`),
  KEY `idx_published` (`published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------
-- Table: materials_suppliers
-- ----------------------
DROP TABLE IF EXISTS `materials_suppliers`;
CREATE TABLE `materials_suppliers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(255) NOT NULL,
  `contact_person` VARCHAR(255) NOT NULL,
  `categories` JSON DEFAULT NULL,
  `products` JSON DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `website` VARCHAR(255) DEFAULT NULL,
  `established_year` INT(11) DEFAULT NULL,
  `employees` INT(11) DEFAULT NULL,
  `delivery_radius` INT(11) DEFAULT NULL,
  `min_order_amount` DECIMAL(10,2) DEFAULT NULL,
  `payment_terms` VARCHAR(100) DEFAULT NULL,
  `image` VARCHAR(500) DEFAULT NULL,
  `contact_phone` VARCHAR(20) DEFAULT NULL,
  `contact_email` VARCHAR(255) DEFAULT NULL,
  `verified` TINYINT(1) NOT NULL DEFAULT 0,
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `rating` VARCHAR(10) NOT NULL DEFAULT '0',
  `reviews` INT(11) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_published` (`published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------
-- Table: events
-- ----------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `event_date` VARCHAR(20) NOT NULL,
  `event_time` VARCHAR(20) DEFAULT NULL,
  `end_date` VARCHAR(20) DEFAULT NULL,
  `location` VARCHAR(255) NOT NULL,
  `venue` VARCHAR(255) DEFAULT NULL,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `image` VARCHAR(500) DEFAULT NULL,
  `organizer` VARCHAR(255) DEFAULT NULL,
  `attendees` INT(11) NOT NULL DEFAULT 0,
  `speakers` JSON DEFAULT NULL,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `status` VARCHAR(20) NOT NULL DEFAULT 'upcoming',
  `website` VARCHAR(255) DEFAULT NULL,
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_published` (`published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------
-- Table: messages
-- ----------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `read_status` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_read` (`read_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------
-- Table: newsletter_subscribers
-- ----------------------
DROP TABLE IF EXISTS `newsletter_subscribers`;
CREATE TABLE `newsletter_subscribers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `subscribed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------
-- Table: site_settings
-- ----------------------
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(100) NOT NULL,
  `setting_value` TEXT DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------
-- Table: homepage_slider
-- ----------------------
DROP TABLE IF EXISTS `homepage_slider`;
CREATE TABLE `homepage_slider` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `file_type` VARCHAR(10) NOT NULL DEFAULT 'image',
  `file_path` VARCHAR(500) NOT NULL DEFAULT '',
  `image_path` VARCHAR(500) DEFAULT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT(11) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SAMPLE DATA
-- ============================================================

-- Admin user (email: admin@nyumba.co.ke  password: admin123)
-- IMPORTANT: Change this password immediately after first login via Admin → Settings → Change Password
INSERT INTO `users` (`email`, `password_hash`, `first_name`, `last_name`, `role`, `user_type`) VALUES
('admin@nyumba.co.ke', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh.W', 'Admin', 'Nyumba', 'admin', 'admin');

-- Articles
INSERT INTO `articles` (`title`, `content`, `excerpt`, `featured_image`, `category`, `author`, `published`, `featured`, `views`, `read_time`) VALUES
('Government Announces KSh 50 Billion Affordable Housing Initiative',
 '<p>The Ministry of Housing has unveiled ambitious plans to deliver 200,000 affordable housing units across Kenya by 2025, with a strong focus on urban centres such as Nairobi, Mombasa, Kisumu, and Nakuru.</p><p>The initiative is expected to create over 500,000 jobs in the construction sector and stimulate growth in related industries including cement, steel, and real estate services.</p><p>County governments have been directed to identify suitable land parcels for the project, with the national government providing infrastructure support including roads, water, and sewage connections.</p>',
 'The Ministry of Housing unveils ambitious plans to deliver 200,000 affordable housing units across Kenya by 2025.',
 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
 'Policy & Regulations', 'James Kiprotich', 1, 1, 15420, '5 min read'),

('Revolutionary 3D Printing Technology Arrives in Nairobi',
 '<p>A local construction company has introduced cutting-edge 3D printing technology for faster and more efficient building construction, reducing costs by up to 40%.</p><p>The technology can construct a standard two-bedroom house in just 48 hours compared to the traditional 6-month timeline, using a specialised concrete mixture that is stronger than conventional materials.</p>',
 'Local construction company introduces cutting-edge 3D printing technology, reducing construction costs by 40%.',
 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
 'Technology', 'Mary Wanjiku', 1, 1, 12350, '6 min read'),

('Cement Prices Drop 15% as New Factory Opens in Machakos',
 '<p>The opening of a new cement manufacturing plant in Machakos County is expected to reduce construction costs significantly across Kenya.</p><p>Industry analysts predict the increased supply will bring cement prices down from an average of KSh 720 to KSh 620 per 50kg bag.</p>',
 'The opening of a new cement manufacturing plant is expected to reduce construction costs across the region.',
 'https://images.pexels.com/photos/1216564/pexels-photo-1216564.jpeg?auto=compress&cs=tinysrgb&w=800',
 'Market Updates', 'Peter Mwangi', 1, 0, 8920, '4 min read'),

('Green Building Certification Program Launched in Kenya',
 '<p>The Kenya Green Building Society has introduced new certification standards to promote environmentally sustainable construction practices nationwide.</p><p>Buildings certified under the new system are expected to use 30–50% less energy and 40% less water than conventional structures.</p>',
 'Kenya Green Building Society introduces certification standards to promote sustainable construction nationwide.',
 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
 'Policy & Regulations', 'Grace Njeri', 1, 0, 6780, '7 min read'),

('Smart Home Technology Adoption Rises Among Kenyan Homeowners',
 '<p>A new survey reveals that smart home technology adoption among Kenyan urban homeowners has doubled in the past two years.</p><p>Over 35% of new residential developments in Nairobi''s upmarket suburbs now include integrated smart home systems.</p>',
 'Survey reveals smart home technology adoption in Kenya has doubled in two years as costs fall.',
 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
 'Technology', 'Susan Kamau', 1, 0, 5430, '5 min read'),

('Sustainable Building Materials: The Future of Construction in Kenya',
 '<p>Eco-friendly building materials are reshaping Kenya''s construction industry. From compressed earth blocks to recycled steel, builders are embracing green solutions that reduce environmental impact while cutting costs.</p><p>Industry experts predict that sustainable materials will account for 30% of all new construction in Kenya by 2027.</p>',
 'Explore how eco-friendly materials are revolutionizing the construction industry and contributing to a greener future.',
 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=800',
 'Sustainability', 'Dr. Sarah Johnson', 1, 1, 9200, '8 min read');

-- Properties
INSERT INTO `properties` (`title`, `description`, `price`, `location`, `property_type`, `bedrooms`, `bathrooms`, `area`, `images`, `amenities`, `contact_name`, `contact_phone`, `contact_email`, `agent`, `published`, `featured`, `views`) VALUES
('Modern Executive Villa - Karen', 'Stunning modern villa with panoramic views, premium finishes, and smart home technology.', 45000000.00, 'Karen, Nairobi', 'residential', 5, 4, 4200.00, '["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"]', '["Swimming Pool","Garden","Garage","Security","Generator"]', 'Sarah Kimani', '+254 722 123 456', 'sarah@premiumproperties.co.ke', 'Sarah Kimani', 1, 1, 342),
('Luxury Penthouse - Westlands', 'Exclusive penthouse with stunning city views and premium building amenities.', 35000000.00, 'Westlands, Nairobi', 'residential', 3, 3, 2800.00, '["https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800"]', '["Gym","Rooftop Terrace","Concierge","Parking","Elevator"]', 'Michael Ochieng', '+254 733 234 567', 'michael@luxuryhomes.co.ke', 'Michael Ochieng', 1, 1, 289),
('Family Home - Kiambu Road', 'Perfect family home in quiet neighbourhood with large compound and modern amenities.', 18000000.00, 'Kiambu Road, Nairobi', 'residential', 4, 3, 3200.00, '["https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800"]', '["Garden","Parking","Security","Borehole"]', 'Grace Wanjiku', '+254 711 345 678', 'grace@familyhomes.co.ke', 'Grace Wanjiku', 1, 0, 156),
('Commercial Office Space - CBD', 'Prime commercial office space in Nairobi Central Business District.', 25000000.00, 'CBD, Nairobi', 'commercial', 0, 2, 1500.00, '["https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800"]', '["Parking","Elevator","Generator","Security"]', 'John Mwenda', '+254 722 567 890', 'john@commercialproperties.co.ke', 'John Mwenda', 1, 0, 98),
('Half-Acre Plot - Ruaka', 'Prime land available for residential or commercial development in Ruaka.', 8500000.00, 'Ruaka, Kiambu County', 'land', 0, 0, 2000.00, '["https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=800"]', '["Road Frontage","Water Connection","Electricity","Title Deed"]', 'Anne Njoroge', '+254 733 678 901', 'anne@landkenya.co.ke', 'Anne Njoroge', 1, 0, 211),
('2-Bedroom Apartment for Rent - Kilimani', 'Modern, fully furnished 2-bedroom apartment available for rent in Kilimani.', 120000.00, 'Kilimani, Nairobi', 'rental', 2, 2, 1100.00, '["https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800"]', '["Swimming Pool","Gym","Parking","WiFi","Security","Balcony"]', 'Tom Kamau', '+254 700 234 567', 'tom@rentalkenya.co.ke', 'Tom Kamau', 1, 1, 178);

-- Professionals
INSERT INTO `professionals` (`name`, `profession`, `company`, `location`, `description`, `specialties`, `experience_years`, `hourly_rate`, `certifications`, `image`, `contact_phone`, `contact_email`, `website`, `verified`, `published`, `rating`, `reviews`, `projects`) VALUES
('Dr. Sarah Mwangi', 'Architect', 'Mwangi & Associates Architecture', 'Nairobi, Kenya', 'Award-winning architect specialising in sustainable and eco-friendly building designs with over 15 years of experience.', '["Sustainable Design","Commercial Buildings","Green Architecture","Urban Planning"]', 15, 5000.00, '["LEED AP","RIBA","BORAQS"]', 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400', '+254 722 123 456', 'sarah@mwangiarch.co.ke', 'www.mwangiarchitecture.co.ke', 1, 1, 4.90, 127, 89),
('Eng. Michael Ochieng', 'Structural Engineer', 'Ochieng Structural Consultants', 'Nairobi, Kenya', 'Experienced structural engineer with expertise in high-rise buildings and complex infrastructure projects.', '["High-rise Buildings","Bridge Design","Seismic Analysis","Steel Structures"]', 12, 4500.00, '["PE License","IStructE","EBK Registration"]', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', '+254 733 234 567', 'michael@ochiengstructural.co.ke', NULL, 1, 1, 4.80, 94, 156),
('Grace Wanjiku, QS', 'Quantity Surveyor', 'Wanjiku Cost Consultancy', 'Nairobi, Kenya', 'Professional quantity surveyor with expertise in cost management and contract administration.', '["Cost Estimation","Contract Management","Risk Assessment","Value Engineering"]', 10, 3500.00, '["RICS","BORAQS","PMP"]', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', '+254 711 345 678', 'grace@wanjikuqs.co.ke', NULL, 1, 1, 4.70, 78, 67),
('Peter Kamau', 'Civil Engineer', 'Kamau Civil Engineering Ltd', 'Nairobi, Kenya', 'Civil engineer specialising in road construction, drainage systems, and infrastructure development.', '["Road Construction","Drainage Systems","Site Development","Infrastructure Planning"]', 14, 4000.00, '["EBK Registration","IEK Member"]', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400', '+254 722 456 789', 'peter@kamauce.co.ke', NULL, 1, 1, 4.60, 52, 43);

-- Contractors
INSERT INTO `contractors` (`name`, `company`, `contractor_type`, `location`, `description`, `services`, `license_number`, `insurance`, `bond`, `employees`, `projects_completed`, `experience_years`, `image`, `contact_phone`, `contact_email`, `verified`, `published`, `rating`, `reviews`) VALUES
('James Wilson', 'Wilson Construction Group', 'General Contractor', 'Nairobi, Kenya', 'Licensed general contractor with extensive experience in residential and commercial construction.', '["Residential Construction","Commercial Buildings","Renovations","Custom Homes"]', 'GC-2024-001', 1, 1, 45, 234, 18, 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400', '+254 722 456 789', 'james@wilsonconst.co.ke', 1, 1, '4.9', 156),
('Mary Njeri', 'PowerTech Electrical Solutions', 'Electrical Contractor', 'Nairobi, Kenya', 'Certified electrical contractor specialising in residential and commercial electrical installations and solar systems.', '["Electrical Installations","Solar Systems","Smart Home Wiring","Generator Installation"]', 'EC-2024-045', 1, 0, 22, 189, 12, 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400', '+254 733 567 890', 'mary@powertechke.co.ke', 1, 1, '4.8', 112),
('Robert Kamau', 'AquaFlow Plumbing Services', 'Plumbing Contractor', 'Nairobi, Kenya', 'Professional plumbing contractor providing comprehensive water and drainage solutions.', '["Plumbing Installation","Water Systems","Drainage Solutions","Bathroom Fitting"]', 'PC-2024-089', 1, 0, 18, 145, 9, 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', '+254 700 678 901', 'robert@aquaflowke.co.ke', 1, 1, '4.7', 87);

-- Suppliers
INSERT INTO `materials_suppliers` (`company_name`, `contact_person`, `categories`, `products`, `description`, `location`, `website`, `established_year`, `employees`, `delivery_radius`, `min_order_amount`, `payment_terms`, `contact_phone`, `contact_email`, `verified`, `published`, `rating`, `reviews`) VALUES
('East African Portland Cement', 'Robert Kimani', '["Cement & Concrete"]', '["Portland Cement","Ready Mix Concrete","Cement Blocks","Precast Products"]', 'Leading cement manufacturer in East Africa providing high-quality cement and concrete products.', 'Nairobi, Kenya', 'www.eaportland.co.ke', 1999, 150, 50, 50000.00, '30 days', '+254 722 123 456', 'robert@eaportland.co.ke', 1, 1, '4.8', 234),
('Kenya Steel Works', 'Mary Wanjiku', '["Steel & Metal"]', '["Structural Steel","Steel Bars","Roofing Sheets","Wire Mesh"]', 'Leading supplier of high-quality steel products for construction and manufacturing.', 'Mombasa, Kenya', 'www.kenyasteel.co.ke', 2005, 89, 100, 100000.00, '45 days', '+254 733 234 567', 'mary@kenyasteel.co.ke', 1, 1, '4.7', 178),
('SolarTech Africa', 'James Otieno', '["Electrical Supplies","Solar Energy"]', '["Solar Panels","Inverters","Batteries","Solar Water Heaters","LED Lighting"]', 'Premier supplier of solar energy solutions and electrical supplies across Kenya.', 'Nairobi, Kenya', 'www.solartechafrica.co.ke', 2012, 65, 200, 30000.00, '30 days', '+254 700 345 678', 'james@solartechafrica.co.ke', 1, 1, '4.9', 321);

-- Events
INSERT INTO `events` (`title`, `description`, `category`, `event_date`, `event_time`, `end_date`, `location`, `venue`, `price`, `image`, `organizer`, `attendees`, `speakers`, `featured`, `status`, `website`, `published`) VALUES
('Kenya Construction Expo 2025', 'The largest construction industry exhibition in East Africa featuring the latest technologies, materials, and innovations.', 'Exhibition', '2025-09-15', '09:00 AM', '2025-09-17', 'KICC, Nairobi', 'Kenyatta International Convention Centre', 2500.00, 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800', 'Kenya Association of Building & Civil Engineering Contractors', 5000, '["Dr. Sarah Mwangi","Eng. Michael Ochieng"]', 1, 'upcoming', 'https://kenyaconstructionexpo.com', 1),
('Sustainable Building Materials Conference', 'Exploring eco-friendly construction materials and sustainable building practices for the future.', 'Conference', '2025-10-28', '08:30 AM', '2025-10-28', 'Serena Hotel, Nairobi', 'Serena Hotel Conference Center', 3500.00, 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=800', 'Green Building Society of Kenya', 800, '["Prof. Jane Wambua","Dr. Tom Kariuki"]', 1, 'upcoming', NULL, 1),
('Real Estate Investment Summit', 'Connect with top investors, developers, and real estate professionals at Kenya''s premier property investment event.', 'Conference', '2025-11-10', '09:00 AM', '2025-11-10', 'Radisson Blu, Nairobi', 'Radisson Blu Upper Hill Hotel', 5000.00, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', 'Kenya Property Developers Association', 1200, '[]', 0, 'upcoming', NULL, 1);

-- Sample Messages
INSERT INTO `messages` (`name`, `email`, `subject`, `message`, `read_status`) VALUES
('Mary Njeri', 'mary@example.com', 'Property Inquiry - Karen Villa', 'I am very interested in the villa listing in Karen. Could you please arrange a viewing for this Saturday?', 0),
('James Ochieng', 'james@example.com', 'Partnership Opportunity', 'We would like to discuss a potential partnership for our upcoming commercial development. Please let us know the best time to connect.', 1),
('Patricia Waweru', 'patricia@example.com', 'Professional Listing Enquiry', 'I am a registered architect interested in listing my services on your platform. What are the requirements and fees?', 0);

-- Site Settings
INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('site_name', 'Nyumba'),
('site_description', 'Kenya''s Premier Construction Industry Magazine'),
('contact_email', 'info@nyumba.co.ke'),
('contact_phone', '+254 700 123 456'),
('address', 'Westlands, Nairobi, Kenya'),
('facebook_url', 'https://facebook.com/nyumbamagazine'),
('twitter_url', 'https://twitter.com/nyumba_mag'),
('linkedin_url', 'https://linkedin.com/company/nyumba'),
('instagram_url', 'https://instagram.com/nyumba_magazine'),
('meta_keywords', 'construction,property,Kenya,magazine,architects,contractors'),
('listing_price', '5000'),
('professional_listing_price', '3000'),
('banner_ad_price', '10000'),
('featured_article_price', '8000');

-- Homepage Slider
INSERT INTO `homepage_slider` (`title`, `description`, `file_type`, `file_path`, `image_path`, `active`, `sort_order`) VALUES
('Construction Materials Catalog 2025', 'Complete guide to premium building materials and suppliers', 'pdf', '/catalogs/materials-2025.pdf', 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800', 1, 1),
('Modern Architecture Trends', 'Latest architectural trends and innovations in Kenya', 'image', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', 1, 2),
('Nyumba Magazine Issue 12', 'Read the latest digital edition of Nyumba Magazine', 'pdf', '/magazines/nyumba-issue-12.pdf', 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=800', 1, 3);

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- END OF FILE
-- To import: phpMyAdmin → select busines1_nyumba → Import → Go
-- Admin login: admin@nyumba.co.ke / admin123  (change after login!)
-- ============================================================
