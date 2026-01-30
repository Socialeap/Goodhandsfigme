import { useState } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResourceCard } from './ResourceCard';
import { AIExplanationPanel } from './AIExplanationPanel';
import { DemoCallout } from './DemoCallout';

interface Resource {
  id: string;
  name: string;
  distance: string;
  hours: string;
  description: string;
  phone: string;
  address: string;
  aiExplanation: string;
}

interface ResourcesListProps {
  category: string;
  onBack: () => void;
  showDemoAnnotations?: boolean;
}

const mockResources: Record<string, Resource[]> = {
  pharmacies: [
    {
      id: 'p1',
      name: 'Community Health Pharmacy',
      distance: '0.8 miles away',
      hours: 'Mon-Fri 9am-6pm, Sat 10am-4pm',
      description: 'Full-service pharmacy with free delivery available',
      phone: '(555) 123-4567',
      address: '123 Main Street',
      aiExplanation: 'This pharmacy is open Monday through Friday from 9am to 6pm, and Saturday from 10am to 4pm. You do not need special insurance to use this location. If you are picking up a prescription for the first time, bring a photo ID and your prescription information. Mornings are usually less busy. They offer free delivery if you cannot come in person.',
    },
    {
      id: 'p2',
      name: 'Wellness Drugstore',
      distance: '1.2 miles away',
      hours: 'Daily 8am-8pm',
      description: 'Open 7 days a week with extended hours',
      phone: '(555) 234-5678',
      address: '456 Oak Avenue',
      aiExplanation: 'This pharmacy is open every day from 8am to 8pm, including weekends and most holidays. They accept all major insurance plans and also work with Medicare Part D. You can drop off prescriptions anytime during business hours. They have a drive-through window if walking inside is difficult. The pharmacist can answer questions about your medications.',
    },
    {
      id: 'p3',
      name: 'CarePlus Pharmacy',
      distance: '2.1 miles away',
      hours: 'Mon-Sat 9am-7pm',
      description: 'Specializing in senior care and medication management',
      phone: '(555) 345-6789',
      address: '789 Elm Street',
      aiExplanation: 'This pharmacy specializes in helping older adults manage their medications. The pharmacists here can review all your prescriptions to make sure they work well together. They offer free blood pressure checks and can help you organize your pills into weekly containers. Appointments are not needed, but calling ahead can save you wait time.',
    },
  ],
  food: [
    {
      id: 'f1',
      name: 'Senior Nutrition Center',
      distance: '0.5 miles away',
      hours: 'Mon-Fri 11am-1pm',
      description: 'Free hot meals and social dining for seniors 60+',
      phone: '(555) 456-7890',
      address: '234 Park Lane',
      aiExplanation: 'This center provides free hot meals Monday through Friday from 11am to 1pm. You must be 60 years or older to participate. No registration is required—just show up during meal times. They serve balanced meals with options for special diets like low-sodium or diabetic-friendly. You can eat at the center with others or take meals home.',
    },
    {
      id: 'f2',
      name: 'Community Food Pantry',
      distance: '1.0 miles away',
      hours: 'Tue & Thu 10am-2pm',
      description: 'Groceries and fresh produce for those in need',
      phone: '(555) 567-8901',
      address: '567 Cedar Road',
      aiExplanation: 'This food pantry is open Tuesdays and Thursdays from 10am to 2pm. You do not need to prove income to receive food. Bring reusable bags if you have them. They provide fresh fruits, vegetables, canned goods, and bread. You can visit once per week. Volunteers are available to help carry items to your car.',
    },
    {
      id: 'f3',
      name: 'Meals on Wheels',
      distance: 'Home delivery',
      hours: 'Deliveries Mon-Fri 11am-12pm',
      description: 'Delivers nutritious meals directly to your home',
      phone: '(555) 678-9012',
      address: 'Service Area Coverage',
      aiExplanation: 'Meals on Wheels delivers hot, nutritious meals to your home Monday through Friday between 11am and noon. There is a small suggested donation of $3 per meal, but no one is turned away if they cannot pay. To sign up, call their office and they will assess your needs. Meals accommodate dietary restrictions. The same volunteer usually delivers to you, providing a friendly check-in.',
    },
  ],
  clinics: [
    {
      id: 'c1',
      name: 'Neighborhood Health Clinic',
      distance: '0.9 miles away',
      hours: 'Mon-Fri 8am-5pm',
      description: 'Primary care and preventive health services',
      phone: '(555) 789-0123',
      address: '890 Birch Street',
      aiExplanation: 'This clinic offers primary care services Monday through Friday from 8am to 5pm. They accept Medicare and Medicaid, and offer a sliding fee scale based on income for those without insurance. You should call ahead to make an appointment. Bring your insurance card, a list of current medications, and any recent medical records. They provide annual check-ups, blood pressure monitoring, and treatment for common illnesses.',
    },
    {
      id: 'c2',
      name: 'Community Urgent Care',
      distance: '1.5 miles away',
      hours: 'Daily 9am-9pm',
      description: 'Walk-in care for non-emergency medical needs',
      phone: '(555) 890-1234',
      address: '123 Maple Drive',
      aiExplanation: 'This urgent care is open every day from 9am to 9pm, including weekends and holidays. No appointment is needed—you can walk in anytime. They treat minor injuries, infections, and illnesses that need attention but are not life-threatening emergencies. Wait times are usually shorter in the morning. They accept most insurance plans. Bring your insurance card and photo ID.',
    },
    {
      id: 'c3',
      name: 'Senior Wellness Center',
      distance: '2.3 miles away',
      hours: 'Mon, Wed, Fri 9am-3pm',
      description: 'Health screenings and wellness programs for seniors',
      phone: '(555) 901-2345',
      address: '456 Willow Court',
      aiExplanation: 'This wellness center focuses on preventive care for adults 65 and older. They offer free health screenings including blood pressure, cholesterol, and diabetes checks. Services are available Monday, Wednesday, and Friday from 9am to 3pm. No appointment is needed. They also offer exercise classes, nutrition counseling, and health education programs. Everything is provided at no cost.',
    },
  ],
  housing: [
    {
      id: 'h1',
      name: 'Senior Housing Services',
      distance: '0.6 miles away',
      hours: 'Mon-Fri 9am-4pm',
      description: 'Housing assistance and resources for older adults',
      phone: '(555) 012-3456',
      address: '789 Pine Street',
      aiExplanation: 'This office helps seniors find affordable housing options and apply for housing assistance programs. They are open Monday through Friday from 9am to 4pm. Services are free. They can help you apply for Section 8 housing vouchers, find senior apartment communities, and access emergency housing assistance. Call ahead to schedule an appointment, which usually takes about an hour.',
    },
    {
      id: 'h2',
      name: 'Community Senior Center',
      distance: '1.1 miles away',
      hours: 'Mon-Sat 9am-5pm',
      description: 'Activities, resources, and social programs for seniors',
      phone: '(555) 123-4560',
      address: '234 Spruce Avenue',
      aiExplanation: 'This senior center is a community hub open Monday through Saturday from 9am to 5pm. Membership is free for adults 60 and older. They offer exercise classes, arts and crafts, card games, and social events. Hot lunches are served daily at noon for a small donation. They also provide information about benefits, transportation services, and legal assistance. Drop in anytime—no reservation needed.',
    },
    {
      id: 'h3',
      name: 'Area Agency on Aging',
      distance: '1.8 miles away',
      hours: 'Mon-Fri 8:30am-4:30pm',
      description: 'Comprehensive support services and information',
      phone: '(555) 234-5601',
      address: '567 Fir Lane',
      aiExplanation: 'The Area Agency on Aging provides information and referrals for many services including home care, transportation, legal help, and caregiver support. They are open Monday through Friday from 8:30am to 4:30pm. You can call or visit in person. Staff can help you understand what programs you qualify for and assist with applications. Services are confidential and free of charge.',
    },
  ],
  transportation: [
    {
      id: 't1',
      name: 'Senior Ride Service',
      distance: 'Service Area',
      hours: 'Mon-Fri 7am-7pm',
      description: 'Door-to-door transportation for medical appointments',
      phone: '(555) 321-6540',
      address: 'Call for pickup',
      aiExplanation: 'This service provides door-to-door rides for seniors to medical appointments. They operate Monday through Friday from 7am to 7pm. You must schedule rides at least 48 hours in advance by calling. Rides are free or low-cost depending on your income. The driver will help you in and out of the vehicle and wait for you at your appointment if needed. They serve areas within a 15-mile radius.',
    },
    {
      id: 't2',
      name: 'Community Transit',
      distance: 'Service Area',
      hours: 'Mon-Sat 6am-8pm',
      description: 'Public transportation with senior discounts',
      phone: '(555) 432-7650',
      address: 'Multiple routes',
      aiExplanation: 'Community Transit offers regular bus service with reduced fares for seniors 65 and older. Buses run Monday through Saturday from 6am to 8pm. You can purchase a monthly senior pass at a discounted rate. All buses are wheelchair accessible and have priority seating. Route maps and schedules are available online or by calling. Real-time bus tracking is available through their mobile app.',
    },
    {
      id: 't3',
      name: 'Volunteer Driver Program',
      distance: 'Service Area',
      hours: 'Mon-Fri 9am-5pm',
      description: 'Free rides from trained volunteer drivers',
      phone: '(555) 543-8760',
      address: 'Call to schedule',
      aiExplanation: 'This program connects seniors with volunteer drivers for rides to appointments, grocery shopping, or social activities. Service is completely free. Volunteers are background-checked and trained. You need to register once by calling their office, then you can schedule rides by phone at least 3 days in advance. They serve Monday through Friday from 9am to 5pm within the county.',
    },
  ],
  household: [
    {
      id: 'hh1',
      name: 'Handy Helper Service',
      distance: 'Service Area',
      hours: 'Mon-Fri 8am-6pm',
      description: 'Minor home repairs and maintenance assistance',
      phone: '(555) 654-9870',
      address: 'Call for service',
      aiExplanation: 'This service helps seniors with small home repairs like changing light bulbs, fixing leaky faucets, or replacing smoke detector batteries. They operate Monday through Friday from 8am to 6pm. Services are provided on a sliding fee scale based on income—many seniors pay little or nothing. Call to schedule an appointment and describe what needs fixing. A trained handyman will visit your home within a week.',
    },
    {
      id: 'hh2',
      name: 'Home Care Assistance',
      distance: 'Service Area',
      hours: 'Mon-Sun 8am-8pm',
      description: 'Light housekeeping and daily living support',
      phone: '(555) 765-0981',
      address: 'In-home service',
      aiExplanation: 'This agency provides assistance with light housekeeping, laundry, meal preparation, and grocery shopping. They are available 7 days a week from 8am to 8pm. Services can be covered by Medicare or Medicaid if you qualify. A care coordinator will visit your home for a free assessment to determine your needs. They can arrange regular visits or occasional help.',
    },
    {
      id: 'hh3',
      name: 'Yard Care for Seniors',
      distance: 'Service Area',
      hours: 'Mon-Sat 8am-5pm',
      description: 'Lawn mowing and yard maintenance',
      phone: '(555) 876-1092',
      address: 'Outdoor service',
      aiExplanation: 'This program offers free or low-cost lawn care and yard maintenance for seniors who can no longer do it themselves. Services include mowing, trimming, leaf removal, and snow shoveling (seasonal). They work Monday through Saturday from 8am to 5pm. To qualify, you must be 65 or older and unable to maintain your yard. Call to apply and schedule your first visit.',
    },
  ],
};

