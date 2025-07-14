import { Activity, Brain, Heart, Leaf, Utensils, Zap } from "lucide-react";



export const successStories = [
    {
      name: 'Priya Sharma',
      age: 32,
      condition: 'PCOS & Weight Management',
      location: 'Mumbai',
      program: 'ekaSanskara - 14 Days',
      beforeAfter: {
        before: 'Irregular periods for 3 years, 15kg weight gain, constant fatigue',
        after: 'Regular cycles, 12kg weight loss, energy levels restored'
      },
      testimonial: "I had tried everything for my PCOS - medications, diets, gym routines. Nothing worked long-term. ekaBrahmaa's approach was different. They didn't just treat my symptoms; they helped me understand my body's unique needs. The 5-healer team worked together seamlessly. My Ayurveda doctor identified my Kapha imbalance, the nutritionist created meals I actually enjoyed, and the yoga therapist taught me practices that regulated my hormones naturally. In 14 days, I felt like a different person.",
      results: ['Regular menstrual cycles', '12kg sustainable weight loss', 'Improved insulin sensitivity', 'Better sleep quality', 'Increased energy levels'],
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 5,
      videoThumbnail: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Rajesh Kumar',
      age: 45,
      condition: 'Type 2 Diabetes & Hypertension',
      location: 'Delhi',
      program: 'ekaUdaya - 28 Days',
      beforeAfter: {
        before: 'HbA1c: 9.2%, BP: 160/100, on multiple medications',
        after: 'HbA1c: 6.8%, BP: 130/85, reduced medication by 50%'
      },
      testimonial: "As a businessman, I thought I had no time for health. My diabetes was getting worse despite medications. The ekaBrahmaa team showed me how to integrate healing into my busy schedule. The functional trainer designed workouts I could do in my office, the nutritionist created meal plans that worked with my travel schedule, and the psychologist helped me manage work stress. The results speak for themselves.",
      results: ['HbA1c reduced from 9.2% to 6.8%', 'Blood pressure normalized', '50% reduction in medications', 'Lost 18kg sustainably', 'Improved work-life balance'],
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 5,
      videoThumbnail: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Anita Patel',
      age: 28,
      condition: 'Anxiety & Digestive Issues',
      location: 'Bangalore',
      program: 'ekaSamanvaya - 21 Days',
      beforeAfter: {
        before: 'Daily panic attacks, chronic bloating, unable to work',
        after: 'Anxiety-free, perfect digestion, returned to full-time work'
      },
      testimonial: "My anxiety was so severe I couldn't leave my house. The digestive issues made everything worse. Traditional therapy and medications weren't helping. ekaBrahmaa's integrated approach was a revelation. The Ayurveda doctor explained how my Vata imbalance was causing both issues. The yoga therapist taught me breathing techniques that stopped panic attacks instantly. The nutritionist healed my gut, which dramatically improved my mental state. I got my life back.",
      results: ['Zero panic attacks', 'Complete digestive healing', 'Returned to work full-time', 'Improved relationships', 'Natural sleep patterns'],
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 5,
      videoThumbnail: 'https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  export const healingApproach = [
    {
      title: 'Ayurveda Doctor',
      description: 'Diagnoses your constitution and root cause imbalances',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Nutritionist',
      description: 'Creates anti-inflammatory, constitution-based meal plans',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Yoga Therapist',
      description: 'Guides breath work and movement for energetic balance',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Functional Trainer',
      description: 'Restores physical vitality and strength',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Psychologist',
      description: 'Supports emotional healing and mindset transformation',
      color: 'from-teal-500 to-cyan-500'
    }
  ];


  export const healthConditions = {
    womensHealth: {
      title: "Women's Health",
      icon: <Heart className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-500',
      perspective: "Ayurveda views women's health through the lens of natural cycles and hormonal harmony. We address the root imbalances that manifest as reproductive challenges.",
      conditions: [
        { name: 'PCOS/PCOD', description: 'Polycystic ovarian syndrome treated through dosha balancing' },
        { name: 'Menstrual Disorders', description: 'Irregular cycles, painful periods, and hormonal imbalances' },
        { name: 'Fertility Support', description: 'Natural conception support and reproductive wellness' },
        { name: 'Menopause Management', description: 'Smooth transition through natural hormonal changes' },
        { name: 'Endometriosis', description: 'Managing inflammation and pain naturally' }
      ],
      image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    digestiveHealth: {
      title: "Digestive & Metabolic Health",
      icon: <Utensils className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      perspective: "In Ayurveda, digestion is the cornerstone of health. We strengthen your digestive fire (Agni) to transform food into nourishment rather than toxins.",
      conditions: [
        { name: 'IBS & IBD', description: 'Irritable bowel syndrome and inflammatory bowel conditions' },
        { name: 'Acid Reflux/GERD', description: 'Chronic heartburn and digestive inflammation' },
        { name: 'Chronic Bloating', description: 'Gas, distension, and digestive discomfort' },
        { name: 'Weight Management', description: 'Sustainable weight balance through metabolic healing' },
        { name: 'Food Sensitivities', description: 'Identifying and healing digestive triggers' }
      ],
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    mentalWellness: {
      title: "Mental & Emotional Wellness",
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-500',
      perspective: "Mental health is inseparable from physical health in Ayurveda. We address the mind-body connection to restore emotional balance and mental clarity.",
      conditions: [
        { name: 'Anxiety Disorders', description: 'Chronic worry, panic attacks, and nervous system imbalance' },
        { name: 'Depression', description: 'Low mood, lack of motivation, and emotional heaviness' },
        { name: 'Sleep Disorders', description: 'Insomnia, restless sleep, and sleep quality issues' },
        { name: 'Stress Management', description: 'Chronic stress and burnout recovery' },
        { name: 'ADHD Support', description: 'Attention and focus challenges through natural methods' }
      ],
      image: 'https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    hormonalBalance: {
      title: "Hormonal Balance",
      icon: <Activity className="w-8 h-8" />,
      color: 'from-teal-500 to-cyan-500',
      perspective: "Hormones are the body's messengers. We restore their natural rhythm through constitutional balancing and lifestyle harmony.",
      conditions: [
        { name: 'Thyroid Disorders', description: 'Hypo/hyperthyroidism and thyroid imbalances' },
        { name: 'Diabetes Type 2', description: 'Blood sugar regulation and insulin sensitivity' },
        { name: 'Metabolic Syndrome', description: 'Comprehensive metabolic dysfunction' },
        { name: 'Adrenal Fatigue', description: 'Chronic fatigue and stress hormone imbalance' },
        { name: 'Insulin Resistance', description: 'Pre-diabetes and metabolic dysfunction' }
      ],
      image: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    lifestyleConditions: {
      title: "Lifestyle-Related Conditions",
      icon: <Zap className="w-8 h-8" />,
      color: 'from-green-500 to-teal-500',
      perspective: "Modern lifestyle creates unique imbalances. We address these through ancient wisdom adapted for contemporary living.",
      conditions: [
        { name: 'Hypertension', description: 'High blood pressure through natural regulation' },
        { name: 'Obesity', description: 'Sustainable weight loss and metabolic healing' },
        { name: 'Skin Conditions', description: 'Eczema, psoriasis, acne, and inflammatory skin issues' },
        { name: 'Chronic Fatigue', description: 'Energy depletion and vitality restoration' },
        { name: 'Autoimmune Support', description: 'Supporting immune system balance naturally' }
      ],
      image: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  };
