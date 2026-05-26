import { Router } from "express";
import { db } from "@workspace/db";
import {
  articlesTable, propertiesTable, professionalsTable, contractorsTable,
  suppliersTable, eventsTable, siteSettingsTable, homepageSliderTable,
  usersTable, messagesTable,
} from "@workspace/db/schema";
import bcrypt from "bcryptjs";
import { count } from "drizzle-orm";

const router = Router();

// Bootstrap-safe: only runs when DB is empty (no users exist yet)
router.post("/admin/seed", async (req, res) => {
  try {
    const providedKey = req.headers['x-seed-key'] || req.body?.seedKey;
    const expectedKey = process.env.SEED_KEY;
    const keyMatches = expectedKey && providedKey === expectedKey;

    const [{ value: userCount }] = await db.select({ value: count() }).from(usersTable);
    if (userCount > 0 && !keyMatches) {
      return res.status(403).json({ error: "Database already seeded." });
    }

    const adminPasswordHash = await bcrypt.hash("admin123", 10);
    await db.insert(usersTable).values({
      email: "admin@nyumba.co.ke", passwordHash: adminPasswordHash,
      firstName: "Admin", lastName: "Nyumba", userType: "admin", verified: true,
    }).onConflictDoNothing();

    await db.insert(articlesTable).values([
      { title: "Government Announces KSh 50 Billion Affordable Housing Initiative", content: "<p>The Ministry of Housing has unveiled ambitious plans to deliver 200,000 affordable housing units across Kenya by 2025, with focus on Nairobi, Mombasa, Kisumu, and Nakuru.</p>", excerpt: "The Ministry of Housing unveils plans to deliver 200,000 affordable housing units across Kenya by 2025.", featuredImage: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Policy & Regulations", author: "James Kiprotich", published: true, featured: true, views: 15420, readTime: "5 min read" },
      { title: "Revolutionary 3D Printing Technology Arrives in Nairobi", content: "<p>A local construction company has introduced 3D printing technology, reducing costs by up to 40% and building a two-bedroom house in just 48 hours.</p>", excerpt: "Local construction company introduces 3D printing technology, reducing costs by 40%.", featuredImage: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Technology", author: "Mary Wanjiku", published: true, featured: true, views: 12350, readTime: "6 min read" },
      { title: "Cement Prices Drop 15% as New Factory Opens in Machakos", content: "<p>A new cement manufacturing plant in Machakos County has increased local production capacity, driving down prices and benefiting construction projects nationwide.</p>", excerpt: "New cement factory in Machakos County drives prices down by 15%, benefiting construction projects.", featuredImage: "https://images.pexels.com/photos/1216564/pexels-photo-1216564.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Market Updates", author: "Peter Mwangi", published: true, featured: false, views: 8920, readTime: "4 min read" },
      { title: "Green Building Certification Program Launched in Kenya", content: "<p>Kenya Green Building Society launches certification standards for sustainable construction and energy-efficient designs across the country.</p>", excerpt: "Kenya Green Building Society launches certification encouraging sustainable construction practices.", featuredImage: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Policy & Regulations", author: "Grace Njeri", published: true, featured: false, views: 6780, readTime: "7 min read" },
      { title: "Nairobi Expressway Phase 2 Construction Begins", content: "<p>The second phase of the Nairobi Expressway will extend to JKIA, easing traffic congestion along one of the city's busiest corridors.</p>", excerpt: "Second phase of the Nairobi Expressway extends to JKIA, easing traffic in the city's busiest corridors.", featuredImage: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Major Projects", author: "David Ochieng", published: true, featured: false, views: 9150, readTime: "8 min read" },
      { title: "Smart Home Technology Adoption Rises Among Kenyan Homeowners", content: "<p>Smart home systems including automated lighting and security are increasingly adopted by middle-class Kenyan homeowners seeking modern living solutions.</p>", excerpt: "Smart home systems gain traction among Kenyan homeowners seeking modern, connected living.", featuredImage: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800", category: "Technology", author: "Susan Kamau", published: true, featured: false, views: 5430, readTime: "5 min read" },
    ]).onConflictDoNothing();

    await db.insert(propertiesTable).values([
      { title: "Modern Executive Villa - Karen", description: "Stunning modern villa with panoramic views, premium finishes, and smart home technology.", price: "45000000", location: "Karen, Nairobi", propertyType: "residential", bedrooms: 5, bathrooms: 4, area: "4200", images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"], amenities: ["Swimming Pool", "Garden", "Garage", "Security", "Generator"], contactName: "Sarah Kimani", contactPhone: "+254 722 123 456", contactEmail: "sarah@premiumproperties.co.ke", agent: "Sarah Kimani", published: true, featured: true, views: 342 },
      { title: "Luxury Penthouse - Westlands", description: "Exclusive penthouse with stunning city views and premium building amenities in the heart of Westlands.", price: "35000000", location: "Westlands, Nairobi", propertyType: "residential", bedrooms: 3, bathrooms: 3, area: "2800", images: ["https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800"], amenities: ["Gym", "Rooftop Terrace", "Concierge", "Parking", "Elevator"], contactName: "Michael Ochieng", contactPhone: "+254 733 234 567", contactEmail: "michael@luxuryhomes.co.ke", agent: "Michael Ochieng", published: true, featured: true, views: 289 },
      { title: "Family Home - Kiambu Road", description: "Perfect family home in a quiet, secure neighborhood with a large compound and modern amenities.", price: "18000000", location: "Kiambu Road, Nairobi", propertyType: "residential", bedrooms: 4, bathrooms: 3, area: "3200", images: ["https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800"], amenities: ["Garden", "Parking", "Security", "Borehole"], contactName: "Grace Wanjiku", contactPhone: "+254 711 345 678", contactEmail: "grace@familyhomes.co.ke", agent: "Grace Wanjiku", published: true, featured: false, views: 156 },
      { title: "Commercial Office Space - CBD", description: "Prime commercial office space in Nairobi's Central Business District, ideal for corporate headquarters.", price: "25000000", location: "CBD, Nairobi", propertyType: "commercial", bedrooms: 0, bathrooms: 2, area: "1500", images: ["https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800"], amenities: ["Parking", "Elevator", "Generator", "Security"], contactName: "John Mwenda", contactPhone: "+254 722 567 890", contactEmail: "john@commercialproperties.co.ke", agent: "John Mwenda", published: true, featured: false, views: 98 },
      { title: "2-Bedroom Apartment for Rent - Kilimani", description: "Modern, fully furnished 2-bedroom apartment in leafy Kilimani suburb with pool and gym access.", price: "120000", location: "Kilimani, Nairobi", propertyType: "rental", bedrooms: 2, bathrooms: 2, area: "1100", images: ["https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800"], amenities: ["Swimming Pool", "Gym", "Parking", "WiFi", "Security"], contactName: "Tom Kamau", contactPhone: "+254 700 234 567", contactEmail: "tom@rentalkenya.co.ke", agent: "Tom Kamau", published: true, featured: true, views: 178 },
    ]).onConflictDoNothing();

    await db.insert(professionalsTable).values([
      { name: "Dr. Sarah Mwangi", profession: "Architect", company: "Mwangi & Associates Architecture", location: "Nairobi, Kenya", description: "Award-winning architect specializing in sustainable and eco-friendly building designs with over 15 years of experience.", specialties: ["Sustainable Design", "Commercial Buildings", "Green Architecture", "Urban Planning"], experienceYears: 15, hourlyRate: "5000", certifications: ["LEED AP", "RIBA", "BORAQS"], image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400", contactPhone: "+254 722 123 456", contactEmail: "sarah@mwangiarch.co.ke", website: "www.mwangiarchitecture.co.ke", verified: true, published: true, rating: "4.9", reviews: 127, projects: 89 },
      { name: "Eng. Michael Ochieng", profession: "Structural Engineer", company: "Ochieng Structural Consultants", location: "Nairobi, Kenya", description: "Experienced structural engineer with expertise in high-rise buildings and complex infrastructure projects.", specialties: ["High-rise Buildings", "Bridge Design", "Seismic Analysis", "Steel Structures"], experienceYears: 12, hourlyRate: "4500", certifications: ["PE License", "IStructE", "EBK Registration"], image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400", contactPhone: "+254 733 234 567", contactEmail: "michael@ochiengstructural.co.ke", verified: true, published: true, rating: "4.8", reviews: 94, projects: 156 },
      { name: "Grace Wanjiku, QS", profession: "Quantity Surveyor", company: "Wanjiku Cost Consultancy", location: "Nairobi, Kenya", description: "Professional quantity surveyor with expertise in cost management and contract administration.", specialties: ["Cost Estimation", "Contract Management", "Risk Assessment", "Value Engineering"], experienceYears: 10, hourlyRate: "3500", certifications: ["RICS", "BORAQS"], image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400", contactPhone: "+254 711 345 678", contactEmail: "grace@wanjikuqs.co.ke", verified: true, published: true, rating: "4.7", reviews: 78, projects: 67 },
      { name: "Peter Kamau", profession: "Civil Engineer", company: "Kamau Civil Engineering Ltd", location: "Nairobi, Kenya", description: "Civil engineer specializing in road construction, drainage systems, and infrastructure development.", specialties: ["Road Construction", "Drainage Systems", "Site Development", "Infrastructure Planning"], experienceYears: 14, hourlyRate: "4000", certifications: ["EBK Registration", "IEK Member"], image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400", contactPhone: "+254 722 456 789", contactEmail: "peter@kamauce.co.ke", verified: true, published: true, rating: "4.6", reviews: 52, projects: 43 },
    ]).onConflictDoNothing();

    await db.insert(contractorsTable).values([
      { name: "James Wilson", company: "Wilson Construction Group", contractorType: "General Contractor", location: "Nairobi, Kenya", description: "Licensed general contractor with extensive experience in residential and commercial construction.", services: ["Residential Construction", "Commercial Buildings", "Renovations", "Custom Homes"], licenseNumber: "GC-2024-001", insurance: true, bond: true, employees: 45, projectsCompleted: 234, experienceYears: 18, image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400", contactPhone: "+254 722 456 789", contactEmail: "james@wilsonconst.co.ke", verified: true, published: true, rating: "4.9", reviews: 156 },
      { name: "Mary Njeri", company: "PowerTech Electrical Solutions", contractorType: "Electrical Contractor", location: "Nairobi, Kenya", description: "Certified electrical contractor specializing in residential and commercial electrical installations and solar systems.", services: ["Electrical Installations", "Solar Systems", "Smart Home Wiring"], licenseNumber: "EC-2024-045", insurance: true, bond: false, employees: 22, projectsCompleted: 189, experienceYears: 12, image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400", contactPhone: "+254 733 567 890", contactEmail: "mary@powertechke.co.ke", verified: true, published: true, rating: "4.8", reviews: 112 },
      { name: "Robert Kamau", company: "AquaFlow Plumbing Services", contractorType: "Plumbing Contractor", location: "Nairobi, Kenya", description: "Professional plumbing contractor providing comprehensive water, drainage, and sanitation solutions.", services: ["Plumbing Installation", "Water Systems", "Drainage Solutions"], licenseNumber: "PC-2024-089", insurance: true, bond: false, employees: 18, projectsCompleted: 145, experienceYears: 9, image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400", contactPhone: "+254 700 678 901", contactEmail: "robert@aquaflowke.co.ke", verified: true, published: true, rating: "4.7", reviews: 87 },
    ]).onConflictDoNothing();

    await db.insert(suppliersTable).values([
      { companyName: "East African Portland Cement", contactPerson: "Robert Kimani", categories: ["Cement & Concrete"], products: ["Portland Cement", "Ready Mix Concrete", "Cement Blocks"], description: "Leading cement manufacturer in East Africa providing high-quality cement products for all construction project sizes.", location: "Nairobi, Kenya", website: "www.eaportland.co.ke", establishedYear: 1999, employees: 150, deliveryRadius: 50, minOrderAmount: "50000", paymentTerms: "30 days", contactPhone: "+254 722 123 456", contactEmail: "robert@eaportland.co.ke", verified: true, published: true, rating: "4.8", reviews: 234 },
      { companyName: "Kenya Steel Works", contactPerson: "Mary Wanjiku", categories: ["Steel & Metal"], products: ["Structural Steel", "Steel Bars", "Roofing Sheets", "Wire Mesh"], description: "Leading supplier of high-quality steel products for construction and industrial applications across East Africa.", location: "Mombasa, Kenya", website: "www.kenyasteel.co.ke", establishedYear: 2005, employees: 89, deliveryRadius: 100, minOrderAmount: "100000", paymentTerms: "45 days", contactPhone: "+254 733 234 567", contactEmail: "mary@kenyasteel.co.ke", verified: true, published: true, rating: "4.7", reviews: 178 },
      { companyName: "SolarTech Africa", contactPerson: "James Otieno", categories: ["Electrical Supplies", "Solar Energy"], products: ["Solar Panels", "Inverters", "Batteries", "LED Lighting"], description: "Premier supplier of solar energy solutions and electrical supplies for residential, commercial, and industrial applications.", location: "Nairobi, Kenya", website: "www.solartechafrica.co.ke", establishedYear: 2012, employees: 65, deliveryRadius: 200, minOrderAmount: "30000", paymentTerms: "30 days", contactPhone: "+254 700 345 678", contactEmail: "james@solartechafrica.co.ke", verified: true, published: true, rating: "4.9", reviews: 321 },
    ]).onConflictDoNothing();

    await db.insert(eventsTable).values([
      { title: "Kenya Construction Expo 2026", description: "The largest construction industry exhibition in East Africa featuring latest technologies, materials, and innovations.", category: "Exhibition", eventDate: "2026-07-15", eventTime: "09:00 AM", endDate: "2026-07-17", location: "KICC, Nairobi", venue: "Kenyatta International Convention Centre", price: "2500", image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800", organizer: "Kenya Association of Building & Civil Engineering Contractors", attendees: 5000, speakers: ["Dr. Sarah Mwangi", "Eng. Michael Ochieng"], featured: true, status: "upcoming", published: true },
      { title: "Sustainable Building Materials Conference", description: "Exploring eco-friendly construction materials and sustainable building practices for Kenya's future.", category: "Conference", eventDate: "2026-08-28", eventTime: "08:30 AM", endDate: "2026-08-28", location: "Serena Hotel, Nairobi", venue: "Serena Hotel Conference Center", price: "3500", image: "https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=800", organizer: "Green Building Society of Kenya", attendees: 800, speakers: ["Prof. Jane Wambua", "Dr. Tom Kariuki"], featured: true, status: "upcoming", published: true },
      { title: "Real Estate Investment Summit", description: "Connect with top investors, developers, and real estate professionals at Kenya's premier property investment event.", category: "Conference", eventDate: "2026-09-10", eventTime: "09:00 AM", endDate: "2026-09-10", location: "Radisson Blu, Nairobi", venue: "Radisson Blu Upper Hill Hotel", price: "5000", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800", organizer: "Kenya Property Developers Association", attendees: 1200, speakers: [], featured: false, status: "upcoming", published: true },
    ]).onConflictDoNothing();

    await db.insert(messagesTable).values([
      { name: "Mary Njeri", email: "mary@example.com", subject: "Property Inquiry - Karen Villa", message: "I am very interested in the villa listing in Karen. Could you arrange a viewing for this Saturday?", readStatus: false },
      { name: "James Ochieng", email: "james@example.com", subject: "Partnership Opportunity", message: "We would like to discuss a potential partnership for our upcoming commercial development in Nairobi.", readStatus: true },
    ]).onConflictDoNothing();

    await db.insert(siteSettingsTable).values([
      { settingKey: "site_name", settingValue: "Nyumba" },
      { settingKey: "site_description", settingValue: "Kenya's Premier Construction Industry Magazine" },
      { settingKey: "contact_email", settingValue: "info@nyumba.co.ke" },
      { settingKey: "contact_phone", settingValue: "+254 700 123 456" },
      { settingKey: "address", settingValue: "Westlands, Nairobi, Kenya" },
    ]).onConflictDoNothing();

    await db.insert(homepageSliderTable).values([
      { title: "Construction Materials Catalog 2026", description: "Complete guide to premium building materials", fileType: "pdf", filePath: "#", imagePath: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400", active: true, sortOrder: 1 },
      { title: "Modern Architecture Trends", description: "Latest architectural trends in Kenya", fileType: "image", filePath: "#", imagePath: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400", active: true, sortOrder: 2 },
    ]).onConflictDoNothing();

    res.json({ success: true, message: "Database seeded successfully with all content" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
