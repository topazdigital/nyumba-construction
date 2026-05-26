import { Router } from "express";
import { db } from "@workspace/db";
import {
  articlesTable, propertiesTable, professionalsTable, contractorsTable,
  suppliersTable, eventsTable, siteSettingsTable, homepageSliderTable, usersTable,
} from "@workspace/db/schema";
import bcrypt from "bcryptjs";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.post("/admin/seed", requireAdmin, async (_req, res) => {
  try {
    const adminPasswordHash = await bcrypt.hash("admin123", 10);
    await db.insert(usersTable).values({
      email: "admin@nyumba.co.ke", passwordHash: adminPasswordHash,
      firstName: "Admin", lastName: "Nyumba", userType: "admin", verified: true,
    }).onConflictDoNothing();

    await db.insert(articlesTable).values([
      { title: "Government Announces KSh 50 Billion Affordable Housing Initiative", content: "<p>The Ministry of Housing has unveiled ambitious plans to deliver 200,000 affordable housing units across Kenya by 2025, with focus on Nairobi, Mombasa, Kisumu, and Nakuru.</p>", excerpt: "The Ministry of Housing unveils plans to deliver 200,000 affordable housing units across Kenya by 2025.", featuredImage: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Policy & Regulations", author: "James Kiprotich", published: true, featured: true, views: 15420, readTime: "5 min read" },
      { title: "Revolutionary 3D Printing Technology Arrives in Nairobi", content: "<p>A local construction company has introduced cutting-edge 3D printing technology, reducing costs by up to 40% and building a two-bedroom house in 48 hours.</p>", excerpt: "Local construction company introduces 3D printing technology, reducing costs by 40%.", featuredImage: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Technology", author: "Mary Wanjiku", published: true, featured: true, views: 12350, readTime: "6 min read" },
      { title: "Cement Prices Drop 15% as New Factory Opens in Machakos", content: "<p>A major new cement factory in Machakos County has increased local production capacity, driving down prices and benefiting construction projects nationwide.</p>", excerpt: "New cement factory in Machakos County increases local production capacity, driving prices down by 15%.", featuredImage: "https://images.pexels.com/photos/1216564/pexels-photo-1216564.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Materials", author: "Peter Otieno", published: true, featured: true, views: 9870, readTime: "4 min read" },
      { title: "Green Building Certification Program Launched in Kenya", content: "<p>Kenya Green Building Society launches a new certification program encouraging sustainable construction practices and energy-efficient designs across the country.</p>", excerpt: "Kenya Green Building Society launches certification encouraging sustainable construction and energy-efficient designs.", featuredImage: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Sustainability", author: "Grace Muthoni", published: true, featured: true, views: 7650, readTime: "7 min read" },
      { title: "Nairobi Expressway Phase 2 Construction Begins", content: "<p>The second phase of the Nairobi Expressway will extend from Mlolongo to Jomo Kenyatta International Airport, easing traffic congestion in the city's busiest corridors.</p>", excerpt: "Second phase of the Nairobi Expressway extends to JKIA, easing traffic in the city's busiest corridors.", featuredImage: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Infrastructure", author: "David Kamau", published: true, featured: true, views: 22100, readTime: "5 min read" },
      { title: "Smart Home Technology Adoption Rises Among Kenyan Homeowners", content: "<p>Smart home systems including automated lighting, security, and energy management are increasingly adopted by middle-class Kenyan homeowners seeking modern living solutions.</p>", excerpt: "Smart home systems gain traction among Kenyan homeowners seeking modern, connected living solutions.", featuredImage: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Technology", author: "Sarah Njeri", published: true, featured: false, views: 5430, readTime: "6 min read" },
    ]).onConflictDoNothing();

    await db.insert(propertiesTable).values([
      { title: "Luxury 4-Bedroom Villa in Karen", description: "Stunning villa with modern finishes, large garden, and servant quarters in prime Karen location.", price: "45000000", bedrooms: 4, bathrooms: 3, size: "450", location: "Karen, Nairobi", propertyType: "residential", status: "for-sale", featured: true, images: ["https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"], amenities: ["Garden", "Parking", "Security", "Swimming Pool"] },
      { title: "Modern 3-Bedroom Apartment in Westlands", description: "Contemporary apartment in the heart of Westlands with city views and modern amenities.", price: "18000000", bedrooms: 3, bathrooms: 2, size: "180", location: "Westlands, Nairobi", propertyType: "residential", status: "for-sale", featured: true, images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"], amenities: ["Gym", "Parking", "Security", "Rooftop"] },
      { title: "Commercial Office Space in Upper Hill", description: "Prime office space in Upper Hill business district, ideal for corporate headquarters.", price: "250000", bedrooms: 0, bathrooms: 4, size: "600", location: "Upper Hill, Nairobi", propertyType: "commercial", status: "for-rent", featured: true, images: ["https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800"], amenities: ["Lifts", "Parking", "Reception", "Boardroom"] },
    ]).onConflictDoNothing();

    await db.insert(professionalsTable).values([
      { name: "Arch. James Mwangi", profession: "Architect", specialization: "Residential & Commercial Design", location: "Nairobi", experience: 12, rating: 48, phone: "+254 722 100 200", email: "james@mwangiarch.co.ke", description: "Award-winning architect with 12 years of experience in residential and commercial projects across East Africa.", featured: true, verified: true, projects: 85 },
      { name: "Eng. Grace Otieno", profession: "Structural Engineer", specialization: "Structural Design & Analysis", location: "Nairobi", experience: 8, rating: 46, phone: "+254 733 200 300", email: "grace@structuralke.co.ke", description: "Structural engineer specializing in high-rise buildings and complex structural systems.", featured: true, verified: true, projects: 60 },
      { name: "Arch. Samuel Kiprotich", profession: "Interior Designer", specialization: "Luxury & Commercial Interiors", location: "Mombasa", experience: 10, rating: 49, phone: "+254 711 300 400", email: "sam@interiorske.co.ke", description: "Top-rated interior designer transforming spaces with innovative design solutions.", featured: true, verified: true, projects: 120 },
    ]).onConflictDoNothing();

    await db.insert(contractorsTable).values([
      { name: "Buildrite Construction Ltd", specialization: "General Construction", location: "Nairobi", experience: 15, rating: 47, phone: "+254 720 111 222", email: "info@buildrite.co.ke", description: "Trusted general contractor with 15 years of experience in residential and commercial construction.", featured: true, verified: true, projects: 200, license: "NCA-1234" },
      { name: "Structura Engineers", specialization: "Civil & Structural Works", location: "Mombasa", experience: 10, rating: 45, phone: "+254 711 222 333", email: "info@structura.co.ke", description: "Specialist civil and structural contractor for large infrastructure projects.", featured: true, verified: true, projects: 95, license: "NCA-5678" },
    ]).onConflictDoNothing();

    await db.insert(suppliersTable).values([
      { name: "Bamburi Cement Kenya", category: "Cement & Concrete", location: "Mombasa", phone: "+254 41 2222 000", email: "info@bamburi.co.ke", description: "Kenya's leading cement manufacturer supplying quality cement products nationwide.", featured: true, verified: true, rating: 48 },
      { name: "Steel Structures Africa", category: "Steel & Metal", location: "Nairobi", phone: "+254 20 3333 000", email: "info@steelstructures.co.ke", description: "Premium steel and metal fabrication for construction projects.", featured: true, verified: true, rating: 46 },
      { name: "Kenya Timber Ltd", category: "Timber & Wood", location: "Nakuru", phone: "+254 51 4444 000", email: "info@kenyatimber.co.ke", description: "Quality timber products for construction and furniture manufacturing.", featured: false, verified: true, rating: 44 },
    ]).onConflictDoNothing();

    await db.insert(eventsTable).values([
      { title: "Kenya International Construction Expo 2026", description: "East Africa's premier construction exhibition featuring the latest products, technologies, and services.", date: new Date("2026-07-15"), location: "KICC, Nairobi", category: "Exhibition", featured: true, capacity: 5000, price: "2500" },
      { title: "Green Building Workshop", description: "Hands-on workshop on sustainable building practices and LEED certification.", date: new Date("2026-06-20"), location: "NHIF Building, Nairobi", category: "Workshop", featured: true, capacity: 100, price: "5000" },
    ]).onConflictDoNothing();

    await db.insert(siteSettingsTable).values([
      { key: "site_name", value: "Nyumba Magazine" },
      { key: "site_tagline", value: "Kenya's Premier Construction & Property Magazine" },
      { key: "contact_email", value: "info@nyumba.co.ke" },
      { key: "contact_phone", value: "+254 700 123 456" },
    ]).onConflictDoNothing();

    await db.insert(homepageSliderTable).values([
      { title: "Construction Materials Catalog 2026", description: "Complete guide to premium building materials available in Kenya", fileType: "pdf", filePath: "#", imagePath: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400", active: true, sortOrder: 1 },
      { title: "Modern Architecture Trends in Kenya", description: "Latest architectural innovations shaping Kenya's skyline", fileType: "image", filePath: "#", imagePath: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400", active: true, sortOrder: 2 },
    ]).onConflictDoNothing();

    res.json({ success: true, message: "Database seeded successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