const categoryLabels: Record<string, string> = {
  food: 'Food & Nutrition',
  transportation: 'Transportation',
  household: 'Household Help',
  pharmacies: 'Pharmacies Near Me',
  clinics: 'Clinics & Health Centers',
  housing: 'Housing & Community Support',
};

const categoryDescriptions: Record<string, string> = {
  food: 'A direct link to request help with meal delivery or grocery shopping, which is a key part of the "Resources" vision.',
  transportation: 'A simple way to request a ride for appointments or social visits, supporting the goal of overcoming "mobility" barriers.',
  household: 'An option for minor home maintenance or chores to ensure the senior\'s "digital home" translates to safety in their physical home.',
  pharmacies: 'A curated list of the closest pharmacies based on your location. Each card shows current open hours and basic insurance details so you can plan your visit without stress.',
  clinics: 'A simplified directory of nearby healthcare facilities and walk-in centers. It uses plain-language summaries to help you quickly find where to go for check-ups or basic medical needs.',
  housing: 'A central hub for local assistance, including rent relief, senior living guidance, and community centers. This section translates complex requirements into easy-to-read steps for finding a safe place to live.',
};

export function ResourcesList({ category, onBack, showDemoAnnotations }: ResourcesListProps) {
  const [zipCode, setZipCode] = useState('94103');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const resources = mockResources[category] || [];
  const categoryLabel = categoryLabels[category] || 'Resources';
  const categoryDescription = categoryDescriptions[category] || '';

  if (!confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col min-h-screen bg-[#FBF8F3]"
      >
        <header className="px-4 pt-4 pb-3 sm:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-4 text-[#2D2D2D] active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-sm sm:text-base">Back</span>
          </button>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full">
            {/* Resource Title and Description */}
            <div className="mb-6">
              <h2 className="text-[#2D2D2D] text-center text-xl mb-3">{categoryLabel}</h2>
              <p className="text-[#6B6B6B] text-center text-sm leading-relaxed">
                {categoryDescription}
              </p>
            </div>

            {/* Location Icon and Prompt */}
            <MapPin className="w-12 h-12 text-[#2563A8] mx-auto mb-4" />
            <h3 className="text-[#2D2D2D] text-center mb-2">Confirm Your Location</h3>
            <p className="text-[#6B6B6B] text-center text-sm mb-6">
              We'll find resources near you
            </p>
            
            <div className="mb-6">
              <label className="block text-[#2D2D2D] mb-2 text-sm">Your ZIP Code</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-4 py-4 text-lg border-2 border-[#E8E6E0] rounded-3xl focus:outline-none focus:border-[#2563A8] bg-[#F5F5F0]"
                maxLength={5}
              />
            </div>

            <button
              onClick={() => setConfirmed(true)}
              className="w-full bg-gradient-to-br from-[#2563A8] to-[#1e4d87] text-white py-4 rounded-3xl shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              Find Resources Near Me
            </button>
          </div>
        </main>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-screen bg-[#FBF8F3]"
    >
      <header className="px-4 pt-4 pb-3 sm:px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 text-[#2D2D2D] active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-sm sm:text-base">Back</span>
        </button>
        <h1 className="text-[#2D2D2D] text-lg sm:text-xl mb-1">{categoryLabel}</h1>
        <p className="text-[#6B6B6B] text-sm">Near ZIP code {zipCode}</p>
      </header>

      <main className="flex-1 px-4 py-4 sm:px-6 pb-24">
        <div className="space-y-4 max-w-2xl mx-auto relative">
          {/* Demo Annotation for Results List */}
          <AnimatePresence>
            {showDemoAnnotations && (
              <DemoCallout
                text="Only 3–5 results are intentionally shown to reduce cognitive load and decision fatigue for seniors."
                position="bottom"
                className="left-0 sm:left-4"
              />
            )}
          </AnimatePresence>

          {resources.map((resource, index) => (
            <div key={resource.id} className="relative">
              <ResourceCard
                resource={resource}
                onShowExplanation={() => setSelectedResource(resource)}
                showDemoAnnotations={showDemoAnnotations}
              />
              
              {/* Demo Annotation for first Resource Card */}
              {showDemoAnnotations && index === 0 && (
                <AnimatePresence>
                  <DemoCallout
                    text="Each resource includes structured data such as hours, eligibility, and services, enabling consistent and reliable presentation."
                    position="right"
                    className="top-1/2 -translate-y-1/2 hidden sm:block"
                  />
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedResource && (
          <AIExplanationPanel
            resource={selectedResource}
            onClose={() => setSelectedResource(null)}
            showDemoAnnotations={showDemoAnnotations}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}