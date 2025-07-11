export interface HealerCredentials {
  degree: string;
  institution: string;
  year: number;
}

export interface BoardCertification {
  board: string;
  certification: string;
  issueDate: string;
  expirationDate: string;
  certificationNumber: string;
}

export interface ContinuingEducation {
  title: string;
  provider: string;
  completionDate: string;
  hours: number;
  category: string;
}

export interface DetailedHealer {
  id: string;
  fullName: string;
  preferredName: string;
  title: string;
  credentials: HealerCredentials[];
  specialties: string[];
  boardCertifications: BoardCertification[];
  languages: string[];
  biography: string;
  continuingEducation: ContinuingEducation[];
  uniqueApproaches: string[];
  ageGroupsServed: string[];
  avatar: string;
  rating: number;
  reviews: number;
  consultations: number;
  experience: number;
  available: boolean;
  nextSlot: string;
  verified: boolean;
  location: string;
  consultationFee: number;
  sessionDurations: number[];
  consultationModes: ('video' | 'audio' | 'in-person')[];
  bio?: string; // Short bio for compatibility
  role?: string; // Role for compatibility
  online?: boolean; // Online status for compatibility
  status?: 'online' | 'offline' | 'dnd'; // Status for compatibility
}

export const detailedHealers: DetailedHealer[] = [
  {
    id: 'h1',
    fullName: 'Dr. Aparna Albert',
    preferredName: 'Dr. Aparna',
    title: 'Senior Ayurvedic Practitioner & Women\'s Health Specialist',
    credentials: [
      {
        degree: 'BAMS (Bachelor of Ayurvedic Medicine and Surgery)',
        institution: 'Gujarat Ayurved University',
        year: 2008
      },
      {
        degree: 'MD (Ayurveda) - Prasuti Tantra & Stri Roga',
        institution: 'Rajiv Gandhi University of Health Sciences',
        year: 2012
      },
      {
        degree: 'Certified Panchakarma Specialist',
        institution: 'Arya Vaidya Sala, Kottakkal',
        year: 2014
      }
    ],
    specialties: [
      'Women\'s Reproductive Health',
      'Digestive Disorders (Gastroenterology)',
      'Stress Management & Mental Wellness',
      'Panchakarma Detoxification',
      'Hormonal Imbalances',
      'Fertility & Pregnancy Care',
      'Menstrual Disorders',
      'PCOS/PCOD Management'
    ],
    boardCertifications: [
      {
        board: 'Central Council of Indian Medicine (CCIM)',
        certification: 'Ayurvedic Medicine Practice License',
        issueDate: '2008-07-15',
        expirationDate: '2026-07-15',
        certificationNumber: 'CCIM/KAR/2008/4521'
      },
      {
        board: 'Karnataka State Board of Ayurveda',
        certification: 'State Practice License',
        issueDate: '2008-08-01',
        expirationDate: '2025-08-01',
        certificationNumber: 'KAR/AYU/2008/1247'
      },
      {
        board: 'International Association of Ayurvedic Practitioners',
        certification: 'Certified Ayurvedic Practitioner',
        issueDate: '2015-03-20',
        expirationDate: '2025-03-20',
        certificationNumber: 'IAAP/2015/0892'
      }
    ],
    languages: ['English', 'Hindi', 'Kannada', 'Sanskrit'],
    biography: 'Dr. Aparna Albert brings over 15 years of dedicated experience in Ayurvedic medicine with a specialized focus on women\'s health and digestive wellness. After completing her BAMS from Gujarat Ayurved University, she pursued advanced studies in Prasuti Tantra & Stri Roga, becoming one of the leading experts in Ayurvedic gynecology. Her holistic approach combines traditional Panchakarma therapies with modern diagnostic methods to address root causes of health imbalances. Dr. Aparna has successfully treated over 3,000 patients, with particular expertise in managing PCOS, fertility issues, and chronic digestive disorders. She believes in empowering patients through education and sustainable lifestyle modifications.',
    continuingEducation: [
      {
        title: 'Advanced Panchakarma Protocols for Modern Lifestyle Diseases',
        provider: 'Arya Vaidya Sala, Kottakkal',
        completionDate: '2024-02-15',
        hours: 40,
        category: 'Clinical Practice'
      },
      {
        title: 'Integrative Approaches to Women\'s Hormonal Health',
        provider: 'International Ayurveda Conference',
        completionDate: '2023-11-20',
        hours: 24,
        category: 'Specialized Training'
      },
      {
        title: 'Digital Health and Telemedicine in Ayurveda',
        provider: 'National Institute of Ayurveda',
        completionDate: '2023-08-10',
        hours: 16,
        category: 'Technology Integration'
      }
    ],
    uniqueApproaches: [
      'Personalized Dosha-based treatment protocols',
      'Integration of modern diagnostic tools with traditional assessment',
      'Customized Panchakarma programs for urban lifestyles',
      'Mindfulness-based stress reduction techniques',
      'Nutritional genomics approach to diet planning'
    ],
    ageGroupsServed: ['Adolescents (13-17)', 'Young Adults (18-35)', 'Adults (36-55)', 'Seniors (55+)'],
    avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    reviews: 247,
    consultations: 1850,
    experience: 15,
    available: true,
    nextSlot: 'Today, 3:00 PM',
    verified: true,
    location: 'Bangalore, Karnataka, India',
    consultationFee: 2500,
    sessionDurations: [30, 45, 60],
    consultationModes: ['video', 'audio'],
    // Compatibility fields
    bio: 'Dr. Aparna specializes in Ayurvedic medicine with over 15 years of experience helping patients achieve balance in their doshas.',
    role: 'Ayurveda Doctor',
    online: true,
    status: 'online'
  },
  {
    id: 'h2',
    fullName: 'Shradha Kurup',
    preferredName: 'Shradha',
    title: 'Clinical Nutritionist & Ayurvedic Diet Specialist',
    credentials: [
      {
        degree: 'MSc Clinical Nutrition & Dietetics',
        institution: 'Manipal Academy of Higher Education',
        year: 2016
      },
      {
        degree: 'Certified Ayurvedic Nutrition Consultant',
        institution: 'California College of Ayurveda',
        year: 2018
      },
      {
        degree: 'Diploma in Yoga & Naturopathy',
        institution: 'Swami Vivekananda Yoga Anusandhana Samsthana',
        year: 2019
      }
    ],
    specialties: [
      'Dosha-based Nutrition Planning',
      'Weight Management & Metabolic Health',
      'Sports Nutrition & Performance',
      'Digestive Health Optimization',
      'Anti-inflammatory Diet Protocols',
      'Therapeutic Cooking & Food as Medicine',
      'Eating Disorder Recovery',
      'Pediatric Nutrition'
    ],
    boardCertifications: [
      {
        board: 'Indian Dietetic Association',
        certification: 'Registered Dietitian',
        issueDate: '2016-09-12',
        expirationDate: '2025-09-12',
        certificationNumber: 'IDA/RD/2016/3421'
      },
      {
        board: 'Commission on Dietetic Registration (CDR)',
        certification: 'Certified Nutrition Specialist',
        issueDate: '2019-05-08',
        expirationDate: '2025-05-08',
        certificationNumber: 'CDR/CNS/2019/7892'
      }
    ],
    languages: ['English', 'Hindi', 'Malayalam', 'Tamil'],
    biography: 'Shradha Kurup is a pioneering clinical nutritionist who seamlessly blends evidence-based nutrition science with ancient Ayurvedic dietary wisdom. With her MSc in Clinical Nutrition and specialized training in Ayurvedic nutrition, she has developed innovative dietary protocols that address modern lifestyle challenges while honoring traditional healing principles. Over the past 8 years, she has helped over 2,500 clients achieve sustainable health transformations through personalized nutrition strategies. Her expertise spans from managing complex metabolic conditions to optimizing athletic performance, always with a focus on making nutrition accessible and enjoyable for her clients.',
    continuingEducation: [
      {
        title: 'Nutrigenomics and Personalized Nutrition',
        provider: 'Institute for Functional Medicine',
        completionDate: '2024-01-25',
        hours: 32,
        category: 'Advanced Clinical Practice'
      },
      {
        title: 'Ayurvedic Cooking for Therapeutic Applications',
        provider: 'Kripalu Center for Yoga & Health',
        completionDate: '2023-10-15',
        hours: 20,
        category: 'Specialized Training'
      },
      {
        title: 'Mindful Eating and Behavioral Change',
        provider: 'Center for Mindful Eating',
        completionDate: '2023-07-30',
        hours: 16,
        category: 'Behavioral Health'
      }
    ],
    uniqueApproaches: [
      'Six-taste balancing for optimal nutrition',
      'Seasonal eating protocols based on Ayurvedic principles',
      'Mindful eating practices and food relationship healing',
      'Customized meal timing based on individual circadian rhythms',
      'Integration of therapeutic spices and herbs in daily nutrition'
    ],
    ageGroupsServed: ['Children (5-12)', 'Adolescents (13-17)', 'Young Adults (18-35)', 'Adults (36-55)', 'Seniors (55+)'],
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.8,
    reviews: 189,
    consultations: 1420,
    experience: 8,
    available: false,
    nextSlot: 'Tomorrow, 10:00 AM',
    verified: true,
    location: 'Mumbai, Maharashtra, India',
    consultationFee: 1800,
    sessionDurations: [45, 60],
    consultationModes: ['video', 'audio'],
    // Compatibility fields
    bio: 'Shradha specializes in Ayurvedic nutrition with expertise in dosha-based diet planning and therapeutic cooking.',
    role: 'Nutritionist',
    online: false,
    status: 'dnd'
  },
  {
    id: 'h3',
    fullName: 'Sarah Williams',
    preferredName: 'Sarah',
    title: 'Certified Yoga Therapist & Movement Specialist',
    credentials: [
      {
        degree: 'E-RYT 500 (Experienced Registered Yoga Teacher)',
        institution: 'Yoga Alliance',
        year: 2015
      },
      {
        degree: 'C-IAYT (Certified International Association of Yoga Therapists)',
        institution: 'International Association of Yoga Therapists',
        year: 2017
      },
      {
        degree: 'MS Exercise Science & Kinesiology',
        institution: 'University of California, Los Angeles',
        year: 2013
      }
    ],
    specialties: [
      'Therapeutic Yoga for Chronic Pain',
      'Trauma-Informed Yoga Therapy',
      'Prenatal & Postnatal Yoga',
      'Yoga for Mental Health & Anxiety',
      'Breathwork & Pranayama',
      'Meditation & Mindfulness',
      'Yoga for Athletes & Performance',
      'Senior Yoga & Mobility'
    ],
    boardCertifications: [
      {
        board: 'International Association of Yoga Therapists',
        certification: 'Certified Yoga Therapist',
        issueDate: '2017-06-20',
        expirationDate: '2025-06-20',
        certificationNumber: 'IAYT/CYT/2017/1156'
      },
      {
        board: 'Yoga Alliance',
        certification: 'E-RYT 500',
        issueDate: '2015-03-15',
        expirationDate: '2025-03-15',
        certificationNumber: 'YA/ERYT500/2015/4423'
      }
    ],
    languages: ['English', 'Spanish', 'Basic Sanskrit'],
    biography: 'Sarah Williams combines her deep understanding of Western exercise science with the ancient wisdom of yoga therapy to create transformative healing experiences. With an MS in Exercise Science from UCLA and advanced certifications in yoga therapy, she has spent over 12 years developing specialized programs for individuals dealing with chronic pain, trauma, and stress-related conditions. Her trauma-informed approach has helped over 1,800 students find relief and empowerment through mindful movement. Sarah is particularly passionate about making yoga accessible to all bodies and abilities, creating inclusive spaces where healing can flourish naturally.',
    continuingEducation: [
      {
        title: 'Advanced Trauma-Sensitive Yoga Training',
        provider: 'Trauma Sensitive Yoga Institute',
        completionDate: '2024-03-10',
        hours: 40,
        category: 'Specialized Training'
      },
      {
        title: 'Yoga Therapy for Chronic Pain Management',
        provider: 'International Association of Yoga Therapists',
        completionDate: '2023-09-22',
        hours: 30,
        category: 'Clinical Application'
      },
      {
        title: 'Breathwork Facilitation Certification',
        provider: 'Breathwork Institute',
        completionDate: '2023-06-18',
        hours: 25,
        category: 'Specialized Technique'
      }
    ],
    uniqueApproaches: [
      'Trauma-informed yoga therapy protocols',
      'Personalized breathwork sequences for nervous system regulation',
      'Adaptive yoga practices for physical limitations',
      'Integration of Western anatomy with yogic philosophy',
      'Mindful movement for emotional processing and release'
    ],
    ageGroupsServed: ['Young Adults (18-35)', 'Adults (36-55)', 'Seniors (55+)', 'Prenatal/Postnatal'],
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    reviews: 156,
    consultations: 980,
    experience: 12,
    available: true,
    nextSlot: 'Today, 4:00 PM',
    verified: true,
    location: 'San Francisco, California, USA',
    consultationFee: 2200,
    sessionDurations: [60, 75, 90],
    consultationModes: ['video', 'in-person'],
    // Compatibility fields
    bio: 'Sarah is a certified yoga therapist specializing in trauma-informed practices and therapeutic movement.',
    role: 'Movement / Yoga Expert',
    online: true,
    status: 'online'
  },
  {
    id: 'h4',
    fullName: 'Dr. Rajesh Patel',
    preferredName: 'Dr. Rajesh',
    title: 'Clinical Psychologist & Mindfulness-Based Therapist',
    credentials: [
      {
        degree: 'PhD Clinical Psychology',
        institution: 'Tata Institute of Social Sciences',
        year: 2010
      },
      {
        degree: 'MA Applied Psychology',
        institution: 'University of Mumbai',
        year: 2006
      },
      {
        degree: 'Certified Mindfulness-Based Stress Reduction (MBSR) Instructor',
        institution: 'University of Massachusetts Medical School',
        year: 2014
      }
    ],
    specialties: [
      'Anxiety & Depression Treatment',
      'Mindfulness-Based Cognitive Therapy',
      'Stress Management & Burnout Prevention',
      'Relationship & Family Counseling',
      'Addiction Recovery Support',
      'Grief & Loss Counseling',
      'Career & Life Transitions',
      'Sleep Disorders & Insomnia'
    ],
    boardCertifications: [
      {
        board: 'Rehabilitation Council of India',
        certification: 'Licensed Clinical Psychologist',
        issueDate: '2010-08-15',
        expirationDate: '2025-08-15',
        certificationNumber: 'RCI/CLP/2010/2847'
      },
      {
        board: 'Indian Association of Clinical Psychologists',
        certification: 'Certified Clinical Psychologist',
        issueDate: '2011-02-20',
        expirationDate: '2026-02-20',
        certificationNumber: 'IACP/CCP/2011/1523'
      }
    ],
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    biography: 'Dr. Rajesh Patel is a compassionate clinical psychologist who integrates evidence-based therapeutic approaches with mindfulness and contemplative practices. With his PhD from TISS and over 14 years of clinical experience, he has developed a unique therapeutic style that honors both Western psychology and Eastern wisdom traditions. Dr. Patel has guided over 2,200 individuals through their mental health journeys, specializing in anxiety, depression, and life transitions. His mindfulness-based approach helps clients develop sustainable coping strategies and deeper self-awareness. He is particularly skilled at creating safe, non-judgmental spaces where healing and growth can naturally unfold.',
    continuingEducation: [
      {
        title: 'Advanced Trauma-Informed Care',
        provider: 'National Center for Trauma-Informed Care',
        completionDate: '2024-01-15',
        hours: 35,
        category: 'Clinical Practice'
      },
      {
        title: 'Mindfulness-Based Interventions for Anxiety',
        provider: 'Mindfulness in Society Conference',
        completionDate: '2023-11-08',
        hours: 20,
        category: 'Specialized Training'
      },
      {
        title: 'Digital Mental Health and Teletherapy',
        provider: 'American Psychological Association',
        completionDate: '2023-05-25',
        hours: 18,
        category: 'Technology Integration'
      }
    ],
    uniqueApproaches: [
      'Integration of mindfulness meditation with cognitive behavioral therapy',
      'Culturally sensitive therapy approaches for diverse populations',
      'Somatic awareness techniques for emotional regulation',
      'Narrative therapy for identity and meaning-making',
      'Group mindfulness sessions for community healing'
    ],
    ageGroupsServed: ['Adolescents (13-17)', 'Young Adults (18-35)', 'Adults (36-55)', 'Seniors (55+)'],
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.8,
    reviews: 203,
    consultations: 1650,
    experience: 14,
    available: true,
    nextSlot: 'Tomorrow, 11:00 AM',
    verified: true,
    location: 'Pune, Maharashtra, India',
    consultationFee: 2000,
    sessionDurations: [45, 60],
    consultationModes: ['video', 'audio'],
    // Compatibility fields
    bio: 'Dr. Rajesh guides individuals to inner peace through mindfulness and evidence-based therapeutic techniques.',
    role: 'Psychologist / Emotional Healer',
    online: true,
    status: 'online'
  },
  {
    id: 'h5',
    fullName: 'Elena Rodriguez',
    preferredName: 'Elena',
    title: 'Wellness Program Coordinator & Health Coach',
    credentials: [
      {
        degree: 'MS Health Promotion & Wellness',
        institution: 'Arizona State University',
        year: 2018
      },
      {
        degree: 'Certified Health Education Specialist (CHES)',
        institution: 'National Commission for Health Education Credentialing',
        year: 2019
      },
      {
        degree: 'Certified Wellness Coach',
        institution: 'International Coach Federation',
        year: 2020
      }
    ],
    specialties: [
      'Holistic Wellness Program Design',
      'Lifestyle Medicine & Behavior Change',
      'Corporate Wellness & Stress Management',
      'Health Coaching & Goal Setting',
      'Preventive Health Education',
      'Community Health Promotion',
      'Digital Wellness & Technology Balance',
      'Chronic Disease Prevention'
    ],
    boardCertifications: [
      {
        board: 'National Commission for Health Education Credentialing',
        certification: 'Certified Health Education Specialist',
        issueDate: '2019-04-12',
        expirationDate: '2025-04-12',
        certificationNumber: 'NCHEC/CHES/2019/8765'
      },
      {
        board: 'International Coach Federation',
        certification: 'Associate Certified Coach',
        issueDate: '2020-09-30',
        expirationDate: '2025-09-30',
        certificationNumber: 'ICF/ACC/2020/3421'
      }
    ],
    languages: ['English', 'Spanish', 'Portuguese'],
    biography: 'Elena Rodriguez is a dynamic wellness program coordinator who specializes in creating comprehensive, sustainable health transformation programs. With her MS in Health Promotion and certifications in health education and coaching, she has designed and implemented wellness initiatives that have positively impacted over 3,500 individuals across corporate and community settings. Elena\'s strength lies in her ability to translate complex health concepts into practical, actionable strategies that fit seamlessly into busy modern lifestyles. Her bilingual capabilities and cultural sensitivity make her particularly effective at serving diverse populations and creating inclusive wellness environments.',
    continuingEducation: [
      {
        title: 'Motivational Interviewing for Health Behavior Change',
        provider: 'Motivational Interviewing Network of Trainers',
        completionDate: '2024-02-20',
        hours: 28,
        category: 'Coaching Techniques'
      },
      {
        title: 'Digital Health Coaching Certification',
        provider: 'Digital Health Institute',
        completionDate: '2023-10-05',
        hours: 24,
        category: 'Technology Integration'
      },
      {
        title: 'Trauma-Informed Wellness Practices',
        provider: 'National Wellness Institute',
        completionDate: '2023-07-12',
        hours: 20,
        category: 'Specialized Training'
      }
    ],
    uniqueApproaches: [
      'Culturally responsive wellness program design',
      'Integration of technology for sustainable behavior change',
      'Strengths-based coaching methodology',
      'Community-centered health promotion strategies',
      'Holistic assessment and goal-setting frameworks'
    ],
    ageGroupsServed: ['Young Adults (18-35)', 'Adults (36-55)', 'Corporate Groups', 'Community Organizations'],
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.7,
    reviews: 142,
    consultations: 890,
    experience: 6,
    available: true,
    nextSlot: 'Today, 2:30 PM',
    verified: true,
    location: 'Austin, Texas, USA',
    consultationFee: 1500,
    sessionDurations: [30, 45, 60],
    consultationModes: ['video', 'audio'],
    // Compatibility fields
    bio: 'Elena coordinates comprehensive wellness programs and provides health coaching for sustainable lifestyle changes.',
    role: 'Program Coordinator',
    online: true,
    status: 'online'
  },
  {
    id: 'h6',
    fullName: 'Dr. Goutham Krishnamurthy',
    preferredName: 'Dr. Goutham',
    title: 'Functional Movement Specialist & Sports Rehabilitation Expert',
    credentials: [
      {
        degree: 'Doctor of Physical Therapy (DPT)',
        institution: 'Manipal College of Allied Health Sciences',
        year: 2015
      },
      {
        degree: 'Certified Functional Movement Screen (FMS)',
        institution: 'Functional Movement Systems',
        year: 2017
      },
      {
        degree: 'Certified Strength & Conditioning Specialist (CSCS)',
        institution: 'National Strength and Conditioning Association',
        year: 2018
      }
    ],
    specialties: [
      'Functional Movement Assessment & Correction',
      'Sports Injury Rehabilitation',
      'Postural Correction & Ergonomics',
      'Chronic Pain Management',
      'Athletic Performance Enhancement',
      'Post-Surgical Rehabilitation',
      'Movement Pattern Optimization',
      'Workplace Injury Prevention'
    ],
    boardCertifications: [
      {
        board: 'Indian Association of Physiotherapists',
        certification: 'Licensed Physical Therapist',
        issueDate: '2015-07-20',
        expirationDate: '2025-07-20',
        certificationNumber: 'IAP/LPT/2015/3892'
      },
      {
        board: 'National Strength and Conditioning Association',
        certification: 'Certified Strength & Conditioning Specialist',
        issueDate: '2018-05-15',
        expirationDate: '2026-05-15',
        certificationNumber: 'NSCA/CSCS/2018/7654'
      }
    ],
    languages: ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu'],
    biography: 'Dr. Goutham Krishnamurthy is a highly skilled functional movement specialist who combines evidence-based physical therapy with innovative movement science to help individuals achieve optimal physical function. With his DPT and specialized certifications in functional movement and strength conditioning, he has successfully rehabilitated over 2,800 patients ranging from weekend warriors to professional athletes. Dr. Goutham\'s approach focuses on identifying and correcting movement dysfunctions at their root cause, preventing future injuries while optimizing performance. His expertise in both traditional rehabilitation and cutting-edge movement assessment makes him uniquely qualified to address complex musculoskeletal challenges.',
    continuingEducation: [
      {
        title: 'Advanced Dry Needling Techniques',
        provider: 'Dry Needling Institute',
        completionDate: '2024-01-30',
        hours: 32,
        category: 'Clinical Technique'
      },
      {
        title: 'Blood Flow Restriction Training Certification',
        provider: 'Blood Flow Restriction Training Institute',
        completionDate: '2023-11-15',
        hours: 20,
        category: 'Specialized Training'
      },
      {
        title: 'Movement Variability and Motor Learning',
        provider: 'International Federation of Orthopaedic Manipulative Physical Therapists',
        completionDate: '2023-08-22',
        hours: 24,
        category: 'Advanced Clinical Practice'
      }
    ],
    uniqueApproaches: [
      'Comprehensive movement screening and analysis',
      'Integration of traditional Indian movement practices with modern rehabilitation',
      'Personalized exercise prescription based on individual movement patterns',
      'Pain science education and cognitive behavioral approaches',
      'Technology-assisted movement analysis and biofeedback'
    ],
    ageGroupsServed: ['Adolescents (13-17)', 'Young Adults (18-35)', 'Adults (36-55)', 'Athletes (All Ages)'],
    avatar: 'https://images.pexels.com/photos/6456211/pexels-photo-6456211.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    reviews: 178,
    consultations: 1240,
    experience: 9,
    available: true,
    nextSlot: 'Today, 5:00 PM',
    verified: true,
    location: 'Bangalore, Karnataka, India',
    consultationFee: 2200,
    sessionDurations: [45, 60, 75],
    consultationModes: ['video', 'in-person'],
    // Compatibility fields
    bio: 'Dr. Goutham specializes in functional movement assessment and rehabilitation with expertise in sports performance.',
    role: 'Functional Movement Trainer',
    online: true,
    status: 'online'
  },
  {
    id: 'h7',
    fullName: 'Dr. Twinkle Sharma',
    preferredName: 'Dr. Twinkle',
    title: 'Clinical Psychologist & Mind-Body Integration Specialist',
    credentials: [
      {
        degree: 'PhD Clinical Psychology',
        institution: 'Jamia Millia Islamia University',
        year: 2012
      },
      {
        degree: 'MA Clinical Psychology',
        institution: 'Delhi University',
        year: 2008
      },
      {
        degree: 'Certified Somatic Experiencing Practitioner',
        institution: 'Somatic Experiencing International',
        year: 2016
      }
    ],
    specialties: [
      'Mind-Body Integration Therapy',
      'Trauma Recovery & PTSD Treatment',
      'Somatic Experiencing & Body-Based Healing',
      'Anxiety & Panic Disorder Treatment',
      'Emotional Regulation & Resilience Building',
      'Couples & Relationship Therapy',
      'Adolescent Mental Health',
      'Meditation & Mindfulness Training'
    ],
    boardCertifications: [
      {
        board: 'Rehabilitation Council of India',
        certification: 'Licensed Clinical Psychologist',
        issueDate: '2012-09-10',
        expirationDate: '2025-09-10',
        certificationNumber: 'RCI/CLP/2012/4567'
      },
      {
        board: 'Somatic Experiencing International',
        certification: 'Certified Somatic Experiencing Practitioner',
        issueDate: '2016-11-25',
        expirationDate: '2025-11-25',
        certificationNumber: 'SEI/SEP/2016/2134'
      }
    ],
    languages: ['English', 'Hindi', 'Punjabi', 'Urdu'],
    biography: 'Dr. Twinkle Sharma is a pioneering clinical psychologist who specializes in the profound connection between mind and body in the healing process. With her PhD in Clinical Psychology and advanced training in Somatic Experiencing, she has developed innovative therapeutic approaches that address trauma and emotional challenges through both psychological and embodied interventions. Over her 12-year career, Dr. Twinkle has helped over 1,900 individuals heal from trauma, anxiety, and relationship challenges. Her gentle yet effective approach creates a safe container for deep healing, allowing clients to reconnect with their innate wisdom and resilience.',
    continuingEducation: [
      {
        title: 'Advanced Trauma Treatment: EMDR Level II',
        provider: 'EMDR International Association',
        completionDate: '2024-03-05',
        hours: 40,
        category: 'Trauma Treatment'
      },
      {
        title: 'Polyvagal Theory in Clinical Practice',
        provider: 'Polyvagal Institute',
        completionDate: '2023-12-10',
        hours: 30,
        category: 'Specialized Training'
      },
      {
        title: 'Mindfulness-Based Stress Reduction Teacher Training',
        provider: 'Center for Mindfulness, UMass Medical School',
        completionDate: '2023-09-18',
        hours: 35,
        category: 'Mindfulness Training'
      }
    ],
    uniqueApproaches: [
      'Integration of somatic awareness with traditional talk therapy',
      'Culturally sensitive therapy approaches for South Asian populations',
      'Nervous system regulation techniques for anxiety and trauma',
      'Mindful movement and breathwork integration',
      'Family systems approach to individual healing'
    ],
    ageGroupsServed: ['Adolescents (13-17)', 'Young Adults (18-35)', 'Adults (36-55)', 'Couples & Families'],
    avatar: 'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.8,
    reviews: 167,
    consultations: 1380,
    experience: 12,
    available: false,
    nextSlot: 'Tomorrow, 1:00 PM',
    verified: true,
    location: 'New Delhi, India',
    consultationFee: 2300,
    sessionDurations: [50, 75],
    consultationModes: ['video', 'audio'],
    // Compatibility fields
    bio: 'Dr. Twinkle specializes in mind-body integration therapy with expertise in trauma recovery and somatic healing.',
    role: 'Psychologist',
    online: false,
    status: 'offline'
  },
  {
    id: 'h8',
    fullName: 'Priya Sharma',
    preferredName: 'Priya',
    title: 'Certified Yoga Coach & Wellness Instructor',
    credentials: [
      {
        degree: 'RYT 500 (Registered Yoga Teacher)',
        institution: 'Yoga Alliance',
        year: 2018
      },
      {
        degree: 'Certified Ayurvedic Yoga Specialist',
        institution: 'Kerala Ayurveda Academy',
        year: 2020
      },
      {
        degree: 'BS Kinesiology',
        institution: 'University of California, Los Angeles',
        year: 2016
      }
    ],
    specialties: [
      'Hatha Yoga',
      'Vinyasa Flow',
      'Restorative Yoga',
      'Pranayama (Breathwork)',
      'Meditation & Mindfulness',
      'Yoga for Stress Relief',
      'Therapeutic Yoga',
      'Ayurvedic Yoga'
    ],
    boardCertifications: [
      {
        board: 'Yoga Alliance',
        certification: 'RYT 500',
        issueDate: '2018-06-15',
        expirationDate: '2026-06-15',
        certificationNumber: 'YA/RYT500/2018/5567'
      },
      {
        board: 'International Association of Yoga Therapists',
        certification: 'Yoga Therapy Training',
        issueDate: '2020-09-20',
        expirationDate: '2025-09-20',
        certificationNumber: 'IAYT/YTT/2020/3344'
      }
    ],
    languages: ['English', 'Hindi', 'Sanskrit', 'Gujarati'],
    biography: 'Priya Sharma is a passionate yoga coach who seamlessly blends traditional Hatha yoga with modern wellness practices to create transformative experiences for her students. With her RYT 500 certification and specialized training in Ayurvedic yoga, she has guided over 1,500 students on their wellness journeys over the past 7 years. Priya\'s approach focuses on making yoga accessible to all body types and fitness levels, emphasizing the connection between breath, movement, and mindful living. Her classes are known for their nurturing atmosphere and practical application of yogic principles to daily life challenges.',
    continuingEducation: [
      {
        title: 'Advanced Pranayama & Meditation Techniques',
        provider: 'Rishikesh Yoga Institute',
        completionDate: '2024-03-15',
        hours: 50,
        category: 'Advanced Practice'
      },
      {
        title: 'Yoga for Mental Health Certification',
        provider: 'Yoga & Mental Health Institute',
        completionDate: '2023-11-10',
        hours: 30,
        category: 'Specialized Training'
      },
      {
        title: 'Ayurvedic Principles in Yoga Practice',
        provider: 'Kerala Ayurveda Academy',
        completionDate: '2023-08-20',
        hours: 40,
        category: 'Traditional Studies'
      }
    ],
    uniqueApproaches: [
      'Dosha-specific yoga sequences tailored to individual constitution',
      'Integration of breathwork with movement for nervous system regulation',
      'Mindful movement practices for emotional processing',
      'Seasonal yoga practices aligned with Ayurvedic principles',
      'Adaptive yoga modifications for physical limitations and injuries'
    ],
    ageGroupsServed: ['Young Adults (18-35)', 'Adults (36-55)', 'Seniors (55+)', 'Beginners to Advanced'],
    avatar: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    reviews: 134,
    consultations: 890,
    experience: 7,
    available: true,
    nextSlot: 'Today, 6:00 PM',
    verified: true,
    location: 'Mumbai, Maharashtra, India',
    consultationFee: 1500,
    sessionDurations: [45, 60, 90],
    consultationModes: ['video', 'in-person'],
    // Compatibility fields
    bio: 'Priya is a certified yoga coach specializing in Ayurvedic yoga and mindful movement practices.',
    role: 'Yoga Coach',
    online: true,
    status: 'online'
  }
];

// Helper function to get healer by ID
export const getHealerById = (id: string): DetailedHealer | undefined => {
  return detailedHealers.find(healer => healer.id === id);
};

// Helper function to get healers by specialty
export const getHealersBySpecialty = (specialty: string): DetailedHealer[] => {
  return detailedHealers.filter(healer => 
    healer.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
  );
};

// Helper function to get available healers
export const getAvailableHealers = (): DetailedHealer[] => {
  return detailedHealers.filter(healer => healer.available);
};

// Helper function to convert detailed healer to chat healer format
export const toChatHealer = (healer: DetailedHealer) => ({
  id: healer.id,
  name: healer.preferredName,
  role: healer.role || healer.title,
  avatar: healer.avatar,
  bio: healer.bio,
  online: healer.online || healer.available,
  status: healer.status || (healer.available ? 'online' : 'offline'),
  lastMessage: '',
  lastMessageTime: new Date(),
  unread: 0
});